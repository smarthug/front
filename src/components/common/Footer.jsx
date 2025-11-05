import { Link } from 'react-router-dom'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

export const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        mb: { xs: 8, md: 0 },
        mt: 5,
        borderTop: 1,
        borderColor: 'divider',
        bgcolor: 'background.paper',
        color: 'grey.500',
      }}
    >
      <Box
        sx={{
          maxWidth: 1152,
          mx: 'auto',
          px: 2,
          py: 3,
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: { md: 'center' },
          justifyContent: { md: 'space-between' },
          gap: 2,
        }}
      >
        <Box sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>
          <Typography
            variant="body2"
            fontWeight={600}
            color="grey.700"
            sx={{ mb: 0.5 }}
          >
            디시클론 - DCInside Community Replica
          </Typography>
          <Typography
            variant="caption"
            color="grey.400"
            sx={{ fontSize: { xs: '0.6875rem', sm: '0.75rem' } }}
          >
            본 서비스는 학습용 프로젝트이며 디시인사이드와 무관합니다.
          </Typography>
        </Box>
        <Box
          component="nav"
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            gap: 1.5,
            fontSize: { xs: '0.75rem', sm: '0.875rem' },
          }}
        >
          <Typography
            component={Link}
            to="/"
            variant="body2"
            sx={{
              color: 'inherit',
              textDecoration: 'none',
              '&:hover': {
                color: 'primary.dark',
                textDecoration: 'none',
              },
            }}
          >
            갤러리 목록
          </Typography>
          <Typography
            variant="body2"
            color="grey.300"
            sx={{ display: { xs: 'none', sm: 'inline' } }}
          >
            |
          </Typography>
          <Typography
            component={Link}
            to="/hot"
            variant="body2"
            sx={{
              color: 'inherit',
              textDecoration: 'none',
              '&:hover': {
                color: 'primary.dark',
                textDecoration: 'none',
              },
            }}
          >
            인기 게시글
          </Typography>
          <Typography
            variant="body2"
            color="grey.300"
            sx={{ display: { xs: 'none', sm: 'inline' } }}
          >
            |
          </Typography>
          <Typography
            component={Link}
            to="/login"
            variant="body2"
            sx={{
              color: 'inherit',
              textDecoration: 'none',
              '&:hover': {
                color: 'primary.dark',
                textDecoration: 'none',
              },
            }}
          >
            로그인
          </Typography>
          <Typography
            variant="body2"
            color="grey.300"
            sx={{ display: { xs: 'none', sm: 'inline' } }}
          >
            |
          </Typography>
          <Typography
            component={Link}
            to="/register"
            variant="body2"
            sx={{
              color: 'inherit',
              textDecoration: 'none',
              '&:hover': {
                color: 'primary.dark',
                textDecoration: 'none',
              },
            }}
          >
            회원가입
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          borderTop: 1,
          borderColor: 'divider',
          py: 1.5,
          textAlign: 'center',
          fontSize: { xs: '0.6875rem', sm: '0.75rem' },
          color: 'grey.400',
        }}
      >
        © {new Date().getFullYear()} DC Clone. All rights reserved.
      </Box>
    </Box>
  )
}
