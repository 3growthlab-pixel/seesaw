import { executeQuery, closeConnection } from '../lib/database.js';

async function run() {
  await executeQuery("UPDATE contents SET image_url = '/image/campaign-1.png' WHERE id = 'c1'");
  await executeQuery("UPDATE contents SET image_url = '/image/campaign-2.png' WHERE id = 'c2'");
  await executeQuery("UPDATE contents SET image_url = '/image/campaign-3.png' WHERE id = 'c3'");
  console.log('✅ Campaign images updated');
  await closeConnection();
  process.exit();
}

run();
