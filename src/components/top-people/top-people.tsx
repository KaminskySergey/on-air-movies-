
'use client'

import { Container } from "../ui/container"
import {  useState } from "react"
import { TopPeopleSwiper } from "./top-people-swiper";
import { TopPeopleDetails } from "./top-people-details";
import { IPerson } from "@/types/people";

interface ITopPeople {
    people: IPerson[]
}

export function TopPeople({ people }: ITopPeople) {
    const sortPeople = people.filter(el => el.profile_path !== null)
    const [activePerson, setActivePerson] = useState<IPerson>(sortPeople[2]);
console.log(activePerson, 'activePersonactivePersonactivePersonactivePerson')
    return (
        <Container className="flex w-full relative z-10 h-[600px] gap-8">
            
            <TopPeopleSwiper people={sortPeople} setActivePerson={setActivePerson} />



            <TopPeopleDetails personId={activePerson.id} />
        </Container>
    );
}



