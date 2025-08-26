import { Container } from "@/components/ui/container"
import { KinoFilter } from "@/components/ui/filters/kino-filter"
import { KinoList } from "@/components/ui/list/kino-list"
import { Pagination } from "@/components/ui/pagination/pagination"
import { IGenres } from "@/types/genres"
import { IMovies } from "@/types/popular-movies"
import { IKinoSort } from "@/types/sort"

interface IKinoSection {
    items: IMovies,
    sortItems: IKinoSort[]
    genresData: IGenres[]
    category: "movie" | "tv"
}

export const KinoSection = ({category, genresData, items, sortItems }: IKinoSection) => {

    return (
        <Container className="flex flex-col gap-8">
            <KinoFilter genresData={genresData} sortItems={sortItems} />
            <KinoList category={category} items={items.results} />
            <Pagination data={items} />
        </Container>

    )
}