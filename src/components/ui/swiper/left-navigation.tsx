'use client'

import { useEffect, useState } from "react";
import { useSwiper } from "swiper/react";
import { LeftArrow } from "../svg/left-arrow";


export function LeftNavigation() {
    const swiper = useSwiper();
    const [isBeginning, setIsBeginning] = useState(swiper.isBeginning);

    useEffect(() => {
        const update = () => setIsBeginning(swiper.isBeginning);
        swiper.on("slideChange", update);
        update(); 

        return () => swiper.off("slideChange", update);
    }, [swiper]);

    return (
        <div className="leftNavigation">
            {!isBeginning && (
                <button onClick={() => swiper.slidePrev()} type="button">
                    <LeftArrow />
                </button>
            )}
        </div>
    );
}