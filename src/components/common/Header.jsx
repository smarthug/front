import { Link } from 'react-router-dom'
import { useAuthStore } from '../../store/authStore'
import { useLogout } from '../../hooks/useAuth'
import { Button } from '../ui/Button'

/**
 * Site header with navigation
 */
export const Header = () => {
  const { user, isAuthenticated } = useAuthStore()
  const handleLogout = useLogout()

  return (
    <header className="border-b bg-white">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-6">
            <Link to="/" className="text-xl font-bold text-blue-600">
              DC Clone
            </Link>
            <nav className="flex gap-4">
              <Link to="/" className="text-sm font-medium hover:text-blue-600">
                갤러리
              </Link>
              <Link to="/hot" className="text-sm font-medium hover:text-blue-600">
                핫게시물
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            {isAuthenticated() ? (
              <>
                <span className="text-sm text-gray-600">
                  {user?.username || '사용자'}
                </span>
                <Button variant="outline" size="sm" onClick={handleLogout}>
                  로그아웃
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="ghost" size="sm">
                    로그인
                  </Button>
                </Link>
                <Link to="/register">
                  <Button size="sm">
                    회원가입
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
