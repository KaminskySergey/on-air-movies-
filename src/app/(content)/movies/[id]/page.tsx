import { MoviesComponent } from "@/components/movies/movies-component";


export default async function Movies({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
console.log(params)
    return <MoviesComponent />
}