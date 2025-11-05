import { useParams, useNavigate, Link } from 'react-router-dom'
import { useEffect } from 'react'
import { usePost, useVotePost, useDeletePost, useIncrementPostViews } from '../hooks/usePosts'
import { useAuthStore } from '../store/authStore'
import { CommentList } from '../components/common/CommentList'
import { Button } from '../components/ui/Button'
import { Badge } from '../components/ui/Badge'
import { Skeleton } from '../components/ui/Skeleton'
import { Card, CardContent } from '../components/ui/Card'

/**
 * Post detail page - shows full post with comments
 */
export const PostDetailPage = () => {
  const { slug, postId } = useParams()
  const navigate = useNavigate()
  const { data: post, isLoading } = usePost(parseInt(postId))
  const { user, isAuthenticated } = useAuthStore()
  const votePost = useVotePost()
  const deletePost = useDeletePost()
  const incrementViews = useIncrementPostViews()

  // Increment view count on mount
  useEffect(() => {
    if (postId) {
      incrementViews.mutate(parseInt(postId))
    }
  }, [postId])

  const handleVote = (value) => {
    if (!isAuthenticated()) {
      alert('로그인이 필요합니다.')
      return
    }
    votePost.mutate({ postId: parseInt(postId), value })
  }

  const handleDelete = () => {
    if (confirm('게시글을 삭제하시겠습니까?')) {
      deletePost.mutate(parseInt(postId), {
        onSuccess: () => {
          navigate(`/g/${slug}`)
        },
      })
    }
  }

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Skeleton className="h-12 w-3/4 mb-4" />
        <Skeleton className="h-6 w-1/2 mb-6" />
        <Skeleton className="h-64 w-full" />
      </div>
    )
  }

  if (!post) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-red-600">
          게시글을 찾을 수 없습니다.
        </div>
      </div>
    )
  }

  const canEdit = user && user.id === post.author
  const canDelete = user && (user.id === post.author || user.is_staff)

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleString('ko-KR')
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Breadcrumb */}
      <div className="mb-4 text-sm text-gray-500">
        <Link to="/" className="hover:text-blue-600">홈</Link>
        {' > '}
        <Link to={`/g/${slug}`} className="hover:text-blue-600">
          {post.gallery}
        </Link>
        {' > '}
        <span>{post.title}</span>
      </div>

      {/* Post Content */}
      <Card className="mb-6">
        <CardContent className="p-6">
          {/* Title */}
          <div className="mb-4">
            {post.is_notice && (
              <Badge variant="danger" className="mr-2">공지</Badge>
            )}
            <h1 className="text-2xl font-bold inline">{post.title}</h1>
          </div>

          {/* Meta Info */}
          <div className="flex items-center gap-4 text-sm text-gray-500 pb-4 border-b mb-6">
            <span className="font-medium">
              {post.author_username || post.nickname || '익명'}
            </span>
            <span>{formatDate(post.created_at)}</span>
            <span>조회 {post.views}</span>
          </div>

          {/* Image */}
          {post.image && (
            <div className="mb-6">
              <img
                src={post.image}
                alt={post.title}
                className="max-w-full h-auto rounded-lg"
              />
            </div>
          )}

          {/* Content */}
          <div className="prose max-w-none mb-6">
            <p className="whitespace-pre-wrap">{post.content}</p>
          </div>

          {/* Vote Buttons */}
          <div className="flex items-center justify-center gap-4 py-6 border-y">
            <Button
              variant="outline"
              onClick={() => handleVote(1)}
              disabled={!isAuthenticated()}
            >
              ▲ 추천
            </Button>
            <span className="text-lg font-semibold">
              {post.recommend}
            </span>
            <Button
              variant="outline"
              onClick={() => handleVote(-1)}
              disabled={!isAuthenticated()}
            >
              ▼ 비추천
            </Button>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between items-center mt-6">
            <Link to={`/g/${slug}`}>
              <Button variant="outline">목록</Button>
            </Link>
            <div className="flex gap-2">
              {canEdit && (
                <Link to={`/g/${slug}/${postId}/edit`}>
                  <Button variant="secondary">수정</Button>
                </Link>
              )}
              {canDelete && (
                <Button variant="destructive" onClick={handleDelete}>
                  삭제
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Comments */}
      <CommentList postId={parseInt(postId)} />
    </div>
  )
}
