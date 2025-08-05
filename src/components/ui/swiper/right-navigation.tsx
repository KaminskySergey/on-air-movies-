'use client'

import { useEffect, useState } from "react";
import { useSwiper } from "swiper/react";
import { RightArrow } from "../svg/right-arrow";


export function RightNavigation() {
    const swiper = useSwiper();
    const [isEnd, setIsEnd] = useState(swiper.isEnd);

    useEffect(() => {
        const update = () => setIsEnd(swiper.isEnd);
        swiper.on("slideChange", update);
        update(); 

        return () => swiper.off("slideChange", update);
    }, [swiper]);

    return (
        <div className="rightNavigation">
            {!isEnd && (
                <button onClick={() => swiper.slideNext()} type="button">
                    <RightArrow />
                </button>
            )}
        </div>
    );
}