import { cn } from "@/utils/utils";
import { ReactNode } from "react"

export const ButtonSwiper = ({
    children,
    className,
}: {
    children: ReactNode;
    className?: string;
}) => {
    return (
        <button
            type="button"
            className={cn(
                `cursor-pointer
          absolute top-1/2 -translate-y-1/2 z-10
          flex items-center justify-center
          w-14 h-14 rounded-full
          bg-black/40 text-blue-500
          shadow-lg backdrop-blur-sm
          transition-all duration-300
          hover:bg-black/60 hover:text-blue-400
          active:scale-90`,
                className
            )}
        >
            {children}
        </button>
    );
};