"use server"
import { MoviesComponent } from "@/components/movies/movies-component";
import { getTopTrending } from "../../../../../actions/movies";


export default async function MoviesPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
console.log(params)
const { id } = await params;
const category = 'movie';
const moviesTrending = await getTopTrending({type: category})
    return <MoviesComponent category={category} moviesTrending={moviesTrending.results} currentMoviesId={id}/>
}
