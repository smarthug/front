import { useState } from 'react'
import { useComments, useCreateComment, useVoteComment, useDeleteComment } from '../../hooks/useComments'
import { useAuthStore } from '../../store/authStore'
import { Button } from '../ui/Button'
import { Textarea } from '../ui/Textarea'
import { Input } from '../ui/Input'
import { Skeleton } from '../ui/Skeleton'

/**
 * Comment item component
 */
const CommentItem = ({ comment, postId, onReply }) => {
  const { user, isAuthenticated } = useAuthStore()
  const voteComment = useVoteComment()
  const deleteComment = useDeleteComment()

  const handleVote = (value) => {
    if (!isAuthenticated()) {
      alert('로그인이 필요합니다.')
      return
    }
    voteComment.mutate({ commentId: comment.id, value, postId })
  }

  const handleDelete = () => {
    if (confirm('댓글을 삭제하시겠습니까?')) {
      deleteComment.mutate(comment.id)
    }
  }

  const canDelete = user && (user.id === comment.author || user.is_staff)

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleString('ko-KR')
  }

  return (
    <div className="py-3 border-b last:border-b-0">
      <div className="flex items-start gap-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-medium text-sm">
              {comment.author_username || comment.nickname || '익명'}
            </span>
            <span className="text-xs text-gray-400">
              {formatDate(comment.created_at)}
            </span>
          </div>
          <p className="text-sm text-gray-700 mb-2">{comment.content}</p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleVote(1)}
              className="text-xs text-gray-500 hover:text-blue-600"
            >
              ▲ 추천
            </button>
            <span className="text-xs text-gray-500">{comment.recommend}</span>
            <button
              onClick={() => handleVote(-1)}
              className="text-xs text-gray-500 hover:text-red-600"
            >
              ▼ 비추천
            </button>
            <button
              onClick={() => onReply(comment.id)}
              className="text-xs text-blue-600 hover:underline ml-2"
            >
              답글
            </button>
            {canDelete && (
              <button
                onClick={handleDelete}
                className="text-xs text-red-600 hover:underline ml-2"
              >
                삭제
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

/**
 * Comment form component
 */
const CommentForm = ({ postId, parentId = null, onSuccess }) => {
  const [content, setContent] = useState('')
  const [nickname, setNickname] = useState('')
  const { isAuthenticated } = useAuthStore()
  const createComment = useCreateComment()

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!content.trim()) {
      alert('댓글 내용을 입력해주세요.')
      return
    }

    if (!isAuthenticated() && !nickname.trim()) {
      alert('닉네임을 입력해주세요.')
      return
    }

    const commentData = {
      post: postId,
      content: content.trim(),
      ...(parentId && { parent: parentId }),
      ...(!isAuthenticated() && { nickname: nickname.trim() }),
    }

    createComment.mutate(commentData, {
      onSuccess: () => {
        setContent('')
        setNickname('')
        if (onSuccess) onSuccess()
      },
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      {!isAuthenticated() && (
        <Input
          placeholder="닉네임"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          required
        />
      )}
      <Textarea
        placeholder="댓글을 입력하세요"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows={3}
        required
      />
      <Button type="submit" disabled={createComment.isPending}>
        {createComment.isPending ? '작성 중...' : '댓글 작성'}
      </Button>
    </form>
  )
}

/**
 * Comment list component
 * @param {Object} props
 * @param {number} props.postId
 */
export const CommentList = ({ postId }) => {
  const { data, isLoading } = useComments(postId)
  console.log(data)
  const comments = data?.results
  console.log(comments)

  const [replyingTo, setReplyingTo] = useState(null)

  if (isLoading) {
    return (
      <div className="space-y-3">
        <Skeleton className="h-20 w-full" />
        <Skeleton className="h-20 w-full" />
        <Skeleton className="h-20 w-full" />
      </div>
    )
  }

  // Build comment tree (parent and replies)
  const commentTree = comments?.reduce((acc, comment) => {
    if (!comment.parent) {
      acc.push({ ...comment, replies: [] })
    }
    return acc
  }, []) || []

  // Add replies to parents
  comments?.forEach((comment) => {
    if (comment.parent) {
      const parent = commentTree.find((c) => c.id === comment.parent)
      if (parent) {
        parent.replies.push(comment)
      }
    }
  })

  return (
    <div className="space-y-6">
      <div className="border rounded-lg p-4 bg-white">
        <h3 className="font-semibold mb-4">
          댓글 {comments?.length || 0}개
        </h3>
        <CommentForm postId={postId} />
      </div>

      <div className="border rounded-lg bg-white">
        {commentTree.length === 0 ? (
          <p className="text-center text-gray-500 py-8">
            첫 댓글을 작성해보세요!
          </p>
        ) : (
          <div className="divide-y">
            {commentTree.map((comment) => (
              <div key={comment.id} className="p-4">
                <CommentItem
                  comment={comment}
                  postId={postId}
                  onReply={setReplyingTo}
                />
                {replyingTo === comment.id && (
                  <div className="mt-3 ml-6 p-3 bg-gray-50 rounded">
                    <CommentForm
                      postId={postId}
                      parentId={comment.id}
                      onSuccess={() => setReplyingTo(null)}
                    />
                  </div>
                )}
                {comment.replies?.length > 0 && (
                  <div className="ml-6 mt-2 space-y-2 border-l-2 border-gray-200 pl-4">
                    {comment.replies.map((reply) => (
                      <CommentItem
                        key={reply.id}
                        comment={reply}
                        postId={postId}
                        onReply={() => {}}
                      />
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
