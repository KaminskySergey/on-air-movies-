

'use client'

import { IMovie } from "@/types/popular-movies"
import { PlayIcon } from "../ui/svg/play"
import { cn, getYearFromDate } from "@/utils/utils"
import { useState } from "react"
import { getTrailer } from "../../../actions/movies"
import Modal from "../ui/modal/modal"
import { ArrowDownIcon } from "../ui/svg/arrow-down"
import { Trailer } from "../ui/trailer/trailer"
import { useCustomSearchParams } from "@/hooks/use-search-params"
import Image from "next/image"

interface ITopMovieItem {
    movie: IMovie
    isActive: number | boolean
    isVisible: (index: number) => boolean
    idx: number
}

export function TopMovieItem({ movie, isActive, isVisible, idx }: ITopMovieItem) {
    // const [_, setLoading] = useState(false)
    const [trailerKey, setTrailerKey] = useState<string | null>(null);
    const [isOpen, setIsOpen] = useState(false)
    const { searchParams } = useCustomSearchParams()
    const [hovered, setHovered] = useState(false);
    const id = searchParams.get('id')
    const type = searchParams.get('type') || "movies";
    async function handleOpenTrailer() {
        // setLoading(true);
        try {
            const res = await getTrailer(type, id);
            setTrailerKey(res.results[0].key);
            handleChange()
        } catch (error) {
            console.log((error as Error).message);
        } finally {
            // setLoading(false);
        }
    }
    const handleChange = () => setIsOpen(pS => !pS)
    console.log(movie)
    return <>
        <div
            className={cn(
                "relative w-full aspect-[2/3] overflow-hidden rounded-lg shadow-lg transition-transform duration-300 ease-in-out",
                {
                    "scale-105 shadow-2xl hover:scale-105  cursor-pointer": isActive,   
                }
            )}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            <Image
                fill
                sizes="48"
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie?.name || movie.id.toString()}
                className={cn("w-full h-full object-cover")}
            />
            {!isVisible(idx) && (
                <div className="absolute inset-0 bg-black/30 backdrop-blur-sm rounded-lg"></div>
            )}
            {isActive && <div className="absolute bottom-0 left-0 w-full h-full  bg-black/70 to-transparent p-2 text-white flex flex-col justify-between">
                <div>
                    <div>
                        <h3>{movie.name || movie.title} ({movie.original_language})</h3>
                    </div>
                    <div className="flex items-center text-xs">
                        {Array.from({ length: 5 }).map((_, i) => (
                            <span key={i}>
                                {i < Math.round(movie.vote_average / 2) ? '⭐' : '☆'}
                            </span>
                        ))}
                        <p className="pl-4 text-[18px]">{getYearFromDate(movie.release_date || movie.first_air_date)}</p>
                    </div>
                </div>
                <div className="flex flex-col items-center">
                    <p className="text-[12px] line-clamp-4 text-left">{movie.overview}</p>
                    <ArrowDownIcon />
                </div>
            </div>
                
            }
            {isActive && hovered && (
                <button
                    className="trailer-btn absolute left-1/2 top-1/2 -translate-x-1/2  -translate-y-1/2 px-3 py-1 border-none outline-none text-black opacity-90 hover:opacity-100 transition-opacity shadow-lg"
                    onClick={handleOpenTrailer}
                    autoFocus
                >
                    <PlayIcon />
                </button>
            )}
        </div>
        {isOpen && (
            <Modal isOpen={isOpen} onClose={handleChange} isTrailer>
                <Trailer trailerKey={trailerKey} />
            </Modal>
        )}
    </>
}
