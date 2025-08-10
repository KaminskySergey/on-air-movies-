'use client'

import { IMovieDetails } from "@/types/popular-movies"
import { useEffect, useState } from "react"
import { getTopRatedDetailsMovie, getTopRatedDetailsSeries } from "../../../../actions/movies";
import { ActorsList } from "./actors-list";
import { getYearFromDate, truncateText } from "@/utils/utils";
import { useCustomSearchParams } from "@/hooks/use-search-params";
import RatingStar from "../../ui/star/rating-star";
import GradientOverlay from "../../ui/overlay/gradient-overlay";


export function TopRatedDetailsComponent() {
    const [currentMovie, setCurrentMovie] = useState<IMovieDetails | null>(null)
    const { searchParams } = useCustomSearchParams();

    const type = searchParams.get('type');
    const id = searchParams.get('id');

    useEffect(() => {
        if (!id || !type) return;

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
    return <div className="relative h-[650px]">
        <div
            className=" w-full  flex">



            <div className="absolute lg:static inset-0 z-20 text-white px-6 lg:px-10 py-6 lg:p-10 flex flex-col justify-center max-w-full lg:w-[40%] rounded-md">
                <h2 className="text-3xl lg:text-4xl font-bold leading-snug tracking-tight font-sans break-words mb-3">
                    {currentMovie.name || currentMovie.title}
                </h2>

                {currentMovie.tagline && (
                    <p className="italic text-base sm:text-lg text-gray-300 font-normal font-sans mb-4">
                        {`“${currentMovie.tagline}”`}
                    </p>
                )}

                <div className="flex flex-wrap gap-4 text-sm sm:text-base text-gray-300 font-sans mb-4">
                    <div className="text-white font-medium">
                        <p className="mb-4">Rating: {currentMovie.vote_average.toFixed(1)}{' '}</p>
                        <RatingStar
                            value={currentMovie.vote_average / 2}
                            size={20}
                        />
                    </div>

                    <span>
                        Year:{' '}
                        <span className="text-white font-medium">
                            {currentMovie.release_date ? (
                                getYearFromDate(currentMovie.release_date)
                            ) : currentMovie.first_air_date ? (
                                currentMovie.status === 'Ended' && currentMovie.last_air_date ? (
                                    `${getYearFromDate(currentMovie.first_air_date)} – ${getYearFromDate(currentMovie.last_air_date)}`
                                ) : (
                                    getYearFromDate(currentMovie.first_air_date)
                                )
                            ) : (
                                'Unknown year'
                            )}
                        </span>
                    </span>

                    <span>
                        Country:{' '}
                        <span className="text-white font-medium">
                            {currentMovie.origin_country.join(', ')}
                        </span>
                    </span>

                    <span>
                        Language:{' '}
                        <span className="text-white font-medium">
                            {currentMovie.original_language.toUpperCase()}
                        </span>
                    </span>
                    {currentMovie.runtime &&
                        <span>
                            Duration:{' '}
                            <span className="text-white font-medium">
                                {currentMovie.runtime} min
                            </span>
                        </span>}
                    {currentMovie.number_of_seasons && (
                        <span>
                            Seasons:{' '}
                            <span className="text-white font-medium">
                                {currentMovie.number_of_seasons}
                            </span>
                        </span>
                    )}

                    {currentMovie.number_of_episodes && (
                        <span>
                            Episodes:{' '}
                            <span className="text-white font-medium">
                                {currentMovie.number_of_episodes}
                            </span>
                        </span>
                    )}

                </div>

                <p className="text-gray-200 text-sm sm:text-base leading-relaxed font-sans mb-4">
                    {truncateText(currentMovie.overview)}
                </p>

                <div className="mt-2">
                    <ActorsList />
                </div>
            </div>
            <div className="w-full lg:w-[60%] h-[650px]  relative bg-cover bg-center rounded-2xl" style={{
                backgroundImage: `url('https://image.tmdb.org/t/p/original${currentMovie.backdrop_path}')`,
            }}>
                <div className="absolute inset-0 bg-black/60 lg:bg-black/10 z-10"></div>
                <GradientOverlay position="top" />
                <GradientOverlay position="bottom" />
                <div className="hidden lg:block absolute inset-0 bg-gradient-to-r from-[black] to-transparent z-20"></div>

                {/* <div className="hidden md:block absolute inset-0 bg-gradient-to-l rounded-2xl from-[#727272] to-transparent z-20"></div> */}
            </div>
        </div>
    </div>



}
