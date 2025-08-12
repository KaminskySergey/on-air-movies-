"use server"
import { getTopTrending } from '../../../../actions/movies'



export default async function MoviesPage() {
  const data = await getTopTrending({ type: "movie" });

  return (
    <div className='text-blue-600'>
        {data.results[0].original_title}
        dfvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
    </div>
  )
}