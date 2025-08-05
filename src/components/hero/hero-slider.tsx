'use client'
import { getGenreName, truncateText } from "@/utils/utils"
import Image from "next/image"
import { EffectFade, Navigation, Pagination, Parallax } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"
import { OverlayBg } from "../ui/overlay/overlay-bg"
import GradientOverlay from "../ui/overlay/gradient-overlay"
import { IHeroInfo } from "@/types/hero-data"
import { List } from "../ui/list/list"
import { GenresItem } from "../ui/genres/genres-item"
import { Container } from "../ui/container"

interface IHeroSlider {
    data: IHeroInfo[]
}

export const HeroSlider = ({ data }: IHeroSlider) => {
    return <Swiper
        modules={[Parallax, EffectFade, Navigation, Pagination]}
        effect="fade"
        parallax={true}
        loop={true}
        navigation={true}
        pagination={{ clickable: true }}
        className="w-full h-[50vh] md:h-[90vh]  "

    >
        <div
            slot="container-start"
            className="absolute inset-0 z-0"
            data-swiper-parallax="-20%"
        >
        </div>
        {data.map((movie) => (
            <SwiperSlide key={movie.id}>
                <div className="relative w-full h-full">
                    {/* Фон слайд */}
                    <Image
                        src={`/hero${movie.imgLocal}`}
                        alt={movie.title}
                        fill
                        className="object-cover object-top"
                        priority
                    />

                    <OverlayBg className="bg-black/60" />

                    <GradientOverlay />
                    <GradientOverlay position="top" />
                    <GradientOverlay position="right" />
                    <GradientOverlay position="bottom" />





                    <Container className="absolute pt-[32px] md:pt-0 mx-[24px] md:mx-0 inset-0 flex flex-col gap-1 md:gap-5 justify-center px-4 sm:px-8 md:px-20 z-10 text-white">

                        <h2
                            className="text-2xl sm:text-3xl md:text-7xl font-bold"
                            data-swiper-parallax="-300"
                        >
                            {movie.title}
                        </h2>

                        <div
                            data-swiper-parallax="-300"
                            className="flex flex-wrap items-center gap-2 text-yellow-400"
                        >
                            <span className="text-lg sm:text-xl">⭐</span>
                            <span className="font-semibold text-base sm:text-lg">
                                {movie.vote_average.toFixed(1)} / 10
                            </span>
                            <span className="text-gray-300 text-xs sm:text-sm">
                                {movie.vote_count.toString()} votes
                            </span>
                        </div>

                        <List
                            data-swiper-parallax="-300"
                            className="flex flex-wrap gap-2 sm:gap-3"
                        >
                            {movie.genre_ids.map((id) => (
                                <GenresItem text={getGenreName(id)} key={id} />
                            ))}
                        </List>

                        <div className="max-w-full sm:max-w-[500px]">
                            <p
                                className="block md:hidden  text-xs sm:text-sm md:text-base text-gray-200"
                                data-swiper-parallax="-100"
                            >
                                {truncateText(movie.overview, 240)}
                                {/* {movie.overview} */}
                            </p>
                            <p
                                className="hidden md:block  text-xs sm:text-sm md:text-base text-gray-200"
                                data-swiper-parallax="-100"
                            >
                                {movie.overview}

                            </p>
                        </div>
                    </Container>
                </div>
            </SwiperSlide>
        ))}
    </Swiper>
}