import { useHotPosts } from '../hooks/usePosts'
import { PostCard } from '../components/common/PostCard'
import { Skeleton } from '../components/ui/Skeleton'

/**
 * Hot feed page - shows trending/popular posts
 */
export const HotFeedPage = () => {
  const { data: posts, isLoading, error } = useHotPosts()

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">🔥 핫게시물</h1>
        <div className="space-y-3">
          {[1, 2, 3, 4, 5].map((i) => (
            <Skeleton key={i} className="h-24" />
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-red-600">
          핫게시물을 불러오는데 실패했습니다.
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">🔥 핫게시물</h1>
        <p className="text-gray-600">
          최근 48시간 내 인기 게시물
        </p>
      </div>

      {posts?.length === 0 ? (
        <div className="text-center py-12 border rounded-lg bg-gray-50">
          <p className="text-gray-500">아직 핫게시물이 없습니다.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {posts?.map((post, index) => (
            <div key={post.id} className="flex gap-3">
              <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-blue-600 text-white font-bold rounded">
                {index + 1}
              </div>
              <div className="flex-1">
                <PostCard post={post} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
