export interface IActorWorkMovieHomePage {
    cast: IWorkMovies[];
    crew: IWorkMovies[];
    id: number;
  }
  
  export interface IActorWorks {
    cast: IWorkMovies[];
    crew: IWorkMovies[];
  }

  export interface IWorkMovies {
    adult: boolean;
    backdrop_path: string | null;
    credit_id: string;
    genre_ids: number[];
    id: number;
    name?: string;
    original_language: string;
    original_title?: string;
    original_name?: string;
    overview: string;
    popularity: number;
    poster_path: string | null;
    release_date?: string;
    first_air_date?: string
    title?: string;
    video?: boolean;
    vote_average: number;
    vote_count: number;
    media_type?: string;
    character?: string;
    order?: number;
    department?: string;
    job?: string;
    type?: string
  }
 