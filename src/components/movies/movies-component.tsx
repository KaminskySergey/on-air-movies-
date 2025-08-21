import { IMovie, IMovies } from "@/types/popular-movies"
import { HeroMoviesSlider } from "./movies-hero/hero-movies-slider"
import { MoviesSection } from "./movies-section/movies-section"
import { movieSortOptions } from "@/const/kino-sort"
import { IGenres } from "@/types/genres"

interface IMoviesComponent {
    category: string
    moviesTrending: IMovie[]
    items: IMovies
    genresData: IGenres[]
}

export const MoviesComponent = ({ genresData, items, category, moviesTrending }: IMoviesComponent) => {
    return (
        <>
            <section className="relative bg-black  flex flex-col  overflow-hidden">
                <HeroMoviesSlider category={category} data={moviesTrending} />
            </section>
            <section className="relative bg-[#01001F] py-8">
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-[#01001F] via-[#01001F] to-[#01001F]"></div>

                <MoviesSection genresData={genresData} items={items} sortItems={movieSortOptions} />
            </section>
        </>
    )
}