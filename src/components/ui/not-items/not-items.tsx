interface INotItems {
    title: string
    text: string
}

export const NotItems = ({ title, text }: INotItems) => {
    return (
        <div className="flex flex-col items-center justify-center h-64 bg-gray-800 rounded-lg shadow-md p-4 text-center">
            <h3 className="text-white font-semibold text-lg sm:text-xl">
                {title}
                
            </h3>
            <p className="text-gray-400 text-sm sm:text-base mt-1">
                {text}
                
            </p>
        </div>
    )
}