import { fetcher } from "@/api/helpers";
import { IActorWorkMovieHomePage } from "@/types/actor-movie";
import { IActorWorkSerieHomePage } from "@/types/actor-series";
import { ICredits } from "@/types/actors";
import { IPeoplePupular, IPersonDetails } from "@/types/people";


export const getPeopleTrending = async (type: string) => {
  const response = await fetcher<IActorWorkSerieHomePage>(
    `trending/person/${type}`
  );
  return response;
};



export const getPeople = async (params?: { page: number | string }) => {
  const page = params?.page || 1;
  const response = await fetcher<IPeoplePupular>(`person/popular?page=${page}`);

  return response;
};



export const getSearchPeople = async (params: {
  search: string;
  page?: number | string;
}) => {
  const query = new URLSearchParams({
    query: params.search,
    page: String(params.page || 1),
  });
  const response = await fetcher<IPeoplePupular>(
    `search/person?${query.toString()}`
  );
  return response;
};

export const getPeopleDetailsId = async (personId: string | number) => {
  const response = await fetcher<IPersonDetails>(`person/${personId}`);
  return response;
};

export const getPeopleDetailsMovies = async (personId: string | number) => {
  const response = await fetcher<IActorWorkMovieHomePage>(
    `person/${personId}/movie_credits`
  );
  return response;
};

export const getPeopleDetailsSeries = async (personId: string | number) => {
  const response = await fetcher<IActorWorkSerieHomePage>(
    `person/${personId}/tv_credits`
  );
  return response;
};

export const getPeopleCombined = async (personId: string) => {
  const [movies, tv] = await Promise.all([
    getPeopleDetailsMovies(personId),
    getPeopleDetailsSeries(personId)
  ]);

  return {
    cast: [
      ...movies.cast.map(el => ({ ...el, type: "movie" })),
      ...tv.cast.map(el => ({ ...el, type: "tv" }))
    ],
    crew: [
      ...movies.crew.map(el => ({ ...el, type: "movie" })),
      ...tv.crew.map(el => ({ ...el, type: "tv" }))
    ]
  };
};