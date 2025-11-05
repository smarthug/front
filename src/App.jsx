import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Header } from './components/common/Header'
import { Footer } from './components/common/Footer'
import { GalleryListPage } from './pages/GalleryListPage'
import { GalleryDetailPage } from './pages/GalleryDetailPage'
import { PostDetailPage } from './pages/PostDetailPage'
import { PostWritePage } from './pages/PostWritePage'
import { HotFeedPage } from './pages/HotFeedPage'
import { LoginPage } from './pages/LoginPage'
import { RegisterPage } from './pages/RegisterPage'

// Create QueryClient instance
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 30000, // 30 seconds
    },
  },
})

/**
 * Main App component with routing
 */
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <div className="min-h-screen bg-dc-bg-main flex flex-col">
          <Header />
          <main className="flex-1">
            <Routes>
              {/* Home - Gallery List */}
              <Route path="/" element={<GalleryListPage />} />

              {/* Hot Feed */}
              <Route path="/hot" element={<HotFeedPage />} />

              {/* Auth Routes */}
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />

              {/* Gallery Routes */}
              <Route path="/g/:slug" element={<GalleryDetailPage />} />
              <Route path="/g/:slug/write" element={<PostWritePage />} />

              {/* Post Routes */}
              <Route path="/g/:slug/:postId" element={<PostDetailPage />} />
              <Route path="/g/:slug/:postId/edit" element={<PostWritePage />} />

              {/* 404 - Not Found */}
              <Route
                path="*"
                element={
                  <div className="container mx-auto px-4 py-16 text-center">
                    <h1 className="text-4xl font-bold mb-4">404</h1>
                    <p className="text-dc-gray-600">페이지를 찾을 수 없습니다.</p>
                  </div>
                }
              />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App
