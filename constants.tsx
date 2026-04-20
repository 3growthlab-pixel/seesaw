
import { Category, ContentItem } from './types';
import { ApiService } from './services/apiService';

// These will be loaded dynamically from the database
let cachedRegions: string[] = [];
let cachedMbtiTypes: string[] = [];
let cachedContents: ContentItem[] = [];

// Initialize data from API
export async function initializeData() {
  try {
    [cachedRegions, cachedMbtiTypes, cachedContents] = await Promise.all([
      ApiService.getRegions(),
      ApiService.getMbtiTypes(),
      ApiService.getAllContents()
    ]);
  } catch (error) {
    console.error('Failed to initialize data:', error);
    // Fallback to empty arrays if API fails
    cachedRegions = [];
    cachedMbtiTypes = [];
    cachedContents = [];
  }
}

// Getter functions for cached data
export function getRegions(): string[] {
  return cachedRegions;
}

export function getMbtiTypes(): string[] {
  return cachedMbtiTypes;
}

export function getAllContents(): ContentItem[] {
  return cachedContents;
}

// For backward compatibility - these will be empty initially until data is loaded
export const REGIONS = cachedRegions;
export const MBTI_TYPES = cachedMbtiTypes;
export const MOCK_CONTENTS = cachedContents;
