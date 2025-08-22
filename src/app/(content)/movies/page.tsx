"use server"
import { movieSortOptions } from '@/const/kino-sort';
import { getKinoWithFilter, getKinoGenres, getTopTrending } from '../../../../actions/movies'
import { KinoComponent } from '@/components/kino/kino-component';

interface IMoviesPage {
    searchParams: Promise<{ [key: string]: string | undefined }>
}



export default async function MoviesPage({searchParams}: IMoviesPage) {

    const category = "movie"
    const data = await getTopTrending({ type: category });
    const genres = await getKinoGenres(category)
    const filters = (await searchParams)
   const items = await getKinoWithFilter(category, {
    page: filters.page || 1,
    sort_by: filters.sortBy as string,
    with_genres: filters.genres as string,
    primary_release_year: filters.year as string,
    query: filters.search as string
   })
    return (
       <KinoComponent sortItems={movieSortOptions} genresData={genres.genres} items={items} category={category} moviesTrending={data.results} />
    )
}