import { IPerson } from "@/types/people"
import { List } from "../ui/list/list"
import Image from "next/image"
import Link from "next/link"

interface IPeopleGallery {
    data: IPerson[]
}

export const PeopleGallery = ({ data }: IPeopleGallery) => {

    if (!data || data.length === 0) {
        return (
            <div className="flex flex-col relative items-center justify-center py-32 text-center text-gray-400">
                <p className="text-xl mb-4">Nothing found 😔</p>
                <p>Try changing your search or filters.</p>
            </div>
        );
    }

    return <List className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {data.map((person) => (
            <li
                key={person.id}
                className="group flex flex-col items-center bg-transparent rounded-lg shadow-md overflow-hidden"
            >
                <Link href={`/people/${person.id}`} className="w-full">
                    <div className="relative w-full aspect-[2/3] rounded-lg overflow-hidden transform transition-transform duration-300 ease-in-out group-hover:scale-105">
                        <Image
                            src={
                                person.profile_path
                                    ? `https://image.tmdb.org/t/p/w500${person.profile_path}`
                                    : "/placeholder.png"
                            }
                            alt={person.name}
                            fill
                            sizes="(max-width: 640px) 100vw,
                     (max-width: 1024px) 33vw, 
                     20vw"
                            className="object-cover w-full h-full"
                        />
                        <div className="absolute bottom-0 left-0 w-full h-12 sm:h-[56px] flex flex-col items-center justify-center bg-black/50 backdrop-blur-md p-2">
                            <h3 className="text-white font-semibold text-center text-sm line-clamp-2">
                                {person.name}
                            </h3>
                        </div>
                    </div>
                </Link>
            </li>
        ))}
    </List>

}