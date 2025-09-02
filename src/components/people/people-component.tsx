import { Container } from "../ui/container"
import { PeopleGallery } from "./people-gallery"
import { IPeoplePupular } from "@/types/people";
import { PeopleSearch } from "./people-search";
import { Pagination } from "../ui/pagination/pagination";
interface IPeopleComponent {
    people: IPeoplePupular
}

export const PeopleComponent = ({ people }: IPeopleComponent) => {

    return (
        <>

            <section className="bg-[#01001F] py-12 sm:py-24">
                <Container className="flex flex-col gap-5 sm:gap-7">
                    <div className="flex justify-center">
                        <PeopleSearch />
                    </div>
                    <PeopleGallery data={people.results} />
                    <Pagination data={people} />
                </Container>
            </section>
        </>
    )
}