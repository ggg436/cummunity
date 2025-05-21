// API utilities for making requests to backend

// Base URL for API requests
const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://cummunity.vercel.app' // Update with your Vercel domain
  : 'http://localhost:3000';

// Generic fetch function with error handling
export async function apiRequest(endpoint: string, options: RequestInit = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    // Handle non-JSON responses
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      throw new Error('Invalid response format - expected JSON');
    }

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || 'Something went wrong');
    }
    
    return data;
  } catch (error) {
    console.error(`API request failed: ${endpoint}`, error);
    throw error;
  }
}

// Post-related API functions
export const postsApi = {
  getPosts: () => apiRequest('/api/posts'),
  
  createPost: (postData: { author: string; avatar: string; content: string }) => 
    apiRequest('/api/posts', {
      method: 'POST',
      body: JSON.stringify(postData),
    }),
  
  reactToPost: (id: number, action: 'like' | 'dislike') =>
    apiRequest('/api/posts', {
      method: 'PUT',
      body: JSON.stringify({ id, action }),
    }),
  
  deletePost: (id: number) =>
    apiRequest('/api/posts', {
      method: 'DELETE',
      body: JSON.stringify({ id }),
    }),
}; 