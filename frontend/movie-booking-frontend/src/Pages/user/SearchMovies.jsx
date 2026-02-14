import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllMovies } from "../../features/movie/movieSlice";
import MovieCard from "../../components/movie/MovieCard";
import { useNavigate } from "react-router-dom";

const SearchMovies = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { movies } = useSelector((state) => state.movie);
  const [query, setQuery] = useState("");

  useEffect(() => {
    dispatch(fetchAllMovies());
  }, [dispatch]);

  const filtered = movies.filter((m) =>
    m.title.toLowerCase().startsWith(query.toLowerCase())
  );

  return (
    <div style={{ padding: "20px" }}>
      <div style={{ display: "flex", marginBottom: "20px" }}>
        <input
          placeholder="Search movies..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{ flex: 1, padding: "10px" }}
        />
        <button style={{
          marginLeft:"10px",
          border:"0px",
          fontSize:"20px",
          color:"red"
        }} onClick={() => navigate(-1)}>✖</button>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
          gap: "20px",
        }}
      >
        {filtered.map((movie) => (
          <MovieCard key={movie.movieId} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default SearchMovies;
