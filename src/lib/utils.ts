import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function urlFromBase(url: string) {
  return new URL(url, process.env.BASE_URL!)
}
