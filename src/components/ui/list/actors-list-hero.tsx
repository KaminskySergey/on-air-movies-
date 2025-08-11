import Image from "next/image"
import { IActor} from "@/types/actors";
import Link from "next/link";
import { AvatarIcon } from "../svg/avatar";
import { useState } from "react";
import { cn } from "@/utils/utils";

interface IActorsListHero {
    cast: IActor[]
    isLoadingDetails: boolean
}


export const ActorsListHero = ({ cast, isLoadingDetails }: IActorsListHero) => {



    const [showAll, _] = useState<boolean>(false);

    const maxVisible = 5;

    const visibleCast = showAll ? cast : cast.slice(0, maxVisible);



   

    if (isLoadingDetails) {
        return (
            <ul className="flex items-start -space-x-2 w-[240px] md:w-[270px] scrollbar overflow-y-hidden overflow-x-auto flex-nowrap">
                {[...Array(5)].map((_, i) => (
                    <ActorSkeleton key={i} />
                ))}
            </ul>
        );
    }

    return (
        <div className="flex items-start  gap-2  md:wax-w-[270px]">
            <ul
                className={cn(
                    "flex items-center  pt-[2px] transition-all duration-300",
                    showAll ? "max-w-full" : "max-w-[240px]"
                )}
            >
                {visibleCast.map((el) => (
                    <li
                        key={el.id}
                        className="-ml-2 first:ml-0 flex-shrink-0 bg-black flex items-center justify-center hover:scale-110 hover:z-20 transition h-12 w-12 rounded-full border-2 border-blue-600 overflow-hidden"
                    >
                        <Link href="#">
                            <div className="relative w-10 h-10 md:w-12 md:h-12 flex justify-center items-center">
                                {el.profile_path ? (
                                    <Image
                                        alt={el.original_name}
                                        src={`https://image.tmdb.org/t/p/w500${el.profile_path}`}
                                        fill
                                        sizes="48"
                                        className="object-cover object-center"
                                    />
                                ) : (
                                    <AvatarIcon />
                                )}
                            </div>
                        </Link>
                    </li>
                ))}
            </ul>

            {/* Кнопка показать/скрыть
            {cast.length > maxVisible && (
                <div
                    onClick={handleToggleShowAll}
                    className="flex-shrink-0 pt-[2px] rounded-full flex text-center items-center justify-center cursor-pointer w-10 h-10 md:h-12 md:w-12 border-2 border-white bg-black text-white text-[9px] select-none hover:bg-neutral-800 transition"
                    title={showAll ? "View All" : "Show All"}
                >
                    {showAll ? (
                        "Hide"
                    ) : (
                        <>
                            View <br /> All
                        </>
                    )}
                </div>
            )} */}
        </div>
    )
}

const ActorSkeleton = () => {
    return (
        <li className="relative h-12 w-12 rounded-full bg-gray-300 animate-pulse"></li>
    );
};