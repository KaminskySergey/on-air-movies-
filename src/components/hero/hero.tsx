
import { moviesHeroInfo } from "@/const/hero-data"
import { HeroSlider } from "./hero-slider"


export const Hero = () => {
   
    return (
        <section className="relative bg-black  flex items-center overflow-hidden">
            <HeroSlider data={moviesHeroInfo}/>


        </section>
    )
}