import { Link } from 'react-router-dom'
import { Badge } from '../ui/Badge'

/**
 * Post card component - Mobile DCInside table row style
 * @param {Object} props
 * @param {import('../../types').Post} props.post
 * @param {number} props.index - Post index for numbering
 */
export const PostCard = ({ post, index }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    const hours = String(date.getHours()).padStart(2, '0')
    const minutes = String(date.getMinutes()).padStart(2, '0')
    return `${month}.${day} ${hours}:${minutes}`
  }

  return (
    <Link to={`/g/${post.gallery}/${post.id}`} className="block">
      <div className="flex items-center border-b border-dc-gray-200 hover:bg-dc-bg-hover transition-colors text-sm">
        {/* 번호 */}
        <div className="hidden sm:flex items-center justify-center w-12 py-2.5 text-dc-gray-500 text-xs border-r border-dc-gray-200">
          {post.is_notice ? <Badge variant="danger" className="text-xs px-1.5 py-0">공지</Badge> : index !== undefined ? index : post.id}
        </div>

        {/* 제목 + 이미지 */}
        <div className="flex-1 px-3 py-2.5 min-w-0 flex items-center gap-2">
          {post.image && (
            <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded overflow-hidden border border-dc-gray-200">
              <img
                src={post.image}
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
          )}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5">
              {post.is_notice && (
                <span className="sm:hidden flex-shrink-0 px-1.5 py-0 text-xs font-medium bg-red-50 text-red-700 border border-red-200 rounded">공지</span>
              )}
              <h3 className="font-medium text-dc-gray-800 truncate hover:underline text-sm">
                {post.title}
              </h3>
              {post.recommend > 0 && (
                <span className="flex-shrink-0 text-xs text-dc-blue-600 font-medium">
                  [{post.recommend}]
                </span>
              )}
            </div>
            <div className="sm:hidden flex items-center gap-2 text-xs text-dc-gray-500 mt-0.5">
              <span>{post.author_username || post.nickname || '익명'}</span>
              <span>·</span>
              <span>{formatDate(post.created_at)}</span>
              <span>·</span>
              <span>조회 {post.views}</span>
            </div>
          </div>
        </div>

        {/* 글쓴이 (태블릿 이상) */}
        <div className="hidden md:flex items-center px-3 py-2.5 w-24 text-dc-gray-600 text-xs border-l border-dc-gray-200 truncate">
          {post.author_username || post.nickname || '익명'}
        </div>

        {/* 작성일 (모바일 숨김) */}
        <div className="hidden sm:flex items-center px-3 py-2.5 w-28 text-dc-gray-500 text-xs border-l border-dc-gray-200">
          {formatDate(post.created_at)}
        </div>

        {/* 조회 (태블릿 이상) */}
        <div className="hidden md:flex items-center justify-center px-3 py-2.5 w-16 text-dc-gray-500 text-xs border-l border-dc-gray-200">
          {post.views}
        </div>
      </div>
    </Link>
  )
}
