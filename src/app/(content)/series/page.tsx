import { KinoComponent } from "@/components/kino/kino-component";
import { getKinoWithFilter, getKinoGenres, getTopTrending } from "../../../../actions/movies";
import { tvSortOptions } from "@/const/kino-sort";

interface IMoviesPage {
    searchParams: Promise<{ [key: string]: string | undefined }>
}


export default async function SeriesPage({searchParams}: IMoviesPage) {

    const category = "tv"
    const data = await getTopTrending({ type: category });
    const genres = await getKinoGenres(category)
    const filters = (await searchParams)
   const items = await getKinoWithFilter(category, {
    page: filters.page || 1,
    sort_by: filters.sortBy as string,
    with_genres: filters.genres as string,
    first_air_date_year: filters.year as string,
    query: filters.search as string
   })
    return (
       <KinoComponent sortItems={tvSortOptions} genresData={genres.genres} items={items} category={category} moviesTrending={data.results} />
    )
}