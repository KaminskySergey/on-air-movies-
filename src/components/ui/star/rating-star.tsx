interface IRatingStar {
  value: number;
  max?: number;
  size?: number;
}

export default function RatingStar({
  value,
  max = 5,
  size = 24,
}: IRatingStar) {
  return (
    <div className="flex items-center space-x-1">
      {Array.from({ length: max }, (_, i) => {
        const starValue = i + 1;
        const isFull = starValue <= Math.floor(value);
        const isHalf = !isFull && starValue - value <= 0.5;

        return (
          <svg
            key={i}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill={isFull ? "#facc15" : isHalf ? "url(#half-grad)" : "none"}
            stroke="#facc15"
            strokeWidth={2}
            style={{ width: size, height: size }}
          >
            <defs>
              <linearGradient id="half-grad">
                <stop offset="50%" stopColor="#facc15" />
                <stop offset="50%" stopColor="transparent" />
              </linearGradient>
            </defs>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
            />
          </svg>
        );
      })}
    </div>
  );
}