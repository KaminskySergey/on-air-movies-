import Image from "next/image";
import { TopPeople } from "./top-people/top-people";
import { IMovie } from "@/types/popular-movies";
import { IPeoplePupular } from "@/types/people";

import { HeroHomeSlider } from "./home-hero/hero-home-slider";
import { moviesHeroInfo } from "@/const/hero-data";
import { TopTrendingComponent } from "./top-trending/top-rated-component";

interface IHomeComponent {
    topTrending: IMovie[]
    people: IPeoplePupular
}

export const HomeComponent = ({ topTrending, people }: IHomeComponent) => {
    return (
        <>
            <section className="relative bg-black  flex items-center overflow-hidden">
                <HeroHomeSlider data={moviesHeroInfo} />


            </section>
            <section className="py-4 bg-black">
                <TopTrendingComponent topTrending={topTrending} />

            </section>
            <section className="py-4 pb-8 relative  ">
                <Image
                    src="/hero-big.webp"
                    alt="Hero background"
                    fill
                    className="object-cover  bg-black/30 backdrop-blur-sm"
                    priority
                    unoptimized

                />
                <TopPeople people={people.results} />
                <div className="absolute top-0 left-0 w-full h-full z-1 bg-black/30 backdrop-blur-sm"></div>
            </section>
        </>
    );
}