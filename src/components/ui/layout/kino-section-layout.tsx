import { KinoImagesTop } from "@/components/kino-details/kino-images/kino-images-top"
import { getDetailsKino } from "../../../../actions/movies"
import { Container } from "../container"
import { TitleLinie } from "../title/title-linie"
import { capitalize } from "@/utils/utils"

interface IKinoSectionLayout {
  children: React.ReactNode
  category: "movie" | "tv"
  id: string
  section: "posters" | "backdrops" | "videos"
}

export async function KinoSectionLayout({
  children,
  category,
  id,
  section,
}: IKinoSectionLayout) {
  const movie = await getDetailsKino(category, id)

  return (
    <>
      <section className="py-[16px] sm:py-[32px] bg-gray-900">
        <KinoImagesTop movie={movie} category={category} />
      </section>
      <section className="py-[16px] sm:py-[32px] bg-[#01001F]">
        <Container className="flex flex-col gap-5 sm:gap-7">
          <div>
            <TitleLinie title={capitalize(section)} />
          </div>
          <div>{children}</div>
        </Container>
      </section>
    </>
  )
}