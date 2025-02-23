import React from "react"

export const Skeleton = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div className={"animate-pulse rounded-md bg-zinc-300 dark:bg-zinc-700 " + className} {...props} ref={ref} />
  ),
)
Skeleton.displayName = "Skeleton"

