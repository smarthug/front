import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import Skeleton from '@mui/material/Skeleton'
import Alert from '@mui/material/Alert'
import { useHotPosts } from '../hooks/usePosts'
import { PostCard } from '../components/common/PostCard'

/**
 * Hot feed page - shows trending/popular posts
 */
export const HotFeedPage = () => {
  const { data: posts, isLoading, error } = useHotPosts()

  if (isLoading) {
    return (
      <Container maxWidth="lg" sx={{ py: 3 }}>
        <Paper sx={{ mb: 2, border: 1, borderColor: 'divider', p: 2 }}>
          <Skeleton variant="text" width={200} height={32} />
        </Paper>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          {[1, 2, 3, 4, 5].map((i) => (
            <Skeleton key={i} variant="rectangular" height={64} />
          ))}
        </Box>
      </Container>
    )
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ py: 3 }}>
        <Alert severity="error" sx={{ textAlign: 'center' }}>
          인기 게시글을 불러오는데 실패했습니다.
        </Alert>
      </Container>
    )
  }

  return (
    <Container maxWidth="lg" sx={{ py: 3 }}>
      <Paper sx={{ mb: 2, border: 1, borderColor: 'divider', p: 2 }}>
        <Typography variant="h5" fontWeight={700} color="primary.dark" gutterBottom>
          🔥 인기 게시글
        </Typography>
        <Typography variant="body2" color="text.secondary">
          최근 48시간 내 추천 상위 글
        </Typography>
      </Paper>

      {posts?.length === 0 ? (
        <Paper sx={{ border: 1, borderColor: 'divider', p: 6, textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            현재 인기 게시글이 없습니다.
          </Typography>
        </Paper>
      ) : (
        <Paper sx={{ border: 1, borderColor: 'divider', overflow: 'hidden' }}>
          {/* Table Header */}
          <Box
            sx={{
              display: { xs: 'none', sm: 'grid' },
              gridTemplateColumns: '70px auto 140px 100px 70px 70px',
              alignItems: 'center',
              bgcolor: 'grey.50',
              borderBottom: 1,
              borderColor: 'divider',
              fontSize: '0.75rem',
              fontWeight: 600,
              color: 'grey.700',
            }}
          >
            <Box sx={{ borderRight: 1, borderColor: 'divider', py: 1, textAlign: 'center' }}>
              순위
            </Box>
            <Box sx={{ py: 1, pl: 1.5 }}>제목</Box>
            <Box sx={{ borderLeft: 1, borderColor: 'divider', py: 1, textAlign: 'center' }}>
              작성자
            </Box>
            <Box sx={{ borderLeft: 1, borderColor: 'divider', py: 1, textAlign: 'center' }}>
              작성일
            </Box>
            <Box sx={{ borderLeft: 1, borderColor: 'divider', py: 1, textAlign: 'center' }}>
              조회
            </Box>
            <Box
              sx={{
                borderLeft: 1,
                borderColor: 'divider',
                py: 1,
                textAlign: 'center',
                color: 'error.main',
              }}
            >
              추천
            </Box>
          </Box>
          {/* Hot Post Rows */}
          <Box>
            {posts?.map((post, index) => (
              <Box key={post.id}>
                <PostCard post={post} index={index + 1} />
              </Box>
            ))}
          </Box>
        </Paper>
      )}
    </Container>
  )
}
