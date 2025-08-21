"use client"
import { useToggle } from "@/hooks/use-toggle";
import { SortByIcon } from "../svg/sort-by";
import CrossIcon from "../svg/cross-icon";
import { useCustomSearchParams } from "@/hooks/use-search-params";
import { cn } from "@/utils/utils";


export const years = Array.from({ length: 2025 - 1980 + 1 }, (_, i) => 1980 + i).reverse();

interface ISortYearSelect {
    onSelect: (value: string) => void;
    value: string
    disabled: boolean
}

export const SortYearSelect = ({disabled, onSelect, value }: ISortYearSelect) => {
    const { isToggle, handleToggle } = useToggle()
    const { searchParams } = useCustomSearchParams()
    const selectedItem = years.find((item) => item.toString() === value.toString());
    const yearParams = searchParams.get("year")

 

    const handleChange = (year: number) => {
        handleToggle()
        onSelect(year.toString())
    }
    return (
        <>
            <div className="relative w-1/2 sm:w-48">
            <button
                disabled={disabled}
                onClick={() => !disabled && handleToggle()}
                className={cn(
                    "flex items-center justify-between w-full px-4 py-2 text-sm font-medium border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors",
                    {
                        "bg-black text-gray-400 border-blue-500 hover:bg-blue-600 cursor-pointer": !disabled,
                        "bg-gray-700 text-gray-500 border-gray-600 cursor-not-allowed": disabled,
                    }
                )}
            >
                    <span>{selectedItem ? selectedItem : "Year"}</span>
                    <div className="flex items-center gap-2">
                        <SortByIcon />
                        {yearParams && !disabled && (
                            <span
                            onClick={(e) => {
                              e.stopPropagation(); 
                              onSelect("");        
                            }}
                            className="cursor-pointer text-gray-400 hover:text-white"
                          >
                            <CrossIcon className="w-2 h-2"/>
                            </span>
                        )}
                    </div>
                </button>

                {isToggle && !disabled &&(
                    <div className="absolute z-50 mt-2 w-full overflow-auto max-h-60 scrollbar rounded-lg shadow-lg bg-black border border-blue-500 scrollbar-thin scrollbar-thumb-blue-700 scrollbar-track-black">
                        <div className="flex flex-col">
                            {years.filter(y => y != null).map(el => (
                                <button
                                    key={el}
                                    onClick={() => handleChange(el)}
                                    className="px-4 cursor-pointer py-2 text-sm text-gray-200 text-left hover:bg-blue-800 hover:text-white"
                                >
                                    {el}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}