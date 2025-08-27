import { KinoDetailsComponent } from "@/components/kino-details/kino-details-component"
import { getCreditsCurrentKino, getDetailsKino, getKinoImages, getKinoRecommendations, getKinoVideos } from "../../../../../actions/movies"
import { IMediaKinoDetails } from "@/types/kino-media"

interface ISeriesDetailsPage {
    params: Promise<{
        id: string
    }>
}

export default async function SeriesDetailsPage({ params }: ISeriesDetailsPage) {

    const category = "tv"
    const { id } = await params

    const detailsInfo = await getDetailsKino(category, id)
    const credits = await getCreditsCurrentKino(category, id)

    const images = await getKinoImages(category, id)
    const videos = await getKinoVideos(category, id)

    const recommendations = await getKinoRecommendations(category, id)
    const counts = {
        videos: videos.results.length ?? 0,
        posters: images.posters.length ?? 0,
        backdrops: images.backdrops.length ?? 0
    };

    const mediaKinoDetails : IMediaKinoDetails = {
        videos: videos.results.slice(0, 12),
        posters: images.posters.slice(0, 12),
        backdrops: images.backdrops.slice(0, 12),
    }



    return (
        <KinoDetailsComponent recommendations={recommendations.results} mediaKinoDetails={mediaKinoDetails}  counts={counts} kinoId={id} cast={credits.cast} category={category} detailsInfo={detailsInfo} />
    )
}