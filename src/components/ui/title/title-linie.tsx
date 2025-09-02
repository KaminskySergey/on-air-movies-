import { cn } from "@/utils/utils"

export const TitleLinie = ({ title, className }: { title: string, className?: string }) => {
    return <h3 className={cn("flex items-center text-white text-2xl font-semibold tracking-wide", className)}>
        {title}
        <span className="ml-4 flex-1 h-[1px] bg-gray-800"></span>
    </h3>
}