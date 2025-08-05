'use client'

import { IMovieDetails } from "@/types/popular-movies"
import { useEffect, useState } from "react"
import { getTopRatedDetailsMovie, getTopRatedDetailsSeries } from "../../../actions/movies";
import { ActorsList } from "./actors-list";
import { truncateText } from "@/utils/utils";
import { useCustomSearchParams } from "@/hooks/use-search-params";
import RatingStar from "../ui/star/rating-star";


export function TopRatedDetailsComponent() {
    const [currentMovie, setCurrentMovie] = useState<IMovieDetails | null>(null)
    const { searchParams } = useCustomSearchParams();

    const type = searchParams.get('type');
    const id = searchParams.get('id');


    useEffect(() => {
        if (!id) return;

        const fetchDetails = async () => {
            let data = null;
            if (type === "movies") {
                data = await getTopRatedDetailsMovie(id);
            } else if (type === "series") {
                data = await getTopRatedDetailsSeries(id);
            }
            setCurrentMovie(data);
        };

        fetchDetails();
    }, [id, type]);

    if (!currentMovie) return <div>Loading...</div>;
    return <div
        className="absolute w-full top-[-25px] flex   h-[650px]">
        {/* Затемнение */}



        <div className="flex w-[30%] flex-col justify-center text-white z-20 pr-4   backdrop-blur-sm rounded-md">
            <h2 className="text-4xl font-extrabold tracking-wide leading-tight font-serif">
                {currentMovie.name}
            </h2>

            {currentMovie.tagline && (
                <p className="italic text-lg text-gray-300 font-light font-mono">
                    {`“${currentMovie.tagline}”`}
                </p>
            )}

            <div className="flex flex-wrap gap-4 text-gray-400 font-sans">
                <div className="text-xl text-white">
                    Rating: {currentMovie.vote_average.toFixed(1)}{' '}
                    <RatingStar
                        value={currentMovie.vote_average / 2}
                        size={24}
                    />

                </div>
                <span className="text-base">
                    Year: {currentMovie.release_date ? (
                        <span className="text-xl text-white">
                            {new Date(currentMovie.release_date).getFullYear()}
                        </span>
                    ) : (
                        <span className="text-xl text-white">Unknown year</span>
                    )}
                </span>
                <span className="text-base">
                    Country: <span className="text-xl text-white">{currentMovie.origin_country.join(', ')}</span>
                </span>
                <span className="text-base">
                    Language: <span className="text-xl text-white">{currentMovie.original_language.toUpperCase()}</span>
                </span>
                <span className="text-base">
                    Duration: <span className="text-xl text-white">{currentMovie.runtime} min</span>
                </span>
            </div>

            <p className="text-gray-300 leading-loose mt-2 font-medium tracking-wide font-sans">
                {truncateText(currentMovie.overview)}
            </p>
            <div className="mt-4">
                <ActorsList />
            </div>
        </div>
        <div className="w-[70%] relative bg-cover bg-center rounded-2xl" style={{
            backgroundImage: `url('https://image.tmdb.org/t/p/w500${currentMovie.backdrop_path}')`,
        }}>
            <div className="absolute inset-0 bg-black/10 z-10"></div>

            <div className="absolute inset-0 bg-gradient-to-r from-[black] to-transparent z-20"></div>

            <div className="absolute inset-0 bg-gradient-to-l rounded-2xl from-[#00000098] to-transparent z-20"></div>
        </div>
    </div>



}
