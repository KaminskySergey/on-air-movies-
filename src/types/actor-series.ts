
export interface IActorWorkSerieHomePage {
    cast: ICastSeries[] | [];
    crew: ICrewSeries[] | [];
    id: number;
  }
  
export interface IWorkSeries {
    adult: boolean;
    backdrop_path: string | null;
    credit_id: string;
    episode_count: number;
    first_air_date: string;
    first_credit_air_date?: string;
    genre_ids: number[];
    id: number;
    name: string;
    origin_country: string[];
    original_language: string;
    original_name?: string;
    original_title?: string;
    overview: string;
    popularity: number;
    poster_path: string | null;
    vote_average: number;
    vote_count: number;
  }

  export interface ICastSeries extends IWorkSeries {
    character: string;
    order: number;
  }

  export interface ICrewSeries extends IWorkSeries {
    department: string;
    job: string;
  }