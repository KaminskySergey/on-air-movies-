"use client"
import { IKinoSort } from "@/types/sort"
import { SearchInput } from "./search-input"
import { SortSelect } from "./sort-select"
import { SortYearSelect } from "./sort-year-select"
import { IGenres } from "@/types/genres"
import { SortGenres } from "./sort-genres"
import { useKinoFilters } from "@/hooks/use-kino-filters"
import { useCustomSearchParams } from "@/hooks/use-search-params"
import { useEffect } from "react"

interface IKinoFilter {
    sortItems: IKinoSort[]
    genresData: IGenres[]
}

export const KinoFilter = ({ genresData, sortItems }: IKinoFilter) => {
    const { filters, setFilters } = useKinoFilters();
    const { searchParams } = useCustomSearchParams();

    const isSearchActive = searchParams.has("search");

    useEffect(() => {
      if (searchParams.has("search")) {
        setFilters({ sortBy: "", year: "", genres: [] });
      }
    }, [searchParams, setFilters]);
  
    return (
        <div className="flex flex-col gap-4 sm:gap-8">
            <div className="flex flex-col sm:justify-between sm:flex-row gap-4 items-center">
                <div className="flex gap-2 sm:gap-6 w-full items-center">
                    <SortSelect
                        value={filters.sortBy}
                        onSelect={(value) => setFilters({ sortBy: value })}
                        items={sortItems}
                        disabled={isSearchActive}
                    />
                    <SortYearSelect
                        value={filters.year}
                        onSelect={(value) => setFilters({ year: value })}
                        disabled={isSearchActive}
                    />
                </div>
                <div className="w-full sm:w-[364px]">
                    <SearchInput />
                </div>
            </div>
            <div className="w-full">
                <SortGenres
                    values={filters.genres}
                    onSelect={(valueArr) => setFilters({ genres: valueArr.map(String) })}
                    genresData={genresData}
                    disabled={isSearchActive}
                />
            </div>
            
        </div>
    )
}