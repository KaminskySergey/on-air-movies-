import { getKinoImages } from "../../../../../../../actions/movies"
import { IImage } from "@/types/images"
import { TitleLinie } from "@/components/ui/title/title-linie"
import { capitalize } from "@/utils/utils"
import { KinoImagesGallery } from "@/components/kino-details/kino-images/kino-images-gallery"
import { KinoSectionLayout } from "@/components/ui/layout/kino-section-layout"

interface IMoviesSectionPage {
    params: Promise<{
        section: string
        id: string
    }>
}

export default async function MoviesSectionPage({ params }: IMoviesSectionPage) {
    const { section, id } = await params
    const category = "tv"
    const images = await getKinoImages(category, id, { next: { revalidate: 660 } })

    const sectionData = images[section as keyof typeof images] as IImage[];



    return (
        <KinoSectionLayout category={category} id={id}>

            <div className="flex flex-col gap-5 sm:gap-7">
                <div>
                    <TitleLinie title={capitalize(section)} />
                </div>
                <KinoImagesGallery images={sectionData} />
            </div>
        </KinoSectionLayout>
    );
}
