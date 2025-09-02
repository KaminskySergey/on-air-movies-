import Image from "next/image";
import Link from "next/link";
import { List } from "../ui/list/list";
import { IWorkMovies } from "@/types/actor-movie";

interface IPeopleDetailsWorks {
    works: IWorkMovies[]
}

export function PeopleDetailsWorks({ works}: IPeopleDetailsWorks) {
    const topCast = works.sort((a, b) => b.popularity - a.popularity)
        .slice(0, 10)
    return (
        <>
            <div className="w-full overflow-x-auto custom-scrollbar">
                <List className="flex flex-row gap-5 pb-3  min-w-max">
                    {topCast
                        .map((el, idx) => (
                            <li
                                key={`${el.id}-${idx}`}
                                className="w-[140px] sm:w-[150px]   flex-shrink-0 rounded-lg bg-white shadow-md hover:shadow-lg transition-shadow duration-300"
                            >
                                <Link href={`/${el.release_date ? "movies" : "series"}/${el.id}`} className="block relative">
                                    <div className="relative h-[180px] sm:h-[200px] rounded-lg overflow-hidden transition-transform duration-500 hover:scale-105">
                                        {el.poster_path ? (
                                            <Image
                                                alt={el.title || el.original_name || el.id.toString()}
                                                fill
                                                src={`https://image.tmdb.org/t/p/w500${el.poster_path}`}
                                                className="object-cover "
                                                sizes="48"
                                            />
                                        ) : (
                                            <Image
                                                alt={el.title || el.original_name || el.id.toString()}
                                                fill
                                                src="/placeholder.png"
                                                className="object-cover"
                                                sizes="48"
                                            />
                                        )}

                                        <div className="absolute bottom-0 left-0 w-full h-12 sm:h-14 flex items-center justify-center bg-black/50 backdrop-blur-md p-1">
                                            <h4 className="text-white font-semibold text-xs sm:text-sm text-center line-clamp-2 w-full">
                                                {el.title || el.original_name}
                                            </h4>
                                        </div>
                                    </div>
                                </Link>
                            </li>
                        ))}
                </List>
            </div>
        </>
    )
}
