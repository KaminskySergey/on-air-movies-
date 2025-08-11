"use server"
import { redirect } from "next/navigation";
import { getTopTrending } from "../../../../actions/movies";

export default async function MoviesIndexPage() {
 
    const data = await getTopTrending({ type: "movie",  } );
  
    if (!data.results?.length) {
      redirect("/"); 
    }
  
    const firstId = data.results[0].id;
    redirect(`/movies/${firstId}`);
  }