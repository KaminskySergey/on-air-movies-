import { IMovie, IMovies } from "@/types/popular-movies"
import { HeroKinoSlider } from "./kino-hero/hero-kino-slider"
import { KinoSection } from "./kino-section/kino-section"

import { IGenres } from "@/types/genres"
import { IKinoSort } from "@/types/sort"

interface IKinoComponent {
    category: "movie" | "tv"
    moviesTrending: IMovie[]
    items: IMovies
    genresData: IGenres[]
    sortItems: IKinoSort[]
}

export const KinoComponent = ({sortItems, genresData, items, category, moviesTrending }: IKinoComponent) => {
    return (
        <>
            <section className="relative bg-black  flex flex-col  overflow-hidden">
                <HeroKinoSlider genresData={genresData} category={category} data={moviesTrending} />
            </section>
            <section className="relative bg-[#01001F] py-8">
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-[#01001F] via-[#01001F] to-[#01001F]"></div>

                <KinoSection category={category} genresData={genresData} items={items} sortItems={sortItems} />
            </section>
        </>
    )
}