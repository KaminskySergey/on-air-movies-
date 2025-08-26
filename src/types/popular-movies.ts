export interface IMovie {
  adult: boolean;
  backdrop_path: string | null;
  genre_ids: number[];
  id: number;
  name?: string; 
  first_air_date?: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface IMovies {
    page: number;
    results: IMovie[];
    total_pages: number;
    total_results: number;
  }

  export interface IMovieDetails {
    id: number;
    title: string;
    poster_path: string | null;
    number_of_seasons?: number;
    number_of_episodes?: number;
    first_air_date?: string;
    last_air_date?: string;
    status: string;
    genres: { id: number; name: string }[];
    overview: string;
    release_date: string;
    name?: string;
    runtime?: number;
    vote_average: number;
    vote_count: number;
    backdrop_path: string
    original_language: string
    origin_country: string[]
    original_title: string
    popularity: number
    tagline: string
  }

 