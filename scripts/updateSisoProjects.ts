import { executeQuery, closeConnection } from '../lib/database.js';

async function updateSisoProjects() {
  try {
    console.log('Starting update...');

    // ── s_proj2, s_proj3 삭제 ──────────────────────────────
    for (const id of ['s_proj2', 's_proj3']) {
      const sections = await executeQuery<any>(
        'SELECT id FROM content_detailed_sections WHERE content_id = ?', [id]
      );
      for (const sec of sections) {
        await executeQuery('DELETE FROM section_progress_data WHERE section_id = ?', [sec.id]);
        await executeQuery('DELETE FROM section_extra_data WHERE section_id = ?', [sec.id]);
        await executeQuery('DELETE FROM section_faq_data WHERE section_id = ?', [sec.id]);
      }
      await executeQuery('DELETE FROM content_detailed_sections WHERE content_id = ?', [id]);
      await executeQuery('DELETE FROM content_detail_images WHERE content_id = ?', [id]);
      await executeQuery('DELETE FROM contents WHERE id = ?', [id]);
      console.log(`✅ Deleted ${id}`);
    }

    // ── s_proj1 제목 & deadline 수정 ───────────────────────
    await executeQuery(
      `UPDATE contents SET title = ?, deadline = ? WHERE id = ?`,
      [
        '[프로젝트] 희생을 잇는 힘 : 독립 후손 캠페인',
        '진행완료',
        's_proj1'
      ]
    );
    console.log('✅ Updated s_proj1 title & deadline');

    // ── s_proj1 기존 섹션 삭제 후 진행기간 섹션 추가 ────────
    // 기존 섹션들 sort_order 확인
    const existingSections = await executeQuery<any>(
      'SELECT id, sort_order FROM content_detailed_sections WHERE content_id = ? ORDER BY sort_order DESC LIMIT 1',
      ['s_proj1']
    );

    const lastOrder = existingSections.length > 0 ? existingSections[0].sort_order : 0;

    // 진행기간 섹션 추가 (맨 앞에 highlight로)
    // 먼저 기존 섹션들 sort_order 밀기
    await executeQuery(
      'UPDATE content_detailed_sections SET sort_order = sort_order + 1 WHERE content_id = ?',
      ['s_proj1']
    );

    // 맨 앞에 진행 기간 섹션 삽입
    await executeQuery(`
      INSERT INTO content_detailed_sections (content_id, type, subtitle, body, icon_class, sort_order)
      VALUES (?, ?, ?, ?, ?, ?)
    `, [
      's_proj1',
      'highlight',
      '✅ 진행 완료 | 2026년 2월 1일 ~ 3월 31일',
      '본 프로젝트는 2026년 2월 1일부터 3월 31일까지 활동을 진행하였으며, 성공적으로 마무리되었습니다. 독립운동가 후손들을 기억하고 연대해주신 모든 분들께 깊이 감사드립니다.',
      'fa-solid fa-circle-check text-green-500',
      1
    ]);

    console.log('✅ Added period section to s_proj1');
    console.log('🎉 All done!');
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await closeConnection();
    process.exit();
  }
}

updateSisoProjects();
