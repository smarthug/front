import { Link, useLocation } from 'react-router-dom'
import Box from '@mui/material/Box'
import MuiBottomNavigation from '@mui/material/BottomNavigation'
import BottomNavigationAction from '@mui/material/BottomNavigationAction'
import HomeIcon from '@mui/icons-material/Home'
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment'
import CreateIcon from '@mui/icons-material/Create'
import PersonIcon from '@mui/icons-material/Person'
import LockIcon from '@mui/icons-material/Lock'
import { useAuthStore } from '../../store/authStore'

export const BottomNavigation = () => {
  const location = useLocation()
  const { isAuthenticated } = useAuthStore()

  const match = location.pathname.match(/^\/g\/([^/]+)/)
  const currentGallery = match?.[1]
  const writePath = currentGallery ? `/g/${currentGallery}/write` : '/hot'

  const items = [
    { label: '홈', path: '/', icon: <HomeIcon /> },
    { label: '인기', path: '/hot', icon: <LocalFireDepartmentIcon /> },
    { label: '글쓰기', path: writePath, icon: <CreateIcon /> },
    {
      label: isAuthenticated() ? '마이' : '로그인',
      path: isAuthenticated() ? '/profile' : '/login',
      icon: isAuthenticated() ? <PersonIcon /> : <LockIcon />,
    },
  ]

  const isActive = (path) => {
    if (path === writePath) {
      return location.pathname.endsWith('/write')
    }
    if (path === '/profile') {
      return location.pathname.startsWith('/profile')
    }
    return location.pathname === path
  }

  const getCurrentValue = () => {
    const activeItem = items.find((item) => isActive(item.path))
    return activeItem ? items.indexOf(activeItem) : 0
  }

  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 40,
        display: { xs: 'block', md: 'none' },
        borderTop: 1,
        borderColor: 'divider',
        bgcolor: 'background.paper',
        boxShadow: '0 -4px 12px rgba(10, 14, 60, 0.08)',
      }}
    >
      <MuiBottomNavigation
        value={getCurrentValue()}
        showLabels
        sx={{
          bgcolor: 'transparent',
          '& .MuiBottomNavigationAction-root': {
            minWidth: 0,
            color: 'grey.500',
            fontSize: '0.75rem',
            fontWeight: 500,
            '&.Mui-selected': {
              color: 'primary.dark',
            },
          },
        }}
      >
        {items.map((item, index) => (
          <BottomNavigationAction
            key={`${item.path}-${item.label}`}
            component={Link}
            to={item.path}
            label={item.label}
            icon={item.icon}
            value={index}
          />
        ))}
      </MuiBottomNavigation>
    </Box>
  )
}
