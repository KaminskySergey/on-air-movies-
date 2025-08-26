"use client"
import { useState } from "react";
import { useToggle } from "./use-toggle";
import { getTrailer } from "../../actions/movies";

export function useTrailer(category: string, id: string | number) {
    const { isToggle, handleToggle } = useToggle();
    const [trailerKey, setTrailerKey] = useState<string | null>(null);
  
    async function handleOpenTrailer() {
      try {
        const res = await getTrailer(category, id.toString());
        if (res.results && res.results.length > 0) {
          setTrailerKey(res.results[0].key);
          handleToggle(); 
        }
      } catch (error) {
        console.error("Error fetching trailer:", (error as Error).message);
      }
    }
  
    return { trailerKey, isToggle, handleOpenTrailer, handleToggle };
  }