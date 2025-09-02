'use client'
import Image from "next/image"
import { EffectFade, Navigation, Pagination, Parallax } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"
import { OverlayBg } from "../../ui/overlay/overlay-bg"
import GradientOverlay from "../../ui/overlay/gradient-overlay"
import { ReactNode, useState } from "react"
import { IHeroInfo } from "@/types/hero-data"



interface IHeroHomeSlider {
    items: IHeroInfo[];
    renderSlide: (item: IHeroInfo) => ReactNode;
}

export function SwiperParallax({
    items,
    renderSlide,
}: IHeroHomeSlider) {
    const [_, setIsSwiper] = useState(false)
    return <Swiper
        modules={[Parallax, EffectFade, Navigation, Pagination]}
        effect="fade"
        parallax={true}
        loop={true}
        navigation={true}
        pagination={{ clickable: true }}
        className="w-full h-[60vh] md:h-[90vh] min-h-[400px] overflow-hidden"
        onSwiper={() => {
            setIsSwiper(true)
        }}

    >
        <div
            slot="container-start"
            className="absolute inset-0 z-0"
            data-swiper-parallax="-20%"
        >
        </div>
        {items.map((item) => (
            <SwiperSlide key={item.id}>
                <div className="relative w-full h-full">
                    {item.imgLocal ? (
                        <Image
                            src={`/hero${item.imgLocal}`}
                            alt={item.title}
                            fill
                            className="object-cover object-top"
                            priority
                        />
                    ) : (
                        <Image
                            src="/people-hero.jpg"
                            alt="Default Hero Background"
                            fill
                            className="object-cover object-center" 
                            priority
                        />
                    )}
                    <OverlayBg className="bg-black/60" />

                    <GradientOverlay />
                    <GradientOverlay position="top" />
                    <GradientOverlay position="right" />
                    <GradientOverlay position="bottom" />

                    {renderSlide(item)}







                </div>
            </SwiperSlide>
        ))}
    </Swiper>
}