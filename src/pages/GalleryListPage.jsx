import { Link } from 'react-router-dom'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import Chip from '@mui/material/Chip'
import Skeleton from '@mui/material/Skeleton'
import Alert from '@mui/material/Alert'
import { useGalleries } from '../hooks/useGalleries'

export const GalleryListPage = () => {
  const { data, isLoading, error } = useGalleries()
  const galleries = data?.results || data || []

  if (isLoading) {
    return (
      <Container maxWidth="lg" sx={{ py: 3 }}>
        <Paper sx={{ p: 2, mb: 2, border: 1, borderColor: 'divider' }}>
          <Skeleton variant="text" width={128} height={32} sx={{ mb: 1 }} />
          <Skeleton variant="text" width={192} height={24} />
        </Paper>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          {[1, 2, 3, 4, 5, 6].map((i) => (
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
          갤러리 목록을 불러오는데 실패했습니다.
        </Alert>
      </Container>
    )
  }

  return (
    <Container maxWidth="lg" sx={{ py: 3 }}>
      <Paper
        sx={{
          p: 2,
          mb: 2,
          border: 1,
          borderColor: 'divider',
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          alignItems: { sm: 'center' },
          justifyContent: { sm: 'space-between' },
          gap: 1.5,
        }}
      >
        <Box>
          <Typography variant="h5" fontWeight={700} color="primary.dark" gutterBottom>
            전체 갤러리
          </Typography>
          <Typography variant="body2" color="text.secondary">
            디시인사이드 스타일의 커뮤니티 디렉터리
          </Typography>
        </Box>
        <Button variant="outlined" size="small">
          즐겨찾기 관리
        </Button>
      </Paper>

      <Paper sx={{ border: 1, borderColor: 'divider', overflow: 'hidden' }}>
        {/* Desktop Header */}
        <Box
          sx={{
            display: { xs: 'none', sm: 'grid' },
            gridTemplateColumns: { sm: '72px 1fr 200px', lg: '72px 1.4fr 1fr 180px' },
            alignItems: 'center',
            borderBottom: 1,
            borderColor: 'divider',
            bgcolor: 'grey.50',
            fontSize: '0.75rem',
            fontWeight: 600,
            textTransform: 'uppercase',
            color: 'grey.600',
          }}
        >
          <Box sx={{ borderRight: 1, borderColor: 'divider', py: 1.5, textAlign: 'center' }}>
            번호
          </Box>
          <Box sx={{ py: 1.5, pl: 2 }}>갤러리명</Box>
          <Box
            sx={{
              display: { xs: 'none', lg: 'block' },
              borderLeft: 1,
              borderColor: 'divider',
              py: 1.5,
              pl: 2,
            }}
          >
            설명
          </Box>
          <Box sx={{ borderLeft: 1, borderColor: 'divider', py: 1.5, textAlign: 'center' }}>
            특징
          </Box>
        </Box>

        {galleries.length === 0 ? (
          <Box sx={{ px: 2, py: 6, textAlign: 'center' }}>
            <Typography variant="body2" color="text.secondary">
              등록된 갤러리가 없습니다.
            </Typography>
          </Box>
        ) : (
          galleries.map((gallery, index) => (
            <Box
              key={gallery.id ?? gallery.slug ?? index}
              component={Link}
              to={`/g/${gallery.slug}`}
              sx={{
                display: 'block',
                borderBottom: 1,
                borderColor: 'divider',
                textDecoration: 'none',
                color: 'inherit',
                '&:last-child': { borderBottom: 0 },
                '&:hover': {
                  bgcolor: 'grey.50',
                },
              }}
            >
              {/* Desktop Layout */}
              <Box
                sx={{
                  display: { xs: 'none', sm: 'grid' },
                  gridTemplateColumns: { sm: '72px 1fr 200px', lg: '72px 1.4fr 1fr 180px' },
                  alignItems: 'center',
                  fontSize: '0.875rem',
                  color: 'grey.700',
                }}
              >
                <Box
                  sx={{
                    borderRight: 1,
                    borderColor: 'divider',
                    py: 1.5,
                    textAlign: 'center',
                    fontSize: '0.75rem',
                    color: 'grey.500',
                  }}
                >
                  {galleries.length - index}
                </Box>
                <Box sx={{ py: 1.5, pl: 2 }}>
                  <Typography
                    variant="body2"
                    fontWeight={600}
                    color="primary.dark"
                    sx={{
                      transition: 'color 0.2s',
                      '&:hover': { color: 'secondary.dark' },
                    }}
                  >
                    {gallery.title}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {gallery.slug}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: { xs: 'none', lg: 'flex' },
                    alignItems: 'center',
                    borderLeft: 1,
                    borderColor: 'divider',
                    py: 1.5,
                    pl: 2,
                    fontSize: '0.75rem',
                    color: 'grey.600',
                  }}
                >
                  {gallery.description ? (
                    <Typography
                      variant="caption"
                      sx={{
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        lineHeight: 1.6,
                      }}
                    >
                      {gallery.description}
                    </Typography>
                  ) : (
                    <Typography variant="caption" color="grey.400">
                      소개 문구가 없습니다.
                    </Typography>
                  )}
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 1,
                    borderLeft: 1,
                    borderColor: 'divider',
                    py: 1.5,
                    fontSize: '0.75rem',
                  }}
                >
                  {gallery.is_anonymous && (
                    <Chip label="익명" size="small" color="default" />
                  )}
                  {gallery.allow_images && (
                    <Chip label="이미지" size="small" color="success" />
                  )}
                  {!gallery.is_anonymous && !gallery.allow_images && (
                    <Typography variant="caption" color="grey.400">
                      일반
                    </Typography>
                  )}
                </Box>
              </Box>

              {/* Mobile Layout */}
              <Box
                sx={{
                  display: { xs: 'block', sm: 'none' },
                  px: 2,
                  py: 1.5,
                  fontSize: '0.875rem',
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    fontSize: '0.75rem',
                    color: 'grey.400',
                    mb: 1,
                  }}
                >
                  <Typography variant="caption">No.{galleries.length - index}</Typography>
                  <Typography variant="caption">{gallery.slug}</Typography>
                </Box>
                <Typography variant="body2" fontWeight={600} color="primary.dark" gutterBottom>
                  {gallery.title}
                </Typography>
                <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1 }}>
                  {gallery.description || '소개 문구가 없습니다.'}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  {gallery.is_anonymous && (
                    <Chip label="익명" size="small" color="default" />
                  )}
                  {gallery.allow_images && (
                    <Chip label="이미지" size="small" color="success" />
                  )}
                </Box>
              </Box>
            </Box>
          ))
        )}
      </Paper>
    </Container>
  )
}
