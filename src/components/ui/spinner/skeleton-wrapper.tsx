import { cn } from "@/utils/utils";

interface ISkeletonWrapper {
    loading: boolean;
    children: React.ReactNode;
    className?: string;
}
export const SkeletonWrapper = ({ loading, children, className = "" }: ISkeletonWrapper) => {
    return (
        <div
            className={cn("", {
                "animate-pulse bg-gray-300": loading,
            }, className)}
        >
            {children}
        </div>
    );
};