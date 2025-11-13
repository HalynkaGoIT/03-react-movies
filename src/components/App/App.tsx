import css from "./App.module.css";
import { useState } from "react";
import type { Movie } from "../../types/movie";
import { toast, Toaster } from "react-hot-toast";
import fetchMovies from "../../services/movieService";
import SearchBar from "../SearchBar/SearchBar";
import MovieGrid from "../MovieGrid/MovieGrid";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import MovieModal from "../MovieModal/MovieModal";

export default function App() {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
  
  
    const handleSearch = async (query: string) => {
      try {
        setIsLoading(true);
        setIsError(false);
        setMovies([]);
  
        const data = await fetchMovies(query);
  
        if (data.length === 0) {
          toast.error("No movies found for your request.");
        }
        setMovies(data);
        
      } catch {
        setIsError(true);
      }
  
      finally {
        setIsLoading(false);
      }
    };
  
    const openModal = (movie: Movie) => {
      setSelectedMovie(movie);
      setIsModalOpen(true);
    }
  
    const closeModal = () => {
      setIsModalOpen(false);
      setSelectedMovie(null);
    }
  
    return (
      <div className={css.app}>
        <Toaster />
        {isLoading && <Loader />}
        {isError && <ErrorMessage />}
        <SearchBar
          onSubmit={handleSearch} />
        <MovieGrid
          onSelect={openModal}
          movies={movies} />
        {isModalOpen && selectedMovie && (
          <MovieModal
            movie={selectedMovie}
            onClose={closeModal} />
        )}
      </div>
    )
  }