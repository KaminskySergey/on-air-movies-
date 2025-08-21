import { useState } from "react";
import { InputBasic } from "../input/input"
import { SearchIcon } from "../svg/search"
import CrossIcon from "../svg/cross-icon";
import { useDebouncedCallback } from "use-debounce";
import { usePathname, useRouter, useSearchParams } from "next/navigation";


export const SearchInput = () => {


    const searchParams = useSearchParams();
    const { replace } = useRouter();
    const pathname = usePathname();

    const initialSearch = searchParams.get("search") || "";
    const [inputValue, setInputValue] = useState(initialSearch);

    const handleSearch = useDebouncedCallback((value: string) => {
        const params = new URLSearchParams(searchParams);
        params.set("page", "1");

        if (value) {
            params.set("search", value);
        } else {
            params.delete("search");
        }

        replace(`${pathname}?${params.toString()}`, {scroll: false});
        
    }, 300);

    return <div className="relative w-full">
        <InputBasic value={inputValue} onChange={(value) => {
          setInputValue(value); 
          handleSearch(value); 
        }} className="pl-5" placeholder="Search..." />
        {inputValue.length === 0 ?

            <SearchIcon className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" /> :
            <span
                onClick={(e) => {
                    e.stopPropagation();
                    setInputValue("")
                    handleSearch("");
                }}
                className="absolute flex justify-center cursor-pointer items-center right-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5"
            >
                <CrossIcon className="w-2 h-2" />
            </span>
        }
    </div>
}