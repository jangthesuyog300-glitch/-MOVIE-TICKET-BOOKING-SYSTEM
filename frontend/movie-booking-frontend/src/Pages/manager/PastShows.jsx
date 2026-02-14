import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axiosInstance from "../../app/axiosInstance";
import dayjs from "dayjs";

const PastShows = () => {
  const managerId = localStorage.getItem("userId");
  const [shows, setShows] = useState([]);

  useEffect(() => {
    loadShows();
  }, []);

  const loadShows = async () => {
    try {
      const res = await axiosInstance.get(
        `/shows/past/${managerId}`
      );
      setShows(res.data);
    } catch {
      toast.error("Failed to load past shows");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Past Shows</h2>

      {shows.length === 0 && <p>No past shows available</p>}

      {shows.map((s) => (
        <div
          key={s.showId}
          style={{
            background: "#fff",
            padding: "15px",
            borderRadius: "8px",
            marginBottom: "15px",
          }}
        >
          <h4>{s.movieName}</h4>
          <p>Screen: {s.screenName}</p>
          <p>
            {dayjs(s.showDate).format("DD MMM YYYY")} |{" "}
             {dayjs(`2026-01-30T${s.startTime}`).format("hh:mm A")} –{" "}
            {dayjs(`2026-01-30T${s.endTime}`).format("hh:mm A")}
          </p>
        </div>
      ))}
    </div>
  );
};

export default PastShows;
