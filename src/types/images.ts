export interface IImage {
    aspect_ratio: number;
    height: number;
    iso_639_1: string | null;
    file_path: string;
    vote_average: number;
    vote_count: number;
    width: number;
  }
  
 export  interface IMovieImages {
    id: number;
    backdrops: IImage[];
    posters: IImage[];
    logos: IImage[];
  }

  export interface IKinoVideo {
    iso_639_1: string;     
    iso_3166_1: string;     
    name: string;           
    key: string;           
    site: string;           
    size: number;           
    type: string;           
    official?: boolean;     
    published_at: string;   
    id: string;             
  }