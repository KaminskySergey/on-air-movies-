"use client"
import { IMovie } from "@/types/popular-movies"
import { cn } from "@/utils/utils"
import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import { EffectFade, FreeMode, Navigation, Thumbs } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"
import 'swiper/css/thumbs';
import { Spinner } from "@/components/ui/spinner/spinner"
import 'react-loading-skeleton/dist/skeleton.css'
import { useCustomSearchParams } from "@/hooks/use-search-params"
import { HeroContainer } from "@/components/ui/hero/hero-container"
import SwiperCore from 'swiper';
import { IHeroDetails } from "@/types/hero-data"

import type { Swiper as SwiperType } from 'swiper';
import { getHeroInfoKino } from "../../../../actions/movies"
import { IGenres } from "@/types/genres"

interface IHeroKinoSlider {
    data: IMovie[]
    category: "movie" | "tv"
    genresData: IGenres[]
    // heroDetails: IHeroDetails | null
}

export const HeroKinoSlider = ({ genresData, category, data }: IHeroKinoSlider) => {
    const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
    // const [activeIndex, setActiveIndex] = useState(0)
    const [isSwiper, setIsSwiper] = useState(false)
    // const [isLoadingImg, setIsLoadingImg] = useState(true);
    const [heroDetails, setHeroDetails] = useState<null | IHeroDetails>(null);
    const [isLoadingDetails, setIsLoadingDetails] = useState(true);
    const { router, searchParams, pathname } = useCustomSearchParams();
    const currentId = searchParams.get('id') || data[0].id;

    const outerSwiperRef = useRef<SwiperCore>(null);

    const initialIndex = data.findIndex(m => m.id.toString() === currentId);
    const [activeIndex, setActiveIndex] = useState(initialIndex);


    const onSlideChange = (realIndex: number) => {
        if (realIndex === activeIndex) return;
        setActiveIndex(realIndex);
        setIsLoadingDetails(true);
        setHeroDetails(null);

        const movieId = data[realIndex].id;

        const newSearchParams = new URLSearchParams(searchParams.toString());
        newSearchParams.set('id', movieId.toString());

        router.replace(`${pathname}?${newSearchParams.toString()}`, { scroll: false });
    };
    useEffect(() => {
        if (!currentId) return;

        let isCurrent = true;
        setIsLoadingDetails(true);
        setHeroDetails(null);

        const fetchGetHeroDetail = async () => {
            try {
                const data = await getHeroInfoKino(category, currentId.toString());
                if (!isCurrent) return;
                const { cast } = data.credits;
                const { runtime, number_of_episodes, number_of_seasons } = data.details;
                const { backdrops } = data.images;
                setHeroDetails({ cast, runtime, number_of_episodes, number_of_seasons, backdrops });
                setIsLoadingDetails(false);
            } catch (error) {
                if (!isCurrent) return;
                setIsLoadingDetails(false);
                console.error(error);
            }
        };

        fetchGetHeroDetail();

        return () => {
            isCurrent = false;
        };
    }, [currentId]);

    useEffect(() => {
    }, [isLoadingDetails, heroDetails]);

    const currentFilteredMovie = data.find(el => el.id.toString() === currentId.toString());
    return (<>
        <Swiper
            modules={[Navigation, Thumbs, EffectFade]}
            // parallax={true}
            loop={true}
            // key={currentId}
            onSlideChange={(swiper) => onSlideChange(swiper.realIndex)}
            initialSlide={activeIndex}
            onSwiper={(swiper) => {
                setThumbsSwiper(swiper);
                setIsSwiper(true);
                outerSwiperRef.current = swiper;
            }}
            navigation={true}
            thumbs={{ swiper: thumbsSwiper }}
            pagination={{ clickable: true }}
            className="w-full h-[65vh] md:h-[80vh]"

        >
            {data.map((movie) => (
                <SwiperSlide key={movie.id}>
                    {!isSwiper && currentFilteredMovie && (
                        <HeroContainer genresData={genresData} category={category} outerSwiperRef={outerSwiperRef} isLoadingDetails={isLoadingDetails}
                            item={currentFilteredMovie} heroDetails={heroDetails} />
                    )}
                    {isSwiper && <HeroContainer genresData={genresData} category={category} outerSwiperRef={outerSwiperRef} isLoadingDetails={isLoadingDetails} item={movie} heroDetails={heroDetails} />}
                </SwiperSlide>
            ))}

        </Swiper>

        <div className="h-[170px]  w-full flex items-center">
            <Swiper
                onSwiper={(swiper) => {
                    setThumbsSwiper(swiper);
                    setIsSwiper(true);
                }}
                loop={true}
                slideToClickedSlide={true}
                spaceBetween={10}
                slidesPerView={7}
                freeMode={true}
                breakpoints={{
                    0: {
                        slidesPerView: 3,
                    },
                    768: {
                        slidesPerView: 5,
                    },

                    1024: {
                        slidesPerView: 7,
                    },

                }}
                modules={[FreeMode, Navigation, Thumbs]}
                className="w-full h-[80%]"
            >
                {data.map((movie, idx) => (
                    <SwiperSlide key={movie.id} >
                        {isSwiper ? <div
                            className={cn(
                                "relative w-full h-full transition-transform duration-300  swiper-slide-content")}
                        >
                            {/* {isLoadingImg && ( */}
                            <div className="absolute inset-0 bg-neutral-900 rounded-lg">
                                <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-neutral-900 via-neutral-700 to-neutral-900 animate-[shimmer_1.8s_infinite]"></div>
                            </div>
                            {/* )} */}
                            <Image
                                src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                                alt={movie.title || movie.name || movie.original_title}
                                fill
                                className={cn("object-cover object-center rounded-lg", {
                                    "border-2 border-blue-500 scale-110 z-10 transition-transform duration-300 ease-in-out": idx === activeIndex
                                })}
                                priority
                                unoptimized
                                sizes="48"

                            // onLoad={() => setIsLoadingImg(false)}
                            />
                        </div> : <Spinner />}
                    </SwiperSlide>
                ))}
            </Swiper>

        </div>
    </>)
}