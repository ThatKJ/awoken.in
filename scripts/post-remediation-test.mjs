import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

dotenv.config()

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!SUPABASE_SERVICE_ROLE_KEY) {
  console.error('Missing SUPABASE_SERVICE_ROLE_KEY in environment')
  process.exit(1)
}

const RUN_ID = `SECURITY_TEST_2026_08_11_${Math.random().toString(36).substring(7)}`

// Clients
const serviceClient = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
  auth: { autoRefreshToken: false, persistSession: false }
})

const anonClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: { autoRefreshToken: false, persistSession: false }
})

const userAClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: { autoRefreshToken: false, persistSession: false }
})

const userBClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: { autoRefreshToken: false, persistSession: false }
})

const tablesToTest = ['assessments', 'leads', 'conversations', 'messages', 'opportunities', 'workers', 'organizations']
const results = {
  anon: {},
  userA: {},
  idor: [],
  api: [],
  headers: {},
  direct_supabase_bypass: null,
  cleanup: []
}

let userA, userB, orgA, orgB;
let recordsA = {};
let recordsB = {};

async function setup() {
  console.log(`Setting up test fixtures with prefix: ${RUN_ID}`)
  
  const pass = 'SuperSecretTestPassword123!'
  const userARes = await serviceClient.auth.admin.createUser({
    email: `usera_${RUN_ID}@example.com`,
    password: pass,
    email_confirm: true
  })
  const userBRes = await serviceClient.auth.admin.createUser({
    email: `userb_${RUN_ID}@example.com`,
    password: pass,
    email_confirm: true
  })
  
  userA = userARes.data.user
  userB = userBRes.data.user

  await userAClient.auth.signInWithPassword({ email: userA.email, password: pass })
  await userBClient.auth.signInWithPassword({ email: userB.email, password: pass })

  const orgARes = await serviceClient.from('organizations').insert({
    name: `Org A - ${RUN_ID}`,
    slug: `org-a-${RUN_ID}`
  }).select().single()
  if (orgARes.error) throw new Error(`Org A Insert Error: ${JSON.stringify(orgARes.error)}`)
  orgA = orgARes.data

  const orgBRes = await serviceClient.from('organizations').insert({
    name: `Org B - ${RUN_ID}`,
    slug: `org-b-${RUN_ID}`
  }).select().single()
  if (orgBRes.error) throw new Error(`Org B Insert Error: ${JSON.stringify(orgBRes.error)}`)
  orgB = orgBRes.data

  await serviceClient.from('users').insert([
    { id: userA.id, organization_id: orgA.id, name: 'User A', email: userA.email, password_hash: 'dummy' },
    { id: userB.id, organization_id: orgB.id, name: 'User B', email: userB.email, password_hash: 'dummy' }
  ])

  for (const org of [orgA, orgB]) {
    const isA = org.id === orgA.id
    const target = isA ? recordsA : recordsB
    
    const asmRes = await serviceClient.from('assessments').insert({
      assessment_id: crypto.randomUUID(),
      business_name: `Business ${RUN_ID}`, 
      contact_email: isA ? userA.email : userB.email
    }).select().single()
    if (asmRes.error) console.warn(`Assessments Insert Warning: ${JSON.stringify(asmRes.error)}`)
    target.assessments = asmRes.data || { assessment_id: crypto.randomUUID() }

    const wrkRes = await serviceClient.from('workers').insert({
      id: crypto.randomUUID(),
      organization_id: org.id, worker_type: 'lead_response', name: `Worker ${RUN_ID}`
    }).select().single()
    if (wrkRes.error) throw new Error(`Workers Error: ${JSON.stringify(wrkRes.error)}`)
    target.workers = wrkRes.data

    const leadRes = await serviceClient.from('leads').insert({
      id: crypto.randomUUID(),
      organization_id: org.id, name: `Lead ${RUN_ID}`, email: 'lead@test.com', source: 'website_form'
    }).select().single()
    if (leadRes.error) throw new Error(`Leads Error: ${JSON.stringify(leadRes.error)}`)
    target.leads = leadRes.data

    const convRes = await serviceClient.from('conversations').insert({
      id: crypto.randomUUID(),
      organization_id: org.id, lead_id: target.leads.id, lead_name: 'Test Lead'
    }).select().single()
    if (convRes.error) throw new Error(`Conversations Error: ${JSON.stringify(convRes.error)}`)
    target.conversations = convRes.data

    const msgRes = await serviceClient.from('messages').insert({
      id: crypto.randomUUID(),
      conversation_id: target.conversations.id, content: { text: 'Test msg' }
    }).select().single()
    if (msgRes.error) console.warn(`Messages Warning: ${JSON.stringify(msgRes.error)}`)
    target.messages = msgRes.data || { id: crypto.randomUUID() }

    const oppRes = await serviceClient.from('opportunities').insert({
      id: crypto.randomUUID(),
      organization_id: org.id, lead_id: target.leads.id, title: 'Test Opp'
    }).select().single()
    if (oppRes.error) console.warn(`Opportunities Warning: ${JSON.stringify(oppRes.error)}`)
    target.opportunities = oppRes.data || { id: crypto.randomUUID() }
  }
}

async function runAnonTests() {
  console.log('Running Anonymous Tests...')
  for (const table of tablesToTest) {
    results.anon[table] = { SELECT: 'DENIED', INSERT: 'DENIED', UPDATE: 'DENIED', DELETE: 'DENIED' }
    
    const pk = table === 'assessments' ? 'assessment_id' : 'id'
    
    const s = await anonClient.from(table).select('*').limit(1)
    if (s.data && s.data.length > 0) results.anon[table].SELECT = 'ALLOWED (FAIL)'
    
    const dummy = table === 'assessments' ? { business_name: 'test' } : { organization_id: orgA.id, name: 'test' }
    const i = await anonClient.from(table).insert(dummy).select()
    if (!i.error && i.data && i.data.length > 0) results.anon[table].INSERT = 'ALLOWED (FAIL)'

    const recId = recordsA[table]?.[pk]
    if (recId) {
      const u = await anonClient.from(table).update({ name: 'hacked' }).eq(pk, recId).select()
      if (!u.error && u.data && u.data.length > 0) results.anon[table].UPDATE = 'ALLOWED (FAIL)'
      
      const d = await anonClient.from(table).delete().eq(pk, recId).select()
      if (!d.error && d.data && d.data.length > 0) results.anon[table].DELETE = 'ALLOWED (FAIL)'
    }
  }
}

async function runUserATests() {
  console.log('Running User A Tests (Own Org)...')
  for (const table of tablesToTest) {
    results.userA[table] = { SELECT: 'DENIED', INSERT: 'DENIED', UPDATE: 'DENIED', DELETE: 'DENIED' }
    const pk = table === 'assessments' ? 'assessment_id' : 'id'
    const recId = recordsA[table]?.[pk]
    
    const s = await userAClient.from(table).select('*').eq(pk, recId)
    if (s.data && s.data.length > 0) results.userA[table].SELECT = 'ALLOWED'

    const dummy = table === 'assessments' ? { business_name: 'test' } : (table === 'organizations' ? { name: 'test' } : { organization_id: orgA.id, name: 'test' })
    const i = await userAClient.from(table).insert(dummy).select()
    if (!i.error && i.data && i.data.length > 0) {
      results.userA[table].INSERT = 'ALLOWED'
      await serviceClient.from(table).delete().eq(pk, i.data[0][pk])
    }

    if (recId) {
      const payload = table === 'messages' ? { content: 'updated' } : (table === 'conversations' ? { status: 'closed' } : { name: 'updated' })
      const u = await userAClient.from(table).update(payload).eq(pk, recId).select()
      if (!u.error && u.data && u.data.length > 0) results.userA[table].UPDATE = 'ALLOWED'
      
      // legitimate functionality may not allow DELETE. 
      // We'll test if we can DELETE our own record. If not, it just means application doesn't allow deletes.
      // E.g. we might not be allowed to delete organizations or leads.
      const d = await userAClient.from(table).delete().eq(pk, recId).select()
      if (!d.error && d.data && d.data.length > 0) results.userA[table].DELETE = 'ALLOWED'
    }
  }
}

async function runIDORTests() {
  console.log('Running IDOR Tests (User A -> Org B)...')
  
  for (const table of tablesToTest) {
    const recB = recordsB[table]
    if (!recB) continue;
    const pk = table === 'assessments' ? 'assessment_id' : 'id'

    const s = await userAClient.from(table).select('*').eq(pk, recB[pk])
    results.idor.push({ attack: `SELECT ${table} (Org B record)`, result: (s.data && s.data.length > 0) ? 'ALLOWED (FAIL)' : 'DENIED' })

    const payload = table === 'messages' ? { content: 'updated' } : (table === 'conversations' ? { status: 'closed' } : { name: 'updated' })
    const u = await userAClient.from(table).update(payload).eq(pk, recB[pk]).select()
    results.idor.push({ attack: `UPDATE ${table} (Org B record)`, result: (u.data && u.data.length > 0) ? 'ALLOWED (FAIL)' : 'DENIED' })

    const d = await userAClient.from(table).delete().eq(pk, recB[pk]).select()
    results.idor.push({ attack: `DELETE ${table} (Org B record)`, result: (d.data && d.data.length > 0) ? 'ALLOWED (FAIL)' : 'DENIED' })

    if (table !== 'assessments' && table !== 'organizations') {
      const i = await userAClient.from(table).insert({ organization_id: orgB.id, name: 'hacked', lead_id: recordsB.leads?.id }).select()
      results.idor.push({ attack: `INSERT ${table} (Using Org B's organization_id)`, result: (i.data && i.data.length > 0) ? 'ALLOWED (FAIL)' : 'DENIED' })
    }
  }
}

async function runAPITests() {
  console.log('Running Local API Tests...')
  const baseUrl = 'http://localhost:3000/api/assessment'
  
  let r = await fetch(baseUrl, {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      answers: {
        businessName: `API_${RUN_ID}`, contactName: 'API Test', contactEmail: 'api@test.com', consent: true
      },
      report: {
        healthScore: 50, maturityScore: 50, aiReadiness: 50, riskLevel: 'low', opportunityLevel: 'high', categories: []
      }
    })
  })
  results.api.push({ test: 'Valid payload', expected: '200', actual: r.status, result: r.status === 200 ? 'PASS' : 'FAIL' })

  r = await fetch(baseUrl, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({}) })
  results.api.push({ test: 'Missing fields', expected: '400', actual: r.status, result: r.status === 400 ? 'PASS' : 'FAIL' })

  r = await fetch(baseUrl, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ businessName: 'A'.repeat(5000) }) })
  results.api.push({ test: 'Oversized payload', expected: '400 or 413', actual: r.status, result: (r.status === 400 || r.status === 413) ? 'PASS' : 'FAIL' })

  r = await fetch(baseUrl, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ businessName: `RateX`, contactName: 'A', contactEmail: 'a@a.com', contactPhone: '123' }) })
  results.api.push({ test: 'Malformed payload (bad types/missing)', expected: '400', actual: r.status, result: r.status === 400 ? 'PASS' : 'FAIL' })

  let limitTriggered = false;
  for(let i=0; i<7; i++) {
    r = await fetch(baseUrl, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ businessName: `Rate${i}`, contactName: 'A', contactEmail: 'api@test.com', contactPhone: '1234567890' }) })
    if (r.status === 429) limitTriggered = true;
  }
  results.api.push({ test: 'Rate limiting (5/min)', expected: '429', actual: limitTriggered ? '429' : r.status, result: limitTriggered ? 'PASS' : 'FAIL' })
}

async function testDirectSupabaseBypass() {
  const i = await anonClient.from('assessments').insert({
    business_name: `Bypass_${RUN_ID}`, contact_email: 'bypass@test.com', contact_phone: '123', contact_name: 'Bypass'
  }).select()
  
  if (i.error) {
    results.direct_supabase_bypass = 'DENIED (PASS)'
  } else if (i.data && i.data.length > 0) {
    results.direct_supabase_bypass = 'ALLOWED (FAIL)'
  } else {
    results.direct_supabase_bypass = 'DENIED (PASS)'
  }
}

async function runHeaderTests() {
  console.log('Running Header Tests on Production...')
  try {
    const r = await fetch('https://www.awoken.in')
    results.headers = {
      'Content-Security-Policy': r.headers.get('content-security-policy') || 'MISSING',
      'Strict-Transport-Security': r.headers.get('strict-transport-security') || 'MISSING',
      'X-Content-Type-Options': r.headers.get('x-content-type-options') || 'MISSING',
      'X-Frame-Options': r.headers.get('x-frame-options') || 'MISSING',
      'Permissions-Policy': r.headers.get('permissions-policy') || 'MISSING',
      'Referrer-Policy': r.headers.get('referrer-policy') || 'MISSING',
      'Access-Control-Allow-Origin': r.headers.get('access-control-allow-origin') || 'NONE (Expected)',
      'Final-Origin': r.url
    }
  } catch (e) {
    console.error('Header test failed', e)
    results.headers = { error: e.message }
  }
}

async function cleanup() {
  console.log('Cleaning up...')
  if (orgA) {
    await serviceClient.from('organizations').delete().eq('id', orgA.id)
    results.cleanup.push('Org A deleted')
  }
  if (orgB) {
    await serviceClient.from('organizations').delete().eq('id', orgB.id)
    results.cleanup.push('Org B deleted')
  }
  if (userA) {
    await serviceClient.auth.admin.deleteUser(userA.id)
    results.cleanup.push('User A deleted')
  }
  if (userB) {
    await serviceClient.auth.admin.deleteUser(userB.id)
    results.cleanup.push('User B deleted')
  }
  await serviceClient.from('assessments').delete().like('business_name', `%${RUN_ID}%`)
  await serviceClient.from('assessments').delete().like('business_name', 'API_%')
  await serviceClient.from('assessments').delete().like('business_name', 'Rate%')
  results.cleanup.push('Assessments cleaned')
}

async function main() {
  try {
    await setup()
    await runAnonTests()
    await runUserATests()
    await runIDORTests()
    await testDirectSupabaseBypass()
    await runHeaderTests()
    
    // Wait for dev server to start
    await new Promise(resolve => setTimeout(resolve, 5000))
    await runAPITests()
    
  } catch (e) {
    console.error('Test execution error:', e)
  } finally {
    await cleanup()
    console.log('\n--- JSON RESULTS ---')
    console.log(JSON.stringify(results, null, 2))
  }
}

main()
