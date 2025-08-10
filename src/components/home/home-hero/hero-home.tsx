
import { moviesHeroInfo } from "@/const/hero-data"
import { HeroHomeSlider } from "./hero-home-slider"


export const HeroHome = () => {
   
    return (
        <section className="relative bg-black  flex items-center overflow-hidden">
            <HeroHomeSlider data={moviesHeroInfo}/>


        </section>
    )
}