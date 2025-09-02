'use client'

import { IActorWorks, IWorkMovies } from "@/types/actor-movie"

import { PeopleChronologyWorks } from "./people-chronology-works"
import { WorkItem, WorksByDepartment } from "@/types/works"
import DropdownMenu from "../ui/filters/dropdown-menu"

interface IPeopleDetailsChronologyComponent {
    works: IActorWorks
}
function prepareWorksByDepartment(
    cast: IWorkMovies[],
    crew: IWorkMovies[]
): WorksByDepartment {
    const castWorks: WorkItem[] = cast.map((w) => ({
        ...w,
        department: "Acting",
    }));

    const crewWorks: WorkItem[] = crew.map((w) => ({
        ...w,
        department: w.department || "Other",
    }));

    const all: WorkItem[] = [...castWorks, ...crewWorks];

    const departments: Record<string, WorkItem[]> = {};
    all.forEach((w) => {
        if (!departments[w.department]) departments[w.department] = [];
        departments[w.department].push(w);
    });

    const result: WorksByDepartment = {};

    Object.entries(departments).forEach(([dept, works]) => {
        const withDate = works
            .filter((w) => w.release_date || w.first_air_date)
            .sort((a, b) => {
                const dateA = new Date(a.release_date || a.first_air_date!).getTime();
                const dateB = new Date(b.release_date || b.first_air_date!).getTime();
                return dateB - dateA;
            });

        const withoutDate = works.filter((w) => !w.release_date && !w.first_air_date);

        const grouped = withDate.reduce<Record<string, WorkItem[]>>((acc, w) => {
            const year = (w.release_date || w.first_air_date || "").slice(0, 4) || "—";
            if (!acc[year]) acc[year] = [];
            acc[year].push(w);
            return acc;
        }, {});

        result[dept] = { grouped, withoutDate };
    });

    return result;
}



export function PeopleDetailsChronologyComponent({ works }: IPeopleDetailsChronologyComponent) {
    const worksByDept = prepareWorksByDepartment(works.cast, works.crew);

    const departmentItems = Object.entries(worksByDept).map(([dept, { grouped, withoutDate }]) => ({
        name: dept,
        count: withoutDate.length + Object.values(grouped).reduce((acc, arr) => acc + arr.length, 0),
    }));

    return <div className="flex flex-col gap-5">
        <div className="flex justify-end">
            {/* <DropdownMenu  queryKey={"type"} defaultValue={"All"} itemsMenu={["movies", "series"]} /> */}
            <DropdownMenu  queryKey={"department"} defaultValue={"Department"} itemsMenu={departmentItems} />
        </div>
        <PeopleChronologyWorks worksByDept={worksByDept} />
    </div>
}
