import { fetcher } from "@/api/helpers";
import { ICredits } from "@/types/actors";
import { IGenresList } from "@/types/genres";
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

export const getTopRatedDetailsKino = async (
  type: "movie" | "tv",
  movieId: string | undefined
) => {
  const response = await fetcher<IMovieDetails>(`${type}/${movieId}`);
  return response;
};

export const getCreditsCurrentKino = async (type: "movie" | "tv", movieId: string | null) => {
  const response = await fetcher<ICredits>(`${type}/${movieId}/credits`);
  return response;
};

export const getKinoImages = async (type: "movie" | "tv", movieId: string | null) => {
  const response = await fetcher<IMovieImages>(
    `${type}/${movieId}/images?language=en`
  );
  return response;
};




export const getHeroInfoKino = async (
  type: "movie" | "tv",
  movieId: string
  ) => {
  const [details, credits, images] = await Promise.all([
    getTopRatedDetailsKino(type, movieId),
    getCreditsCurrentKino(type, movieId),
    getKinoImages(type, movieId),
  ]);
  return { details, credits, images };
};


export const getTrailer = async (type: string, id: string | null) => {
  
  const response = await fetcher<IVideoTrailer>(`${type}/${id}/videos`);
  return response;
};

export const getKinoWithFilter = async (
  type: "movie" | "tv",
  params: Record<string, string | number | string[]> = {}
) => {
  if (params.query) {
    const query = new URLSearchParams({
      query: String(params.query),
      page: String(params.page || 1),
    });

    return fetcher<IMovies>(`search/${type}?${query}`, {
      cache: "no-store",
    });
  } else {
    const query = new URLSearchParams(
      Object.fromEntries(
        Object.entries(params)
          .filter(([_, v]) => v !== undefined && v !== "")
          .map(([k, v]) => [k, Array.isArray(v) ? v.join(",") : String(v)])
      )
    );

    return fetcher<IMovies>(`discover/${type}?${query}`, { cache: "no-store" });
  }
};

export const getKinoGenres = async (type: "movie" | "tv") => {
  const response = await fetcher<IGenresList>(`genre/${type}/list`, {
    next: { revalidate: 60 * 60 * 24 * 7 },
  });
  return response;
};
