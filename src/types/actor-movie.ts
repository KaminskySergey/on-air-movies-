export interface IActorWorkMovieHomePage {
    cast: ICastMovies[];
    crew: ICrewMovies[];
    id: number;
  }
  
  export interface IWorkMovies {
    adult: boolean;
    backdrop_path: string | null;
    credit_id: string;
    genre_ids: number[];
    id: number;
    original_language: string;
    original_title: string;
    original_name?: string;
    overview: string;
    popularity: number;
    poster_path: string | null;
    release_date: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
  }
  export interface ICastMovies extends IWorkMovies {
    character: string;
    order: number;
  }
  export interface ICrewMovies extends IWorkMovies {
    department: string;
    job: string;
  }
  