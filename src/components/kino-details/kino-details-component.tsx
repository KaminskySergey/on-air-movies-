import { IMovie, IMovieDetails } from "@/types/popular-movies"

import { Container } from "../ui/container"

import { KinoDetailsInfo } from "./kino-details-info";
import Image from "next/image";
import { KinoDetailsCast } from "./kino-details-cast";
import { IActor } from "@/types/actors";
import { KinoMediaTabs } from "./kino-media-tabs";
import { IMediaKinoDetails } from "@/types/kino-media";
import { KinoDetailsRecommendations } from "./kino-details-recommendations";

interface IKinoDetails {
    detailsInfo: IMovieDetails
    category: "movie" | "tv"
    cast: IActor[]
    kinoId: string
    counts: {videos: number, posters: number, backdrops: number}
    mediaKinoDetails: IMediaKinoDetails
    recommendations: IMovie[]
}


export const KinoDetailsComponent = async ({recommendations, mediaKinoDetails, counts, kinoId, cast, category, detailsInfo }: IKinoDetails) => {

    const backdropUrl = `https://image.tmdb.org/t/p/original${detailsInfo.backdrop_path}`;



    return (
        <>
            <section
                className="relative py-[16px] md:py-[32px] w-full h-auto min-h-[400px] sm:min-h-[550px] overflow-hidden"
            >
                <Image
                    src={backdropUrl}
                    alt={detailsInfo.title || detailsInfo.name || detailsInfo.id.toString()}
                    fill
                    className="object-cover object-top"
                    priority
                    
                    
                />
                <div className="absolute inset-0">
                    <div className="absolute inset-0 bg-gradient-to-r from-black/100 via-black/65 to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
                </div>

                <Container className="relative flex flex-col gap-5 sm:flex-row sm:items-center h-full sm:gap-9">
                    <KinoDetailsInfo item={detailsInfo} category={category} />
                </Container>
            </section>
            <section className="bg-black py-[32px]">
                <KinoDetailsCast category={category} kinoId={kinoId} cast={cast} />
            </section>
            <section className="bg-black py-[32px]">
               <KinoMediaTabs mediaKinoDetails={mediaKinoDetails} kinoId={kinoId} counts={counts}/>
            </section>
            <section className="bg-black py-[32px]">
                <KinoDetailsRecommendations category={category} recommendations={recommendations}/>
            </section>
        </>
    );
}