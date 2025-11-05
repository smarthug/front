import { useState } from 'react'
import {
  useComments,
  useCreateComment,
  useVoteComment,
  useDeleteComment,
} from '../../hooks/useComments'
import { useAuthStore } from '../../store/authStore'
import { Button } from '../ui/Button'
import { Textarea } from '../ui/Textarea'
import { Input } from '../ui/Input'
import { Skeleton } from '../ui/Skeleton'

const formatTimestamp = (value) => {
  const date = new Date(value)
  return date.toLocaleString('ko-KR', {
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  })
}

const CommentActions = ({ comment, postId, onReply }) => {
  const { user, isAuthenticated } = useAuthStore()
  const voteComment = useVoteComment()
  const deleteComment = useDeleteComment()

  const canDelete = user && (user.id === comment.author || user.is_staff)

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

  return (
    <div className="mt-2 flex items-center gap-1.5 text-xs text-dc-gray-500">
      <button
        type="button"
        onClick={() => handleVote(1)}
        className="rounded border border-dc-bg-divider px-2 py-0.5 hover:border-dc-blue-500 hover:text-dc-blue-500"
      >
        추천 {comment.recommend > 0 ? comment.recommend : ''}
      </button>
      <button
        type="button"
        onClick={() => handleVote(-1)}
        className="rounded border border-dc-bg-divider px-2 py-0.5 hover:border-dc-red-500 hover:text-dc-red-500"
      >
        비추천
      </button>
      <span className="text-dc-gray-300">|</span>
      <button
        type="button"
        onClick={() => onReply(comment.id)}
        className="px-2 py-0.5 hover:text-dc-blue-600"
      >
        답글
      </button>
      {canDelete && (
        <>
          <span className="text-dc-gray-300">|</span>
          <button
            type="button"
            onClick={handleDelete}
            className="px-2 py-0.5 hover:text-dc-red-500"
          >
            삭제
          </button>
        </>
      )}
    </div>
  )
}

const CommentItem = ({ comment, postId, onReply }) => {
  const nickname = comment.author_username || comment.nickname || '익명'

  return (
    <div className="px-4 py-3">
      <div className="flex flex-col gap-1">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm font-semibold text-dc-gray-700">
            {nickname}
          </span>
          <span className="text-xs text-dc-gray-400">
            {formatTimestamp(comment.created_at)}
          </span>
        </div>
        <p className="whitespace-pre-wrap text-sm leading-relaxed text-dc-gray-700">
          {comment.content}
        </p>
        <CommentActions comment={comment} postId={postId} onReply={onReply} />
      </div>
    </div>
  )
}

const CommentForm = ({ postId, parentId, onSuccess }) => {
  const [content, setContent] = useState('')
  const [nickname, setNickname] = useState('')
  const { isAuthenticated } = useAuthStore()
  const createComment = useCreateComment()

  const handleSubmit = (event) => {
    event.preventDefault()

    if (!content.trim()) {
      alert('댓글 내용을 입력해주세요.')
      return
    }

    if (!isAuthenticated() && !nickname.trim()) {
      alert('닉네임을 입력해주세요.')
      return
    }

    const payload = {
      post: postId,
      content: content.trim(),
      ...(parentId && { parent: parentId }),
      ...(!isAuthenticated() && { nickname: nickname.trim() }),
    }

    createComment.mutate(payload, {
      onSuccess: () => {
        setContent('')
        setNickname('')
        onSuccess?.()
      },
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      {!isAuthenticated() && (
        <Input
          placeholder="닉네임"
          value={nickname}
          onChange={(event) => setNickname(event.target.value)}
          required
        />
      )}
      <Textarea
        placeholder="댓글을 입력해주세요."
        value={content}
        onChange={(event) => setContent(event.target.value)}
        rows={3}
        required
      />
      <Button type="submit" disabled={createComment.isPending}>
        {createComment.isPending ? '작성 중…' : '댓글 작성'}
      </Button>
    </form>
  )
}

export const CommentList = ({ postId }) => {
  const { data, isLoading } = useComments(postId)
  const comments = data?.results || []
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

  const tree = comments.reduce((list, current) => {
    if (!current.parent) {
      list.push({ ...current, replies: [] })
    }
    return list
  }, [])

  comments.forEach((comment) => {
    if (comment.parent) {
      const parent = tree.find((item) => item.id === comment.parent)
      if (parent) {
        parent.replies.push(comment)
      }
    }
  })

  return (
    <div className="space-y-4">
      <div className="rounded border border-dc-bg-divider bg-white">
        <div className="border-b border-dc-bg-divider bg-dc-bg-hover px-4 py-3">
          <h3 className="text-sm font-semibold text-dc-gray-800">
            댓글 {comments.length}개
          </h3>
        </div>
        <div className="px-4 py-4">
          <CommentForm postId={postId} />
        </div>
      </div>

      <div className="overflow-hidden rounded border border-dc-bg-divider bg-white">
        {tree.length === 0 ? (
          <p className="py-10 text-center text-sm text-dc-gray-500">
            첫 댓글을 작성해보세요!
          </p>
        ) : (
          <div className="divide-y divide-dc-bg-divider">
            {tree.map((comment) => (
              <div key={comment.id}>
                <CommentItem
                  comment={comment}
                  postId={postId}
                  onReply={setReplyingTo}
                />
                {replyingTo === comment.id && (
                  <div className="ml-8 mr-4 rounded border border-dc-bg-divider bg-dc-bg-hover px-3 py-3">
                    <CommentForm
                      postId={postId}
                      parentId={comment.id}
                      onSuccess={() => setReplyingTo(null)}
                    />
                  </div>
                )}
                {comment.replies?.length > 0 && (
                  <div className="ml-6 border-l-2 border-dc-bg-divider bg-dc-bg-hover">
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
