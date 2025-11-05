import { Link } from 'react-router-dom'

/**
 * Site footer with DCInside-inspired styling
 */
export const Footer = () => {
  return (
    <footer className="mt-12 border-t-2 border-dc-gray-200 bg-dc-gray-600 text-white">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-sm text-gray-300">
            <p className="mb-1">디시 클론 - DCInside Clone Gallery</p>
            <p className="text-xs text-gray-400">
              Educational project inspired by DCInside
            </p>
          </div>

          <nav className="flex gap-4 text-sm">
            <Link
              to="/"
              className="text-gray-300 hover:text-white hover:no-underline transition-colors"
            >
              갤러리
            </Link>
            <Link
              to="/hot"
              className="text-gray-300 hover:text-white hover:no-underline transition-colors"
            >
              핫게시물
            </Link>
          </nav>
        </div>

        <div className="mt-4 pt-4 border-t border-gray-500 text-center text-xs text-gray-400">
          <p>© 2025 DC Clone. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
