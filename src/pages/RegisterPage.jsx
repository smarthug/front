import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useRegister } from '../hooks/useAuth'
import { Button } from '../components/ui/Button'
import { Input } from '../components/ui/Input'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/Card'

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
    <div className="container mx-auto px-4 py-16 max-w-md">
      <Card>
        <CardHeader>
          <CardTitle>회원가입</CardTitle>
          <CardDescription>
            이미 계정이 있으신가요?{' '}
            <Link to="/login" className="text-blue-600 hover:underline">
              로그인
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
                이메일
              </label>
              <Input
                type="email"
                placeholder="이메일을 입력하세요"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                비밀번호
              </label>
              <Input
                type="password"
                placeholder="비밀번호를 입력하세요 (8자 이상)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={8}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                비밀번호 확인
              </label>
              <Input
                type="password"
                placeholder="비밀번호를 다시 입력하세요"
                value={passwordConfirm}
                onChange={(e) => setPasswordConfirm(e.target.value)}
                required
              />
            </div>

            {register.isError && (
              <div className="text-red-600 text-sm">
                {register.error?.response?.data?.detail ||
                  '회원가입에 실패했습니다. 다시 시도해주세요.'}
              </div>
            )}

            <Button
              type="submit"
              className="w-full"
              disabled={register.isPending}
            >
              {register.isPending ? '가입 중...' : '회원가입'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
