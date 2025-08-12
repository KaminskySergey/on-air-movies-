import { IMovie } from "@/types/popular-movies"
import { HeroMoviesSlider } from "./movies-hero/hero-movies-slider"

interface IMoviesComponent {
    category: string
    moviesTrending: IMovie[]
    currentMoviesId: string
}

export const MoviesComponent = ({ category, moviesTrending, currentMoviesId }: IMoviesComponent) => {
    return (
        <section className="relative bg-black  flex flex-col  overflow-hidden">
            <HeroMoviesSlider category={category} currentMoviesId={currentMoviesId} data={moviesTrending} />
        </section>
    )
}