import { PlayHeroIcon } from "../svg/play-hero"

interface IButtonTrailer {
    handleOpenTrailer: () => void
}

export const ButtonTrailer = ({handleOpenTrailer}: IButtonTrailer) => {
    return <button
    onClick={handleOpenTrailer}
    className=" flex justify-center  gap-2 items-center w-[128px] h-[32px]  md:w-[156px] md:h-[50px] cursor-pointer rounded-lg bg-blue-500 py-1 px-3  md:py-3 md:px-6 font-sans  font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
>
    <PlayHeroIcon />
    <p className="text-[10px] md:text-base">Trailer</p>
</button>
}