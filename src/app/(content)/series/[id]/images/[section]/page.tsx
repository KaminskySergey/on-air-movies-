import { getKinoImages } from "../../../../../../../actions/movies"
import { IImage } from "@/types/images"

import { KinoImagesGallery } from "@/components/kino-details/kino-images/kino-images-gallery"
import { KinoSectionLayout } from "@/components/ui/layout/kino-section-layout"

interface IMoviesSectionPage {
    params: Promise<{
        section: "posters" | "backdrops" | "videos"
        id: string
    }>
}

export default async function MoviesSectionPage({ params }: IMoviesSectionPage) {
    const { section, id } = await params
    const category = "tv"
    const images = await getKinoImages(category, id, { next: { revalidate: 660 } })

    const sectionData = images[section as keyof typeof images] as IImage[];



    return (
        <KinoSectionLayout section={section} category={category} id={id}>

           
                <KinoImagesGallery images={sectionData} />
            
        </KinoSectionLayout>
    );
}
