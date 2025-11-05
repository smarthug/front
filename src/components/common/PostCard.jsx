import { Link } from 'react-router-dom'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Chip from '@mui/material/Chip'

const formatDate = (dateString) => {
  const date = new Date(dateString)
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  return `${month}.${day} ${hours}:${minutes}`
}

const getLabel = (post) => {
  if (post.is_notice) return { text: '공지', color: 'error' }
  if (post.recommend >= 10) return { text: '인기', color: 'secondary' }
  if (post.image) return { text: '이미지', color: 'info' }
  return null
}

export const PostCard = ({ post, index }) => {
  const label = getLabel(post)
  const displayIndex = post.is_notice ? '공지' : index ?? post.id
  const author = post.author_username || post.nickname || '익명'
  const hasImage = Boolean(post.image)

  return (
    <Box
      component={Link}
      to={`/g/${post.gallery}/${post.id}`}
      sx={{
        display: 'block',
        textDecoration: 'none',
        color: 'inherit',
        borderBottom: 1,
        borderColor: 'divider',
        '&:hover': {
          bgcolor: 'grey.50',
        },
        '&:last-child': {
          borderBottom: 0,
        },
      }}
    >
      {/* Desktop board row */}
      <Box
        sx={{
          display: { xs: 'none', sm: 'grid' },
          gridTemplateColumns: '70px auto 140px 100px 70px 70px',
          alignItems: 'stretch',
          fontSize: '0.875rem',
          color: 'grey.700',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRight: 1,
            borderColor: 'divider',
            fontSize: '0.75rem',
            color: 'grey.500',
          }}
        >
          {post.is_notice ? (
            <Chip label="공지" size="small" color="error" />
          ) : (
            displayIndex
          )}
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, px: 1.5, py: 1 }}>
          {label && (
            <Chip label={label.text} size="small" color={label.color} />
          )}
          <Typography
            variant="body2"
            sx={{
              flex: 1,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              fontWeight: 500,
              color: 'grey.800',
              '&:hover': { textDecoration: 'underline' },
            }}
          >
            {post.title}
          </Typography>
          {hasImage && (
            <Typography variant="caption" color="grey.500">
              📎
            </Typography>
          )}
          {post.recommend > 0 && (
            <Typography variant="caption" fontWeight={600} color="primary.dark">
              [{post.recommend}]
            </Typography>
          )}
        </Box>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            borderLeft: 1,
            borderColor: 'divider',
            px: 1.5,
            py: 1,
            fontSize: '0.75rem',
            color: 'grey.600',
          }}
        >
          {author}
        </Box>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            borderLeft: 1,
            borderColor: 'divider',
            px: 1.5,
            py: 1,
            fontSize: '0.75rem',
            color: 'grey.500',
          }}
        >
          {formatDate(post.created_at)}
        </Box>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderLeft: 1,
            borderColor: 'divider',
            px: 1.5,
            py: 1,
            fontSize: '0.75rem',
            color: 'grey.500',
          }}
        >
          {post.views}
        </Box>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderLeft: 1,
            borderColor: 'divider',
            px: 1.5,
            py: 1,
            fontSize: '0.75rem',
            fontWeight: 600,
            color: 'error.main',
          }}
        >
          {post.recommend}
        </Box>
      </Box>

      {/* Mobile card */}
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
            mb: 0.5,
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            fontSize: '0.75rem',
            color: 'grey.400',
          }}
        >
          <Typography variant="caption">{displayIndex}</Typography>
          <Typography variant="caption">·</Typography>
          <Typography variant="caption">{formatDate(post.created_at)}</Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'start', gap: 1 }}>
          {label && (
            <Chip label={label.text} size="small" color={label.color} />
          )}
          <Box sx={{ flex: 1 }}>
            <Typography variant="body2" fontWeight={500} color="grey.800" gutterBottom>
              {post.title}
              {post.recommend > 0 && (
                <Typography
                  component="span"
                  variant="caption"
                  fontWeight={600}
                  color="primary.dark"
                  sx={{ ml: 0.5 }}
                >
                  [{post.recommend}]
                </Typography>
              )}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, fontSize: '0.75rem' }}>
              <Typography variant="caption" color="text.secondary">
                {author}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                · 조회 {post.views}
              </Typography>
              <Typography variant="caption" color="error.main">
                추천 {post.recommend}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
