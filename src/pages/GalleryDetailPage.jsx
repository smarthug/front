import { Link, useParams } from 'react-router-dom'
import { useGallery } from '../hooks/useGalleries'
import { usePosts } from '../hooks/usePosts'
import { PostCard } from '../components/common/PostCard'
import { Button } from '../components/ui/Button'
import { Skeleton } from '../components/ui/Skeleton'

const BOARD_TABS = [
  { id: 'all', label: '전체' },
  { id: 'best', label: '개념글' },
  { id: 'notice', label: '공지' },
  { id: 'media', label: '30개 ▼' },
]

const GalleryHeader = ({ gallery, slug }) => {
  return (
    <div className="rounded border border-dc-bg-divider bg-white shadow-dc-card">
      <div className="flex flex-col gap-4 px-5 py-5">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h1 className="flex items-center gap-2 text-xl font-bold text-dc-navy-800">
              {gallery.title}
              <span className="text-xs font-medium text-dc-gray-500">
                ({gallery.slug})
              </span>
            </h1>
            {gallery.description ? (
              <p className="text-sm text-dc-gray-600">{gallery.description}</p>
            ) : (
              <p className="text-sm text-dc-gray-500">
                갤러리 소개 문구가 없습니다.
              </p>
            )}
          </div>
          <div className="flex items-center gap-2 text-xs text-dc-gray-500">
            <button
              type="button"
              className="rounded border border-dc-bg-divider px-2 py-1 hover:bg-dc-bg-hover"
            >
              설정
            </button>
            <button
              type="button"
              className="rounded border border-dc-bg-divider px-2 py-1 hover:bg-dc-bg-hover"
            >
              연관
            </button>
            <Link to={`/g/${slug}/write`}>
              <Button size="sm" className="px-4">
                글쓰기
              </Button>
            </Link>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 rounded border border-dc-bg-divider bg-dc-bg-hover px-4 py-3 text-xs text-dc-gray-600">
          <span className="dc-chip">유의사항</span>
          <span>익명 글쓰기가 {gallery.is_anonymous ? '가능' : '불가능'}합니다.</span>
          <span>/</span>
          <span>이미지 첨부 {gallery.allow_images ? '가능' : '불가'}</span>
          <span className="ml-auto text-dc-gray-400">즐겨찾기 추가 +</span>
        </div>
      </div>
    </div>
  )
}

export const GalleryDetailPage = () => {
  const { slug } = useParams()
  const {
    data: gallery,
    isLoading: galleryLoading,
    isError: galleryError,
  } = useGallery(slug)
  const {
    data: postData,
    isLoading: postsLoading,
    isError: postsError,
  } = usePosts({ gallery: slug })

  const posts = postData?.results || []

  if (galleryLoading) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-6">
        <Skeleton className="mb-4 h-28 w-full" />
        <Skeleton className="h-64 w-full" />
      </div>
    )
  }

  if (galleryError || !gallery) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-6">
        <div className="rounded border border-red-200 bg-red-50 p-6 text-center text-red-600">
          갤러리를 찾을 수 없습니다.
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-6 space-y-4">
      <GalleryHeader gallery={gallery} slug={slug} />

      <div className="rounded border border-dc-bg-divider bg-white px-4 py-3 text-xs text-dc-gray-500 shadow-inner">
        <span className="mr-2 rounded bg-dc-bg-hover px-2 py-1 text-[11px] font-semibold text-dc-gray-600">
          AD
        </span>
        <span>스폰서 배너 영역입니다.</span>
      </div>

      <div className="rounded border border-dc-bg-divider bg-white">
        <div className="grid grid-cols-4 border-b border-dc-bg-divider text-center text-xs font-semibold text-dc-gray-600 sm:hidden">
          {BOARD_TABS.map((tab, index) => (
            <div
              key={tab.id}
              className={`py-2 ${
                index === 0 ? 'dc-tab-active' : 'dc-tab-inactive'
              }`}
            >
              {tab.label}
            </div>
          ))}
        </div>
        <div className="hidden items-center gap-6 border-b border-dc-bg-divider bg-dc-bg-hover px-4 py-3 text-sm font-semibold text-dc-gray-600 sm:flex">
          {BOARD_TABS.map((tab, index) => (
            <button
              key={tab.id}
              type="button"
              className={`px-1 pb-1 ${
                index === 0
                  ? 'dc-tab-active border-b-2 border-dc-yellow-500'
                  : 'dc-tab-inactive'
              }`}
            >
              {tab.label}
            </button>
          ))}
          <div className="ml-auto flex items-center gap-2 text-xs text-dc-gray-500">
            <span>정렬</span>
            <button
              type="button"
              className="rounded border border-dc-bg-divider px-2 py-1 hover:bg-dc-bg-main"
            >
              최신순
            </button>
            <button
              type="button"
              className="rounded border border-dc-bg-divider px-2 py-1 hover:bg-dc-bg-main"
            >
              조회순
            </button>
          </div>
        </div>

        {postsLoading ? (
          <div className="space-y-2 px-4 py-6">
            {[1, 2, 3, 4, 5].map((i) => (
              <Skeleton key={i} className="h-16 w-full" />
            ))}
          </div>
        ) : postsError ? (
          <div className="px-4 py-10 text-center text-sm text-red-500">
            게시글을 불러오는데 실패했습니다.
          </div>
        ) : posts.length === 0 ? (
          <div className="px-4 py-10 text-center text-sm text-dc-gray-500">
            아직 게시글이 없습니다. 첫 글을 작성해 보세요!
          </div>
        ) : (
          <div>
            <div className="hidden bg-dc-bg-hover text-xs font-semibold text-dc-gray-600 sm:grid sm:grid-cols-[70px_auto_140px_100px_70px_70px]">
              <div className="border-r border-dc-bg-divider py-2 text-center">
                번호
              </div>
              <div className="py-2 pl-4">제목</div>
              <div className="border-l border-dc-bg-divider py-2 text-center">
                닉네임
              </div>
              <div className="border-l border-dc-bg-divider py-2 text-center">
                작성일
              </div>
              <div className="border-l border-dc-bg-divider py-2 text-center">
                조회
              </div>
              <div className="border-l border-dc-bg-divider py-2 text-center text-dc-red-500">
                추천
              </div>
            </div>
            {posts.map((post, idx) => (
              <PostCard
                key={post.id}
                post={post}
                index={posts.length - idx}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
