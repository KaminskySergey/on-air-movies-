'use client'
import { IHeroInfo } from "@/types/hero-data"
import { SwiperParallax } from "@/components/ui/swiper/swiper-parallax"
import { HeroKinoSliderItem } from "@/components/kino/kino-hero/hero-kino-slider-item"

interface IHeroHomeSlider {
    data: IHeroInfo[];

}

export const HeroHomeSlider = ({ data }: IHeroHomeSlider) => {
    return <SwiperParallax items={data} renderSlide={(data) => <HeroKinoSliderItem item={data}/>}/>
}