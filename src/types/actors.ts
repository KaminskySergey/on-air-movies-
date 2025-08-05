export interface ICredits {
  id: number;
  cast: IActor[];
  crew: IActor[];
}

export interface IActor {
  adult: boolean;
  cast_id: number;
  character: string;
  credit_id: string;
  gender: number | null;
  id: number;
  known_for_department: string;
  name: string;
  order: number;
  original_name: string;
  popularity: number;
  profile_path: string | null;
}

