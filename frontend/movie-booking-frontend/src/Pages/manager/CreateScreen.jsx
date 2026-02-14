import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axiosInstance from "../../app/axiosInstance";

const CreateScreen = () => {
  const navigate = useNavigate();

  const theatreId = Number(localStorage.getItem("theatreId")); // ✅ FIX

  const [showPopup, setShowPopup] = useState(true);
  const [screenTypes, setScreenTypes] = useState([]);

  const [form, setForm] = useState({
    screenName: "",
    screenTypeId: "",
  });

  /* ================= LOAD SCREEN TYPES ================= */
  useEffect(() => {
    loadScreenTypes();
  }, []);

  const loadScreenTypes = async () => {
    try {
      const res = await axiosInstance.get("/screen-types");
      setScreenTypes(res.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load screen types");
    }
  };

  /* ================= SUBMIT ================= */
  const handleSubmit = async () => {
    if (!form.screenName.trim()) {
      toast.error("Screen name is required");
      return;
    }

    if (!form.screenTypeId) {
      toast.error("Select screen type");
      return;
    }

    try {
      await axiosInstance.post("/screens", {
        screenName: form.screenName.trim(),
        screenTypeId: Number(form.screenTypeId),
        theatreId: theatreId,
      });

      toast.success("Screen created successfully");

      setShowPopup(false);

      // ✅ Redirect to screens list
      navigate("/manager/screens");
    } catch (err) {
      console.error(err);
      toast.error("Screen creation failed");
    }
  };

  if (!showPopup) return null;

  return (
    <div style={backdrop}>
      <div style={modal}>
        <h3 style={{ marginBottom: 15 }}>Create Screen</h3>

        <label style={label}>Screen Name</label>
        <input
          style={input}
          placeholder="Screen 1"
          value={form.screenName}
          onChange={(e) =>
            setForm({ ...form, screenName: e.target.value })
          }
        />

        <label style={label}>Screen Type</label>
        <select
          style={input}
          value={form.screenTypeId}
          onChange={(e) =>
            setForm({
              ...form,
              screenTypeId: e.target.value,
            })
          }
        >
          <option value="">Select Screen Type</option>
          {screenTypes.map((s) => (
            <option
              key={s.screenTypeId}
              value={s.screenTypeId}
            >
              {s.typeName}
            </option>
          ))}
        </select>

        <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
          <button style={primaryBtn} onClick={handleSubmit}>
            Create
          </button>
          <button
            style={secondaryBtn}
            onClick={() => navigate("/manager")}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateScreen;

/* ================= STYLES ================= */

const backdrop = {
  position: "fixed",
  inset: 0,
  background: "rgba(0,0,0,0.4)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1000,
};

const modal = {
  background: "#fff",
  padding: 30,
  borderRadius: 12,
  width: 400,
  boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
};

const label = {
  fontWeight: 600,
  marginTop: 10,
  display: "block",
};

const input = {
  width: "100%",
  padding: 10,
  marginTop: 6,
  borderRadius: 6,
  border: "1px solid #ccc",
};

const primaryBtn = {
  flex: 1,
  padding: 10,
  background: "#f84464",
  color: "#fff",
  border: "none",
  borderRadius: 6,
  cursor: "pointer",
};

const secondaryBtn = {
  flex: 1,
  padding: 10,
  background: "#ddd",
  border: "none",
  borderRadius: 6,
  cursor: "pointer",
};
