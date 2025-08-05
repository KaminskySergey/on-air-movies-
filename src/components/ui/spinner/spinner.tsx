export const Spinner = () => {
    return (
    <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-50">
        <div className="relative w-12 h-12">
            <div className="absolute inset-0 border-4 border-t-transparent border-b-transparent border-l-yellow-500 border-r-yellow-500 rounded-full animate-spin"></div>
            <div className="absolute inset-2 border-4 border-t-yellow-500 border-b-yellow-500 border-l-transparent border-r-transparent rounded-full animate-spin-reverse"></div>
        </div>
    </div>
    )
}