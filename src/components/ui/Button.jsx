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
  const baseClasses = 'inline-flex items-center justify-center rounded font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-dc-blue-500 focus-visible:ring-offset-1 disabled:opacity-50 disabled:pointer-events-none border'

  const variants = {
    default: 'bg-gradient-to-b from-[#5B9BDF] to-[#3B7AC5] border-dc-blue-600 text-white hover:from-[#4A8BCE] hover:to-[#2A6AB4] shadow-sm',
    secondary: 'bg-gradient-to-b from-white to-gray-50 border-dc-gray-300 text-dc-gray-700 hover:from-gray-50 hover:to-gray-100',
    outline: 'border-dc-gray-300 bg-white hover:bg-dc-bg-hover text-dc-gray-700',
    ghost: 'border-transparent hover:bg-dc-bg-hover hover:border-dc-gray-200 text-dc-gray-700',
    destructive: 'bg-gradient-to-b from-red-500 to-red-600 border-red-600 text-white hover:from-red-600 hover:to-red-700',
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
