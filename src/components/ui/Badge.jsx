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
    default: 'bg-dc-bg-hover text-dc-navy-700 border-dc-bg-divider',
    secondary: 'bg-dc-bg-hover text-dc-gray-600 border-dc-bg-divider',
    success: 'bg-green-50 text-dc-green-500 border-green-200',
    warning: 'bg-yellow-50 text-dc-yellow-600 border-yellow-200',
    danger: 'bg-red-50 text-dc-red-500 border-red-200',
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
