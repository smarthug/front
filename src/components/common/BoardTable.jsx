import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Box, Chip } from '@mui/material';
import { getPosts } from '../../api/posts';

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${month}.${day} ${hours}:${minutes}`;
};

const BoardRow = ({ post, index, gallerySlug }) => {
  const [isHovered, setIsHovered] = useState(false);

  const displayIndex = post.is_notice ? '공지' : index ?? post.id;
  const author = post.author_username || post.nickname || '익명';
  const hasRecommend = post.recommend > 0;

  return (
    <Box
      component={Link}
      to={`/g/${gallerySlug}/${post.id}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      sx={{
        display: 'block',
        textDecoration: 'none',
        color: 'grey.700',
        borderTop: '1px solid',
        borderColor: 'divider',
        fontSize: '0.875rem',
        transition: 'background-color 0.2s',
        backgroundColor: isHovered ? 'grey.50' : 'transparent',
        '&:hover': {
          backgroundColor: 'grey.50',
        },
      }}
    >
      {/* Desktop View */}
      <Box
        sx={{
          display: { xs: 'none', sm: 'grid' },
          gridTemplateColumns: '70px 1fr 140px 100px 70px 70px',
          alignItems: 'center',
        }}
      >
        {/* 번호 */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRight: 1,
            borderColor: 'divider',
            py: 1,
            fontSize: '0.75rem',
            color: 'grey.500',
          }}
        >
          {post.is_notice ? (
            <Chip label="공지" size="small" color="error" sx={{ fontSize: '0.7rem' }} />
          ) : (
            displayIndex
          )}
        </Box>

        {/* 제목 */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            px: 2,
            py: 1,
            overflow: 'hidden',
          }}
        >
          {post.image && (
            <Chip label="이미지" size="small" color="info" sx={{ fontSize: '0.65rem' }} />
          )}
          <Box
            sx={{
              flex: 1,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              fontWeight: 500,
              color: 'grey.800',
              fontSize: '0.875rem',
            }}
          >
            {post.title}
          </Box>
          {hasRecommend && (
            <Box
              component="span"
              sx={{
                fontSize: '0.75rem',
                fontWeight: 600,
                color: 'error.main',
              }}
            >
              [{post.recommend}]
            </Box>
          )}
        </Box>

        {/* 글쓴이 */}
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
            color: 'grey.600',
          }}
        >
          {author}
        </Box>

        {/* 작성일 */}
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
          {formatDate(post.created_at)}
        </Box>

        {/* 조회 */}
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

        {/* 추천 */}
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

      {/* Mobile View */}
      <Box
        sx={{
          display: { xs: 'block', sm: 'none' },
          px: 2,
          py: 1.5,
        }}
      >
        <Box
          sx={{
            mb: 0.5,
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            fontSize: '0.7rem',
            color: 'grey.400',
          }}
        >
          <Box component="span">{displayIndex}</Box>
          <Box component="span">·</Box>
          <Box component="span">{formatDate(post.created_at)}</Box>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'start', gap: 1 }}>
          {post.is_notice && (
            <Chip label="공지" size="small" color="error" sx={{ fontSize: '0.65rem' }} />
          )}
          {post.image && (
            <Chip label="이미지" size="small" color="info" sx={{ fontSize: '0.65rem' }} />
          )}
          <Box sx={{ flex: 1 }}>
            <Box
              sx={{
                fontWeight: 500,
                color: 'grey.800',
                fontSize: '0.875rem',
                mb: 0.5,
                wordBreak: 'break-word',
              }}
            >
              {post.title}
              {hasRecommend && (
                <Box
                  component="span"
                  sx={{
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    color: 'error.main',
                    ml: 0.5,
                  }}
                >
                  [{post.recommend}]
                </Box>
              )}
            </Box>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                fontSize: '0.7rem',
                color: 'grey.500',
              }}
            >
              <Box component="span">{author}</Box>
              <Box component="span">·</Box>
              <Box component="span">조회 {post.views}</Box>
              <Box component="span">·</Box>
              <Box component="span" sx={{ color: 'error.main', fontWeight: 600 }}>
                추천 {post.recommend}
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

const BoardTable = ({ gallerySlug, ordering }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const params = {};
        if (gallerySlug) params.gallery = gallerySlug;
        if (ordering) params.ordering = ordering;

        const data = await getPosts(params);
        setPosts(data.results || data);
        setError(null);
      } catch (err) {
        console.error('게시글 목록 로딩 실패:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [gallerySlug, ordering]);

  if (loading) {
    return (
      <Box sx={{ p: 4, textAlign: 'center', color: 'grey.500' }}>
        로딩 중...
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 4, textAlign: 'center', color: 'error.main' }}>
        게시글을 불러오는데 실패했습니다.
      </Box>
    );
  }

  if (posts.length === 0) {
    return (
      <Box sx={{ p: 4, textAlign: 'center', color: 'grey.500' }}>
        아직 게시글이 없습니다.
      </Box>
    );
  }

  return (
    <Box sx={{ width: '100%', backgroundColor: 'white' }}>
      {/* 테이블 헤더 - Desktop Only */}
      <Box
        sx={{
          display: { xs: 'none', sm: 'grid' },
          gridTemplateColumns: '70px 1fr 140px 100px 70px 70px',
          backgroundColor: 'grey.50',
          borderTop: 2,
          borderBottom: 1,
          borderColor: 'primary.main',
          fontSize: '0.75rem',
          fontWeight: 'bold',
          color: 'grey.700',
        }}
      >
        <Box sx={{ py: 1.5, textAlign: 'center', borderRight: 1, borderColor: 'divider' }}>
          번호
        </Box>
        <Box sx={{ py: 1.5, px: 2 }}>제목</Box>
        <Box sx={{ py: 1.5, textAlign: 'center', borderLeft: 1, borderColor: 'divider' }}>
          글쓴이
        </Box>
        <Box sx={{ py: 1.5, textAlign: 'center', borderLeft: 1, borderColor: 'divider' }}>
          작성일
        </Box>
        <Box sx={{ py: 1.5, textAlign: 'center', borderLeft: 1, borderColor: 'divider' }}>
          조회
        </Box>
        <Box sx={{ py: 1.5, textAlign: 'center', borderLeft: 1, borderColor: 'divider' }}>
          추천
        </Box>
      </Box>

      {/* 테이블 본문 */}
      <Box sx={{ borderBottom: { xs: 0, sm: 1 }, borderColor: 'primary.main' }}>
        {posts.map((post, idx) => (
          <BoardRow
            key={post.id}
            post={post}
            index={posts.length - idx}
            gallerySlug={gallerySlug || post.gallery}
          />
        ))}
      </Box>
    </Box>
  );
};

export default BoardTable;
