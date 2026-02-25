import { language } from "../constants/languageConstant";

export const URL = `${process.env.EXPO_PUBLIC_API_BASE}?apikey=${process.env.EXPO_PUBLIC_API_KEY}&s=`;

export interface SearchedMovieItems {
    Poster: string;
    Title: string;
    Type: string;
    Year: string;
    imdbID: string;
    totalResults: string;
}

export async function searchMovies(query: string, page: number = 1) {
    try {
        const response = await fetch(`${URL}${encodeURIComponent(query)}&page=${page}`);
        const data = await response.json();
        return data;
    } catch (error) {
        error instanceof Error ? console.error(error.message) : console.error(error)
    }
}

export function captureError(error: string) {
    switch (error) {
        case "Incorrect IMDb ID.":
            return language.EN.incorrectId;
        case "Too many results.":
            return language.EN.toManyResults;
        default:
            return error;
    }
}