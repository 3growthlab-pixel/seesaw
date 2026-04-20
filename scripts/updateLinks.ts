import { executeQuery, closeConnection } from '../lib/database.js';

async function run() {
  await executeQuery("UPDATE contents SET external_link = 'https://www.seesaw-society.org/project5' WHERE id = 'p2'");
  console.log('✅ 손편지 프로젝트 링크 연결 완료');

  await executeQuery("UPDATE contents SET external_link = 'https://www.seesaw-society.org/contestB' WHERE id = 'p1'");
  console.log('✅ 공모전 링크 연결 완료');

  await closeConnection();
  process.exit();
}

run();
