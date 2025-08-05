'use client'
import { Swiper, SwiperSlide } from "swiper/react"
import { EffectCoverflow } from "swiper/modules"
import { cn } from "@/utils/utils";
import { useState } from 'react';
import { IPerson } from '@/types/people';
import Image from "next/image";

interface ITopPeopleSwiper {
    setActivePerson: (person: IPerson) => void
    people: IPerson[]
}

export function TopPeopleSwiper({ setActivePerson, people }: ITopPeopleSwiper) {
    const [isSwiper, setIsSwiper] = useState(false)
    const [activePersonIdx, setActivePersonIdx] = useState<number>(0);


    return <div className="w-[50%] h-full overflow-hidden flex items-center justify-center">
        <div className="w-full h-[90%]">
            <Swiper
                effect="coverflow"
                grabCursor={true}
                centeredSlides={true}
                slidesPerView={2}
                spaceBetween={0}
                initialSlide={2}
                loop={true}
                onSwiper={() => setIsSwiper(true)}
                coverflowEffect={{
                    rotate: 0,
                    stretch: 0,
                    depth: 400,
                    modifier: 1,
                    slideShadows: true,
                }}
                onSlideChange={(swiper) => {
                    const idx = swiper.realIndex;
                    setActivePerson(people[idx]);
                    setActivePersonIdx(idx)
                }}
                modules={[EffectCoverflow]}
                className="h-full"
            >
                {people.map((person, idx) => {
                    const isActive = idx === activePersonIdx
                    return (
                        <SwiperSlide
                            key={person.id}
                            className={cn(
                                "relative flex justify-center items-center w-[300px] h-[300px] transition-all duration-500",
                                {
                                    "mb-[-10px] shadow-[0_10px_0px_0_rgba(25,43,206,0.6)]": isSwiper && idx === activePersonIdx
                                }
                            )}
                        >
                            {!isSwiper ? (
                                <div className="text-white">Loading.....</div>
                            ) : (
                                <>
                                    <div className="relative w-full h-full">
                                        <Image
                                            fill
                                            sizes="48"
                                            src={`https://image.tmdb.org/t/p/w300${person.profile_path}`}
                                            alt={person.name}
                                            className="w-full h-full object-cover rounded-lg"
                                        />
                                    </div>
                                    {isActive && (
                                        <>
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent rounded-lg"></div>
                                            <div className="absolute w-[80%] text-center bottom-4 left-1/2 transform -translate-x-1/2 px-4 py-2 border border-white rounded-md text-white text-lg font-bold bg-black/50 backdrop-blur-sm">
                                                {person.name}
                                            </div>
                                        </>
                                    )}
                                </>
                            )}
                        </SwiperSlide>
                    );
                })}
            </Swiper>
        </div>
    </div>
}
