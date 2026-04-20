import { executeQuery, closeConnection } from '../lib/database.js';

async function run() {
  await executeQuery('UPDATE contents SET image_url = ? WHERE id = ?', ['/image/independence-descendants.jpg', 's_proj1']);
  console.log('✅ s_proj1 이미지 업데이트 완료');
  await closeConnection();
  process.exit();
}

run();
