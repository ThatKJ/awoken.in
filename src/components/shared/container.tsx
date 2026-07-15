import { cn } from "@/lib/utils"

interface ContainerProps {
  children: React.ReactNode
  className?: string
}

export function Container({ children, className }: ContainerProps) {
  return (
    <div className={cn("mx-auto w-full max-w-full lg:max-w-7xl xl:max-w-[1600px] 2xl:max-w-[1700px] px-4 sm:px-6 lg:px-8 xl:px-12", className)}>
      {children}
    </div>
  )
}
