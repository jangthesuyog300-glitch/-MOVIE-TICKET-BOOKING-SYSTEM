import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import {
  fetchShowsByCityMovieDate,
  clearShows,
} from "../../features/show/showSlice";

const ShowSelection = () => {
  const { movieId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const city = localStorage.getItem("city");
  const { shows, loading } = useSelector((state) => state.show);

  const [selectedDate, setSelectedDate] = useState(
    dayjs().format("YYYY-MM-DD")
  );

  useEffect(() => {
    if (!city) return;

    dispatch(
      fetchShowsByCityMovieDate({
        city,
        movieId,
        date: selectedDate,
      })
    );

    return () => dispatch(clearShows());
  }, [dispatch, city, movieId, selectedDate]);

  const dates = [...Array(4)].map((_, i) =>
    dayjs().add(i, "day")
  );

  return (
    <div style={{ padding: "20px" }}>
      {/* Date Selector */}
      <div style={{ display: "flex", gap: "12px", marginBottom: "20px" }}>
        {dates.map((d) => {
          const formatted = d.format("YYYY-MM-DD");
          const isSelected = formatted === selectedDate;

          return (
            <div
              key={formatted}
              onClick={() => setSelectedDate(formatted)}
              style={{
                padding: "10px",
                borderRadius: "6px",
                cursor: "pointer",
                background: isSelected ? "#f84464" : "#fff",
                color: isSelected ? "#fff" : "#000",
                border: "1px solid #ddd",
              }}
            >
              <div style={{ fontSize: "12px" }}>
                {d.format("ddd")}
              </div>
              <strong>{d.format("DD")}</strong>
            </div>
          );
        })}
      </div>

      {/* Shows */}
      {loading && <p>Loading shows...</p>}

      {!loading &&
        shows.map((theatre) => (
          <div
            key={theatre.theatreId}
            style={{
              background: "#fff",
              padding: "15px",
              borderRadius: "8px",
              marginBottom: "15px",
            }}
          >
            <h3>{theatre.theatreName}</h3>

            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
              {theatre.shows.map((show) => (
                <div
                  key={show.showId}
                  onClick={() =>
                    navigate(`/seats/${show.showId}`)
                  }
                  style={{
                    padding: "8px 14px",
                    border: "1px solid #4caf50",
                    color: "#4caf50",
                    borderRadius: "6px",
                    cursor: "pointer",
                  }}
                >
                  {dayjs(`1970-01-01T${show.startTime}`).format("hh:mm A")} To {dayjs(`1970-01-01T${show.endTime}`).format("hh:mm A")} 
                </div>
              ))}
            </div>
          </div>
        ))}
    </div>
  );
};

export default ShowSelection;
