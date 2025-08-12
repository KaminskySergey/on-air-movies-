"use server"
import { getPeople } from "../../../../actions/actors";
import { getTopTrending } from "../../../../actions/movies";
import { HomeComponent } from "@/components/home/home-component";



export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}){
  const { type } = await searchParams || "movies";
  const topTrending = await getTopTrending({ type })

  const people = await getPeople()

  return <HomeComponent topTrending={topTrending.results} people={people}/>
} 