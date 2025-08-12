"use server"
import { redirect } from 'next/navigation'
import { getTopTrending } from '../../../../actions/movies'

export const dynamic = "force-dynamic";


export default async function MoviesRedirectPage() {
  const data = await getTopTrending({ type: "movie" });

  if (!data.results?.length) {
    redirect("/");
  }

  const firstId = data.results[0].id;
  redirect(`/movies/${firstId}`);
}