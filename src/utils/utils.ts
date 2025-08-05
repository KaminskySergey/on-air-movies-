import { GENRES } from "@/const/genres";
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


  export function getGenreName(id: number) {
    return GENRES.find((g) => g.id === id)?.name ?? "Unknown";
}