/**
 * Get the API URL based on the environment
 * For Codespaces: https://CODESPACE_NAME-8000.app.github.dev
 * For localhost: http://localhost:8000
 */
export const getApiUrl = (port: number = 8000): string => {
  if (process.env.CODESPACE_NAME) {
    return `https://${process.env.CODESPACE_NAME}-${port}.app.github.dev`;
  }
  return `http://localhost:${port}`;
};

/**
 * Get the allowed origin for CORS
 */
export const getAllowedOrigin = (): string => {
  if (process.env.CODESPACE_NAME) {
    return `https://${process.env.CODESPACE_NAME}-5173.app.github.dev`;
  }
  return 'http://localhost:5173';
};
