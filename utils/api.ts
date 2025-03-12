import { getAccessToken, setAccessToken, clearTokens } from '@/utils/token';

// export const API_BASE_URL = 'http://37.60.231.13:3001/api';
export const API_BASE_URL = 'http://localhost:3001/api';

interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
}

async function refreshToken(): Promise<string | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/admin/refresh`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Token refresh failed');
    }

    const data = await response.json();
    setAccessToken(data.accessToken);
    return data.accessToken;
  } catch (error) {
    console.error('Token refresh failed:', error);
    clearTokens();
    window.location.href = '/organizer/login';
    return null;
  }
}

export const api = {
  get: async <T>(endpoint: string): Promise<ApiResponse<T>> => {
    try {
      const accessToken = getAccessToken();
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return { success: true, data };
    } catch (error) {
      console.error('API Error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'An error occurred'
      };
    }
  },

  post: async <T>(endpoint: string, body: object | null, requiresAuth = true): Promise<ApiResponse<T>> => {
    try {
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': '',
      };

      if (requiresAuth) {
        const accessToken = getAccessToken();
        if (!accessToken) {
          throw new Error('No access token available');
        }
        headers['Authorization'] = `Bearer ${accessToken}`;
      }

      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'POST',
        headers,
        body: JSON.stringify(body),
      });

      // If unauthorized and requires auth, try to refresh token
      if (requiresAuth && response.status === 401) {
        const newToken = await refreshToken();
        if (newToken) {
          // Retry the request with new token
          const retryResponse = await fetch(`${API_BASE_URL}${endpoint}`, {
            method: 'POST',
            headers: {
              ...headers,
              'Authorization': `Bearer ${newToken}`,
            },
            body: JSON.stringify(body),
          });

          if (!retryResponse.ok) {
            throw new Error(`HTTP error! status: ${retryResponse.status}`);
          }

          const data = await retryResponse.json();
          return { success: true, data };
        }
      }

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return { success: true, data };
    } catch (error) {
      console.error('API Error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'An error occurred'
      };
    }
  },

  delete: async <T>(endpoint: string): Promise<ApiResponse<T>> => {
    try {
      const accessToken = getAccessToken();
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return { success: true, data };
    } catch (error) {
      console.error('API Error:', error);
      return { 
        success: false,
        error: error instanceof Error ? error.message : 'An error occurred'
      };
    }
  },
}; 