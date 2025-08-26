import Link from "next/link"
import Image from "next/image"
import { IMovie } from "@/types/popular-movies"
import { cn, getYearFromDate } from "@/utils/utils"

interface IKinoItem {
    el: IMovie
    category: "movie" | "tv"
}

export const KinoItem = ({category, el }: IKinoItem) => {

    const imageUrl = el.poster_path || el.backdrop_path
        ? `https://image.tmdb.org/t/p/${el.poster_path ? 'w500' : 'original'}${el.poster_path || el.backdrop_path}`
        : "/placeholder.png";
    return (
        <li key={el.id} className="">
            <Link href={`/${category === "tv" ? "series" : "movies"}/${el.id}`} className="">
                <div className="relative  aspect-[2/3] rounded-3xl overflow-hidden transform transition-transform duration-300 ease-in-out hover:scale-105">
                    <Image
                        src={imageUrl}
                        alt={
                            el.title ||
                            el.original_title ||
                            el.name ||
                            "Poster image"
                          }
                        fill
                        sizes="(max-width: 640px) 100vw,
           (max-width: 1024px) 33vw, 
           20vw"
                        className="object-cover  w-full h-full"
                    />
                    <div className="absolute bottom-0 left-0 w-full h-20 flex flex-col items-center justify-center bg-black/50 backdrop-blur-md p-2">
                        <h3 className="text-white font-semibold text-center text-sm line-clamp-2">
                            {el.title || el.name}
                        </h3>
                        <span className="text-gray-300 text-xs mt-1">
                            {getYearFromDate(el.release_date || el.first_air_date)}
                        </span>
                    </div>
                    <div className={cn(
                        "absolute top-2 right-2 bg-black text-white text-xs font-bold w-8 h-8 flex items-center justify-center rounded-full border-2",
                        {
                            "border-red-600": el.vote_average <= 4,
                            "border-yellow-400": el.vote_average > 4 && el.vote_average < 7,
                            "border-green-500": el.vote_average >= 7,
                        }
                    )}>
                        {el.vote_average !== undefined && el.vote_average !== null
                            ? el.vote_average.toFixed(1)
                            : "N/A"}
                    </div>
                </div>
            </Link>
        </li>
    )
}