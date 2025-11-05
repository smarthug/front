/**
 * Badge component with DCInside-inspired styling
 */
export const Badge = ({
  children,
  variant = 'default',
  className = '',
  ...props
}) => {
  const variants = {
    default: 'bg-dc-blue-100 text-dc-blue-700 border-dc-blue-200',
    secondary: 'bg-gray-100 text-dc-gray-700 border-dc-gray-200',
    success: 'bg-green-50 text-green-700 border-green-200',
    warning: 'bg-yellow-50 text-yellow-700 border-yellow-200',
    danger: 'bg-red-50 text-red-700 border-red-200',
  }

  return (
    <span
      className={`inline-flex items-center rounded px-2 py-0.5 text-xs font-medium border ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </span>
  )
}
