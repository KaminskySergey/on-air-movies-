import { Container } from "@/components/ui/container";
import { ArrowRight } from "@/components/ui/svg/arrow-right";
import { TMDBimgMedium } from "@/const/tmdb-img";
import { IMovieDetails } from "@/types/popular-movies";
import { getYearFromDate } from "@/utils/utils";
import Image from "next/image";
import Link from "next/link";

interface IKinoImagesTop {
    movie: IMovieDetails
    category: "movie" | "tv"
}

export function KinoImagesTop({ movie, category }: IKinoImagesTop) {
    return <Container className="flex gap-3 sm:gap-5">
        <Image
            src={`${TMDBimgMedium}${movie.poster_path}`}
            width={96}
            height={144}
            alt={movie.title || movie.name || movie.id.toString()}
            className="rounded-lg"
        />
        <div className="flex flex-col h-[144px] justify-around">
            <div className="flex text-lg sm:text-4xl items-center gap-2">
                <Link href={`/${category === "tv" ? "series" : "movies"}/${movie.id}`}>
                    <h2 className="text-white font-bold transition-all duration-300 hover:text-[#a4a4a4]">
                        {movie.title || movie.name}
                        <span className="text-gray-500 font-medium pl-2">
                            {movie.last_air_date
                                ? getYearFromDate(movie.first_air_date) === getYearFromDate(movie.last_air_date)
                                    ? `(${getYearFromDate(movie.first_air_date)})`
                                    : `(${getYearFromDate(movie.first_air_date)} - ${getYearFromDate(movie.last_air_date)})`
                                : `(${getYearFromDate(movie.release_date || movie.first_air_date)})`}
                        </span>
                    </h2>
                </Link>


            </div>
            <div>
                <Link href={`/${category === "tv" ? "series" : "movies"}/${movie.id}`}>
                    <div className="flex items-center gap-1 text-gray-400 hover:text-gray-200 transition-colors cursor-pointer">
                        <ArrowRight className="w-6 h-6 rotate-180 " />
                        Back to main
                    </div>
                </Link>
            </div>
        </div>
    </Container>
}
