"use client"
import { IMovieDetails } from "@/types/popular-movies"
import { formatDate, formatRuntime, truncateText } from "@/utils/utils"
import Image from "next/image"
import { GenresItem } from "../ui/genres/genres-item"
import { RatingCircle } from "../ui/rating/rating-circle"
import { ButtonTrailer } from "../ui/button/button-trailer"

import { List } from "../ui/list/list"
import Modal from "../ui/modal/modal"
import { Trailer } from "../ui/trailer/trailer"
import { useTrailer } from "@/hooks/use-trailer"

interface IKinoDetailsInfo {
    item: IMovieDetails
    category: "movie" | "tv"
}

export const KinoDetailsInfo = ({ category, item }: IKinoDetailsInfo) => {
    const { trailerKey, isToggle, handleOpenTrailer, handleToggle } = useTrailer(category, item.id);


    const posterUrl = `https://image.tmdb.org/t/p/w500${item.poster_path}`;
    return (
        <>
            <div className="relative hidden sm:block z-10 w-[300px] h-[500px] flex-shrink-0">
                <Image
                    src={posterUrl}
                    alt={item.title || item.name || item.id.toString()}
                    fill
                    className="object-cover rounded-2xl shadow-lg"
                    sizes="48"
                    priority
                    unoptimized
                />
            </div>
            <div className="text-white lg:py-3  flex flex-col gap-4 lg:gap-5">
                <div >
                    <h2 className="text-xl sm:text-3xl md:text-5xl  font-bold">
                        {item.title || item.name}
                        {/* <span className="pl-2 font-medium text-gray-500 ">{`(${item.release_date.split("-")[0]})`}</span> */}
                    </h2>

                </div>


                <div className="flex items-center flex-wrap gap-2 sm:gap-3 ">
                    <div className="flex items-center gap-2 ">

                        <span className="uppercase">{item.original_language}</span>


                        <span className="text-white">•</span>


                        <span>
                            {formatDate(item.release_date ?? item.first_air_date ?? "")}
                        </span>

                        <span className="text-white ml-2 md:ml-4">•</span>
                    </div>
                    <List
                        className="flex flex-wrap  gap-2 sm:gap-3"
                    >
                        {item.genres.map((el) => (
                            <GenresItem text={el.name} key={el.id} />
                        ))}
                    </List>

                    <div className="flex items-center">
                        <span className="text-white mr-2 md:mr-4">•</span>

                        {item?.runtime ? (
                            <span className="text-xs sm:text-sm text-gray-200">{formatRuntime(item.runtime)}</span>
                        ) : (
                            <span className="text-xs sm:text-sm text-gray-200">
                                {item?.number_of_seasons} Season(s), {item?.number_of_episodes} Episode(s)
                            </span>
                        )}
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <RatingCircle value={item.vote_average} />

                    <div className="w-px h-8 bg-gray-600" />

                    <div className="text-sm text-gray-300">
                        {item.vote_count.toString()} <span className="text-gray-400">votes</span>
                    </div>
                </div>
                <div>
                    <p className="mt-2 text-sm sm:text-lg italic  text-gray-500 tracking-wide">
                        “{item.tagline}”
                    </p>
                </div>
                <div className="w-full sm:max-w-[500px]">
                    <p
                        className="block md:hidden  text-xs sm:text-sm md:text-base text-gray-200"
                    >
                        {truncateText(item.overview, 150)}
                    </p>
                    <p
                        className="hidden md:block  text-xs sm:text-sm md:text-base text-gray-200"
                    >
                        {truncateText(item.overview, 250)}

                    </p>
                </div>
                <div>
                    <ButtonTrailer handleOpenTrailer={handleOpenTrailer} />
                </div>
            </div>
            {isToggle && <Modal isOpen={isToggle} onClose={handleToggle} isTrailer>
                <Trailer trailerKey={trailerKey} />
            </Modal>}
        </>
    )
}