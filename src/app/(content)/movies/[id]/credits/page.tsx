import { KinoSectionLayout } from "@/components/ui/layout/kino-section-layout"
import { getCreditsCurrentKino } from "../../../../../../actions/movies"
import { CreditsCurrentKino } from "@/components/kino/credits/credits-current-kino"

interface ICastSectionPage {
    params: Promise<{
        id: string
    }>
}

export default async function CastSectionPage({ params }: ICastSectionPage) {
    const {id} = await params
    const category = "movie"
    const credits = await getCreditsCurrentKino(category, id)
    console.log(credits)
    return (
        <KinoSectionLayout section={"credits"} category={category} id={id}>
            <CreditsCurrentKino credits={credits}/>
        </KinoSectionLayout>
    )
    

}