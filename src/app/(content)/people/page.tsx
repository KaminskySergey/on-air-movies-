"use server"
import { PeopleComponent } from "@/components/people/people-component"
import { getPeople, getSearchPeople } from "../../../../actions/actors"
import { Metadata } from "next";

interface IPeoplePage {
    searchParams: Promise<{ [key: string]: string | undefined }>
}

export async function generateMetadata({ searchParams }: IPeoplePage): Promise<Metadata> {
    const params = await searchParams;
    const query = params.search;
  
    const title = query
      ? `Search results for "${query}" – OnAir Movies`
      : `Popular Actors – OnAir Movies`;
  
    const description = query
      ? `Search results for "${query}" in our actor gallery. Browse images, read actor biographies, and watch trailers online.`
      : "Explore popular actors, their filmography, and image galleries. Watch trailers and discover new talents.";
  
    return {
      title,
      description,
      keywords: ["actors", "people gallery", "actor biographies", "movie gallery", "watch trailers"],
      openGraph: {
        title,
        description,
        url: `https://on-air-movies.vercel.app/people${query ? `?search=${query}` : ""}`,
        siteName: "OnAir Movies",
        images: [
          {
            url: "/og-people.jpg",
            width: 1200,
            height: 630,
            alt: query ? `Search results for ${query}` : "Popular actors gallery",
          },
        ],
        type: "website",
        locale: "en_US",
      },
      robots: {
        index: true,
        follow: true,
      },
      category: "entertainment",
    };
  }

export default async function PeoplePage({ searchParams }: IPeoplePage) {
    const params = await searchParams;

    const people = params.search
        ? await getSearchPeople({ search: params.search, page: params.page || 1 })
        : await getPeople({ page: params.page || 1 });
    
    return (
        <PeopleComponent people={people} />
    )
}