"use client"
import { IMovie } from "@/types/popular-movies"
import { SwiperTop } from "./swiper-top"
import { TopRatedDetailsComponent } from "./top-rated-details-component"
import { Container } from "@/components/ui/container"
import { FilterSlider } from "@/components/ui/filters/filter-slider"

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
  
    return <Container className="flex relative flex-col gap-2 md:gap-1 justify-center overflow-hidden ">
        <div>
            <FilterSlider topTrending={topTrending} items={items} />
        </div>
        <SwiperTop urlName={"id"} topTrending={topTrending} />

      
            <TopRatedDetailsComponent />
       

    </Container>

}
