"use server"
import { TopPeople } from "@/components/top-people/top-people";
import { TopTrendingComponent } from "@/components/top-trending/top-rated-component";
import { getTopTrending } from "../../../actions/movies";
import { redirect } from "next/navigation";
import { getPeople } from "../../../actions/actors";
import Image from "next/image";



export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}){
  const { type } = await searchParams || "movies";
  const topTrending = await getTopTrending({ type })
  // const movieDetails = await getTopRatedDetails(movieId)
  // console.log(movieDetails, 'movieDetailsmovieDetailsmovieDetails')
  // const photos = await getPhotos()
  const people = await getPeople()
  if (!type?.length) {
    redirect(`/?type=movies`);
  }
  return (
    <>
      <section className="pt-4 bg-black">
        <TopTrendingComponent topTrending={topTrending.results} />

      </section>
      <section className="py-4 pb-8 relative  ">
        <Image
          src="/hero-big.webp"
          alt="Hero background"
          fill
          className="object-cover  bg-black/30 backdrop-blur-sm"
          priority

        />
        <TopPeople people={people.results} />
        <div className="absolute top-0 left-0 w-full h-full z-1 bg-black/30 backdrop-blur-sm"></div>
      </section>
    </>
  );
} 