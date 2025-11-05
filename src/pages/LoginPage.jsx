import { useState } from 'react'
import { Link } from 'react-router-dom'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import Alert from '@mui/material/Alert'
import { useLogin } from '../hooks/useAuth'

/**
 * Login page
 */
export const LoginPage = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const login = useLogin()

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!username.trim() || !password) {
      alert('아이디와 비밀번호를 입력해주세요.')
      return
    }

    login.mutate({ username, password })
  }

  return (
    <Container maxWidth="sm" sx={{ px: 2, py: 8 }}>
      <Paper sx={{ p: 4 }}>
        <Box sx={{ mb: 3 }}>
          <Typography variant="h4" fontWeight={700} gutterBottom>
            로그인
          </Typography>
          <Typography variant="body2" color="text.secondary">
            계정이 없으신가요?{' '}
            <Typography
              component={Link}
              to="/register"
              variant="body2"
              sx={{
                color: 'primary.main',
                textDecoration: 'none',
                '&:hover': { textDecoration: 'underline' },
              }}
            >
              회원가입
            </Typography>
          </Typography>
        </Box>

        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Box>
            <Typography variant="body2" fontWeight={500} sx={{ mb: 1 }}>
              아이디
            </Typography>
            <TextField
              type="text"
              placeholder="아이디를 입력하세요"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              fullWidth
              size="medium"
            />
          </Box>

          <Box>
            <Typography variant="body2" fontWeight={500} sx={{ mb: 1 }}>
              비밀번호
            </Typography>
            <TextField
              type="password"
              placeholder="비밀번호를 입력하세요"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              fullWidth
              size="medium"
            />
          </Box>

          {login.isError && (
            <Alert severity="error">
              로그인에 실패했습니다. 아이디와 비밀번호를 확인해주세요.
            </Alert>
          )}

          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            fullWidth
            disabled={login.isPending}
          >
            {login.isPending ? '로그인 중...' : '로그인'}
          </Button>
        </Box>
      </Paper>
    </Container>
  )
}
