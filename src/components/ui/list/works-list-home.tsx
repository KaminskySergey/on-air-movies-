'use client'


import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import { Navigation } from "swiper/modules";

import { LeftNavigation } from "../swiper/left-navigation";
import { RightNavigation } from "../swiper/right-navigation";
import { useEffect } from "react";
import { WorksItem } from "./works-item";
import { ICastMovies, ICrewMovies } from "@/types/actor-movie";
import { ICastSeries, ICrewSeries } from "@/types/actor-series";

interface IWorksListHome {
    items: ICastMovies[] | ICrewMovies[] | ICastSeries[] | ICrewSeries[]
    title: string
}

const Controls = ({ data }: {data: ICastMovies[] | ICrewMovies[] | ICastSeries[] | ICrewSeries[]}) => {
    const swiper = useSwiper();

    useEffect(() => {
        swiper.slideTo(0);
    }, [data, swiper]);

    return <></>;
};

export function WorksListHome({ items, title }: IWorksListHome) {
    return (
        <div className="flex flex-col gap-4">
            <h3 className="text-lg font-semibold text-white">{title}</h3>
            <div className="relative">
                <Swiper
                    initialSlide={0}
                    modules={[Navigation]}
                    slidesPerView={"auto"}
                    spaceBetween={10}
                    allowTouchMove
                >
                    {items.length > 3 && <LeftNavigation />}
                    {items.length > 3 && <RightNavigation />}
                    <Controls data={items} />
                    {items.map((el, idx) => (
                        <SwiperSlide
                            key={idx}
                            className="!w-auto "
                        >
                            <WorksItem item={el}/>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
}
