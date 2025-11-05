import apiClient from './client'

/**
 * Gallery API endpoints
 */

/**
 * Get all galleries
 * @returns {Promise<import('../types').Gallery[]>}
 */
export const getGalleries = async () => {
  const { data } = await apiClient.get('/galleries/')
  return data
}

/**
 * Get single gallery by slug
 * @param {string} slug
 * @returns {Promise<import('../types').Gallery>}
 */
export const getGallery = async (slug) => {
  const { data } = await apiClient.get(`/galleries/${slug}/`)
  return data
}

/**
 * Create a new gallery (admin only)
 * @param {Partial<import('../types').Gallery>} galleryData
 * @returns {Promise<import('../types').Gallery>}
 */
export const createGallery = async (galleryData) => {
  const { data } = await apiClient.post('/galleries/', galleryData)
  return data
}
