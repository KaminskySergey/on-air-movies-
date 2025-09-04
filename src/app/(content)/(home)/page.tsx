"use server"
import { getPeople } from "../../../../actions/actors";
import { getTopTrending } from "../../../../actions/movies";
import { HomeComponent } from "@/components/home/home-component";
import type { Metadata } from "next";




export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Watch the Latest Movies and TV Shows Online | OnAir Movies",
    description:
      "Discover trending movies, TV shows, explore popular actors, watch trailers, and browse image galleries on OnAir Movies.",
    keywords: [
      "movies online",
      "tv shows online",
      "trending movies",
      "popular actors",
      "watch trailers",
      "movie gallery",
    ],
    openGraph: {
      title: "Watch the Latest Movies and TV Shows Online | OnAir Movies",
      description:
        "Discover trending movies, TV shows, browse images, explore popular actors and their works, and watch trailers online.",
      url: "https://on-air-movies.vercel.app",
      siteName: "OnAir Movies",
      images: [
        {
          url: "/og-hero.jpg",
          width: 1200,
          height: 630,
          alt: "Trending movies and actors",
        },
      ],
      type: "website",
      locale: "en_US",
    },
    robots: {
      index: true,
      follow: true,
    },
    category: "entertainment",
  };
}
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