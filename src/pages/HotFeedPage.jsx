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
      <div className="container mx-auto px-4 py-6">
        <div className="bg-dc-bg-board border border-dc-gray-200 rounded p-4 mb-4">
          <h1 className="text-xl font-bold text-dc-gray-800">🔥 핫게시물</h1>
        </div>
        <div className="space-y-2">
          {[1, 2, 3, 4, 5].map((i) => (
            <Skeleton key={i} className="h-16" />
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-6">
        <div className="border border-red-200 bg-red-50 rounded p-4 text-center text-red-600">
          핫게시물을 불러오는데 실패했습니다.
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="bg-dc-bg-board border border-dc-gray-200 rounded p-4 mb-4">
        <h1 className="text-xl font-bold text-dc-gray-800 mb-1">🔥 핫게시물</h1>
        <p className="text-sm text-dc-gray-500">
          최근 48시간 내 인기 게시물
        </p>
      </div>

      {posts?.length === 0 ? (
        <div className="border border-dc-gray-200 bg-dc-bg-board rounded p-12 text-center">
          <p className="text-dc-gray-500">아직 핫게시물이 없습니다.</p>
        </div>
      ) : (
        <div className="border border-dc-gray-200 bg-dc-bg-board rounded overflow-hidden">
          {/* Table Header */}
          <div className="hidden sm:flex items-center bg-dc-bg-hover border-b border-dc-gray-200 text-xs font-medium text-dc-gray-700">
            <div className="w-12 py-2 text-center border-r border-dc-gray-200">순위</div>
            <div className="flex-1 px-3 py-2">제목</div>
            <div className="hidden md:block w-24 px-3 py-2 border-l border-dc-gray-200">글쓴이</div>
            <div className="w-28 px-3 py-2 border-l border-dc-gray-200">작성일</div>
            <div className="hidden md:block w-16 px-3 py-2 text-center border-l border-dc-gray-200">조회</div>
          </div>
          {/* Hot Post Rows */}
          <div>
            {posts?.map((post, index) => (
              <div key={post.id} className="relative">
                <PostCard post={post} index={index + 1} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
