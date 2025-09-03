"use client"
import { IMovie } from "@/types/popular-movies"
import { Container } from "../ui/container"
import { TitleLinie } from "../ui/title/title-linie"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation } from "swiper/modules"
import Image from "next/image"
import { useState } from "react"
import { Spinner } from "../ui/spinner/spinner"
import { ArrowRightSwiper } from "../ui/svg/arrow-right-swiper"
import { ArrowLeftSwiper } from "../ui/svg/arrow-left-swiper"
import { ButtonSwiper } from "../ui/button/button-swiper"
import Link from "next/link"
import { cn, getYearFromDate } from "@/utils/utils"
import { NotItems } from "../ui/not-items/not-items"

interface IKinoDetailsRecommendations {
    recommendations: IMovie[]
    category: "movie" | "tv"
}

export const KinoDetailsRecommendations = ({ category, recommendations }: IKinoDetailsRecommendations) => {
    const [isSwiper, setIsSwiper] = useState<boolean>(false)
    return (
        <Container className="flex flex-col gap-5">
            <TitleLinie title="Recommendations" />
            {recommendations.length === 0 ? (
                <NotItems title="No recommendations available" text="Check back later for more movies or series you might like." />
            ) : (
                <div className="relative overflow-hidden h-64">

                    {
                        !isSwiper && <Spinner />
                    }
                    <Swiper
                        modules={[Navigation]}
                        navigation={{ prevEl: ".arrow-left", nextEl: ".arrow-right" }}
                        spaceBetween={20}
                        onSwiper={() => setIsSwiper(true)}
                        slidesPerView={2}
                        loop={true}
                        breakpoints={{
                            640: { slidesPerView: 3 },
                            1024: { slidesPerView: 4 },
                        }}
                    >
                        {recommendations.map((el) => (
                            <SwiperSlide key={el.id}>
                                {isSwiper && <Link href={`/${category === "tv" ? "series" : "movies"}/${el.id}`}>
                                    <div className="relative w-full h-64 rounded-lg group overflow-hidden shadow-md">

                                        <Image
                                            fill
                                            alt={el.title || el.name || el.id.toString()}
                                            src={el.poster_path
                                                ? `https://image.tmdb.org/t/p/w500${el.poster_path}`
                                                : "/placeholder.png"}
                                            className="object-cover object-center transition-transform duration-300 ease-linear group-hover:scale-105 group-hover:brightness-90"
                                            sizes="48"
                                            priority
                                            unoptimized
                                        />

                                        <div className="absolute bottom-0 left-0 w-full h-14 flex flex-col items-center justify-center bg-black/50 backdrop-blur-md p-2">
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
                                </Link>}
                            </SwiperSlide>
                        ))}

                        <ButtonSwiper className="arrow-left left-4">
                            <ArrowLeftSwiper />
                        </ButtonSwiper>

                        <ButtonSwiper className="arrow-right right-4">
                            <ArrowRightSwiper />
                        </ButtonSwiper>

                    </Swiper>

                </div>
            )
            }
        </Container >
    )
}