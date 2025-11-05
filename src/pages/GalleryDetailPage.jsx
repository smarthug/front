import { useParams, Link } from 'react-router-dom'
import { useGallery } from '../hooks/useGalleries'
import { usePosts } from '../hooks/usePosts'
import { useAuthStore } from '../store/authStore'
import { PostCard } from '../components/common/PostCard'
import { Button } from '../components/ui/Button'
import { Skeleton } from '../components/ui/Skeleton'
import { Badge } from '../components/ui/Badge'

/**
 * Gallery detail page - shows posts in a specific gallery
 */
export const GalleryDetailPage = () => {
  const { slug } = useParams()
  const { data: gallery, isLoading: galleryLoading } = useGallery(slug)
  const { data: posts, isLoading: postsLoading } = usePosts({ gallery: slug })
  const { isAuthenticated } = useAuthStore()

  if (galleryLoading) {
    return (
      <div className="container mx-auto px-4 py-6">
        <Skeleton className="h-24 w-full mb-4" />
        <Skeleton className="h-64 w-full" />
      </div>
    )
  }

  if (!gallery) {
    return (
      <div className="container mx-auto px-4 py-6">
        <div className="border border-red-200 bg-red-50 rounded p-4 text-center text-red-600">
          갤러리를 찾을 수 없습니다.
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Gallery Header */}
      <div className="bg-dc-bg-board border border-dc-gray-200 rounded p-4 mb-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h1 className="text-xl font-bold text-dc-gray-800 mb-1">{gallery.title}</h1>
            {gallery.description && (
              <p className="text-sm text-dc-gray-500">{gallery.description}</p>
            )}
          </div>
          <Link to={`/g/${slug}/write`}>
            <Button size="sm">
              글쓰기
            </Button>
          </Link>
        </div>

        <div className="flex gap-2 pt-2 border-t border-dc-gray-200">
          {gallery.is_anonymous && (
            <Badge variant="default">익명 게시 가능</Badge>
          )}
          {gallery.allow_images && (
            <Badge variant="success">이미지 첨부 가능</Badge>
          )}
        </div>
      </div>

      {/* Posts List */}
      {postsLoading ? (
        <div className="space-y-2">
          {[1, 2, 3, 4, 5].map((i) => (
            <Skeleton key={i} className="h-16" />
          ))}
        </div>
      ) : posts?.results?.length === 0 ? (
        <div className="border border-dc-gray-200 bg-dc-bg-board rounded p-12 text-center">
          <p className="text-dc-gray-500 mb-4">아직 게시글이 없습니다.</p>
          <Link to={`/g/${slug}/write`}>
            <Button>첫 게시글 작성하기</Button>
          </Link>
        </div>
      ) : (
        <div className="border border-dc-gray-200 bg-dc-bg-board rounded overflow-hidden">
          {/* Table Header */}
          <div className="hidden sm:flex items-center bg-dc-bg-hover border-b border-dc-gray-200 text-xs font-medium text-dc-gray-700">
            <div className="w-12 py-2 text-center border-r border-dc-gray-200">번호</div>
            <div className="flex-1 px-3 py-2">제목</div>
            <div className="hidden md:block w-24 px-3 py-2 border-l border-dc-gray-200">글쓴이</div>
            <div className="w-28 px-3 py-2 border-l border-dc-gray-200">작성일</div>
            <div className="hidden md:block w-16 px-3 py-2 text-center border-l border-dc-gray-200">조회</div>
          </div>
          {/* Post Rows */}
          <div>
            {posts?.results?.map((post, idx) => (
              <PostCard key={post.id} post={post} index={posts.results.length - idx} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
