/**
 * Button component with DCInside-inspired variants
 */
export const Button = ({
  children,
  variant = 'default',
  size = 'default',
  className = '',
  disabled = false,
  ...props
}) => {
  const baseClasses = 'inline-flex items-center justify-center rounded font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-dc-navy-600 focus-visible:ring-offset-1 disabled:opacity-50 disabled:pointer-events-none border'

  const variants = {
    default:
      'bg-gradient-to-b from-dc-navy-600 to-dc-navy-800 border-dc-navy-800 text-white hover:from-dc-navy-500 hover:to-dc-navy-700 shadow-sm',
    secondary:
      'bg-gradient-to-b from-white to-dc-bg-hover border-dc-bg-divider text-dc-gray-700 hover:from-dc-bg-hover hover:to-white',
    outline: 'border-dc-bg-divider bg-white hover:bg-dc-bg-hover text-dc-gray-700',
    ghost:
      'border-transparent hover:bg-dc-bg-hover hover:border-dc-bg-divider text-dc-gray-700',
    destructive:
      'bg-gradient-to-b from-dc-red-500 to-dc-red-600 border-dc-red-600 text-white hover:from-dc-red-600 hover:to-dc-red-500',
  }

  const sizes = {
    default: 'h-9 px-4 py-2 text-sm',
    sm: 'h-7 px-3 text-xs',
    lg: 'h-11 px-6 text-base',
    icon: 'h-9 w-9',
  }

  return (
    <button
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  )
}
