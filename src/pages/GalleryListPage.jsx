import { useGalleries } from '../hooks/useGalleries'
import { Link } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardTitle } from '../components/ui/Card'
import { Skeleton } from '../components/ui/Skeleton'

/**
 * Gallery list page - shows all available galleries
 */
export const GalleryListPage = () => {
  const { data: galleries, isLoading, error } = useGalleries()

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-6">
        <div className="bg-dc-bg-board border border-dc-gray-200 rounded p-4 mb-4">
          <h1 className="text-xl font-bold text-dc-gray-800">갤러리 목록</h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Skeleton key={i} className="h-32" />
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-6">
        <div className="border border-red-200 bg-red-50 rounded p-4 text-center text-red-600">
          갤러리 목록을 불러오는데 실패했습니다.
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="bg-dc-bg-board border border-dc-gray-200 rounded p-4 mb-4">
        <h1 className="text-xl font-bold text-dc-gray-800">갤러리 목록</h1>
        <p className="text-sm text-dc-gray-500 mt-1">관심있는 갤러리를 선택하세요</p>
      </div>

      {galleries?.results?.length === 0 ? (
        <div className="border border-dc-gray-200 bg-dc-bg-board rounded p-12 text-center">
          <p className="text-dc-gray-500">등록된 갤러리가 없습니다.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {galleries?.results?.map((gallery) => (
            <Link key={gallery.id} to={`/g/${gallery.slug}`}>
              <Card className="hover:border-dc-blue-400 hover:shadow-md transition-all h-full">
                <CardContent className="p-4">
                  <CardTitle className="text-base mb-2 text-dc-gray-800">
                    {gallery.title}
                  </CardTitle>
                  <CardDescription className="mb-3 text-sm line-clamp-2">
                    {gallery.description || '갤러리에 대한 설명이 없습니다.'}
                  </CardDescription>
                  <div className="flex gap-2">
                    {gallery.is_anonymous && (
                      <span className="px-2 py-0.5 bg-dc-blue-50 text-dc-blue-600 border border-dc-blue-200 rounded text-xs">
                        익명
                      </span>
                    )}
                    {gallery.allow_images && (
                      <span className="px-2 py-0.5 bg-green-50 text-green-600 border border-green-200 rounded text-xs">
                        이미지
                      </span>
                    )}
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
