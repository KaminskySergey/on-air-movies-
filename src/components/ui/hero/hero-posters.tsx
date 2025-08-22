import { IImage } from "@/types/images";
import Image from "next/image"
import SwiperCore from 'swiper';
import { Swiper, SwiperSlide } from "swiper/react";
import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
interface IHeroPosters {
    posters: IImage[]
    outerSwiperRef :React.MutableRefObject<SwiperCore | null>;
}

export const HeroPosters = ({outerSwiperRef, posters }: IHeroPosters) => {
    const [index, setIndex] = useState(-1);

    const slides = posters.map((poster) => ({
      src: `https://image.tmdb.org/t/p/original${poster.file_path}`,
      thumbnail: `https://image.tmdb.org/t/p/w300${poster.file_path}`,
    }));
  
    const onInnerTouchStart = () => {
        if (outerSwiperRef.current) {
          outerSwiperRef.current.allowTouchMove = false;
        }
      };
    
      const onInnerTouchEnd = () => {
        if (outerSwiperRef.current) {
          outerSwiperRef.current.allowTouchMove = true;
        }
      };

      return (
        <>
        <div className="space-y-1 w-[500px] z-40 overflow-y-hidden overflow-x-hidden">
          <h3 className="text-white text-[12px]  md:text-lg font-semibold">Posters</h3>
    
          <Swiper
            nested={true}
            slideToClickedSlide={true}
            slidesPerView={'auto'}
            freeMode={true}
            scrollbar={{ draggable: true, dragSize: 100 }}
            mousewheel={{ enabled: true, sensitivity: 4 }}
            spaceBetween={10}
            className="!h-auto !w-full"
            
            onTouchStart={onInnerTouchStart}
            onTouchEnd={onInnerTouchEnd}
            
          >
            {slides.map((slide, idx) => (
            <SwiperSlide
              key={idx}
              className="!w-auto !h-auto"
              onClick={() => setIndex(idx)}
            >
              <Image
                src={slide.thumbnail}
                alt={`Poster ${idx}`}
                width={150}
                height={100}
                className="object-cover rounded-2xl lg:w-[180px] lg:h-[120px] cursor-pointer transition-transform duration-300 hover:scale-105"
              />
            </SwiperSlide>
          ))}
          </Swiper>
        </div>

        <Lightbox
        open={index >= 0}
        index={index}
        close={() => setIndex(-1)}
        slides={slides}
        plugins={[Thumbnails]}
      />
        </>
      );
}