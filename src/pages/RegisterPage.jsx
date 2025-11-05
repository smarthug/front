import { useState } from 'react'
import { Link } from 'react-router-dom'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import Alert from '@mui/material/Alert'
import { useRegister } from '../hooks/useAuth'

/**
 * Register page
 */
export const RegisterPage = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const register = useRegister()

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!username.trim() || !email.trim() || !password) {
      alert('모든 필드를 입력해주세요.')
      return
    }

    if (password !== passwordConfirm) {
      alert('비밀번호가 일치하지 않습니다.')
      return
    }

    if (password.length < 8) {
      alert('비밀번호는 8자 이상이어야 합니다.')
      return
    }

    register.mutate({ username, email, password })
  }

  return (
    <Container maxWidth="sm" sx={{ px: 2, py: 8 }}>
      <Paper sx={{ p: 4 }}>
        <Box sx={{ mb: 3 }}>
          <Typography variant="h4" fontWeight={700} gutterBottom>
            회원가입
          </Typography>
          <Typography variant="body2" color="text.secondary">
            이미 계정이 있으신가요?{' '}
            <Typography
              component={Link}
              to="/login"
              variant="body2"
              sx={{
                color: 'primary.main',
                textDecoration: 'none',
                '&:hover': { textDecoration: 'underline' },
              }}
            >
              로그인
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
              이메일
            </Typography>
            <TextField
              type="email"
              placeholder="이메일을 입력하세요"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              placeholder="비밀번호를 입력하세요 (8자 이상)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              fullWidth
              size="medium"
              inputProps={{ minLength: 8 }}
            />
          </Box>

          <Box>
            <Typography variant="body2" fontWeight={500} sx={{ mb: 1 }}>
              비밀번호 확인
            </Typography>
            <TextField
              type="password"
              placeholder="비밀번호를 다시 입력하세요"
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
              required
              fullWidth
              size="medium"
            />
          </Box>

          {register.isError && (
            <Alert severity="error">
              {register.error?.response?.data?.detail ||
                '회원가입에 실패했습니다. 다시 시도해주세요.'}
            </Alert>
          )}

          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            fullWidth
            disabled={register.isPending}
          >
            {register.isPending ? '가입 중...' : '회원가입'}
          </Button>
        </Box>
      </Paper>
    </Container>
  )
}
