/**
 * API Configuration for OctoFit Tracker
 * 
 * Environment Variables Required:
 * - VITE_CODESPACE_NAME: GitHub Codespaces name (set in .env.local)
 *
 * API URL Resolution:
 * - If VITE_CODESPACE_NAME is set: https://{VITE_CODESPACE_NAME}-8000.app.github.dev
 * - Otherwise (fallback): http://localhost:8000
 */

const getApiBaseUrl = () => {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
  
  // Use Codespaces URL if CODESPACE_NAME is available
  if (codespaceName && codespaceName !== 'undefined' && codespaceName !== '') {
    return `https://${codespaceName}-8000.app.github.dev`;
  }
  
  // Fallback to localhost for local development
  return 'http://localhost:8000';
};

const API_BASE_URL = getApiBaseUrl();

export const API_ENDPOINTS = {
  users: `${API_BASE_URL}/api/users`,
  teams: `${API_BASE_URL}/api/teams`,
  activities: `${API_BASE_URL}/api/activities`,
  workouts: `${API_BASE_URL}/api/workouts`,
  leaderboard: `${API_BASE_URL}/api/leaderboard`,
  health: `${API_BASE_URL}/health`,
};

/**
 * Fetch data from API with error handling
 */
export const fetchFromAPI = async (endpoint) => {
  try {
    const response = await fetch(endpoint);
    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Failed to fetch from ${endpoint}:`, error);
    throw error;
  }
};

/**
 * Post data to API
 */
export const postToAPI = async (endpoint, data) => {
  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Failed to post to ${endpoint}:`, error);
    throw error;
  }
};

/**
 * Update data via API
 */
export const updateAPI = async (endpoint, data) => {
  try {
    const response = await fetch(endpoint, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Failed to update ${endpoint}:`, error);
    throw error;
  }
};

/**
 * Delete data from API
 */
export const deleteFromAPI = async (endpoint) => {
  try {
    const response = await fetch(endpoint, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Failed to delete ${endpoint}:`, error);
    throw error;
  }
};

export default API_ENDPOINTS;
