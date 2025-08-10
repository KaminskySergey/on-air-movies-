"use server"
import { IActor } from "@/types/actors"
import { getTopTrending } from "../../../../actions/movies"
import { HeroMoviesSlider } from "./hero-movies-slider"
import { IImage } from "@/types/images"

interface IHeroMovies {
    currentMoviesId: string
    heroDetails: {
        cast: IActor[]
        runtime: number,
        backdrops: IImage[]
    }
}


export const HeroMovies = async ({ currentMoviesId, heroDetails}: IHeroMovies) => {

    const moviesTrending = await getTopTrending({type: "movie"})
    
    return <section className="relative bg-black  flex flex-col  overflow-hidden">
    <HeroMoviesSlider heroDetails={heroDetails}  currentMoviesId={currentMoviesId} data={moviesTrending.results}/>


</section>
}