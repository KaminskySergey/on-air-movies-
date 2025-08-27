import { cn } from "@/utils/utils"

export const ArrowRight = ({className}: {className?: string}) => {
    return <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={2}
    stroke="currentColor"
    className={cn("w-8 h-8 text-white", className)}
>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
</svg>
}