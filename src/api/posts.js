import apiClient from './client'

/**
 * Post API endpoints
 */

/**
 * Get posts (optionally filtered by gallery)
 * @param {Object} params
 * @param {string} [params.gallery] - gallery slug
 * @param {string} [params.ordering] - ordering field
 * @returns {Promise<import('../types').Post[]>}
 */
export const getPosts = async (params = {}) => {
  const { data } = await apiClient.get('/posts/', { params })
  return data
}

/**
 * Get single post by ID
 * @param {number} id
 * @returns {Promise<import('../types').Post>}
 */
export const getPost = async (id) => {
  const { data } = await apiClient.get(`/posts/${id}/`)
  return data
}

/**
 * Create a new post
 * @param {import('../types').CreatePostRequest} postData
 * @returns {Promise<import('../types').Post>}
 */
export const createPost = async (postData) => {
  const formData = new FormData()

  Object.keys(postData).forEach((key) => {
    if (postData[key] !== undefined && postData[key] !== null) {
      formData.append(key, postData[key])
    }
  })

  const { data } = await apiClient.post('/posts/', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
  return data
}

/**
 * Update a post
 * @param {number} id
 * @param {Partial<import('../types').CreatePostRequest>} postData
 * @returns {Promise<import('../types').Post>}
 */
export const updatePost = async (id, postData) => {
  const formData = new FormData()

  Object.keys(postData).forEach((key) => {
    if (postData[key] !== undefined && postData[key] !== null) {
      formData.append(key, postData[key])
    }
  })

  const { data } = await apiClient.patch(`/posts/${id}/`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
  return data
}

/**
 * Delete a post
 * @param {number} id
 * @returns {Promise<void>}
 */
export const deletePost = async (id) => {
  await apiClient.delete(`/posts/${id}/`)
}

/**
 * Increment post view count
 * @param {number} id
 * @returns {Promise<{views: number}>}
 */
export const incrementPostViews = async (id) => {
  const { data } = await apiClient.post(`/posts/${id}/view/`)
  return data
}

/**
 * Vote on a post
 * @param {number} id
 * @param {import('../types').VoteRequest} voteData
 * @returns {Promise<{recommend: number}>}
 */
export const votePost = async (id, voteData) => {
  const { data } = await apiClient.post(`/posts/${id}/vote/`, voteData)
  return data
}

/**
 * Get hot/trending posts
 * @returns {Promise<import('../types').Post[]>}
 */
export const getHotPosts = async () => {
  const { data } = await apiClient.get('/hot-feed/')
  return data
}
