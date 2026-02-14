import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axiosInstance from "../../app/axiosInstance";
import { createMovieApi } from "../../features/movie/movieApi";

const CreateMovie = () => {
  const [genres, setGenres] = useState([]);
  const [languages, setLanguages] = useState([]);

  const [genreSearch, setGenreSearch] = useState("");
  const [languageSearch, setLanguageSearch] = useState("");

  const [form, setForm] = useState({
    title: "",
    duration: "",
    rating: "",
    description: "",
    releaseDate: "",
    genreIds: [],
    languageIds: [],
    image: null,
  });

  /* ================= LOAD META ================= */
  useEffect(() => {
    loadMeta();
  }, []);

  const loadMeta = async () => {
    try {
      const g = await axiosInstance.get("/genres");
      const l = await axiosInstance.get("/languages");
      setGenres(g.data);
      setLanguages(l.data);
    } catch {
      toast.error("Failed to load metadata");
    }
  };

  /* ================= ADD / REMOVE ================= */
  const addItem = (id, key) => {
    if (!form[key].includes(id)) {
      setForm({ ...form, [key]: [...form[key], id] });
    }
  };

  const removeItem = (id, key) => {
    setForm({
      ...form,
      [key]: form[key].filter((x) => x !== id),
    });
  };

  /* ================= SUBMIT ================= */
  const handleSubmit = async (e) => {
  e.preventDefault();

  if (
    !form.title ||
    !form.duration ||
    !form.rating ||
    !form.description ||
    !form.releaseDate ||
    !form.image ||
    form.genreIds.length === 0 ||
    form.languageIds.length === 0
  ) {
    toast.error("All fields are required");
    return;
  }

  const data = new FormData();
  data.append("Title", form.title);
  data.append("Duration", Number(form.duration));
  data.append("Rating", Number(form.rating));
  data.append("Description", form.description);
  data.append("ReleaseDate", form.releaseDate);

  form.genreIds.forEach((id) => data.append("GenreIds", id));
  form.languageIds.forEach((id) => data.append("LanguageIds", id));

  data.append("Image", form.image);

  try {
    await createMovieApi(data);
    toast.success("Movie created successfully");

    setForm({
      title: "",
      duration: "",
      rating: "",
      description: "",
      releaseDate: "",
      genreIds: [],
      languageIds: [],
      image: null,
    });
  } catch (err) {
    console.error(err);
    toast.error("Movie creation failed");
  }
};


  /* ================= FILTERED LIST ================= */
  const filteredGenres = genres.filter((g) =>
    g.genreName.toLowerCase().startsWith(genreSearch.toLowerCase())
  );

  const filteredLanguages = languages.filter((l) =>
    l.languageName.toLowerCase().startsWith(languageSearch.toLowerCase())
  );

  /* ================= UI ================= */
  return (
    <div style={page}>
      <div style={card}>
        <h2 style={heading}>Create Movie</h2>

        <form onSubmit={handleSubmit} style={formStyle}>
          {/* TITLE */}
          <label style={label}>Movie Title</label>
          <input style={input} value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })} />

          {/* DURATION */}
          <label style={label}>Duration (mins)</label>
          <input style={input} type="number" value={form.duration}
            onChange={(e) => setForm({ ...form, duration: e.target.value })} />

          {/* RATING */}
          <label style={label}>Rating (0–10)</label>
          <input style={input} type="number" step="0.1" value={form.rating}
            onChange={(e) => setForm({ ...form, rating: e.target.value })} />

          {/* DESCRIPTION */}
          <label style={label}>Description</label>
          <textarea style={{ ...input, height: 90 }} value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })} />

          {/* RELEASE DATE */}
          <label style={label}>Release Date</label>
          <input style={input} type="date" value={form.releaseDate}
            onChange={(e) => setForm({ ...form, releaseDate: e.target.value })} />

          {/* GENRE SEARCH */}
          <label style={label}>Genres</label>
          <input
            style={input}
            placeholder="Search genre..."
            value={genreSearch}
            onChange={(e) => setGenreSearch(e.target.value)}
          />

          <Dropdown
            items={filteredGenres}
            labelKey="genreName"
            idKey="genreId"
            onSelect={(id) => addItem(id, "genreIds")}
          />

          <Chips
            items={genres}
            selectedIds={form.genreIds}
            labelKey="genreName"
            idKey="genreId"
            onRemove={(id) => removeItem(id, "genreIds")}
          />

          {/* LANGUAGE SEARCH */}
          <label style={label}>Languages</label>
          <input
            style={input}
            placeholder="Search language..."
            value={languageSearch}
            onChange={(e) => setLanguageSearch(e.target.value)}
          />

          <Dropdown
            items={filteredLanguages}
            labelKey="languageName"
            idKey="languageId"
            onSelect={(id) => addItem(id, "languageIds")}
          />

          <Chips
            items={languages}
            selectedIds={form.languageIds}
            labelKey="languageName"
            idKey="languageId"
            onRemove={(id) => removeItem(id, "languageIds")}
          />

          {/* IMAGE */}
          <label style={label}>Movie Poster</label>
          <input type="file" accept="image/*"
            onChange={(e) => setForm({ ...form, image: e.target.files[0] })} />

          <button style={button}>Create Movie</button>
        </form>
      </div>
    </div>
  );
};

export default CreateMovie;

/* ================= REUSABLE COMPONENTS ================= */
const Dropdown = ({ items, labelKey, idKey, onSelect }) => (
  <div style={dropdown}>
    {items.map((item) => (
      <div key={item[idKey]} style={dropdownItem}
        onClick={() => onSelect(item[idKey])}>
        {item[labelKey]}
      </div>
    ))}
  </div>
);

const Chips = ({ items, selectedIds, labelKey, idKey, onRemove }) => (
  <div style={chipWrap}>
    {selectedIds.map((id) => {
      const item = items.find((x) => x[idKey] === id);
      if (!item) return null;
      return (
        <div key={id} style={chip}>
          {item[labelKey]}
          <span style={chipClose} onClick={() => onRemove(id)}>✕</span>
        </div>
      );
    })}
  </div>
);

/* ================= STYLES ================= */
const page = { minHeight: "90vh", display: "flex", justifyContent: "center", alignItems: "center" };
const card = { maxWidth: 700, width: "100%", padding: 30, borderRadius: 12, boxShadow: "0 10px 30px rgba(0,0,0,0.1)" };
const heading = { textAlign: "center", marginBottom: 20 };
const formStyle = { display: "flex", flexDirection: "column", gap: 12 };
const label = { fontWeight: 700 };
const input = { padding: 10, borderRadius: 6, border: "1px solid #ccc" };
const button = { marginTop: 20, padding: 12, background: "#f84464", color: "#fff", border: "none", borderRadius: 8 };
const dropdown = { border: "1px solid #ddd", borderRadius: 6, maxHeight: 150, overflowY: "auto" };
const dropdownItem = { padding: 8, cursor: "pointer", borderBottom: "1px solid #eee" };
const chipWrap = { display: "flex", gap: 8, flexWrap: "wrap", marginTop: 8 };
const chip = { background: "#f84464", color: "#fff", padding: "6px 10px", borderRadius: 20 };
const chipClose = { marginLeft: 8, cursor: "pointer", fontWeight: "bold" };
