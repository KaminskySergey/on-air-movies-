'use client'

import { useEffect, useState } from "react";
import { getPeopleDetailsMovies, getPeopleDetailsSeries } from "../../../actions/actors";
import { IActorWorkSerieHomePage } from "@/types/actor-series";
import { IActorWorkMovieHomePage } from "@/types/actor-movie";
import { WorksListHome } from "../ui/list/works-list-home";

interface ITopActorWorks {
    personId: number
}

export function TopActorWorks({ personId }: ITopActorWorks) {
    const [movies, setMovies] = useState<IActorWorkMovieHomePage | null>(null)
    const [series, setSeries] = useState<IActorWorkSerieHomePage | null>(null)
    useEffect(() => {
        if (!personId) return
        const fetchWorks = async () => {
            const moviesData = await getPeopleDetailsMovies(personId);
            setMovies(moviesData);
            const seriesData = await getPeopleDetailsSeries(personId);
            setSeries(seriesData)
        };

        fetchWorks()
    }, [personId])
    if (!movies && !series) return <div>Loading....</div>
    const topMovies = movies?.cast
        .filter(work => work.poster_path !== null)
        .sort((a, b) => b.popularity - a.popularity)
        .slice(0, 10) ?? [];
    const topSeries = series?.cast
        .filter(work => work.poster_path !== null)
        .sort((a, b) => b.popularity - a.popularity)
        .slice(0, 10) ?? [];
    return <div className="flex flex-col justify-between h-full">

        <WorksListHome items={topMovies} title="Movies" />

        <WorksListHome items={topSeries} title="Series" />
        {/* {topSeries.map(work => (
            <div key={work.id} className="relative rounded-lg overflow-hidden">
                <img
                    src={`https://image.tmdb.org/t/p/w300${work.poster_path}`}
                    alt={work.original_name}
                    className="w-full h-48 object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white p-2 text-xs font-semibold">
                    {work.original_name}
                </div>
            </div>
        ))} */}
    </div>
}
