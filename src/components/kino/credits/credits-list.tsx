import { List } from "@/components/ui/list/list"
import { IActor } from "@/types/actors"
import Image from "next/image";
import Link from "next/link";

interface ICreditsList {
    credits: IActor[]
}

export const CreditsList = ({ credits }: ICreditsList) => {

    return <List className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {credits.map((el, idx) => (
            <li
                key={`${el.id}-${idx}`}
                className="flex items-center bg-gray-800 rounded-xl p-3 shadow-md cursor-pointer 
                   transition-all duration-300 ease-in-out 
                   hover:bg-gray-700 hover:shadow-lg hover:-translate-y-1"
            >
                <Link href={`/people/${el.id}`} className="flex items-center">
                    <div className="relative w-16 h-16 flex-shrink-0">
                        <Image
                            src={
                                el.profile_path
                                    ? `https://image.tmdb.org/t/p/w200${el.profile_path}`
                                    : "/placeholder-actor.png"
                            }
                            alt={el.name}
                            fill
                            sizes="48px"
                            className="object-cover rounded-lg"
                        />
                    </div>

                    <div className="ml-3">
                        <p className="text-white font-semibold text-sm">{el.name}</p>
                        <p className="text-gray-400 text-xs">{el.known_for_department}</p>
                    </div>
                </Link>
            </li>
        ))}
    </List>
}