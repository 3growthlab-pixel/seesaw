import { ContentItem, Category } from '../types';

const API_BASE_URL = '';

export class ApiService {
  // Get all regions
  static async getRegions(): Promise<string[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/regions`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Failed to fetch regions:', error);
      throw error;
    }
  }

  // Get all MBTI types
  static async getMbtiTypes(): Promise<string[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/mbti-types`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Failed to fetch MBTI types:', error);
      throw error;
    }
  }

  // Get all contents
  static async getAllContents(): Promise<ContentItem[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/contents`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Failed to fetch contents:', error);
      throw error;
    }
  }

  // Get contents by category
  static async getContentsByCategory(category: Category): Promise<ContentItem[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/contents?category=${encodeURIComponent(category)}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Failed to fetch contents by category:', error);
      throw error;
    }
  }

  // Get content by ID
  static async getContentById(id: string): Promise<ContentItem | null> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/contents/${encodeURIComponent(id)}`);
      if (response.status === 404) {
        return null;
      }
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Failed to fetch content by ID:', error);
      throw error;
    }
  }
}