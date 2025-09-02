import { PeopleComponent } from "@/components/people/people-component"
import { getPeople, getSearchPeople } from "../../../../actions/actors"

interface IPeoplePage {
    searchParams: Promise<{ [key: string]: string | undefined }>
}


export default async function PeoplePage({ searchParams }: IPeoplePage) {
    const params = await searchParams;


    const people = params.search
        ? await getSearchPeople({ search: params.search, page: params.page || 1 })
        : await getPeople({ page: params.page || 1 });
    
    return (
        <PeopleComponent people={people} />
    )
}