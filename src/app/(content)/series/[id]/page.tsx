import { KinoDetailsComponent } from "@/components/kino-details/kino-details-component"
import { getCreditsCurrentKino, getDetailsKino, getKinoImages, getKinoRecommendations, getKinoVideos } from "../../../../../actions/movies"
import { IMediaKinoDetails } from "@/types/kino-media"

interface ISeriesDetailsPage {
    params: Promise<{
        id: string
    }>
}

export async function generateMetadata({ params }: ISeriesDetailsPage): Promise<Metadata> {
    const { id } = await params;
    const movie = await getDetailsKino("tv", id);
    return {
      title: `${movie.name || movie.original_name} – Watch Online | OnAir Movies`,
      description: movie.overview,
      keywords: ["movies online", movie.name, "watch trailers", "actors", "movie gallery"],
      openGraph: {
        title: `${movie.name || movie.original_name} – OnAir Movies`,
        description: movie.overview,
        url: `https://on-air-movies.vercel.app/movies/${movie.id}`,
        siteName: "OnAir Movies",
        images: [
          {
            url: movie.posterUrl,
            width: 1200,
            height: 630,
            alt: movie.name || movie.original_name,
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

export default async function SeriesDetailsPage({ params }: ISeriesDetailsPage) {

    const category = "tv"
    const { id } = await params

    const detailsInfo = await getDetailsKino(category, id)

    const credits = await getCreditsCurrentKino(category, id)

    const images = await getKinoImages(category, id)
    const videos = await getKinoVideos(category, id)

    const recommendations = await getKinoRecommendations(category, id)
    const counts = {
        videos: videos.results.length ?? 0,
        posters: images.posters.length ?? 0,
        backdrops: images.backdrops.length ?? 0
    };

    const mediaKinoDetails : IMediaKinoDetails = {
        videos: videos.results.slice(0, 12),
        posters: images.posters.slice(0, 12),
        backdrops: images.backdrops.slice(0, 12),
    }



    return (
        <KinoDetailsComponent recommendations={recommendations.results} mediaKinoDetails={mediaKinoDetails}  counts={counts} kinoId={id} cast={credits.cast} category={category} detailsInfo={detailsInfo} />
    )
}