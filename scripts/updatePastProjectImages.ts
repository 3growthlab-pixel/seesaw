import { executeQuery, closeConnection } from '../lib/database.js';

async function run() {
  await executeQuery("UPDATE contents SET image_url = '/image/project-anon.png' WHERE id = 'p3'");
  await executeQuery("UPDATE contents SET image_url = '/image/project-taste.png' WHERE id = 'p4'");
  await executeQuery("UPDATE contents SET image_url = '/image/project-together.png' WHERE id = 'p5'");
  console.log('✅ p3, p4, p5 이미지 업데이트 완료');
  await closeConnection();
  process.exit();
}

run();
