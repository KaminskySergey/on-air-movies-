import { IMovie } from "@/types/popular-movies"
import { HeroMovies } from "./movies-hero/hero-movies"

interface IMoviesComponent {
    category: string
    moviesTrending: IMovie[]
    currentMoviesId: string
}

export const MoviesComponent = ({category, moviesTrending, currentMoviesId}:IMoviesComponent) => {
    return (
        <HeroMovies category={category} moviesTrending={moviesTrending}  currentMoviesId={currentMoviesId} />
    )
}