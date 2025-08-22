import { IActor } from "./actors";
import { IImage } from "./images";

export interface IHeroInfo {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  imgLocal: string;
}

export interface IHeroDetails {
  cast: IActor[];
  runtime: number | undefined | null;
  number_of_episodes: number | undefined,
  number_of_seasons: number | undefined,
  backdrops: IImage[];
}
