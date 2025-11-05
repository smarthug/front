import { Link, useLocation } from 'react-router-dom'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import InputAdornment from '@mui/material/InputAdornment'
import MenuIcon from '@mui/icons-material/Menu'
import SearchIcon from '@mui/icons-material/Search'
import { useAuthStore } from '../../store/authStore'
import { useLogout } from '../../hooks/useAuth'

const MAIN_TABS = [
  { label: '갤러리', path: '/' },
  { label: '마이너갤', path: '/minor' },
  { label: '미니갤', path: '/mini' },
  { label: '인물갤', path: '/people' },
]

export const Header = () => {
  const { user, isAuthenticated } = useAuthStore()
  const logout = useLogout()
  const location = useLocation()

  const handleSearch = (event) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const keyword = formData.get('keyword')
    if (!keyword) return
    window.location.href = `https://search.dcinside.com/combine/k/${encodeURIComponent(
      keyword,
    )}`
  }

  const isActiveTab = (path) => {
    if (path === '/') return location.pathname === '/'
    return location.pathname.startsWith(path)
  }

  return (
    <AppBar position="static" elevation={1}>
      {/* Top utility bar */}
      <Box sx={{ bgcolor: 'primary.main', color: 'white' }}>
        <Box
          sx={{
            maxWidth: 1152,
            mx: 'auto',
            px: 2,
            display: 'flex',
            alignItems: 'center',
            gap: 1.5,
            height: 44,
          }}
        >
          <IconButton
            sx={{
              bgcolor: 'rgba(255, 255, 255, 0.1)',
              '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.2)' },
              color: 'white',
              width: 32,
              height: 32,
            }}
          >
            <MenuIcon />
          </IconButton>

          <Typography
            component={Link}
            to="/"
            sx={{
              fontSize: '1.125rem',
              fontWeight: 800,
              color: 'white',
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: 0.5,
              '&:hover': { textDecoration: 'none' },
            }}
          >
            <Box component="span" sx={{ fontSize: '1.5rem' }}>
              d𝒸
            </Box>
          </Typography>

          <Box
            component="form"
            onSubmit={handleSearch}
            sx={{
              flex: 1,
              display: { xs: 'none', sm: 'flex' },
              alignItems: 'center',
              position: 'relative',
            }}
          >
            <TextField
              name="keyword"
              placeholder="갤러리 & 통합검색"
              size="small"
              sx={{
                width: '100%',
                bgcolor: 'white',
                borderRadius: 1,
                '& .MuiOutlinedInput-root': {
                  fontSize: '0.75rem',
                  pr: 0.5,
                },
                '& fieldset': {
                  borderColor: 'transparent',
                },
                '&:hover fieldset': {
                  borderColor: 'secondary.main',
                },
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: 'grey.400', fontSize: '1rem' }} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <Button
                    type="submit"
                    variant="contained"
                    color="secondary"
                    size="small"
                    sx={{
                      minWidth: 'auto',
                      px: 1.5,
                      py: 0.5,
                      fontSize: '0.6875rem',
                      fontWeight: 600,
                    }}
                  >
                    검색
                  </Button>
                ),
              }}
            />
          </Box>

          <Box sx={{ ml: 'auto', display: 'flex', alignItems: 'center', gap: 1 }}>
            <Button
              component={Link}
              to="/recent"
              size="small"
              sx={{
                bgcolor: 'rgba(255, 255, 255, 0.1)',
                color: 'white',
                fontSize: '0.6875rem',
                px: 1.5,
                py: 0.5,
                '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.2)' },
              }}
            >
              최근 방문
            </Button>
            {isAuthenticated() ? (
              <>
                <Box
                  sx={{
                    display: { xs: 'none', sm: 'inline-block' },
                    bgcolor: 'rgba(255, 255, 255, 0.1)',
                    color: 'rgba(255, 255, 255, 0.8)',
                    fontSize: '0.6875rem',
                    px: 1.5,
                    py: 0.5,
                    borderRadius: 1,
                  }}
                >
                  {user?.username || '익명'}
                </Box>
                <Button
                  onClick={logout}
                  size="small"
                  sx={{
                    bgcolor: 'white',
                    color: 'primary.dark',
                    fontSize: '0.6875rem',
                    fontWeight: 600,
                    px: 1.5,
                    py: 0.5,
                    '&:hover': {
                      bgcolor: 'secondary.main',
                      color: 'primary.main',
                    },
                  }}
                >
                  로그아웃
                </Button>
              </>
            ) : (
              <>
                <Button
                  component={Link}
                  to="/login"
                  size="small"
                  sx={{
                    bgcolor: 'white',
                    color: 'primary.dark',
                    fontSize: '0.6875rem',
                    fontWeight: 600,
                    px: 1.5,
                    py: 0.5,
                    '&:hover': {
                      bgcolor: 'secondary.main',
                      color: 'primary.main',
                    },
                  }}
                >
                  로그인
                </Button>
                <Button
                  component={Link}
                  to="/register"
                  size="small"
                  variant="outlined"
                  sx={{
                    borderColor: 'white',
                    color: 'white',
                    fontSize: '0.6875rem',
                    fontWeight: 600,
                    px: 1.5,
                    py: 0.5,
                    '&:hover': {
                      bgcolor: 'white',
                      borderColor: 'white',
                      color: 'primary.dark',
                    },
                  }}
                >
                  회원가입
                </Button>
              </>
            )}
          </Box>
        </Box>
      </Box>

      {/* Mobile search bar */}
      <Box
        sx={{
          display: { xs: 'block', sm: 'none' },
          bgcolor: 'primary.dark',
          borderBottom: 1,
          borderColor: 'divider',
        }}
      >
        <Box
          component="form"
          onSubmit={handleSearch}
          sx={{
            maxWidth: 1152,
            mx: 'auto',
            px: 2,
            py: 1,
            display: 'flex',
            alignItems: 'center',
            gap: 1,
          }}
        >
          <TextField
            name="keyword"
            placeholder="갤러리 & 통합검색"
            size="small"
            fullWidth
            sx={{
              bgcolor: 'white',
              borderRadius: 1,
              '& .MuiOutlinedInput-root': {
                fontSize: '0.75rem',
              },
              '& fieldset': {
                borderColor: 'transparent',
              },
              '&:hover fieldset': {
                borderColor: 'secondary.main',
              },
            }}
          />
          <Button
            type="submit"
            variant="contained"
            color="secondary"
            size="small"
            sx={{ fontSize: '0.75rem', fontWeight: 600, whiteSpace: 'nowrap' }}
          >
            검색
          </Button>
        </Box>
      </Box>

      {/* Secondary navigation */}
      <Box
        sx={{
          bgcolor: 'primary.dark',
          borderBottom: 1,
          borderColor: 'divider',
        }}
      >
        <Box
          component="nav"
          sx={{
            maxWidth: 1152,
            mx: 'auto',
            px: 2,
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            height: 44,
          }}
        >
          {MAIN_TABS.map((tab) => (
            <Box
              key={tab.path}
              component={Link}
              to={tab.path}
              sx={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                gap: 0.5,
                px: 1,
                fontSize: '0.875rem',
                fontWeight: 600,
                color: isActiveTab(tab.path) ? 'secondary.main' : 'rgba(255, 255, 255, 0.8)',
                textDecoration: 'none',
                '&:hover': {
                  color: 'white',
                },
              }}
            >
              {tab.label}
              {isActiveTab(tab.path) && (
                <Box
                  sx={{
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    bottom: -12,
                    height: 4,
                    bgcolor: 'secondary.main',
                    borderTopLeftRadius: 2,
                    borderTopRightRadius: 2,
                  }}
                />
              )}
            </Box>
          ))}
          <Button
            size="small"
            sx={{
              ml: 'auto',
              borderColor: 'rgba(255, 255, 255, 0.2)',
              color: 'rgba(255, 255, 255, 0.8)',
              fontSize: '0.75rem',
              px: 1,
              py: 0.5,
              border: 1,
              '&:hover': {
                bgcolor: 'rgba(255, 255, 255, 0.1)',
                borderColor: 'rgba(255, 255, 255, 0.2)',
              },
            }}
          >
            ▼ 전체메뉴
          </Button>
        </Box>
      </Box>
    </AppBar>
  )
}
