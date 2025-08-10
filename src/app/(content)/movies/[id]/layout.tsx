import { HeroMovies } from "@/components/movies/movies-hero/hero-movies";
import { getCreditsCurrentMovie, getMoviesImages, getTopRatedDetailsMovie, getTopTrending } from "../../../../../actions/movies";


export const getHeroInfoMovies = async (movieId: string) => {
    const [details, credits, images] = await Promise.all([
        getTopRatedDetailsMovie(movieId),
        getCreditsCurrentMovie(movieId),
        getMoviesImages(movieId)
        
    ]);

    return { details, credits, images };
}



export default async function MoviesLayout({
    children,
    params
}: {
    params: Promise<{ id: string }>;
    children: React.ReactNode;
}) {
    const { id } = await params;
    const data = await getHeroInfoMovies(id)
    const { cast } = data.credits
    const { runtime } = data.details
    const { backdrops } = data.images

    const heroDetails = {
        cast, runtime, backdrops
    }
    return (
        <>
            <HeroMovies heroDetails={heroDetails} currentMoviesId={id} />
            <main>{children}</main>
        </>
    )
}
