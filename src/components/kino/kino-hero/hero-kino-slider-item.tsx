'use client'

import { Container } from "@/components/ui/container"
import { GenresItem } from "@/components/ui/genres/genres-item"
import { List } from "@/components/ui/list/list"
import { GENRES } from "@/const/genres"
import { IHeroInfo } from "@/types/hero-data"
import { getGenreName, truncateText } from "@/utils/utils"
interface IHeroKinoSliderItem {
    item: IHeroInfo 
 }

export function HeroKinoSliderItem({item}: IHeroKinoSliderItem) {
    return <Container className="absolute pt-[32px] md:pt-[76px] mx-[24px] md:mx-0 inset-0 flex flex-col gap-1 md:gap-5 justify-center px-4 sm:px-8 md:px-20 z-10 text-white">
        <h2
            className="text-2xl sm:text-3xl md:text-7xl font-bold"
            data-swiper-parallax="-300"
        >
            {item.title}
        </h2>

        <div
            data-swiper-parallax="-300"
            className="flex flex-wrap items-center gap-2 text-yellow-400"
        >
            <span className="text-lg sm:text-xl">⭐</span>
            <span className="font-semibold text-base sm:text-lg">
                {item.vote_average.toFixed(1)} / 10
            </span>
            <span className="text-gray-300 text-xs sm:text-sm">
                {item.vote_count.toString()} votes
            </span>
        </div>

        <List
            data-swiper-parallax="-300"
            className="flex flex-wrap gap-2 sm:gap-3"
        >
            {item.genre_ids.map((id) => (
                <GenresItem text={getGenreName(GENRES, id)} key={id} />
            ))}
        </List>

        <div className="max-w-full sm:max-w-[500px]">
            <p
                className="block md:hidden  text-xs sm:text-sm md:text-base text-gray-200"
                data-swiper-parallax="-100"
            >
                {truncateText(item.overview, 240)}
            </p>
            <p
                className="hidden md:block  text-xs sm:text-sm md:text-base text-gray-200"
                data-swiper-parallax="-100"
            >
                {item.overview}

            </p>
        </div>
    </Container>
}
