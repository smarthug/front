import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import {
  getPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
  incrementPostViews,
  votePost,
  getHotPosts,
} from '../api/posts'

/**
 * Cache key strategies:
 * - ['posts'] - all posts
 * - ['posts', { gallery: slug }] - posts filtered by gallery
 * - ['posts', id] - single post detail
 * - ['posts', 'hot'] - hot/trending posts
 */

/**
 * Hook to fetch posts (with optional filters)
 * @param {Object} params
 * @param {string} [params.gallery] - gallery slug
 * @param {string} [params.ordering] - ordering field
 */
export const usePosts = (params = {}) => {
  return useQuery({
    queryKey: ['posts', params],
    queryFn: () => getPosts(params),
    staleTime: 1 * 60 * 1000, // 1 minute
  })
}

/**
 * Hook to fetch single post
 * @param {number} id
 */
export const usePost = (id) => {
  return useQuery({
    queryKey: ['posts', id],
    queryFn: () => getPost(id),
    enabled: !!id,
    staleTime: 1 * 60 * 1000,
  })
}

/**
 * Hook to fetch hot posts
 */
export const useHotPosts = () => {
  return useQuery({
    queryKey: ['posts', 'hot'],
    queryFn: getHotPosts,
    staleTime: 2 * 60 * 1000, // 2 minutes
  })
}

/**
 * Hook to create a post
 */
export const useCreatePost = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createPost,
    onSuccess: (newPost) => {
      // Invalidate all post lists
      queryClient.invalidateQueries({ queryKey: ['posts'] })
      // Set the new post in cache
      queryClient.setQueryData(['posts', newPost.id], newPost)
    },
  })
}

/**
 * Hook to update a post
 */
export const useUpdatePost = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }) => updatePost(id, data),
    onSuccess: (updatedPost) => {
      queryClient.invalidateQueries({ queryKey: ['posts'] })
      queryClient.setQueryData(['posts', updatedPost.id], updatedPost)
    },
  })
}

/**
 * Hook to delete a post
 */
export const useDeletePost = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deletePost,
    onSuccess: (_, deletedId) => {
      queryClient.invalidateQueries({ queryKey: ['posts'] })
      queryClient.removeQueries({ queryKey: ['posts', deletedId] })
    },
  })
}

/**
 * Hook to increment post views
 */
export const useIncrementPostViews = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: incrementPostViews,
    onSuccess: (data, postId) => {
      // Optimistically update the post's view count
      queryClient.setQueryData(['posts', postId], (old) => {
        if (!old) return old
        return { ...old, views: data.views }
      })
    },
  })
}

/**
 * Hook to vote on a post
 * Implements optimistic updates with rollback on error
 */
export const useVotePost = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ postId, value }) => votePost(postId, { value }),
    onMutate: async ({ postId, value }) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey: ['posts', postId] })

      // Snapshot the previous value
      const previousPost = queryClient.getQueryData(['posts', postId])

      // Optimistically update to the new value
      queryClient.setQueryData(['posts', postId], (old) => {
        if (!old) return old
        return { ...old, recommend: old.recommend + value }
      })

      // Return context with the previous value
      return { previousPost, postId }
    },
    onError: (err, variables, context) => {
      // Rollback on error
      if (context?.previousPost) {
        queryClient.setQueryData(['posts', context.postId], context.previousPost)
      }
    },
    onSuccess: (data, { postId }) => {
      // Update with server response
      queryClient.setQueryData(['posts', postId], (old) => {
        if (!old) return old
        return { ...old, recommend: data.recommend }
      })
    },
  })
}
