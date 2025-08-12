"use server"
import Link from 'next/link';
import { getTopTrending } from '../../../../actions/movies'



export default async function MoviesPage() {
    const data = await getTopTrending({ type: "movie" });

    return (
        <div style={{ padding: 20, fontSize: 18 }}>
            🎬 Movies list will be here soon!
            <br />
            <Link href={`/movies/${data.results[0].id}`}>
                CLick me
            </Link>
        </div>
    )
}