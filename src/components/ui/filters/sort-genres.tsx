"use client"
import { IGenres } from "@/types/genres"
import { useEffect, useState } from "react"
import { List } from "../list/list"
import { cn } from "@/utils/utils"

interface ISortGenres {
  genresData: IGenres[]
  onSelect: (selected: number[]) => void
  values: number[]
  disabled: boolean
}

export const SortGenres = ({disabled, values,  genresData, onSelect }: ISortGenres) => {
  const [selected, setSelected] = useState<number[]>([])

  useEffect(() => {
    setSelected(values || []);
  }, [values]);

  const toggleGenre = (id: number) => {
    if (disabled) return
    let newSelected: number[]
    if (selected.includes(id)) {
      newSelected = selected.filter((g) => g !== id)
    } else {
      newSelected = [...selected, id]
    }
    setSelected(newSelected)
    onSelect(newSelected) 
  }


  return (
    <List className="relative overflow-x-auto sm:overflow-visible scrollbar-hide transition-opacity flex sm:flex-wrap gap-2 w-full">
      {genresData.map(el => {
        const isActive = selected.includes(el.id)
        return (
          <li key={el.id} className="flex-shrink-0">
            <button onClick={() => toggleGenre(el.id)} type="button" disabled={disabled}
              className={cn(
                "py-1 px-3 cursor-pointer whitespace-nowrap border border-transparent rounded-3xl text-sm transition-colors",
                {
                  "bg-blue-500 text-white hover:bg-blue-600": !isActive,
                  "bg-green-500 text-white hover:bg-green-600": isActive,
                  "bg-gray-600 opacity-50 cursor-not-allowed": disabled
                }
              )}
            > {el.name}</button>
          </li>

        )
      })}
    </List>
  )
}