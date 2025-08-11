"use client"
import { useCustomSearchParams } from "@/hooks/use-search-params"
import { useEffect } from "react"
import { cn } from "@/utils/utils"
import { List } from "../list/list"
import { mainPaths } from "@/configs/nav-page"
interface IItems {
    id: number,
    name: string
}

interface IFilterSlider {
    items: IItems[]
}

export const FilterSlider = ({ items }: IFilterSlider) => {
    const { router, pathname, createQueryString, searchParams } = useCustomSearchParams()
    const type = searchParams.get('type')
    useEffect(() => {
        if (mainPaths.includes(pathname) && !searchParams.has("type")) {
            router.push(pathname + "?" + createQueryString("type", "movies"));
        }
    }, [searchParams, router, pathname, createQueryString]);

    const handleClick = (name: string) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("type", name);
        params.delete("id");

        router.push(pathname + "?" + params.toString());
    };
    if (!type) return null;
    return <List className="inline-flex items-center p-1 gap-1 text-xs md:text-base text-gray-600 bg-blue-500 rounded-xl">
        {items.map((el) => (
            <li key={el.id}>
                <button
                    disabled={el.name === type}
                    onClick={() => handleClick(el.name)}
                    type="button"
                    className={cn("inline-flex items-center justify-center whitespace-nowrap px-4 h-8 font-medium  outline-none focus:ring-2 focus:ring-blue-600 focus:ring-inset text-blue-600 shadow bg-white", {
                        "rounded-l-lg ": el.name === "movies",
                        "rounded-r-lg": el.name === "series",
                        "bg-blue-600 text-white shadow-md cursor-not-allowed": el.name === type,
                        "bg-blue-100/100 text-blue-900 shadow-inner hover:bg-blue-200 cursor-pointer": el.name !== type,
                    })}
                >
                    {el.name}
                </button>
            </li>
        ))}
    </List>
}