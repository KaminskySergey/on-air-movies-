"use server"
import { IMovie } from "@/types/popular-movies"

import { HeroMoviesSlider } from "./hero-movies-slider"

interface IHeroMovies {
    currentMoviesId: string
    category: string
    moviesTrending: IMovie[]
    // heroDetails: {
    //     cast: IActor[]
    //     runtime: number,
    //     backdrops: IImage[]
    // }
}


export const HeroMovies = async ({category, currentMoviesId, moviesTrending}: IHeroMovies) => {

    
    
    return <section className="relative bg-black  flex flex-col  overflow-hidden">
    <HeroMoviesSlider category={category}  currentMoviesId={currentMoviesId} data={moviesTrending}/>


</section>
}