"use server"
import { getKinoWithFilter, getMoviesGenres, getTopTrending } from '../../../../actions/movies'
import { MoviesComponent } from '@/components/movies/movies-component';

interface IMoviesPage {
    searchParams: Promise<{ [key: string]: string | undefined }>
}

export default async function MoviesPage({searchParams}: IMoviesPage) {

    const category = "movie"
    const data = await getTopTrending({ type: "movie" });
    const genres = await getMoviesGenres()
    const filters = (await searchParams)
console.log(filters)
   const items = await getKinoWithFilter("movie", {
    page: filters.page || 1,
    sort_by: filters.sortBy as string,
    with_genres: filters.genres as string,
    primary_release_year: filters.year as string,
    query: filters.search as string
   })
    return (
       <MoviesComponent genresData={genres.genres} items={items} category={category} moviesTrending={data.results} />
    )
}