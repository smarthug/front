import { Link } from 'react-router-dom'
import { Card, CardContent } from '../ui/Card'
import { Badge } from '../ui/Badge'

/**
 * Post card component for list views
 * @param {Object} props
 * @param {import('../../types').Post} props.post
 */
export const PostCard = ({ post }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const now = new Date()
    const diff = now - date
    const minutes = Math.floor(diff / 60000)
    const hours = Math.floor(diff / 3600000)
    const days = Math.floor(diff / 86400000)

    if (minutes < 1) return '방금 전'
    if (minutes < 60) return `${minutes}분 전`
    if (hours < 24) return `${hours}시간 전`
    if (days < 7) return `${days}일 전`
    return date.toLocaleDateString('ko-KR')
  }

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <Link to={`/g/${post.gallery}/${post.id}`}>
          <div className="flex items-start gap-3">
            {post.image && (
              <img
                src={post.image}
                alt={post.title}
                className="w-16 h-16 object-cover rounded"
              />
            )}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                {post.is_notice && (
                  <Badge variant="danger">공지</Badge>
                )}
                <h3 className="font-medium text-gray-900 truncate">
                  {post.title}
                </h3>
              </div>
              <p className="text-sm text-gray-500 line-clamp-2 mb-2">
                {post.content}
              </p>
              <div className="flex items-center gap-3 text-xs text-gray-400">
                <span>
                  {post.author_username || post.nickname || '익명'}
                </span>
                <span>{formatDate(post.created_at)}</span>
                <span>조회 {post.views}</span>
                <span className={post.recommend > 0 ? 'text-blue-600 font-medium' : ''}>
                  추천 {post.recommend}
                </span>
              </div>
            </div>
          </div>
        </Link>
      </CardContent>
    </Card>
  )
}
