"use client"
import { IMovie } from "@/types/popular-movies"
import { Container } from "../ui/container"
import { SwiperTop } from "./swiper-top"
import { TopRatedDetailsComponent } from "./top-rated-details-component"
import { FilterSlider } from "../ui/filters/filter-slider"
import { useCustomSearchParams } from "@/hooks/use-search-params"

interface ITopTrendingComponent {
    topTrending: IMovie[]
}



const items = [
    {
        id: 1,
        name: 'movies',
    },
    {
        id: 2,
        name: 'series',
    },
]

export function TopTrendingComponent({ topTrending }: ITopTrendingComponent) {
    const { searchParams } = useCustomSearchParams()
    const type = searchParams.get('type')

    if (!type) return
    return <Container className="flex relative flex-col gap-2 md:gap-1 justify-center overflow-hidden ">
        <div>
            <FilterSlider items={items} />
        </div>
        <SwiperTop urlName={"id"} topTrending={topTrending} />

        <div className="relative h-[650px]">
            <TopRatedDetailsComponent />
        </div>

    </Container>

}
