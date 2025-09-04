"use server"
import { PeopleDetailsComponent } from "@/components/people-details/people-details-component"
import { getPeopleCombined, getPeopleDetailsId,  } from "../../../../../actions/actors"
import { Metadata } from "next";

interface IPeopleDetailsPage {
    params: Promise<{
        id: string
    }>
}
export async function generateMetadata({ params }: IPeopleDetailsPage): Promise<Metadata> {
    const { id } = await params;
    const person = await getPeopleDetailsId(id);
    const description = person.biography || `Learn about ${person.name}, browse images, filmography, and watch trailers.`;
    return {
      title: `${person.name} – OnAir Movies`,
      description,
      keywords: ["actor", person.name, "biography", "filmography", "movie gallery"],
      openGraph: {
        title: `${person.name} – OnAir Movies`,
        description,
        url: `https://on-air-movies.vercel.app/people/${person.id}`,
        siteName: "OnAir Movies",
        images: [
          {
            url: person.profile_path || "/og-hero.jpg",
            width: 1200,
            height: 630,
            alt: person.name,
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


export default async function PeopleDetailsPage({ params }: IPeopleDetailsPage) {
    const {id} = await params
    const personBasik = await getPeopleDetailsId(id)
    const works = await getPeopleCombined(id)
return (
    <PeopleDetailsComponent works={works} personBasik={personBasik}/>
)
}