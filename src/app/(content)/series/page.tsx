"use server"
import { KinoComponent } from "@/components/kino/kino-component";
import { getKinoWithFilter, getKinoGenres, getTopTrending } from "../../../../actions/movies";
import { tvSortOptions } from "@/const/kino-sort";
import type { Metadata } from "next";

interface IMoviesPage {
    searchParams: Promise<{ [key: string]: string | undefined }>
}

export async function generateMetadata(): Promise<Metadata> {
    return {
  title: "TV Series – OnAir Movies",
  description: "Explore trending TV series online, watch trailers, see popular actors, and discover top-rated shows.",
  keywords: ["tv shows online", "series online", "watch trailers", "popular actors", "top-rated series"],
  openGraph: {
    title: "TV Series – OnAir Movies",
    description: "Discover trending TV series, browse images, explore popular actors, and watch trailers online.",
    url: "https://on-air-movies.vercel.app/series",
    siteName: "OnAir Movies",
    images: [
      {
        url: "/og-series.jpg",
        width: 1200,
        height: 630,
        alt: "Trending TV series",
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
}
};


export default async function SeriesPage({searchParams}: IMoviesPage) {

    const category = "tv"
    const data = await getTopTrending({ type: category });
    const genres = await getKinoGenres(category)
    const filters = (await searchParams)
   const items = await getKinoWithFilter(category, {
    page: filters.page || 1,
    sort_by: filters.sortBy as string,
    with_genres: filters.genres as string,
    first_air_date_year: filters.year as string,
    query: filters.search as string
   })
    return (
       <KinoComponent sortItems={tvSortOptions} genresData={genres.genres} items={items} category={category} moviesTrending={data.results} />
    )
}