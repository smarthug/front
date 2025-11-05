// API Response Types

/**
 * @typedef {Object} Gallery
 * @property {number} id
 * @property {string} slug
 * @property {string} title
 * @property {string} [description]
 * @property {boolean} is_anonymous
 * @property {boolean} allow_images
 * @property {string} created_at
 * @property {string} updated_at
 */

/**
 * @typedef {Object} Post
 * @property {number} id
 * @property {string} gallery - gallery slug
 * @property {string} title
 * @property {string} content
 * @property {number|null} author - author user id
 * @property {string|null} author_username
 * @property {string|null} nickname - for anonymous posts
 * @property {string|null} image
 * @property {number} recommend
 * @property {number} views
 * @property {string} created_at
 * @property {string} updated_at
 * @property {boolean} is_notice
 */

/**
 * @typedef {Object} Comment
 * @property {number} id
 * @property {number} post - post id
 * @property {number|null} author - author user id
 * @property {string|null} author_username
 * @property {string|null} nickname - for anonymous comments
 * @property {string} content
 * @property {number|null} parent - parent comment id
 * @property {number} recommend
 * @property {string} created_at
 * @property {string} updated_at
 */

/**
 * @typedef {Object} User
 * @property {number} id
 * @property {string} username
 * @property {string} email
 * @property {string} [nickname]
 */

/**
 * @typedef {Object} AuthTokens
 * @property {string} access
 * @property {string} refresh
 */

/**
 * @typedef {Object} LoginRequest
 * @property {string} username
 * @property {string} password
 */

/**
 * @typedef {Object} RegisterRequest
 * @property {string} username
 * @property {string} email
 * @property {string} password
 */

/**
 * @typedef {Object} CreatePostRequest
 * @property {string} gallery - gallery slug
 * @property {string} title
 * @property {string} content
 * @property {string} [nickname] - required for anonymous posts
 * @property {File} [image]
 */

/**
 * @typedef {Object} CreateCommentRequest
 * @property {number} post - post id
 * @property {string} content
 * @property {string} [nickname] - required for anonymous comments
 * @property {number} [parent] - parent comment id for replies
 */

/**
 * @typedef {Object} VoteRequest
 * @property {1|-1} value - 1 for upvote, -1 for downvote
 */

export {}
