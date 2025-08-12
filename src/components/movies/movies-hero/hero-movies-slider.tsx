"use client"
import { IMovie } from "@/types/popular-movies"
import { cn } from "@/utils/utils"
import Image from "next/image"
import {  useEffect, useRef, useState } from "react"
import { EffectFade, FreeMode, Navigation, Thumbs } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"
import 'swiper/css/thumbs';
import { Spinner } from "@/components/ui/spinner/spinner"
import 'react-loading-skeleton/dist/skeleton.css'
import { useCustomSearchParams } from "@/hooks/use-search-params"
import { HeroContainer } from "@/components/ui/hero/hero-container"
import SwiperCore from 'swiper';
import { IHeroDetails } from "@/types/hero-data"
import { getHeroInfoMovies } from "../../../../actions/movies"
import type { Swiper as SwiperType } from 'swiper';

interface IHeroMoviesSlider {
    data: IMovie[]
    currentMoviesId: string
    category: string
    // heroDetails: IHeroDetails | null
}

export const HeroMoviesSlider = ({category, data, currentMoviesId }: IHeroMoviesSlider) => {
    const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
    // const [activeIndex, setActiveIndex] = useState(0)
    const [isSwiper, setIsSwiper] = useState(false)
    // const [isLoadingImg, setIsLoadingImg] = useState(true);
    const { router } = useCustomSearchParams();
    const [heroDetails, setHeroDetails] = useState<null | IHeroDetails>(null);
    const [isLoadingDetails, setIsLoadingDetails] = useState(true);

    const outerSwiperRef = useRef<SwiperCore>(null);

    const initialIndex = data.findIndex(m => m.id.toString() === currentMoviesId);
    const [activeIndex, setActiveIndex] = useState(initialIndex);


    const onSlideChange = (realIndex: number) => {
        if (realIndex === activeIndex) return;
        setActiveIndex(realIndex);
        setIsLoadingDetails(true);
        setHeroDetails(null);
        const movieId = data[realIndex].id;
        router.push(`/movies/${movieId}`);
    };


    useEffect(() => {
        if (!currentMoviesId) return;

        let isCurrent = true;
        setIsLoadingDetails(true);
        setHeroDetails(null);

        const fetchGetHeroDetail = async () => {
            try {
                const data = await getHeroInfoMovies(currentMoviesId);
                if (!isCurrent) return;

                const { cast } = data.credits;
                const { runtime } = data.details;
                const { backdrops } = data.images;
                setHeroDetails({ cast, runtime, backdrops });
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
    }, [currentMoviesId]);
    
    useEffect(() => {
    }, [isLoadingDetails, heroDetails]);

    const currentFilteredMovie = data.find(el => el.id.toString() === currentMoviesId.toString());
    return (<>
        <Swiper
            modules={[Navigation, Thumbs, EffectFade]}
            // parallax={true}
            loop={true}
            key={currentMoviesId}
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
                        <HeroContainer category={category} outerSwiperRef={outerSwiperRef} isLoadingDetails={isLoadingDetails}
                            item={currentFilteredMovie} heroDetails={heroDetails} />
                    )}
                    {isSwiper && <HeroContainer category={category} outerSwiperRef={outerSwiperRef} isLoadingDetails={isLoadingDetails} item={movie} heroDetails={heroDetails} />}
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
                                alt={movie.title}
                                fill
                                className={cn("object-cover object-center rounded-lg", {
                                    "border-2 border-blue-500 scale-110 z-10 transition-transform duration-300 ease-in-out": idx === activeIndex
                                })}
                                priority
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