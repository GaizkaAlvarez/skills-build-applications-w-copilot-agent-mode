"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllowedOrigin = exports.getApiUrl = void 0;
/**
 * Get the API URL based on the environment
 * For Codespaces: https://CODESPACE_NAME-8000.app.github.dev
 * For localhost: http://localhost:8000
 */
const getApiUrl = (port = 8000) => {
    if (process.env.CODESPACE_NAME) {
        return `https://${process.env.CODESPACE_NAME}-${port}.app.github.dev`;
    }
    return `http://localhost:${port}`;
};
exports.getApiUrl = getApiUrl;
/**
 * Get the allowed origin for CORS
 */
const getAllowedOrigin = () => {
    if (process.env.CODESPACE_NAME) {
        return `https://${process.env.CODESPACE_NAME}-5173.app.github.dev`;
    }
    return 'http://localhost:5173';
};
exports.getAllowedOrigin = getAllowedOrigin;
