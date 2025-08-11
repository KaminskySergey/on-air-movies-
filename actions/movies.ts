import { fetcher } from "@/api/helpers";
import { ICredits } from "@/types/actors";
import { IMovieImages } from "@/types/images";
import { IMovieDetails, IMovies } from "@/types/popular-movies";
import { IVideoTrailer } from "@/types/video";

export const getPopularMovies = async () => {
  const response = await fetcher<IMovies>("movie/popular");
  return response;
};

export const getTopTrending = async ({
  type,
}: {
  type: string | undefined;
}) => {
  const currentType =
    type === "series"
      ? "tv"
      : type === "movie" || type === "tv"
      ? type
      : "movie";

  const response = await fetcher<IMovies>(
    `trending/${currentType}/day?language=en-US`,
    {
      next: { revalidate: 3600 },
    }
  );
  return response;
};

export const getTopRatedDetailsMovie = async (movieId: string | undefined) => {
  const response = await fetcher<IMovieDetails>(`movie/${movieId}`);
  return response;
};

export const getTopRatedDetailsSeries = async (
  seriesId: string | undefined
) => {
  const response = await fetcher<IMovieDetails>(`tv/${seriesId}`);
  return response;
};

export const getCreditsCurrentMovie = async (movieId: string | null) => {
  const response = await fetcher<ICredits>(`movie/${movieId}/credits`);
  return response;
};

export const getCreditsCurrentSeries = async (seriesId: string | null) => {
  const response = await fetcher<ICredits>(`tv/${seriesId}/credits`);
  return response;
};

export const getTrailer = async (type: string, id: string | null) => {
  const typePath =
    type === "movies" ? "movie" : type === "series" ? "tv" : "movie";
  const response = await fetcher<IVideoTrailer>(`${typePath}/${id}/videos`);
  return response;
};

export const getMoviesImages = async (movieId: string | null) => {
  const response = await fetcher<IMovieImages>(`movie/${movieId}/images?language=en`);
  return response;
};



export const getHeroInfoMovies = async (movieId: string) => {
  const [details, credits, images] = await Promise.all([
      getTopRatedDetailsMovie(movieId),
      getCreditsCurrentMovie(movieId),
      getMoviesImages(movieId)
      
  ]);
  return { details, credits, images };
}

