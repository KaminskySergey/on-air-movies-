'use server'
import { HeroMovies } from "@/components/movies/movies-hero/hero-movies";
import { getTopTrending } from "../../../../../actions/movies";



export default async function MoviesLayout({
    children,
    params
}: {
    params: Promise<{ id: string }>;
    children: React.ReactNode;
}) {
    const { id } = await params;
    const category = 'movie';
    const moviesTrending = await getTopTrending({type: category})
    return (
        <>
            <HeroMovies category={category} moviesTrending={moviesTrending.results}  currentMoviesId={id} />
            <main>{children}</main>
        </>
    )
}
