'use client'

import NextJsImageBox from "@/components/ui/image/next-image-lightbox";
import { TMDBimgOriginal } from "@/const/tmdb-img";
import { IImage } from "@/types/images";
import Image from "next/image";
import { useMemo, useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
interface IKinoImagesGallery {
    images: IImage[]
}

export function KinoImagesGallery({ images }: IKinoImagesGallery) {
    const [isOpen, setIsOpen] = useState(false);
    const [activeIndex, setActiveIndex] = useState<number>(0);

    const slides = useMemo(
        () =>
            images.map((item) => ({
                src: `${TMDBimgOriginal}${item.file_path}`,
                width: 1200,
                height: 1000,
            })),
        [images]
    );

    return (
        <>
            <div className="columns-1 sm:columns-2 md:columns-4 gap-4 space-y-4">
                {images.map((item, idx) => {
                    const randomHeight = 250 + ((idx * 47) % 200);
                    return (
                        <div
                            key={idx}
                            className="relative mb-4 break-inside-avoid rounded-lg overflow-hidden"
                            style={{ height: `${randomHeight}px` }}
                            onClick={() => {
                                setActiveIndex(idx);
                                setIsOpen(true);
                            }}
                        >
                            <Image
                                src={`https://image.tmdb.org/t/p/w500${item.file_path}`}
                                alt={`img-${idx}`}
                                fill
                                priority
                                unoptimized
                                sizes="(max-width: 768px) 100vw, 25vw"
                                className="object-cover cursor-pointer rounded-lg shadow-md hover:scale-105 transition-transform duration-300"
                            />
                        </div>
                    );
                })}
            </div>

            {isOpen && (
                <Lightbox
                    index={activeIndex}
                    open={isOpen}
                    close={() => setIsOpen(false)}
                    slides={slides}
                    render={{ slide: NextJsImageBox }}
                />
            )}
        </>
    );
}