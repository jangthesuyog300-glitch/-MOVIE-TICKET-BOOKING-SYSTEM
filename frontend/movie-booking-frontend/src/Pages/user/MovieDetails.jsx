import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import {
  fetchMovieById,
  fetchTrendingMovies,
} from "../../features/movie/movieSlice";
import MovieCard from "../../components/movie/MovieCard";

const MovieDetails = () => {
  const { movieId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { selectedMovie, trending } = useSelector((state) => state.movie);

  useEffect(() => {
    dispatch(fetchMovieById(movieId));
    dispatch(fetchTrendingMovies(7));
  }, [dispatch, movieId]);

  if (!selectedMovie) return null;

  return (
    <div style={{ padding: "20px", maxWidth: "1200px", margin: "0 auto" }}>
      {/* Container uses flex-wrap to stack on mobile */}
      <div style={{ 
        display: "flex", 
        gap: "20px", 
        flexWrap: "wrap", 
        justifyContent: "center" 
      }}>
        <img
          src={selectedMovie.imageUrl || "https://www.vintagemovieposters.co.uk/wp-content/uploads/2023/03/IMG_1887-scaled.jpeg"}
          alt={selectedMovie.title}
          style={{ 
            width: "100%", 
            maxWidth: "250px", // Limits size on desktop
            height: "auto", 
            borderRadius: "8px",
            objectFit: "cover"
          }}
        />

        <div style={{ flex: "1", minWidth: "300px" }}>
          <h2 style={{ marginBottom: "5px" }}>{selectedMovie.title}</h2>
          <p>{selectedMovie.description}</p>

          <button
            style={{
              background: "#f84464",
              color: "#fff",
              padding: "10px 20px",
              borderRadius: "6px",
              border: "none",
              marginTop: "20px", // Reduced from 100px for responsiveness
              cursor: "pointer",
              width: "fit-content"
            }}
            onClick={() => navigate(`/shows/${movieId}`)}
          >
            Book Tickets
          </button>
          <p style={{ marginTop: "15px" }}>
            <strong>Languages:</strong> {selectedMovie.languages?.join(", ")}
          </p>
        </div>
      </div>

      <h3 style={{ marginTop: "40px" }}>Trending Movies</h3>
      <div
        style={{
          display: "grid",
          // Uses auto-fill to automatically adjust number of columns based on screen width
          gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
          gap: "20px",
        }}
      >
        {trending.map((m) => (
          <MovieCard key={m.movieId} movie={m} />
        ))}
      </div>
    </div>
  );
};

export default MovieDetails;
