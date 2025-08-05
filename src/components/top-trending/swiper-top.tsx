
"use client"
import { Swiper, SwiperSlide, } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { IMovie } from '@/types/popular-movies';
import { EffectCoverflow, Navigation } from 'swiper/modules';
import { useEffect, useRef, useState } from 'react';
import { TopMovieItem } from './top-movie-item';
import { Swiper as SwiperType } from 'swiper';
import { useCustomSearchParams } from '@/hooks/use-search-params';
import { LeftArrow } from '../ui/svg/left-arrow';
import { RightArrow } from '../ui/svg/right-arrow';
import { Spinner } from '../ui/spinner/spinner';
interface ISwiperTop {

    topTrending: IMovie[]
    urlName: string
}

export function SwiperTop({ urlName, topTrending }: ISwiperTop) {
    const { router, pathname, createQueryString, searchParams } = useCustomSearchParams();
    const [isSwiper, setIsSwiper] = useState<boolean>(false)

    const type = searchParams.get("type")

    const [currentId, setCurrentId] = useState<string | null>(null)
    const [activeIdx, setActiveIdx] = useState<number | null>(null)

    const [visibleCount, setVisibleCount] = useState(9);

    const swiperRef = useRef<SwiperType | null>(null);

    const updateUrlWithId = (id: number) => {
        router.push(`${pathname}?${createQueryString(urlName, id.toString())}`);
    };


    // useEffect(() => {
    //     const idFromUrl = searchParams.get(urlName);
    //     setCurrentId(idFromUrl)
    //     if (!idFromUrl && topTrending.length) {
    //         updateUrlWithId(topTrending[0].id);
    //     }
    // }, [topTrending, searchParams]);


    useEffect(() => {
        const updateVisibleCount = () => {
            const w = window.innerWidth;
            if (w < 768) {
                setVisibleCount(3);
            } else if (w < 1024) {
                setVisibleCount(5);
            } else {
                setVisibleCount(9);
            }
        };

        updateVisibleCount();
        window.addEventListener('resize', updateVisibleCount);
        return () => window.removeEventListener('resize', updateVisibleCount);
    }, []);

// eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {
        const idFromUrl = searchParams.get(urlName);
        const firstId = topTrending[0]?.id?.toString();

        if (!idFromUrl && firstId) {
            updateUrlWithId(Number(firstId));
            setCurrentId(firstId);
            setActiveIdx(0);
            swiperRef.current?.slideToLoop(0);
            return;
        }

        if (idFromUrl && idFromUrl !== currentId) {
            setCurrentId(idFromUrl);
            const foundIdx = topTrending.findIndex(item => item.id.toString() === idFromUrl);
            if (foundIdx >= 0) {
                setActiveIdx(foundIdx);
                swiperRef.current?.slideToLoop(foundIdx);
            }
        }
    }, [topTrending, type]);

    const half = Math.floor(visibleCount / 2);

    const isVisible = (index: number) => {
        if (activeIdx === undefined || activeIdx === null) return true;
        const diff = Math.abs(index - activeIdx);
        return diff <= half || diff >= topTrending.length - half;
    };


    return (
        <div className="relative z-30 min-h-[300px]">
            <button className="!hidden sm:!inline-flex z-40 swiper-prev absolute top-1/2 left-[-15px] -translate-y-1/2 bg-black text-white cursor-pointer rounded-full opacity-80 hover:opacity-100">
                {isSwiper && <LeftArrow />}
            </button>
            <button className="!hidden sm:!inline-flex z-40  swiper-next absolute top-1/2 right-[-15px] -translate-y-1/2  bg-black text-white cursor-pointer rounded-full opacity-80 hover:opacity-100">
            {isSwiper && <RightArrow />}
            </button>
            <Swiper
                className='h-full flex items-center justify-center'
                modules={[Navigation, EffectCoverflow]}
                effect="coverflow"
                spaceBetween={0}
                slidesPerView={9}
                centeredSlides
                onSwiper={() => setIsSwiper(true)}
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
                coverflowEffect={{
                    rotate: 0,
                    stretch: 0,
                    depth: 100,
                    modifier: 1,
                    slideShadows: true,
                }}
                navigation={{
                    prevEl: '.swiper-prev',
                    nextEl: '.swiper-next',
                }}
                onSlideChange={(swiper) => {
                    const idx = swiper.realIndex;
                    setActiveIdx(idx);
                    const id = topTrending[idx]?.id;
                    if (id) updateUrlWithId(id);
                }}
                onInit={(swiper) => {
                    const idFromUrl = searchParams.get(urlName);
                    swiperRef.current = swiper;
                    const foundIdx = topTrending.findIndex(item => item.id.toString() === idFromUrl);
                    if (foundIdx >= 0) swiper.slideToLoop(foundIdx);
                }}
                loop
            >
                {topTrending.map((item, index) => {
                    const isActive = Number(currentId) === item.id

                    return (<SwiperSlide key={item.id}>
                        {isSwiper && <TopMovieItem movie={item} isVisible={isVisible} idx={index} isActive={isActive} />}

                    </SwiperSlide>
                    )
                })}

            </Swiper>

            {!isSwiper && (

                <Spinner />

            )}
        </div>
    );
}

