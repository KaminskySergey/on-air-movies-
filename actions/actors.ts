import { fetcher } from "@/api/helpers"
import { IActorWorkMovieHomePage } from "@/types/actor-movie"
import { IActorWorkSerieHomePage } from "@/types/actor-series"
import { IPeoplePupular, IPersonDetails } from "@/types/people"

export const getPeople = async () => {
    const response = await fetcher<IPeoplePupular>('person/popular')
    return response
  }


  export const getPeopleDetailsId = async (personId: number) => {
    const response = await fetcher<IPersonDetails>(`person/${personId}`)
    return response
  }
  
  export const getPeopleDetailsMovies = async (personId: number) => {
    const response = await fetcher<IActorWorkMovieHomePage>(`person/${personId}/movie_credits`)
    return response
  }

  export const getPeopleDetailsSeries = async (personId: number) => {
    const response = await fetcher<IActorWorkSerieHomePage>(`person/${personId}/tv_credits`)
    return response
  }
  
  
