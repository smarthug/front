import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useLogin } from '../hooks/useAuth'
import { Button } from '../components/ui/Button'
import { Input } from '../components/ui/Input'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/Card'

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
    <div className="container mx-auto px-4 py-16 max-w-md">
      <Card>
        <CardHeader>
          <CardTitle>로그인</CardTitle>
          <CardDescription>
            계정이 없으신가요?{' '}
            <Link to="/register" className="text-blue-600 hover:underline">
              회원가입
            </Link>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                아이디
              </label>
              <Input
                type="text"
                placeholder="아이디를 입력하세요"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                비밀번호
              </label>
              <Input
                type="password"
                placeholder="비밀번호를 입력하세요"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {login.isError && (
              <div className="text-red-600 text-sm">
                로그인에 실패했습니다. 아이디와 비밀번호를 확인해주세요.
              </div>
            )}

            <Button
              type="submit"
              className="w-full"
              disabled={login.isPending}
            >
              {login.isPending ? '로그인 중...' : '로그인'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
