"use server"
import { getTopTrending } from '../../../../actions/movies'
import { MoviesComponent } from '@/components/movies/movies-component';



export default async function MoviesPage() {
    const data = await getTopTrending({ type: "movie" });
   const category = "movie"
    return (
       <MoviesComponent category={category} moviesTrending={data.results} />
    )
}