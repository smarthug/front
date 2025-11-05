import apiClient from './client'

/**
 * Comment API endpoints
 */

/**
 * Get comments for a post
 * @param {number} postId
 * @returns {Promise<import('../types').Comment[]>}
 */
export const getComments = async (postId) => {
  const { data } = await apiClient.get('/comments/', {
    params: { post: postId },
  })
  return data
}

/**
 * Get single comment by ID
 * @param {number} id
 * @returns {Promise<import('../types').Comment>}
 */
export const getComment = async (id) => {
  const { data } = await apiClient.get(`/comments/${id}/`)
  return data
}

/**
 * Create a new comment
 * @param {import('../types').CreateCommentRequest} commentData
 * @returns {Promise<import('../types').Comment>}
 */
export const createComment = async (commentData) => {
  const { data } = await apiClient.post('/comments/', commentData)
  return data
}

/**
 * Update a comment
 * @param {number} id
 * @param {Partial<import('../types').CreateCommentRequest>} commentData
 * @returns {Promise<import('../types').Comment>}
 */
export const updateComment = async (id, commentData) => {
  const { data } = await apiClient.patch(`/comments/${id}/`, commentData)
  return data
}

/**
 * Delete a comment
 * @param {number} id
 * @returns {Promise<void>}
 */
export const deleteComment = async (id) => {
  await apiClient.delete(`/comments/${id}/`)
}

/**
 * Vote on a comment
 * @param {number} id
 * @param {import('../types').VoteRequest} voteData
 * @returns {Promise<{recommend: number}>}
 */
export const voteComment = async (id, voteData) => {
  const { data } = await apiClient.post(`/comments/${id}/vote/`, voteData)
  return data
}
