import { useNavigate } from "react-router-dom";

const MovieCard = ({ movie }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/movie/${movie.movieId}`)}
      style={{
        background: "#fff",
        borderRadius: "8px",
        cursor: "pointer",
      }}
    >
      <img
        src={movie.imageUrl || "https://marketplace.canva.com/EAFH3gODxw4/1/0/1131w/canva-black-%26-white-modern-mystery-forest-movie-poster-rLty9dwhGG4.jpg"}
        alt={movie.title}
        style={{
          width: "100%",
          height: "260px",
          objectFit: "cover",
          borderRadius: "8px",
        }}
      />
      <div style={{ padding: "10px" }}>
        <strong>{movie.title}</strong>
        <div style={{ fontSize: "12px", color: "#777" }}>
          {movie.genres?.join(", ")}
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
