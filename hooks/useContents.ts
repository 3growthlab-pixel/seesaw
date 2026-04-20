import { useState, useEffect } from 'react';
import { ContentItem, Category } from '../types';
import { ApiService } from '../services/apiService';

// Hook for fetching all contents
export function useContents() {
  const [contents, setContents] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchContents() {
      try {
        setLoading(true);
        const data = await ApiService.getAllContents();
        setContents(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch contents');
        setContents([]);
      } finally {
        setLoading(false);
      }
    }

    fetchContents();
  }, []);

  return { contents, loading, error };
}

// Hook for fetching contents by category
export function useContentsByCategory(category: Category) {
  const [contents, setContents] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchContents() {
      try {
        setLoading(true);
        const data = await ApiService.getContentsByCategory(category);
        setContents(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch contents');
        setContents([]);
      } finally {
        setLoading(false);
      }
    }

    fetchContents();
  }, [category]);

  return { contents, loading, error };
}

// Hook for fetching a single content by ID
export function useContentById(id: string) {
  const [content, setContent] = useState<ContentItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchContent() {
      try {
        setLoading(true);
        const data = await ApiService.getContentById(id);
        setContent(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch content');
        setContent(null);
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      fetchContent();
    }
  }, [id]);

  return { content, loading, error };
}

// Hook for fetching regions
export function useRegions() {
  const [regions, setRegions] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchRegions() {
      try {
        setLoading(true);
        const data = await ApiService.getRegions();
        setRegions(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch regions');
        setRegions([]);
      } finally {
        setLoading(false);
      }
    }

    fetchRegions();
  }, []);

  return { regions, loading, error };
}

// Hook for fetching MBTI types
export function useMbtiTypes() {
  const [mbtiTypes, setMbtiTypes] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchMbtiTypes() {
      try {
        setLoading(true);
        const data = await ApiService.getMbtiTypes();
        setMbtiTypes(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch MBTI types');
        setMbtiTypes([]);
      } finally {
        setLoading(false);
      }
    }

    fetchMbtiTypes();
  }, []);

  return { mbtiTypes, loading, error };
}