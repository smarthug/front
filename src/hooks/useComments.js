import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import {
  getComments,
  getComment,
  createComment,
  updateComment,
  deleteComment,
  voteComment,
} from '../api/comments'

/**
 * Cache key strategies:
 * - ['comments', postId] - all comments for a post
 * - ['comments', 'single', id] - single comment detail
 */

/**
 * Hook to fetch comments for a post
 * @param {number} postId
 */
export const useComments = (postId) => {
  return useQuery({
    queryKey: ['comments', postId],
    queryFn: () => getComments(postId),
    enabled: !!postId,
    staleTime: 30 * 1000, // 30 seconds
  })
}

/**
 * Hook to fetch single comment
 * @param {number} id
 */
export const useComment = (id) => {
  return useQuery({
    queryKey: ['comments', 'single', id],
    queryFn: () => getComment(id),
    enabled: !!id,
  })
}

/**
 * Hook to create a comment
 * Implements optimistic updates
 */
export const useCreateComment = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createComment,
    onMutate: async (newComment) => {
      const postId = newComment.post

      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: ['comments', postId] })

      // Snapshot previous value
      const previousComments = queryClient.getQueryData(['comments', postId])

      // Optimistically add the new comment
      queryClient.setQueryData(['comments', postId], (old) => {
        if (!old) return [{ ...newComment, id: 'temp-' + Date.now(), recommend: 0 }]
        return [...old, { ...newComment, id: 'temp-' + Date.now(), recommend: 0 }]
      })

      return { previousComments, postId }
    },
    onError: (err, variables, context) => {
      // Rollback on error
      if (context?.previousComments) {
        queryClient.setQueryData(['comments', context.postId], context.previousComments)
      }
    },
    onSuccess: (data, variables) => {
      // Replace with server data
      queryClient.invalidateQueries({ queryKey: ['comments', variables.post] })
    },
  })
}

/**
 * Hook to update a comment
 */
export const useUpdateComment = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }) => updateComment(id, data),
    onSuccess: (updatedComment) => {
      queryClient.invalidateQueries({ queryKey: ['comments', updatedComment.post] })
      queryClient.setQueryData(['comments', 'single', updatedComment.id], updatedComment)
    },
  })
}

/**
 * Hook to delete a comment
 */
export const useDeleteComment = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteComment,
    onSuccess: (_, deletedId) => {
      // Invalidate all comment lists (we don't know which post it belongs to)
      queryClient.invalidateQueries({ queryKey: ['comments'] })
      queryClient.removeQueries({ queryKey: ['comments', 'single', deletedId] })
    },
  })
}

/**
 * Hook to vote on a comment
 * Implements optimistic updates with rollback
 */
export const useVoteComment = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ commentId, value }) => voteComment(commentId, { value }),
    onMutate: async ({ commentId, value, postId }) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: ['comments', postId] })

      // Snapshot previous value
      const previousComments = queryClient.getQueryData(['comments', postId])

      // Optimistically update the comment
      queryClient.setQueryData(['comments', postId], (old) => {
        if (!old) return old
        return old.map((comment) =>
          comment.id === commentId
            ? { ...comment, recommend: comment.recommend + value }
            : comment
        )
      })

      return { previousComments, postId, commentId }
    },
    onError: (err, variables, context) => {
      // Rollback on error
      if (context?.previousComments) {
        queryClient.setQueryData(['comments', context.postId], context.previousComments)
      }
    },
    onSuccess: (data, { postId, commentId }) => {
      // Update with server response
      queryClient.setQueryData(['comments', postId], (old) => {
        if (!old) return old
        return old.map((comment) =>
          comment.id === commentId ? { ...comment, recommend: data.recommend } : comment
        )
      })
    },
  })
}
