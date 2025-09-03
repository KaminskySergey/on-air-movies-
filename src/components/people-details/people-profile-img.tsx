import Image from "next/image"
import { TMDBimgMedium } from "@/const/tmdb-img"
interface IPeopleProfileImg {
    name: string
    urlImg: string | null
    birthday: string | null
}

export const PeopleProfileImg = ({name, urlImg, birthday }: IPeopleProfileImg) => {
    return (
        <div className="relative w-[280px] h-[350px] sm:h-[500px]">
                            <Image
                                alt={name}
                                src={`${urlImg ? `${TMDBimgMedium}${urlImg}` : "/placeholder.png"}`}
                                fill
                                priority
                                        unoptimized
                                sizes="48"
                                className="object-cover rounded-lg"
                            />
                            <div className="absolute bottom-0 left-0 w-full h-[64px] sm:h-20 flex flex-col gap-2 items-center justify-center bg-black/50 backdrop-blur-md p-2">
                                <h1 className="text-white font-semibold text-center text-sm line-clamp-2">
                                    {name}
                                </h1>
                                <span className="text-gray-300 text-xs">
                                    {birthday}
                                </span>
                            </div>
                        </div>
    )
}