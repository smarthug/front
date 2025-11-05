import { useState } from 'react'
import { useComments, useCreateComment, useVoteComment, useDeleteComment } from '../../hooks/useComments'
import { useAuthStore } from '../../store/authStore'
import { Button } from '../ui/Button'
import { Textarea } from '../ui/Textarea'
import { Input } from '../ui/Input'
import { Skeleton } from '../ui/Skeleton'

/**
 * Comment item component with DCInside-inspired styling
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
    return date.toLocaleString('ko-KR', {
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className="py-2.5 px-3">
      <div className="flex items-start gap-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="font-medium text-sm text-dc-gray-700">
              {comment.author_username || comment.nickname || '익명'}
            </span>
            <span className="text-xs text-dc-gray-400">
              {formatDate(comment.created_at)}
            </span>
          </div>
          <p className="text-sm text-dc-gray-700 mb-2 leading-relaxed">{comment.content}</p>
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => handleVote(1)}
              className="px-2 py-0.5 text-xs bg-dc-bg-hover border border-dc-gray-200 rounded text-dc-gray-600 hover:bg-dc-blue-50 hover:text-dc-blue-600 hover:border-dc-blue-300 transition-colors"
            >
              ▲ {comment.recommend > 0 && comment.recommend}
            </button>
            <button
              onClick={() => handleVote(-1)}
              className="px-2 py-0.5 text-xs bg-dc-bg-hover border border-dc-gray-200 rounded text-dc-gray-600 hover:bg-red-50 hover:text-red-600 hover:border-red-300 transition-colors"
            >
              ▼
            </button>
            <span className="text-dc-gray-300 mx-1">|</span>
            <button
              onClick={() => onReply(comment.id)}
              className="text-xs text-dc-blue-600 hover:underline"
            >
              답글
            </button>
            {canDelete && (
              <>
                <span className="text-dc-gray-300">|</span>
                <button
                  onClick={handleDelete}
                  className="text-xs text-red-600 hover:underline"
                >
                  삭제
                </button>
              </>
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
 * Comment list component with DCInside-inspired styling
 * @param {Object} props
 * @param {number} props.postId
 */
export const CommentList = ({ postId }) => {
  const { data, isLoading } = useComments(postId)
  const comments = data?.results

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
    <div className="space-y-4">
      <div className="border border-dc-gray-200 rounded bg-dc-bg-board">
        <div className="border-b border-dc-gray-200 bg-dc-bg-hover px-4 py-3">
          <h3 className="font-semibold text-sm text-dc-gray-800">
            댓글 {comments?.length || 0}개
          </h3>
        </div>
        <div className="p-4">
          <CommentForm postId={postId} />
        </div>
      </div>

      <div className="border border-dc-gray-200 rounded bg-dc-bg-board overflow-hidden">
        {commentTree.length === 0 ? (
          <p className="text-center text-dc-gray-500 py-8">
            첫 댓글을 작성해보세요!
          </p>
        ) : (
          <div className="divide-y divide-dc-gray-200">
            {commentTree.map((comment) => (
              <div key={comment.id}>
                <CommentItem
                  comment={comment}
                  postId={postId}
                  onReply={setReplyingTo}
                />
                {replyingTo === comment.id && (
                  <div className="ml-8 mr-3 mb-3 p-3 bg-dc-bg-hover border border-dc-blue-200 rounded">
                    <CommentForm
                      postId={postId}
                      parentId={comment.id}
                      onSuccess={() => setReplyingTo(null)}
                    />
                  </div>
                )}
                {comment.replies?.length > 0 && (
                  <div className="ml-8 bg-dc-bg-hover border-l-3 border-l-dc-blue-300">
                    <div className="divide-y divide-dc-gray-200">
                      {comment.replies.map((reply) => (
                        <CommentItem
                          key={reply.id}
                          comment={reply}
                          postId={postId}
                          onReply={() => {}}
                        />
                      ))}
                    </div>
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
