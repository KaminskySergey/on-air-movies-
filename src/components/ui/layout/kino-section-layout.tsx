import { KinoImagesTop } from "@/components/kino-details/kino-images/kino-images-top"
import { getDetailsKino } from "../../../../actions/movies"
import { Container } from "../container"

export async function KinoSectionLayout({
    children,
    category,
    id,
  }: {
    children: React.ReactNode
    category: "movie" | "tv"
    id: string
  }) {
    const movie = await getDetailsKino(category, id)
  
    return (
      <>
        <section className="py-[16px] sm:py-[32px] bg-gray-900">
          <KinoImagesTop movie={movie} category={category} />
        </section>
        <section className="py-[16px] sm:py-[32px] bg-[#01001F]">
          <Container>{children}</Container>
        </section>
      </>
    )
  }