import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import Box from '@mui/material/Box'
import theme from './theme'
import { Header } from './components/common/Header'
import { Footer } from './components/common/Footer'
import { BottomNavigation } from './components/common/BottomNavigation'
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
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Box
            sx={{
              minHeight: '100vh',
              bgcolor: 'background.default',
              display: 'flex',
              flexDirection: 'column',
              pb: { xs: 8, md: 0 },
            }}
          >
            <Header />
            <Box component="main" sx={{ flex: 1 }}>
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
                    <Box
                      sx={{
                        maxWidth: 768,
                        mx: 'auto',
                        px: 2,
                        py: 8,
                        textAlign: 'center',
                      }}
                    >
                      <Box component="h1" sx={{ mb: 2, fontSize: '2.25rem', fontWeight: 700 }}>
                        404
                      </Box>
                      <Box sx={{ color: 'grey.600' }}>
                        요청하신 페이지를 찾을 수 없습니다.
                      </Box>
                    </Box>
                  }
                />
              </Routes>
            </Box>
            <BottomNavigation />
            <Footer />
          </Box>
        </BrowserRouter>
      </QueryClientProvider>
    </ThemeProvider>
  )
}

export default App
