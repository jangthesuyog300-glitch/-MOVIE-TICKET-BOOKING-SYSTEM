import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchTrendingMoviesApi } from "../../features/movie/movieApi";
import CitySelectorModal from "../../components/Navbar/CitySelectorModal";
import Footer from "../../components/footer/Footer";
import toast from "react-hot-toast";
import "../../styles/home.css";

const DEFAULT_POSTER = "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/61da8438155793.57575971afe13.jpg";

const AD_IMAGES = [
  ".https://th.bing.com/th/id/R.d9b6716a12b7dc7b2978bab9946036c5?rik=aPNHVn1jPAkb1A&riu=http%3a%2f%2funblast.com%2fwp-content%2fuploads%2f2019%2f10%2fWide-Advertising-Billboard-Mockup-1.jpg&ehk=rfOf8Vz2LHL%2fnVbaKQrF9sNclRzzV%2fl%2bGWyC1H6dzJc%3d&risl=&pid=ImgRaw&r=0",
  "https://5.imimg.com/data5/SELLER/Default/2023/3/296733406/SF/FI/QT/89170223/hoarding-sign-board-installation-service-500x500.png",
  "https://www.mktg-edge.com/wp-content/uploads/2020/01/Website-image-advertising.jpg",   
];

const Home = () => {
  const navigate = useNavigate();
  const city = localStorage.getItem("city");

  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentAd, setCurrentAd] = useState(0);

  const trendingRef = useRef(null);
  const recommendedRef = useRef(null);

  /* ================= FETCH MOVIES ================= */
  useEffect(() => {
    if (!city) return;
    fetchMovies();
  }, [city]);

  const fetchMovies = async () => {
    try {
      const data = await fetchTrendingMoviesApi(20);
      setMovies(data);
    } catch {
      toast.error("Failed to load movies");
    } finally {
      setLoading(false);
    }
  };

  /* ================= AUTO SLIDE ADS ================= */
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentAd((prev) => (prev + 1) % AD_IMAGES.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const scroll = (ref, direction) => {
    if (!ref.current) return;
    ref.current.scrollBy({
      left: direction === "left" ? -600 : 600,
      behavior: "smooth",
    });
  };

  if (!city) return <CitySelectorModal />;

  return (
    <>
      <div className="home-wrapper">

        {/* ================= ADS SECTION ================= */}
        <div className="home-banner">
          <img src={AD_IMAGES[currentAd]} alt="Advertisement" />
        </div>

        {/* ================= TRENDING MOVIES ================= */}
        <MovieSection
          title="Trending Movies"
          movies={movies}
          loading={loading}
          scrollRef={trendingRef}
          onScroll={scroll}
          navigate={navigate}
        />

        {/* ================= RECOMMENDED MOVIES ================= */}
        <MovieSection
          title="Recommended Movies"
          movies={movies}
          loading={loading}
          scrollRef={recommendedRef}
          onScroll={scroll}
          navigate={navigate}
        />

      </div>
    </>
  );
};

/* ================= MOVIE SECTION COMPONENT ================= */
const MovieSection = ({
  title,
  movies,
  loading,
  scrollRef,
  onScroll,
  navigate,
}) => {
  return (
    <section className="movie-section">
      <div className="section-header">
        <h2>{title}</h2>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="movie-carousel-wrapper">
          <button
            className="carousel-arrow left"
            onClick={() => onScroll(scrollRef, "left")}
          >
            ‹
          </button>

          <div className="movie-carousel" ref={scrollRef}>
            {Array.from({ length:movies.length}).map(
              (_, index) => {
                const top = movies[index ];
                console.log(top.imageUrl);
                return (
                  <div className="movie-column" key={index}>
                    {top && (
                      <MovieCard movie={top} navigate={navigate} />
                    )}
                  </div>
                );
              }
            )}
          </div>

          <button
            className="carousel-arrow right"
            onClick={() => onScroll(scrollRef, "right")}
          >
            ›
          </button>
        </div>
      )}
    </section>
  );
};

const MovieCard = ({ movie, navigate }) => (
  <div
    className="movie-card"
    onClick={() => navigate(`/movie/${movie.movieId}`)}
  >
    <img
      src={movie.imageUrl || DEFAULT_POSTER}
      alt={movie.title}
    />
    <h4>{movie.title}</h4>
  </div>
);

export default Home;
