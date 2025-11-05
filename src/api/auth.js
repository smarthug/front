import apiClient from './client'

/**
 * Authentication API endpoints
 */

/**
 * Login user
 * @param {import('../types').LoginRequest} credentials
 * @returns {Promise<import('../types').AuthTokens>}
 */
export const login = async (credentials) => {
  const { data } = await apiClient.post('/token/', credentials)
  return data
}

/**
 * Register new user
 * @param {import('../types').RegisterRequest} userData
 * @returns {Promise<import('../types').User>}
 */
export const register = async (userData) => {
  const { data } = await apiClient.post('/users/', userData)
  return data
}

/**
 * Get current user profile
 * @returns {Promise<import('../types').User>}
 */
export const getCurrentUser = async () => {
  const { data } = await apiClient.get('/users/me/')
  return data
}

/**
 * Refresh access token
 * @param {string} refreshToken
 * @returns {Promise<{access: string}>}
 */
export const refreshAccessToken = async (refreshToken) => {
  const { data } = await apiClient.post('/token/refresh/', {
    refresh: refreshToken,
  })
  return data
}
