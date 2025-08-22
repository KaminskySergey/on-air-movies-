"use client"
import Image from "next/image"
import { OverlayBg } from "../overlay/overlay-bg"
import GradientOverlay from "../overlay/gradient-overlay"
import { List } from "../list/list"
import { GenresItem } from "../genres/genres-item"
import { formatRuntime, getGenreName, truncateText } from "@/utils/utils"
import { IMovie } from "@/types/popular-movies"
import { ActorsListHero } from "../list/actors-list-hero"
import SwiperCore from 'swiper';
import { SkeletonWrapper } from "../spinner/skeleton-wrapper"
import { IHeroDetails } from "@/types/hero-data"
import { HeroPosters } from "./hero-posters"
import { PlayHeroIcon } from "../svg/play-hero"
import Modal from "../modal/modal"
import { Trailer } from "../trailer/trailer"
import { useState } from "react"
import { useToggle } from "@/hooks/use-toggle"
import { getTrailer } from "../../../../actions/movies"
import { SkeletonPosters } from "../spinner/skeleton-posters"
import { IGenres } from "@/types/genres"

interface IHeroContainer {
    item: IMovie
    heroDetails: IHeroDetails | null
    isLoadingDetails: boolean
    outerSwiperRef: React.MutableRefObject<SwiperCore | null>
    category: string
    genresData: IGenres[]
}

export const HeroContainer = ({genresData, category, outerSwiperRef, item, heroDetails, isLoadingDetails }: IHeroContainer) => {
    const { isToggle, handleToggle } = useToggle()
    const [trailerKey, setTrailerKey] = useState<string | null>(null);
    async function handleOpenTrailer() {
        // setLoading(true);
        try {
            const res = await getTrailer(category, item.id.toString());
            setTrailerKey(res.results[0].key);
            handleToggle()
        } catch (error) {
            console.log((error as Error).message);
        } finally {
            // setLoading(false);
        }
    }

    return <>
        <div className="relative w-full h-full">
            <Image
                src={`https://image.tmdb.org/t/p/original${item.backdrop_path}`}
                alt={item.title || item.original_title || item.name || item.id.toString()}
                fill
                className="object-cover object-top"
                priority
                sizes="48"

            />

            <OverlayBg className="bg-black/60" />

            <GradientOverlay />
            <GradientOverlay position="top" />
            <GradientOverlay position="right" />
            <GradientOverlay position="bottom" className="pointer-events-none" />




            <SkeletonWrapper loading={isLoadingDetails}>
                <div
                    className={`absolute pt-[32px]  gap-0 h-full w-full lg:pt-[calc(84px+1rem)] lg:pb-10 lg:mx-0 flex flex-col lg:flex-row my-4 justify-center px-4 sm:px-8 lg:px-20 z-10
         text-white  `}
                >

                    <div className={`flex flex-col    mx-[24px] gap-5 md:gap-7  inset-0 transition-all duration-300 ${isLoadingDetails ? "opacity-50 blur-sm" : "opacity-100 blur-none"
                        }`}>
                        <div >
                            <h2
                                className="text-2xl sm:text-3xl md:text-5xl font-bold"

                            >
                                {item.title}
                            </h2>

                        </div>

                        <div className="flex items-center flex-wrap gap-2 sm:gap-3 ">
                            <div className="flex items-center gap-2 ">
                                <span className="text-yellow-400">★</span>
                                <span>{item.vote_average.toFixed(1)}</span>
                                <span className="text-gray-500">|</span>
                                <span>{item.vote_count.toString()}</span>
                                <span className="text-white ml-2 md:ml-4">•</span>
                            </div>
                            <List
                                className="flex flex-wrap  gap-2 sm:gap-3"
                            >
                                {item.genre_ids.map((id) => (
                                    <GenresItem text={getGenreName(genresData, id)} key={id} />
                                ))}
                            </List>

                            <div className="flex items-center">
                                <span className="text-white mr-2 md:mr-4">•</span>
                                
                                {heroDetails?.runtime ? (
                                    <span className="text-xs sm:text-sm text-gray-200">{formatRuntime(heroDetails.runtime)}</span>
                                ) : (
                                    <span className="text-xs sm:text-sm text-gray-200">
                                        {heroDetails?.number_of_seasons} Season(s), {heroDetails?.number_of_episodes} Episode(s)
                                    </span>
                                )}
                            </div>
                        </div>


                        <div className="w-full sm:max-w-[500px]">
                            <p
                                className="block md:hidden  text-xs sm:text-sm md:text-base text-gray-200"
                            >
                                {truncateText(item.overview, 150)}
                                {/* {movie.overview} */}
                            </p>
                            <p
                                className="hidden md:block  text-xs sm:text-sm md:text-base text-gray-200"
                            >
                                {truncateText(item.overview, 250)}

                            </p>
                        </div>
                        <div className="h-[48px]">
                            {heroDetails && <ActorsListHero isLoadingDetails={isLoadingDetails} cast={heroDetails?.cast} />}
                        </div>
                        <div>
                            <button
                                onClick={handleOpenTrailer}
                                className=" flex justify-center  gap-2 items-center w-[128px] h-[32px]  md:w-[156px] md:h-[50px] cursor-pointer rounded-lg bg-blue-500 py-1 px-3  md:py-3 md:px-6 font-sans  font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                            >
                                <PlayHeroIcon />
                                <p className="text-[10px] md:text-base">Trailer</p>
                            </button>
                        </div>
                    </div>
                    <div
                        className={` hidden md:flex  mt-[12px] md:mt-0 lg:items-end items-end justify-end mx-[24px] md:mb-8
    transition-all duration-300
    ${isLoadingDetails ? "opacity-50 blur-sm" : "opacity-100 blur-none"}
  `}
                        style={{ minWidth: '300px', minHeight: '100px' }}
                    >
                        {isLoadingDetails ? (
                            <SkeletonPosters />
                        ) : (
                            heroDetails && heroDetails.backdrops && heroDetails.backdrops.length > 0 && (
                                <HeroPosters
                                    outerSwiperRef={outerSwiperRef}
                                    posters={heroDetails.backdrops}
                                />
                            )
                        )}
                    </div>

                </div>
            </SkeletonWrapper>
        </div>
        {isToggle && <Modal isOpen={isToggle} onClose={handleToggle} isTrailer>
            <Trailer trailerKey={trailerKey} />
        </Modal>}
    </>
}

