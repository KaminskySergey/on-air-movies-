import { KinoSectionLayout } from "@/components/ui/layout/kino-section-layout"
import { getKinoVideos } from "../../../../../../actions/movies"
import { KinoVideosGallery } from "@/components/kino-details/kino-images/kino-videos-gallery"

interface IVideosSectionPage {
    params: Promise<{
        id: string
    }>
}

export default async function VideosSectionPage({ params }: IVideosSectionPage) {
    const {id} = await params
    const category = "tv"
    const videos = await getKinoVideos(category, id)

    return (
        <KinoSectionLayout section={"videos"} category={category} id={id}>
          <KinoVideosGallery videos={videos.results}/>
        </KinoSectionLayout>
    )
    

}