export const URL = `${process.env.EXPO_PUBLIC_API_BASE}?apikey=${process.env.EXPO_PUBLIC_API_KEY}&s=`;

export interface SearchedMovieItems {
    Poster: string;
    Title: string;
    Type: string;
    Year: string;
    imdbID: string;
}

export async function searchMovies(query: string) {
    try {
        const response = await fetch(`${URL}${encodeURIComponent(query)}`);
        const data = await response.json();
        return data;
    } catch (error) {
        error instanceof Error ? console.error(error.message) : console.error(error)
    }
}