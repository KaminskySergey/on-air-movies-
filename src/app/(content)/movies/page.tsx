"use server"
import { redirect } from 'next/navigation'
import { getTopTrending } from '../../../../actions/movies'

import { IMovies } from "@/types/popular-movies";



 
export async function generateStaticParams() {
  const movies: IMovies = await fetch(`https://api.themoviedb.org/3/trending/movie/day?api_key=82c5efe8e8fabe5ba268d110659f3c1b&language=en&`).then((res) =>
    res.json()
  )
  return movies.results.map((post) => ({
    id: String(post.id),
  }))
}
 


export default async function MoviesPageRedirect({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
  const data = await getTopTrending({ type: 'movie' })
console.log(params)
  if (!data.results?.length) {
    redirect('/')
  }

  const firstId = data.results[0].id
  redirect(`/movies/${firstId}`)
return <></>
}