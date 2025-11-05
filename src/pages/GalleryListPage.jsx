import { useGalleries } from '../hooks/useGalleries'
import { Link } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardTitle } from '../components/ui/Card'
import { Skeleton } from '../components/ui/Skeleton'

/**
 * Gallery list page - shows all available galleries
 */
export const GalleryListPage = () => {
  const { data: galleries, isLoading, error } = useGalleries()
  console.log(galleries)

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">갤러리 목록</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Skeleton key={i} className="h-32" />
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-red-600">
          갤러리 목록을 불러오는데 실패했습니다.
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">갤러리 목록</h1>

      {galleries?.results?.length === 0 ? (
        <p className="text-center text-gray-500 py-12">
          등록된 갤러리가 없습니다.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {galleries?.results?.map((gallery) => (
            <Link key={gallery.id} to={`/g/${gallery.slug}`}>
              <Card className="hover:shadow-lg transition-shadow h-full">
                <CardContent className="p-6">
                  <CardTitle className="text-lg mb-2">
                    {gallery.title}
                  </CardTitle>
                  <CardDescription className="mb-3">
                    {gallery.description || '갤러리에 대한 설명이 없습니다.'}
                  </CardDescription>
                  <div className="flex gap-2 text-xs text-gray-500">
                    {gallery.is_anonymous && (
                      <span className="px-2 py-1 bg-blue-50 text-blue-600 rounded">
                        익명
                      </span>
                    )}
                    {gallery.allow_images && (
                      <span className="px-2 py-1 bg-green-50 text-green-600 rounded">
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
