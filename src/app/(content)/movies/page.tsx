"use server"
import { movieSortOptions } from '@/const/kino-sort';
import { getKinoWithFilter, getKinoGenres, getTopTrending } from '../../../../actions/movies'
import { KinoComponent } from '@/components/kino/kino-component';
import type { Metadata } from "next";
interface IMoviesPage {
    searchParams: Promise<{ [key: string]: string | undefined }>
}

export async function generateMetadata(): Promise<Metadata> {
  
    return {
      title: `OnAir – OnAir Movies`,
      description: `Browse the latest OnAir online, explore galleries, watch trailers, and discover top-rated OnAir.`,
      keywords: ["movies online", "latest movies", "movie gallery", "watch trailers", "top-rated films"],
      openGraph: {
        title: `OnAir – OnAir Movies`,
        description: `Discover the latest OnAir, browse posters, and watch trailers online.`,
        url: "https://on-air-movies.vercel.app/movies",
        siteName: "OnAir Movies",
        images: [
          {
            url: "/og-hero.jpg",
            width: 1200,
            height: 630,
            alt: `Latest OnAir Movies`,
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
export default async function MoviesPage({searchParams}: IMoviesPage) {

    const category = "movie"
    const data = await getTopTrending({ type: category });
    const genres = await getKinoGenres(category)
    const filters = (await searchParams)
   const items = await getKinoWithFilter(category, {
    page: filters.page || 1,
    sort_by: filters.sortBy as string,
    with_genres: filters.genres as string,
    primary_release_year: filters.year as string,
    query: filters.search as string
   })
    return (
       <KinoComponent sortItems={movieSortOptions} genresData={genres.genres} items={items} category={category} moviesTrending={data.results} />
    )
}