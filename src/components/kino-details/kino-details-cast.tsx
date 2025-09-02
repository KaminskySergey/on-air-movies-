import { List } from "../ui/list/list"
import Link from "next/link"
import Image from "next/image"
import { IActor } from "@/types/actors"
import { Container } from "../ui/container"
import { ArrowRight } from "../ui/svg/arrow-right"
import { TitleLinie } from "../ui/title/title-linie"

interface IKinoDetailsCast {
    cast: IActor[]
    kinoId: string
    category: "movie" | "tv"
}

export const KinoDetailsCast = ({ kinoId, cast, category }: IKinoDetailsCast) => {
    const firstPartCast = cast.slice(0, 10)

    return (
        <Container className="flex flex-col gap-5">
            <TitleLinie title="Top Billed Cast"/>

            <List className="flex flex-row gap-5 overflow-x-auto pb-3 custom-scrollbar">
                {firstPartCast.map(el => (
                    <li
                        key={el.id}
                        className="w-[160px] sm:w-[180px] md:w-[200px] flex-shrink-0 rounded-xl bg-white shadow-md hover:shadow-xl transition-shadow duration-300"
                    >
                        <Link href={`/people/${el.id}`} className="block">
                            <div className="relative h-[220px] sm:h-[240px] md:h-[260px] rounded-t-xl overflow-hidden">
                                {el.profile_path ? (
                                    <Image
                                        alt={el.original_name || el.name || el.id.toString()}
                                        fill
                                        src={`https://image.tmdb.org/t/p/w500${el.profile_path}`}
                                        className="object-cover transition-transform duration-500 hover:scale-105"
                                        sizes="48"
                                    />
                                ) : (
                                    <Image
                                        alt={el.original_name || el.id.toString()}
                                        fill
                                        src="/placeholder-actor.png"
                                        className="object-cover"
                                        sizes="48"
                                    />
                                )}
                            </div>

                            <div className="p-3 flex flex-col items-center justify-center text-center rounded-b-xl">
                                <h4 className="text-gray-900 font-semibold text-sm sm:text-base truncate w-full">
                                    {el.original_name}
                                </h4>
                                <p className="text-gray-600 text-xs sm:text-sm line-clamp-2">
                                    {el.character}
                                </p>
                            </div>
                        </Link>
                    </li>
                ))}
                <li className="shadow-xl flex-shrink-0">
                    <Link href={`/${category === "tv" ? "series" : "movies"}/${kinoId}/credits`}>
                        <div className="relative w-[190px] h-full rounded-lg flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-700 hover:from-gray-700 hover:to-gray-600 transition">
                            <span className="text-white text-lg font-semibold">View More</span>
                            <ArrowRight />
                        </div>
                    </Link>
                </li>
            </List>
        </Container>
    )
}