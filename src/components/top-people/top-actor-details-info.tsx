'use client'

import { useEffect, useState } from "react";
import { getPeopleDetailsId } from "../../../actions/actors";
import { IPersonDetails } from "@/types/people";

interface ITopActorDetailsInfo {
    personId: number
 }

export function TopActorDetailsInfo({ personId }: ITopActorDetailsInfo) {
    const [actor, setActor] = useState<IPersonDetails | null>(null)
    useEffect(() => {
        //   if(!activePerson) return
        const fetchPersonDetaisId = async () => {
            const data = await getPeopleDetailsId(personId);
            setActor(data);
        };

        fetchPersonDetaisId()
    }, [personId])
    if (!actor) return
    return <>
        <div className="flex flex-col gap-4">
            <div>
                <h2 className="text-3xl font-bold">{actor?.name}</h2>
            </div>
            <div className="flex gap-12">
                <div>
                    <span className="font-semibold text-gray-400">Date of Birth:</span><br />
                    {actor.birthday || 'Unknown'}
                </div>
                <div>
                    <span className="font-semibold text-gray-400">Place of Birth:</span><br />
                    {actor.place_of_birth || 'Unknown'}
                </div>
                {actor.deathday && (
                    <div>
                        <span className="font-semibold text-gray-400">Date of Death:</span><br />
                        {actor.deathday}
                    </div>
                )}
            </div>
        </div>

        {/* Biography */}
        <div>
            {actor.biography ? (
                <>
                    <h3 className="text-lg font-semibold mb-1 text-indigo-400">Biography</h3>
                    <div className="h-[320px] scrollbar overflow-y-auto">
                        <p className="text-sm leading-relaxed text-gray-300">{actor.biography}</p>
                    </div>
                </>
            ) : (
                <p className="text-sm italic text-gray-400">Biography not available.</p>
            )}
        </div>
    </>
}
