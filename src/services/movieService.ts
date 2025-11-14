import axios from "axios";
import type { Movie } from "../types/movie";

const myToken = import.meta.env.VITE_TMDB_TOKEN;

interface MovieHTTPResponse {
  results: Movie[];
  page: number;
}

export default async function fetchMovies(topic: string): Promise<Movie[]> {
  const response = await axios.get<MovieHTTPResponse>(
    "https://api.themoviedb.org/3/search/movie",
    {
      params: { query: topic },
      headers: {
        Authorization: `Bearer ${myToken}`,
      },
    },
  );
  return response.data.results;
}
