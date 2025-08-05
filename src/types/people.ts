export interface IPeoplePupular {
page: number,
results: IPerson[]
total_pages: number
total_results: number

}

export interface IPerson {
    adult: boolean;
    gender: number; 
    id: number;
    known_for_department: string;
    name: string;
    original_name: string;
    popularity: number;
    profile_path: string | null;
    known_for: IKnownForWork[];
  }
  
   interface IKnownForWork {
    adult: boolean;
    backdrop_path: string | null;
    genre_ids: number[];
    id: number;
    original_language: string;
    original_title?: string; 
    original_name?: string; 
    overview: string;
    poster_path: string | null;
    release_date?: string; 
    first_air_date?: string; 
    title?: string; 
    name?: string; 
    video?: boolean; 
    vote_average: number;
    vote_count: number;
    media_type: "movie" | "tv"; 
  }

  export interface IPersonDetails {
    adult: boolean; 
    also_known_as: string[]; 
    biography: string; 
    birthday: string | null; 
    deathday: string | null; 
    gender: number; 
    homepage: string | null; 
    id: number; 
    imdb_id: string | null; 
    known_for_department: string; 
    name: string; 
    place_of_birth: string | null; 
    popularity: number; 
    profile_path: string | null;
  }