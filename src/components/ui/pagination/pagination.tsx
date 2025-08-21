"use client"

import { IMovies } from "@/types/popular-movies"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { cn } from "@/utils/utils"

interface IPagination {
    data: IMovies
}

export const Pagination = ({ data }: IPagination) => {
    const { total_pages, page, total_results } = data
    const pathname = usePathname();
    const router = useRouter()
    const searchParams = useSearchParams();
    const urlPage = Number(searchParams.get("page")) || 1;

    const currentPage = page ?? urlPage;

    const createPageURL = (pageNumber: number | string) => {
        const params = new URLSearchParams(searchParams);
        params.set("page", pageNumber.toString());
        return `${pathname}?${params.toString()}`;
    };
    const handleClick = (pageNumber: number) => {
        router.push(createPageURL(pageNumber));
    };

    const windowSize = 5;
    const half = Math.floor(windowSize / 2);

    let start = Math.max(1, currentPage - half);
    let end = Math.min(total_pages, currentPage + half);

    if (end - start + 1 < windowSize) {
        if (start === 1) {
            end = Math.min(total_pages, start + windowSize - 1);
        } else if (end === total_pages) {
            start = Math.max(1, end - windowSize + 1);
        }
    }

    const pages = Array.from({ length: end - start + 1 }, (_, i) => start + i);

    return (
        <div className=" relative px-0 mx-auto">
            {total_results && <ul className="flex gap-1 sm:gap-3">
                {start > 1 && (
                    <>
                        <li
                            onClick={() => handleClick(1)}
                            className="cursor-pointer w-6 h-6 sm:w-8 sm:h-8 transition-all duration-200 hover:shadow-md flex justify-center items-center rounded-full bg-blue-500 text-white"
                        >
                            1
                        </li>
                        {start > 2 && <li className="sm:px-1 flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8 text-white">…</li>}
                    </>
                )}

                {pages.map((p) => (
                    <li
                        key={p}
                        onClick={() => handleClick(p)}
                        
                        className={cn("w-6 h-6 sm:w-8 sm:h-8 cursor-pointer transition-all duration-200 hover:shadow-md flex justify-center border-none items-center rounded-full bg-blue-500 text-white", {
                            "bg-green-700 text-white font-bold scale-125": p === currentPage
                        })}
                    >
                        {p}
                    </li>
                ))}

                {end < total_pages && (
                    <>
                        {end < total_pages - 1 && <li className="sm:px-1 w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center text-white">…</li>}
                        <li
                            onClick={() => handleClick(total_pages)}
                            className="cursor-pointer  h-6 sm:h-8  transition-all duration-200 hover:shadow-md px-3 py-1 border-none rounded flex justify-center items-center bg-blue-500 text-white"
                        >
                            {total_pages}
                        </li>
                    </>
                )}
            </ul>}
        </div>
    );
}