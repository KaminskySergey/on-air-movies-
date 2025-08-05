import { cn } from "@/utils/utils"

interface IOverlayBg {
    className: string
}

export const OverlayBg = ({ className }: IOverlayBg) => {
    return <div className={cn("absolute inset-0 ", className)} />
}