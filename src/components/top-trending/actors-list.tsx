'use client'
import { useEffect, useState } from "react"
import { getCreditsCurrentMovie, getCreditsCurrentSeries } from "../../../actions/movies"
import { ICredits } from "@/types/actors"
import Link from "next/link"
import Image from "next/image"
import { AvatarIcon } from "../ui/svg/avatar"
import { useCustomSearchParams } from "@/hooks/use-search-params"



export const ActorsList = () => {
    const [credits, setCredits] = useState<ICredits | null>(null)
    const {searchParams} = useCustomSearchParams()
    const type = searchParams.get('type');
    const id = searchParams.get('id');
    useEffect(() => {
        if (!id) return;
       

        const fetchDetails = async () => {
            let data = null
            if (type === 'movies') {

                data = await getCreditsCurrentMovie(id);
            }
            if (type === 'series') {

                data = await getCreditsCurrentSeries(id);
            }

            setCredits(data)
        };

        fetchDetails();
    }, [id, type]);
    if (!credits) {
        return <div>Loading....</div>
    }
    const cast = credits.cast || [];
    const visibleCast = cast.slice(0, 5);
    const remainingCount = cast.length - visibleCast.length;

    return (
        <ul className="flex items-center -space-x-2">
            {visibleCast.map((el) => (
                <li key={el.id} className="relative bg-black flex items-center justify-center hover:scale-125 hover:z-20 transition h-12 w-12 rounded-full border-2 border-blue-600 overflow-hidden">
                    <Link href="#">
                        <div className="relative w-10 h-10">
                            {el.profile_path ? (
                                <Image
                                    alt={el.original_name}
                                    src={`https://image.tmdb.org/t/p/w500${el.profile_path}`}
                                    fill
                                    sizes="40"
                                    className="object-cover object-center"
                                />
                            ) : (
                                <AvatarIcon />
                            )}
                        </div>
                    </Link>
                </li>
            ))}

            {remainingCount > 0 && (
                <li key={1} className="relative  h-12 w-12 rounded-full border-2 border-white bg-black text-white text-sm flex items-center justify-center">
                    +{remainingCount}
                </li>
            )}
        </ul>
    );
}