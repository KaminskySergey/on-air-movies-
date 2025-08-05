import { API_KEY, BASIC_URL } from "@/const/server-base-url";

export async function fetcher<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const url = new URL(endpoint, BASIC_URL);
  
    if (!url.searchParams.has('api_key') && API_KEY) {
      url.searchParams.append('api_key', API_KEY);
    }

    if (!url.searchParams.has('language')) {
        url.searchParams.append('language', 'en-US');
      }
  
    try {
      const res = await fetch(url.toString(), options);
  
      if (!res.ok) {
        const errorData = await res.json().catch(() => null);
        const message = errorData?.message || res.statusText || 'Request error';
        throw new Error(message);
      }
  
      const data: T = await res.json();
      return data;
    } catch (error) {
      console.error('Fetch error:', error);
      throw error;
    }
  }