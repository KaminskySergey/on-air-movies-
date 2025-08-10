import Image from "next/image"
import { List } from "./list"
import { IActor, ICredits } from "@/types/actors";
import Link from "next/link";
import { AvatarIcon } from "../svg/avatar";
import { useRef, useState } from "react";

interface IActorsListHero {
    cast: IActor[]
    isLoadingDetails: boolean
}


export const ActorsListHero = ({ cast , isLoadingDetails}: IActorsListHero) => {


   
    const [showAll, setShowAll] = useState<boolean>(false);

    const visibleCast = showAll ? cast : cast.slice(0, 5);
    const remainingCount = cast.length - visibleCast.length;

   

    const handleShowAllClick = () => {
        setShowAll(true);
    };
    if (isLoadingDetails) {
        return (
          <ul className="flex items-center -space-x-2  w-[270px] scrollbar overflow-y-hidden overflow-x-auto flex-nowrap">
            {[...Array(5)].map((_, i) => (
              <ActorSkeleton key={i} />
            ))}
          </ul>
        );
      }

    return (
        
            <ul  className="flex items-center -space-x-2  w-[270px] scrollbar overflow-y-hidden overflow-x-auto flex-nowrap">
            {visibleCast.map((el) => (
                <li key={el.id} className="relative flex-shrink-0 bg-black flex items-center justify-center hover:scale-125 hover:z-20 transition h-12 w-12 rounded-full border-2 border-blue-600 overflow-hidden">
                    <Link href="#">
                        <div className="relative w-12 h-12 flex justify-center items-center">
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

            {!showAll && remainingCount > 0 && (
                <li
                    key="remaining"
                    onClick={handleShowAllClick}
                    className="relative cursor-pointer h-12 w-12 rounded-full border-2 border-white bg-black text-white text-sm flex items-center justify-center select-none"
                    title="Show all cast"
                >
                    + {remainingCount}
                </li>
            )}
        </ul>
        
    )
}

const ActorSkeleton = () => {
    return (
      <li className="relative h-12 w-12 rounded-full bg-gray-300 animate-pulse"></li>
    );
  };