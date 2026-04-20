import { executeQuery } from '../lib/database.js';
import data from '../data.json';

async function insertData() {
  try {
    console.log('Starting data insertion...');

    // 1. Insert regions
    console.log('Inserting regions...');
    for (const region of data.REGIONS) {
      try {
        await executeQuery('INSERT INTO regions (name) VALUES (?)', [region]);
      } catch (error) {
        // Ignore duplicate key errors
        if (!(error as any).message?.includes('Duplicate entry')) {
          throw error;
        }
      }
    }
    console.log(`✅ Inserted ${data.REGIONS.length} regions`);

    // 2. Insert MBTI types
    console.log('Inserting MBTI types...');
    for (const mbtiType of data.MBTI_TYPES) {
      try {
        await executeQuery('INSERT INTO mbti_types (type) VALUES (?)', [mbtiType]);
      } catch (error) {
        // Ignore duplicate key errors
        if (!(error as any).message?.includes('Duplicate entry')) {
          throw error;
        }
      }
    }
    console.log(`✅ Inserted ${data.MBTI_TYPES.length} MBTI types`);

    // 3. Insert contents
    console.log('Inserting contents...');
    for (const content of data.MOCK_CONTENTS) {
      try {
        await executeQuery(`
          INSERT INTO contents (id, title, category, description, image_url, external_link, deadline, tag)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `, [
          content.id,
          content.title,
          content.category,
          content.description,
          content.imageUrl,
          content.externalLink || null,
          content.deadline || null,
          content.tag || null
        ]);
      } catch (error) {
        // Ignore duplicate key errors
        if (!(error as any).message?.includes('Duplicate entry')) {
          throw error;
        }
      }
    }
    console.log(`✅ Inserted ${data.MOCK_CONTENTS.length} contents`);

    // 4. Insert detail images
    console.log('Inserting detail images...');
    let detailImageCount = 0;
    for (const content of data.MOCK_CONTENTS) {
      if (content.detailImages) {
        for (let i = 0; i < content.detailImages.length; i++) {
          try {
            await executeQuery(`
              INSERT INTO content_detail_images (content_id, image_url, sort_order)
              VALUES (?, ?, ?)
            `, [content.id, content.detailImages[i], i + 1]);
            detailImageCount++;
          } catch (error) {
            // Ignore duplicate key errors
            if (!(error as any).message?.includes('Duplicate entry')) {
              throw error;
            }
          }
        }
      }
    }
    console.log(`✅ Inserted ${detailImageCount} detail images`);

    // 5. Insert detailed sections
    console.log('Inserting detailed sections...');
    let sectionCount = 0;
    for (const content of data.MOCK_CONTENTS) {
      if (content.detailedSections) {
        for (let i = 0; i < content.detailedSections.length; i++) {
          const section = content.detailedSections[i];
          try {
            const [result] = await executeQuery(`
              INSERT INTO content_detailed_sections (content_id, type, subtitle, body, icon_class, sort_order)
              VALUES (?, ?, ?, ?, ?, ?)
            `, [
              content.id,
              section.type || 'default',
              section.subtitle || null,
              section.body || null,
              section.iconClass || null,
              i + 1
            ]) as any[];

            const sectionId = result.insertId;
            sectionCount++;

            // Insert progress data if exists
            if (section.progressData) {
              await executeQuery(`
                INSERT INTO section_progress_data (section_id, current_value, target_value, label)
                VALUES (?, ?, ?, ?)
              `, [
                sectionId,
                section.progressData.current,
                section.progressData.target,
                section.progressData.label || null
              ]);
            }

            // Insert extra data if exists
            if (section.extraData && Array.isArray(section.extraData)) {
              for (let j = 0; j < section.extraData.length; j++) {
                await executeQuery(`
                  INSERT INTO section_extra_data (section_id, data_text, sort_order)
                  VALUES (?, ?, ?)
                `, [sectionId, section.extraData[j], j + 1]);
              }
            }

            // Insert FAQ data if exists
            if (section.faqData && Array.isArray(section.faqData)) {
              for (let j = 0; j < section.faqData.length; j++) {
                await executeQuery(`
                  INSERT INTO section_faq_data (section_id, question, answer, sort_order)
                  VALUES (?, ?, ?, ?)
                `, [
                  sectionId,
                  section.faqData[j].question,
                  section.faqData[j].answer,
                  j + 1
                ]);
              }
            }
          } catch (error) {
            // Ignore duplicate key errors
            if (!(error as any).message?.includes('Duplicate entry')) {
              throw error;
            }
          }
        }
      }
    }
    console.log(`✅ Inserted ${sectionCount} detailed sections with related data`);

    console.log('🎉 Data insertion completed successfully!');
  } catch (error) {
    console.error('❌ Error inserting data:', error);
  } finally {
    process.exit();
  }
}

insertData();