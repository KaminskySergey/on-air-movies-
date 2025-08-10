"use client"
import Image from "next/image"
import { OverlayBg } from "../overlay/overlay-bg"
import GradientOverlay from "../overlay/gradient-overlay"
import { Container } from "../container"
import { List } from "../list/list"
import { GenresItem } from "../genres/genres-item"
import { formatRuntime, getGenreName, truncateText } from "@/utils/utils"
import { IMovie } from "@/types/popular-movies"
import { ActorsListHero } from "../list/actors-list-hero"

import { SkeletonWrapper } from "../spinner/skeleton-wrapper"
import { IHeroDetails } from "@/types/hero-data"

interface IHeroContainer {
    item: IMovie
    heroDetails: IHeroDetails | null
    isLoadingDetails: boolean
}

export const HeroContainer = ({ item,  heroDetails, isLoadingDetails }: IHeroContainer) => {
    // const [heroDetails, setHeroDetails] = useState<any>(null);
    // const [loading, setLoading] = useState(true);
    // console.log(currentMoviesId)
    // useEffect(() => {
    //     setLoading(true);

    //     const fetchGetHeroDetail = async () => {

    //         const data = await getHeroInfoMovies(currentMoviesId)
    //         const { cast } = data.credits;
    //         const { runtime } = data.details;
    //         const { backdrops } = data.images;
    //         setHeroDetails({ cast, runtime, backdrops });
    //         setLoading(false);
    //     }
    //     fetchGetHeroDetail()
    // }, [currentMoviesId]);
    return <div className="relative w-full h-full">
        <Image
            src={`https://image.tmdb.org/t/p/original${item.backdrop_path}`}
            alt={item.title}
            fill
            className="object-cover object-top"
            priority
            sizes="48"

        />

        <OverlayBg className="bg-black/60" />

        <GradientOverlay />
        <GradientOverlay position="top" />
        <GradientOverlay position="right" />
        <GradientOverlay position="bottom" />




        <SkeletonWrapper loading={isLoadingDetails}>
            <Container className={`absolute pt-[32px] md:pt-0 mx-[24px] md:mx-0 inset-0 flex flex-col gap-1 md:gap-5 justify-center px-4 sm:px-8 md:px-20 z-10
         text-white transition-all duration-300 ${isLoadingDetails ? "opacity-50 blur-sm" : "opacity-100 blur-none"} `}>

                <h2
                    className="text-2xl sm:text-3xl md:text-5xl font-bold"
                    data-swiper-parallax="-300"
                >
                    {item.title}
                </h2>


                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                        <span className="text-yellow-400">★</span>
                        <span>{item.vote_average.toFixed(1)}</span>
                        <span className="text-gray-500">|</span>
                        <span>{item.vote_count.toString()}</span>
                        <span className="text-white ml-4">•</span>
                    </div>
                    <List
                        data-swiper-parallax="-300"
                        className="flex flex-wrap gap-2 sm:gap-3"
                    >
                        {item.genre_ids.map((id) => (
                            <GenresItem text={getGenreName(id)} key={id} />
                        ))}
                    </List>
                    <div>
                        <span className="text-white mr-4">•</span>
                        <span >
                            {heroDetails?.runtime ? formatRuntime(heroDetails.runtime) : ""}
                        </span>

                    </div>
                </div>


                <div className="max-w-full sm:max-w-[500px]">
                    <p
                        className="block md:hidden  text-xs sm:text-sm md:text-base text-gray-200"
                        data-swiper-parallax="-100"
                    >
                        {truncateText(item.overview, 240)}
                        {/* {movie.overview} */}
                    </p>
                    <p
                        className="hidden md:block  text-xs sm:text-sm md:text-base text-gray-200"
                        data-swiper-parallax="-100"
                    >
                        {item.overview}

                    </p>
                </div>
                <div className="h-[48px]">
                    {heroDetails && <ActorsListHero isLoadingDetails={isLoadingDetails} cast={heroDetails?.cast} />}
                </div>
            </Container>
        </SkeletonWrapper>
    </div>
}

