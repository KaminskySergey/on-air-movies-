import { PeopleDetailsComponent } from "@/components/people-details/people-details-component"
import { getPeopleCombined, getPeopleDetailsId,  } from "../../../../../actions/actors"

interface IPeopleDetailsPage {
    params: Promise<{
        id: string
    }>
}


export default async function PeopleDetailsPage({ params }: IPeopleDetailsPage) {
    const {id} = await params
    const personBasik = await getPeopleDetailsId(id)
    const works = await getPeopleCombined(id)
return (
    <PeopleDetailsComponent works={works} personBasik={personBasik}/>
)
}