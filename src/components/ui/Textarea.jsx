import { forwardRef } from 'react'

/**
 * Textarea component with DCInside-inspired styling
 */
export const Textarea = forwardRef(({ className = '', ...props }, ref) => {
  return (
    <textarea
      className={`flex min-h-[80px] w-full rounded border border-dc-gray-300 bg-white px-3 py-2 text-sm text-dc-gray-700 ring-offset-white placeholder:text-dc-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-dc-blue-500 focus-visible:ring-offset-1 focus-visible:border-dc-blue-500 disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-dc-bg-hover ${className}`}
      ref={ref}
      {...props}
    />
  )
})

Textarea.displayName = 'Textarea'
