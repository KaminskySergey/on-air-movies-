'use client'

import Modal from "@/components/ui/modal/modal";
import { Trailer } from "@/components/ui/trailer/trailer";
import { IKinoVideo } from "@/types/images";
import { getVideoThumbnail } from "@/utils/utils";
import Image from "next/image";
import { useState } from "react";

interface IKinoVideosGallery {
    videos: IKinoVideo[]
}

export function KinoVideosGallery({ videos }: IKinoVideosGallery) {
    const [activeVideo, setActiveVideo] = useState<string | null>(null);
    const [isOpen, setIsOpen] = useState(false);

    const toggleVideoModal = (videoKey?: string) => {
        if (videoKey) {
          setActiveVideo(videoKey);
          setIsOpen(true);
        } else {
          setActiveVideo(null);
          setIsOpen(false);
        }
      };

    return (<>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {videos.map((video) => (
                <div
                    key={video.id}
                    className="relative w-full h-64 cursor-pointer group rounded-lg overflow-hidden border border-gray-900 shadow-md group hover:shadow-xl transition-shadow duration-300"
                    onClick={() => toggleVideoModal(video.key)}
                >
                    <Image
                        src={getVideoThumbnail(video.site, video.key)}
                        alt={`${video.name} (${video.type})`}
                        fill
                        sizes="(max-width: 768px) 100vw, 25vw"
                        className="object-cover transition-transform duration-300 group-hover:scale-105 group-hover:brightness-75"
                    />
                    <div className="absolute top-2 left-2 bg-black/50 px-2 py-1 rounded-md text-white text-xs font-medium flex items-center gap-1">
                        <span>{video.type}</span>
                        {video.official && <span className="text-green-400">✔</span>}
                        <span>• {new Date(video.published_at).toDateString()}</span>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <span className="w-12 h-12 flex items-center justify-center bg-white/80 rounded-full text-black font-bold text-2xl shadow-md">
                            ▶
                        </span>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent px-2 py-1 text-white font-semibold text-sm truncate">
                        {video.name}
                    </div>
                </div>
            ))}
        </div>

        {isOpen && activeVideo && (
            <Modal isOpen={isOpen} onClose={() => toggleVideoModal()}>
                <Trailer trailerKey={activeVideo} />
            </Modal>
        )}
    </>
    );
}
