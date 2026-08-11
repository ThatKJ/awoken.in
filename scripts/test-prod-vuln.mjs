import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!url || !key) {
  console.error("Missing SUPABASE config");
  process.exit(1);
}

const supabase = createClient(url, key);

async function testTable(tableName) {
  console.log(`\n--- Testing Table: ${tableName} ---`);
  
  // Test SELECT
  const { data: selectData, error: selectError } = await supabase.from(tableName).select('*').limit(5);
  if (selectError) {
    console.log(`SELECT Error: ${selectError.message} (${selectError.code})`);
  } else {
    console.log(`SELECT Success: Retrieved ${selectData.length} records. (Data exposure!)`);
  }

  // Test INSERT
  const { error: insertError } = await supabase.from(tableName).insert([{ test: 'audit' }]);
  if (insertError) {
    console.log(`INSERT Error: ${insertError.message} (${insertError.code})`);
  } else {
    console.log(`INSERT Success: Was able to insert a record. (Data modification exposure!)`);
  }

  // Test UPDATE
  const { error: updateError } = await supabase.from(tableName).update({ test: 'audit' }).eq('id', 'non-existent-id');
  if (updateError) {
    console.log(`UPDATE Error: ${updateError.message} (${updateError.code})`);
  } else {
    console.log(`UPDATE Success: Was able to run update command. (Data modification exposure!)`);
  }

  // Test DELETE
  const { error: deleteError } = await supabase.from(tableName).delete().eq('id', 'non-existent-id');
  if (deleteError) {
    console.log(`DELETE Error: ${deleteError.message} (${deleteError.code})`);
  } else {
    console.log(`DELETE Success: Was able to run delete command. (Data modification exposure!)`);
  }
}

async function run() {
  const tables = ['assessments', 'leads', 'users', 'organizations', 'conversations', 'appointments'];
  for (const table of tables) {
    await testTable(table);
  }
}

run();
