/**
 * Card component with DCInside-inspired styling
 */
export const Card = ({ children, className = '', ...props }) => {
  return (
    <div
      className={`rounded border border-dc-gray-200 bg-dc-bg-board shadow-sm ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}

export const CardHeader = ({ children, className = '', ...props }) => {
  return (
    <div className={`flex flex-col space-y-1.5 p-4 border-b border-dc-gray-200 bg-dc-bg-hover ${className}`} {...props}>
      {children}
    </div>
  )
}

export const CardTitle = ({ children, className = '', ...props }) => {
  return (
    <h3
      className={`text-lg font-semibold leading-none text-dc-gray-800 ${className}`}
      {...props}
    >
      {children}
    </h3>
  )
}

export const CardDescription = ({ children, className = '', ...props }) => {
  return (
    <p className={`text-sm text-dc-gray-500 ${className}`} {...props}>
      {children}
    </p>
  )
}

export const CardContent = ({ children, className = '', ...props }) => {
  return (
    <div className={`p-4 ${className}`} {...props}>
      {children}
    </div>
  )
}

export const CardFooter = ({ children, className = '', ...props }) => {
  return (
    <div className={`flex items-center p-4 pt-0 ${className}`} {...props}>
      {children}
    </div>
  )
}
