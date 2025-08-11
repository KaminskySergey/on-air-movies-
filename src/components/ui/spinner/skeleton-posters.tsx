


export const SkeletonPosters = () => {
    return <div className="flex items-end space-x-3 w-[500px] h-[200px]  overflow-x-auto scrollbar">
    {[...Array(3)].map((_, i) => (
      <div
        key={i}
        className="w-[150px] h-[100px] rounded-2xl bg-gray-700 animate-pulse"
      />
    ))}
  </div>
}