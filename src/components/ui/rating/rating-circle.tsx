interface IRatingCircle {
    value: number
}

export const RatingCircle = ({ value }: IRatingCircle) => {
    const percentage = (value / 10) * 100;

    let strokeColor = "stroke-green-500";
    if (value <= 4) strokeColor = "stroke-red-600";
    else if (value < 7) strokeColor = "stroke-yellow-400";

    const radius = 28; 
    const strokeWidth = 4;
    const circumference = 2 * Math.PI * radius;

    return (
        <div className="relative w-8 h-8 md:w-16 md:h-16 flex items-center justify-center">
            <div className="absolute inset-0 rounded-full bg-black shadow-lg" />

            <svg className="w-full h-full -rotate-90 relative z-10" viewBox="0 0 64 64">
                <circle
                    className="text-gray-700"
                    stroke="currentColor"
                    strokeWidth={strokeWidth}
                    fill="transparent"
                    r={radius}
                    cx="32"
                    cy="32"
                />
                <circle
                    className={strokeColor}
                    stroke="currentColor"
                    strokeWidth={strokeWidth}
                    fill="transparent"
                    r={radius}
                    cx="32"
                    cy="32"
                    strokeDasharray={circumference}
                    strokeDashoffset={circumference - (percentage / 100) * circumference}
                    strokeLinecap="round"
                />
            </svg>

            <div className="absolute flex items-start z-20">
                <span className="text-white text-[10px] md:text-lg font-bold relative">
                    {value.toFixed(1) ?? "N/A"}
                    <span className="absolute top-[1px] md:top-[3px] right-[-5px] md:right-[-7px] text-[5px] md:text-[7px] text-gray-300">
                        %
                    </span>
                </span>
            </div>
        </div>
    );
};