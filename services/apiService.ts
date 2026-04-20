import { ContentItem, Category } from '../types';
import data from '../data.json';

export class ApiService {
  static async getRegions(): Promise<string[]> {
    return data.REGIONS;
  }

  static async getMbtiTypes(): Promise<string[]> {
    return data.MBTI_TYPES;
  }

  static async getAllContents(): Promise<ContentItem[]> {
    return data.MOCK_CONTENTS as ContentItem[];
  }

  static async getContentsByCategory(category: Category): Promise<ContentItem[]> {
    return (data.MOCK_CONTENTS as ContentItem[]).filter(c => c.category === category);
  }

  static async getContentById(id: string): Promise<ContentItem | null> {
    return (data.MOCK_CONTENTS as ContentItem[]).find(c => c.id === id) ?? null;
  }
}
