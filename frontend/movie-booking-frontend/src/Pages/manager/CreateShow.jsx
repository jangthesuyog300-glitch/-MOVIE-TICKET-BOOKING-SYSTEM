import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axiosInstance from "../../app/axiosInstance";
import { createShowApi } from "../../features/show/showApi";

const CreateShow = () => {
  const managerId = localStorage.getItem("userId");
  const theatreId = localStorage.getItem("theatreId");

  const [movies, setMovies] = useState([]);
  const [screens, setScreens] = useState([]);
  const [languages, setLanguages] = useState([]);

  const [form, setForm] = useState({
    movieId: "",
    screenId: "",
    languageId: "",
    showDate: "",
    startTime: "",
    endTime: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const m = await axiosInstance.get("/movie");
      const s = await axiosInstance.get(`/screens/by-theatre/${theatreId}`);
      const l = await axiosInstance.get("/languages");

      setMovies(m.data);
      setScreens(s.data);
      setLanguages(l.data);
    } catch {
      toast.error("Failed to load data");
    }
  };

  const validate = () => {
    const e = {};
    const today = new Date();
    const todayDate = today.toISOString().split("T")[0];
    const currentTime = today.toTimeString().slice(0, 5);

    if (!form.movieId) e.movieId = "Select movie";
    if (!form.screenId) e.screenId = "Select screen";
    if (!form.languageId) e.languageId = "Select language";
    if (!form.showDate) e.showDate = "Select date";
    if (!form.startTime) e.startTime = "Start time required";
    if (!form.endTime) e.endTime = "End time required";

    // Prevent past date
    if (form.showDate && form.showDate < todayDate) {
      e.showDate = "Date cannot be in the past";
    }

    // Prevent past time for today
    if (form.showDate === todayDate && form.startTime && form.startTime < currentTime) {
      e.startTime = "Start time must be after current time";
    }

    // Minimum 1-hour difference
    if (form.startTime && form.endTime) {
      const start = new Date(`1970-01-01T${form.startTime}:00`);
      const end = new Date(`1970-01-01T${form.endTime}:00`);
      const diff = (end - start) / (1000 * 60);
      if (diff < 60) {
        e.endTime = "Show duration must be at least 1 hour";
      }
    }

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    try {
      await createShowApi({
        ...form,
        createdByManagerId: managerId,
      });

      toast.success("Show registered successfully");
      setForm({
        movieId: "",
        screenId: "",
        languageId: "",
        showDate: "",
        startTime: "",
        endTime: "",
      });
    } catch {
      toast.error("Failed to create show");
    }
  };

  const today = new Date().toISOString().split("T")[0];

  return (
    <div
      style={{
        minHeight: "90vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div style={{ maxWidth: "600px", width: "100%" }}>
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Register Show</h2>

        <select
          value={form.movieId}
          onChange={(e) => setForm({ ...form, movieId: e.target.value })}
        >
          <option value="">Select Movie</option>
          {movies.map((m) => (
            <option key={m.movieId} value={m.movieId}>
              {m.title}
            </option>
          ))}
        </select>
        <p className="error">{errors.movieId}</p>

        <select
          value={form.screenId}
          onChange={(e) => setForm({ ...form, screenId: e.target.value })}
        >
          <option value="">Select Screen</option>
          {screens.map((s) => (
            <option key={s.screenId} value={s.screenId}>
              {s.screenName}
            </option>
          ))}
        </select>
        <p className="error">{errors.screenId}</p>

        <select
          value={form.languageId}
          onChange={(e) => setForm({ ...form, languageId: e.target.value })}
        >
          <option value="">Select Language</option>
          {languages.map((l) => (
            <option key={l.languageId} value={l.languageId}>
              {l.languageName}
            </option>
          ))}
        </select>
        <p className="error">{errors.languageId}</p>

        <input
          type="date"
          min={today}
          value={form.showDate}
          onChange={(e) => setForm({ ...form, showDate: e.target.value })}
        />
        <p className="error">{errors.showDate}</p>

        <input
          type="time"
          value={form.startTime}
          onChange={(e) => setForm({ ...form, startTime: e.target.value })}
        />
        <p className="error">{errors.startTime}</p>

        <input
          type="time"
          value={form.endTime}
          onChange={(e) => setForm({ ...form, endTime: e.target.value })}
        />
        <p className="error">{errors.endTime}</p>

        <button
          onClick={handleSubmit}
          style={createButtonStyle}
          onMouseEnter={(e) => {
            e.target.style.background = "#d73754";
            e.target.style.transform = "translateY(-2px)";
            e.target.style.boxShadow = "0 10px 25px rgba(248,68,100,0.4)";
          }}
          onMouseLeave={(e) => {
            e.target.style.background = "#f84464";
            e.target.style.transform = "translateY(0)";
            e.target.style.boxShadow = "0 6px 15px rgba(248,68,100,0.3)";
          }}
        >
          Create Show
        </button>
      </div>
    </div>
  );
};

export default CreateShow;

/* ================= BUTTON STYLE ================= */
const createButtonStyle = {
  padding: "12px 24px",
  background: "#f84464",
  color: "#fff",
  border: "none",
  borderRadius: "8px",
  fontSize: "16px",
  fontWeight: "600",
  cursor: "pointer",
  transition: "all 0.3s ease",
  width: "100%",
  marginTop: "20px",
  boxShadow: "0 6px 15px rgba(248,68,100,0.3)",
};
