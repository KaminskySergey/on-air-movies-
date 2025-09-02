import { IWorkMovies } from "./actor-movie";

export type WorkItem = (IWorkMovies) & {
    department: string; 
  };
  
  export type WorksByDepartment = Record<
    string,
    {
      grouped: Record<string, WorkItem[]>; 
      withoutDate: WorkItem[];            
    }
  >;