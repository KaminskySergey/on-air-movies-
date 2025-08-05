'use client'

import { ICastMovies, ICrewMovies } from "@/types/actor-movie"
import { ICastSeries, ICrewSeries } from "@/types/actor-series"
import Image from "next/image"
import Link from "next/link"

interface IWorksItem {
    item: ICastMovies | ICrewMovies | ICastSeries | ICrewSeries

}


export function WorksItem({ item }: IWorksItem) {
    
    return <div className="rounded-lg overflow-hidden cursor-pointer shadow-md w-[150px] h-48 relative group">
        <Link href={'#'}>
            <div className="block w-full h-full relative">
                <Image
                    src={`https://image.tmdb.org/t/p/w300${item.poster_path}`}
                    alt={item.id.toString()}
                    fill
                    sizes="(max-width: 768px) 50vw, 160px"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute bottom-0 text-center left-0 w-full flex justify-center items-center min-h-[32px] px-1 py-2 bg-black/70 group-hover:bg-black/80 transition-colors duration-300">
                    <h3 className="text-xs text-white">
                        {item.original_name ?? item.original_title}
                    </h3>
                </div>
            </div>
        </Link>
    </div>
}
