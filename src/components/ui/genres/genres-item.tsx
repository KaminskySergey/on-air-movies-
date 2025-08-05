export const GenresItem = ({ text }: { text: string }) => {
    return (
        <li className="px-3 py-1 bg-black/70 rounded-full  text-xs md:text-sm lg:text-base">
            <p className="whitespace-nowrap">{text}</p>
        </li>
    );
};