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
  console.log(posts)

  if (galleryLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Skeleton className="h-12 w-64 mb-6" />
        <Skeleton className="h-24 w-full mb-6" />
      </div>
    )
  }

  if (!gallery) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-red-600">
          갤러리를 찾을 수 없습니다.
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Gallery Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">{gallery.title}</h1>
            {gallery.description && (
              <p className="text-gray-600">{gallery.description}</p>
            )}
          </div>
          <Link to={`/g/${slug}/write`}>
            <Button>
              글쓰기
            </Button>
          </Link>
        </div>

        <div className="flex gap-2">
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
        <div className="space-y-3">
          {[1, 2, 3, 4, 5].map((i) => (
            <Skeleton key={i} className="h-24" />
          ))}
        </div>
      ) : posts?.results?.length === 0 ? (
        <div className="text-center py-12 border rounded-lg bg-gray-50">
          <p className="text-gray-500 mb-4">아직 게시글이 없습니다.</p>
          <Link to={`/g/${slug}/write`}>
            <Button>첫 게시글 작성하기</Button>
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {posts?.results?.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  )
}
