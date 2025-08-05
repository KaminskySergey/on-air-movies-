import { cn } from "@/utils/utils"
import { ReactNode } from "react"

interface IList {
    children: ReactNode
    className?: string
    ref?: React.Ref<HTMLUListElement>
}

export const List = ({ref, children, className, ...props }: IList) => {
    return <ul  ref={ref} className={cn("", className)} {...props}>
        {children}
    </ul>
}