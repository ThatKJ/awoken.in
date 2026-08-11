import pg from 'pg';

const { Client } = pg;

async function run() {
  const client = new Client({
    connectionString: 'postgresql://postgres:postgres@127.0.0.1:54322/postgres'
  });

  await client.connect();

  console.log("=== TABLES ===");
  const tables = await client.query(`
    SELECT tablename, rowsecurity 
    FROM pg_tables 
    WHERE schemaname = 'public'
    ORDER BY tablename;
  `);
  console.table(tables.rows);

  console.log("\n=== POLICIES ===");
  const policies = await client.query(`
    SELECT tablename, policyname, permissive, roles, cmd, qual, with_check 
    FROM pg_policies 
    WHERE schemaname = 'public'
    ORDER BY tablename, policyname;
  `);
  console.table(policies.rows);

  await client.end();
}

run().catch(console.error);
