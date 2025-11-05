import { forwardRef } from 'react'

/**
 * Input component with DCInside-inspired styling
 */
export const Input = forwardRef(
  ({ className = '', type = 'text', ...props }, ref) => {
    return (
      <input
        type={type}
        className={`flex h-9 w-full rounded border border-dc-bg-divider bg-white px-3 py-2 text-sm text-dc-gray-700 ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-dc-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-dc-navy-600 focus-visible:ring-offset-1 focus-visible:border-dc-navy-600 disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-dc-bg-hover ${className}`}
        ref={ref}
        {...props}
      />
    )
  }
)

Input.displayName = 'Input'
