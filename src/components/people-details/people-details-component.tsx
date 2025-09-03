import { IPersonDetails } from "@/types/people"
import { Container } from "../ui/container"
import { Biography } from "../people/biography"
import { IActorWorks } from "@/types/actor-movie"
import { NotItems } from "../ui/not-items/not-items"
import { PeopleProfileImg } from "./people-profile-img"
import { PeopleDetailsWorks } from "./people-details-works"

import { PeopleDetailsChronologyComponent } from "./people-details-chronology-component"

interface IPeopleDetailsComponent {
    personBasik: IPersonDetails
    works: IActorWorks
}



export function PeopleDetailsComponent({ works, personBasik }: IPeopleDetailsComponent) {


    return (
        <>
            <section className="py-8 bg-black">
                <Container className="flex flex-col sm:flex-row gap-8">

                    <div className="flex-shrink-0 flex justify-center">
                        <PeopleProfileImg name={personBasik.name} birthday={personBasik.birthday} urlImg={personBasik.profile_path} />

                    </div>

                    <div className="flex-1 flex flex-col gap-5 sm:gap-7 text-white min-w-0">
                        <div className="flex flex-col justify-between gap-7 sm:gap-9 sm:h-[564px]">
                            <Biography text={personBasik.biography} />
                            {works.cast.length === 0 && <NotItems
                                title="No notable works found"
                                text="This person doesn’t have any popular movies or TV shows yet."
                            />}
                            {works.cast.length !== 0 && <PeopleDetailsWorks works={works.cast} />}
                        </div>
                        <PeopleDetailsChronologyComponent works={works}/>
                    </div>
                </Container>
            </section>

        </>
    )
}
