"use client"
import {  useState } from "react"
import { Container } from "../ui/container"
import { TitleLinie } from "../ui/title/title-linie"
import { List } from "../ui/list/list"
import { KinoDetailsTabsList } from "./kino-details-tabs-list"
import { IMediaKinoDetails } from "@/types/kino-media"
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import { cn } from "@/utils/utils"

interface IKinoMediaTabs {
    counts: { videos: number, posters: number, backdrops: number }
    kinoId: string
    mediaKinoDetails: IMediaKinoDetails
}


export const KinoMediaTabs = ({ mediaKinoDetails, counts, kinoId }: IKinoMediaTabs) => {
    const [activeTab, setActiveTab] = useState<"posters" | "videos" | "backdrops">("posters");

    const { posters, backdrops, videos } = mediaKinoDetails



    const tabs: { id: "videos" | "posters" | "backdrops"; label: string; count: number }[] = [
        { id: "posters", label: "Posters", count: counts.posters },
        { id: "videos", label: "Videos", count: counts.videos },
        { id: "backdrops", label: "Backdrops", count: counts.backdrops },
    ];
    return (
        <>
            <Container className="flex flex-col item gap-5">
                <TitleLinie title="Media" />
                {/* Tabs */}
                <div className="flex justify-center">
                    <List className="flex  bg-gray-800 rounded-lg py-1 px-1">
                        {tabs.map(tab => (
                            <li key={tab.id}>
                                <button
                                    key={tab.id}
                                    className={cn("px-4 py-2 cursor-pointer rounded-lg transition-colors duration-300 ease-linear text-white font-medium text-[12px] sm:text-base whitespace-nowrap ", {
                                        "bg-blue-700 rounded-lg ": activeTab === tab.id,
                                        "hover:bg-gray-700": activeTab !== tab.id,
                                    })}
                                    onClick={() => setActiveTab(tab.id)}
                                >
                                    {tab.label} {tab.count !== undefined && <span className="text-gray-400">({tab.count})</span>}
                                </button>
                            </li>
                        ))}
                    </List>
                </div>

                {/* Content */}
                <div className="min-h-[150px]">
                    {activeTab === "posters" && <KinoDetailsTabsList kinoId={kinoId} type="posters" items={posters.slice(0, 11)} />}
                    {activeTab === "backdrops" && <KinoDetailsTabsList kinoId={kinoId} type="backdrops" items={backdrops.slice(0, 11)} />}
                    {activeTab === "videos" && <KinoDetailsTabsList kinoId={kinoId} type="videos" items={videos.slice(0, 11)} />}
                </div>
            </Container>

        </>
    )
}