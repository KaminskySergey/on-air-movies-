import { IGenres } from "@/types/genres";
import { clsx, ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
  }

export function getYearFromDate(dateString: string | null | undefined): string {
    if (!dateString) return "Unknown";
  
    const date = new Date(dateString);
  
    if (isNaN(date.getTime())) {
      return "Unknown";
    }
  
    return date.getFullYear().toString();
  }

 export function truncateText(text = '', maxLength = 350) {
    if (text.length <= maxLength) {
      return text;
    }
    return text.slice(0, maxLength) + '...';
  }


  export function getGenreName(genresArr: IGenres[], id: number) {
    return genresArr.find((g) => g.id === id)?.name ?? "Unknown";
}


export function formatRuntime(runtime: number) {
  const hours = Math.floor(runtime / 60);
  const minutes = runtime % 60;
  return `${hours}h ${minutes}m`;
}