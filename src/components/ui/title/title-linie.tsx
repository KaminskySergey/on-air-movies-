export const TitleLinie = ({title}: {title: string}) => {
    return <h3 className="flex items-center text-white text-2xl font-semibold tracking-wide">
    {title}
    <span className="ml-4 flex-1 h-[1px] bg-gray-800"></span>
</h3>
}