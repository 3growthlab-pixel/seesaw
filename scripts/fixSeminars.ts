import { executeQuery, closeConnection } from '../lib/database.js';

async function run() {
  // s6 날짜 수정
  await executeQuery("UPDATE contents SET created_at = '2024-07-05 00:00:00', updated_at = '2024-07-05 00:00:00' WHERE id = 's6'");
  await executeQuery("UPDATE content_detailed_sections SET subtitle = '✅ 진행 완료 | 2024년 7월 5일 (금) 18:00' WHERE content_id = 's6' AND sort_order = 1");
  console.log('✅ s6 날짜 수정 완료');

  // s1, s2 삭제
  for (const id of ['s1', 's2']) {
    const secs = await executeQuery<any>('SELECT id FROM content_detailed_sections WHERE content_id = ?', [id]);
    for (const s of secs) {
      await executeQuery('DELETE FROM section_progress_data WHERE section_id = ?', [s.id]);
      await executeQuery('DELETE FROM section_extra_data WHERE section_id = ?', [s.id]);
      await executeQuery('DELETE FROM section_faq_data WHERE section_id = ?', [s.id]);
    }
    await executeQuery('DELETE FROM content_detailed_sections WHERE content_id = ?', [id]);
    await executeQuery('DELETE FROM content_detail_images WHERE content_id = ?', [id]);
    await executeQuery('DELETE FROM contents WHERE id = ?', [id]);
    console.log(`✅ ${id} 삭제 완료`);
  }

  console.log('🎉 Done!');
  await closeConnection();
  process.exit();
}

run();
