"use server"
import { getTopTrending } from "../../../../actions/movies"
import { HeroMoviesSlider } from "./hero-movies-slider"

interface IHeroMovies {
    currentMoviesId: string
    category: string
    // heroDetails: {
    //     cast: IActor[]
    //     runtime: number,
    //     backdrops: IImage[]
    // }
}


export const HeroMovies = async ({category, currentMoviesId}: IHeroMovies) => {

    const moviesTrending = await getTopTrending({type: "movie"})
    
    return <section className="relative bg-black  flex flex-col  overflow-hidden">
    <HeroMoviesSlider category={category}  currentMoviesId={currentMoviesId} data={moviesTrending.results}/>


</section>
}