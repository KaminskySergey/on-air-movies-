import { HeroMovies } from "@/components/movies/movies-hero/hero-movies";



export default async function MoviesLayout({
    children,
    params
}: {
    params: Promise<{ id: string }>;
    children: React.ReactNode;
}) {
    const { id } = await params;
    const category = 'movie';

    return (
        <>
            <HeroMovies category={category}  currentMoviesId={id} />
            <main>{children}</main>
        </>
    )
}
