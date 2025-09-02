// import { IPeopleHeroData } from "@/types/people";
// import { Container } from "../ui/container";
// import Image from "next/image";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Biography } from "./biography";
// import { formatActorLife, getYearFromDate } from "@/utils/utils";

// interface IPeopleKinoSliderItem {
//     item: IPeopleHeroData
// }

// export function PeopleKinoSliderItem({ item }: IPeopleKinoSliderItem) {
//     return <Container className="px-[24px] md:px-[32px] relative flex flex-col pt-[64px]  sm:flex-row sm:items-start gap-6 h-full">
//         <div className="relative w-[124px] h-[200px] shrink-0">
//             <Image
//                 src={`https://image.tmdb.org/t/p/original${item.actor.profile_path}`}
//                 alt={item.actor.name}
//                 fill
//                 className="object-cover object-center rounded-lg"
//                 priority
//             />
//         </div>

//         <div className="text-white flex flex-col gap-4 sm:gap-5 flex-1 min-w-0 mt-4 sm:mt-0">
//             <div>
//                 <h2 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-bold text-center sm:text-left truncate">
//                     {item.actor.name}
//                 </h2>
//             </div>

//             <div className="text-gray-300 text-sm sm:text-base text-center sm:text-left">
//                 {item.actor.birthday && <p>{formatActorLife(item.actor.birthday, item.actor.deathday)}</p>}
//             </div>

//             <div className="mt-4">
//                 <h3 className="text-lg font-semibold mb-3 text-center sm:text-left">Top Movies</h3>
//                 <div className="flex flex-wrap justify-center sm:justify-start gap-3 sm:gap-4">
//                     {item.topMovies.map((movie: any) => (
//                         <div
//                             key={movie.id}
//                             className="relative w-[90px] sm:w-[110px] md:w-[124px] aspect-[2/3] shrink-0 group"
//                         >
//                             <Image
//                                 src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
//                                 alt={movie.title}
//                                 width={124}
//                                 height={250}
//                                 className="rounded-lg object-cover group-hover:opacity-80 transition"
//                             />
//                         </div>
//                     ))}
//                 </div>
//             </div>
//         </div>
//     </Container>


// }
