import { Link } from 'react-router-dom'
import { useAuthStore } from '../../store/authStore'
import { useLogout } from '../../hooks/useAuth'

/**
 * Site header with navigation - Mobile DCInside style
 */
export const Header = () => {
  const { user, isAuthenticated } = useAuthStore()
  const handleLogout = useLogout()

  return (
    <header className="bg-dc-bg-header border-b border-dc-blue-900 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex h-12 items-center justify-between">
          <div className="flex items-center gap-4 md:gap-8">
            <Link to="/" className="text-base md:text-lg font-bold text-white hover:no-underline hover:text-dc-blue-100 transition-colors">
              디시 클론
            </Link>
            <nav className="flex gap-0.5 md:gap-1">
              <Link
                to="/"
                className="px-2 md:px-3 py-1.5 text-xs md:text-sm font-medium text-white/90 hover:bg-white/10 hover:no-underline rounded transition-all"
              >
                갤러리
              </Link>
              <Link
                to="/hot"
                className="px-2 md:px-3 py-1.5 text-xs md:text-sm font-medium text-white/90 hover:bg-white/10 hover:no-underline rounded transition-all"
              >
                핫게시물
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-1.5 md:gap-2">
            {isAuthenticated() ? (
              <>
                <span className="text-xs md:text-sm text-white/80 px-1 md:px-2 hidden sm:inline">
                  {user?.username || '사용자'}
                </span>
                <button
                  onClick={handleLogout}
                  className="px-2 md:px-3 py-1 md:py-1.5 text-xs md:text-sm font-medium text-white bg-white/10 hover:bg-white/20 rounded border border-white/20 transition-all"
                >
                  로그아웃
                </button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <button className="px-2 md:px-3 py-1 md:py-1.5 text-xs md:text-sm font-medium text-white bg-white/10 hover:bg-white/20 rounded border border-white/20 transition-all">
                    로그인
                  </button>
                </Link>
                <Link to="/register">
                  <button className="px-2 md:px-3 py-1 md:py-1.5 text-xs md:text-sm font-medium text-white bg-dc-blue-600 hover:bg-dc-blue-700 rounded border border-dc-blue-700 shadow-sm transition-all">
                    회원가입
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
