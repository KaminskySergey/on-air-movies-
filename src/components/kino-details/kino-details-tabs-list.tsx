"use client"
import Image from "next/image"
import { List } from "../ui/list/list"
import {  TMDBimgOriginal } from "@/const/tmdb-img"
import { IImage, IKinoVideo } from "@/types/images"
import { useState } from "react"
import { useToggle } from "@/hooks/use-toggle"
import Modal from "../ui/modal/modal"
import { Trailer } from "../ui/trailer/trailer"
import Lightbox, { SlideImage } from "yet-another-react-lightbox"
import NextJsImageBox from "../ui/image/next-image-lightbox"
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails"
import Link from "next/link"
import { ArrowRight } from "../ui/svg/arrow-right"
import { useCustomSearchParams } from "@/hooks/use-search-params"
import { getVideoThumbnail } from "@/utils/utils"
import { NotItems } from "../ui/not-items/not-items"

type KinoDetailsTabsListProps =
    | { type: "videos"; items: IKinoVideo[], kinoId: string }
    | { type: "posters"; items: IImage[], kinoId: string }
    | { type: "backdrops"; items: IImage[], kinoId: string };




export const KinoDetailsTabsList = ({ items, type, kinoId }: KinoDetailsTabsListProps) => {
    const [activeVideo, setActiveVideo] = useState<string | null>(null);
    const { isToggle, setIsToggle } = useToggle()
    const [isOpen, setIsOpen] = useState(false)
    const {pathname} = useCustomSearchParams()

    const category = pathname.match(/^\/(movies|series)/)?.[1];


    const handleOpenBox = () => {
        setIsOpen(true)
    }
    const toggleVideoModal = (value?: string) => {
        if (value) {
            setActiveVideo(value);
            setIsToggle(true);
        } else {
            setActiveVideo(null);
            setIsToggle(false);
        }
    };

    const slides: SlideImage[] = items.map(item => ({
        src: `${TMDBimgOriginal}${(item as IImage).file_path}`,
        width: 800,
        height: 600,
    }));
    return (
        <>
        {items.length === 0 && <NotItems title={`No ${type} available`} 
  text={`This section has no ${type} yet. Check back later.`} />}
            {items.length !== 0 && <List className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {type === "videos" &&
                    items.map((video, idx) => (
                        <li key={video.id ?? idx}>
                            <div className="relative w-full h-64 rounded-lg border border-gray-700 overflow-hidden shadow-md cursor-pointer group">
                                <Image
                                    fill
                                    sizes="48"
                                    alt={video.name}
                                    src={getVideoThumbnail(video.site, video.key)}
                                    className="object-cover cursor-pointer transition group-hover:brightness-75"
                                />
                                <div onClick={() => toggleVideoModal(video.key)} className="absolute inset-0 flex items-center justify-center">
                                    <span className="w-14 h-14 flex items-center justify-center bg-white/80 rounded-full text-black font-bold text-2xl shadow-md">
                                        ▶
                                    </span>
                                </div>
                            </div>
                        </li>
                    ))}

                {(type === "posters" || type === "backdrops") &&
                    items.map((img, idx) => (
                        <li key={idx}>
                            <div onClick={() => handleOpenBox()} className="relative w-full border border-gray-700 h-64 rounded-lg overflow-hidden shadow-md">
                                <Image
                                    fill
                                    sizes="48"
                                    alt={`media-${idx}`}
                                    src={
                                        img.file_path
                                            ? `https://image.tmdb.org/t/p/w500${img.file_path}`
                                            : "/placeholder.png"
                                    }
                                    className="object-cover cursor-pointer transition-transform duration-500 hover:scale-105"
                                />
                            </div>
                        </li>
                    ))}
                {items.length >= 10 && <li className="shadow-xl flex-shrink-0">
                    <Link
                        href={
                            type === "videos"
                                ? `/${category}/${kinoId}/videos`
                                : type === "posters"
                                    ? `/${category}/${kinoId}/images/posters`
                                    : `/${category}/${kinoId}/images/backdrops`
                        }
                    >
                        <div className="relative  h-64 rounded-lg flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-700 hover:from-gray-700 hover:to-gray-600 transition">
                            <span className="text-white text-lg font-semibold">View All</span>
                            <ArrowRight />
                        </div>
                    </Link>
                </li>}
            </List>}
            {isToggle && (
                <Modal isOpen={isToggle} isTrailer onClose={toggleVideoModal}>
                    <Trailer trailerKey={activeVideo} />
                </Modal>
            )}
            {isOpen && <Lightbox
                open={isOpen}
                close={() => setIsOpen(false)}
                slides={slides}
                render={{ slide: NextJsImageBox, thumbnail: NextJsImageBox }}
                plugins={[Thumbnails]}
            />}
        </>
    );
}