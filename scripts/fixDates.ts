import { executeQuery, closeConnection } from '../lib/database.js';

async function run() {
  // 1. 세미나 일시에 시간 복원 (오후 6시)
  const rows = await executeQuery<any>('SELECT id, data_text FROM section_extra_data WHERE data_text LIKE "%일시%"');
  for (const r of rows) {
    const fixed = r.data_text + ' 오후 6시';
    await executeQuery('UPDATE section_extra_data SET data_text = ? WHERE id = ?', [fixed, r.id]);
    console.log(`세미나 복원: "${fixed}"`);
  }

  // 2. 인터뷰 deadline에서 시간 제거 (날짜만)
  await executeQuery("UPDATE contents SET deadline = '2025.07.15' WHERE id = 'i4'");
  await executeQuery("UPDATE contents SET deadline = '2025.08.19' WHERE id = 'i5'");
  await executeQuery("UPDATE contents SET deadline = '2025.09.24' WHERE id = 'i6'");
  console.log('✅ i4/i5/i6 deadline 날짜만으로 수정 완료');

  await closeConnection();
  process.exit();
}

run();
