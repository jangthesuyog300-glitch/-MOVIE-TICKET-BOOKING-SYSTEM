import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../../app/axiosInstance";
import toast from "react-hot-toast";

const ScreenLayoutBuilder = () => {
  const { screenId } = useParams();
  const navigate = useNavigate();

  const [seatRows, setSeatRows] = useState([]);

  /* ---------- UI TOGGLES ---------- */
  const [showAddRowForm, setShowAddRowForm] = useState(false);

  /* ---------- ADD ROW FORM ---------- */
  const [rowName, setRowName] = useState("");
  const [numberOfSeats, setNumberOfSeats] = useState("");

  useEffect(() => {
    fetchSeatRows();
  }, [screenId]);

  /* ================= FETCH ================= */
  const fetchSeatRows = async () => {
    try {
      const res = await axiosInstance.get(
        `/seat-rows/screen/${screenId}`
      );

      // 🔴 PREVENT DUPLICATES (backend safety)
      const uniqueRows = [];
      const seen = new Set();

      res.data.forEach((r) => {
        if (!seen.has(r.rowName)) {
          seen.add(r.rowName);
          uniqueRows.push(r);
        }
      });

      setSeatRows(uniqueRows);
    } catch {
      toast.error("Failed to load screen layout");
    }
  };

  /* ================= ADD ROW ================= */
  const addRow = async () => {
    if (!rowName || !numberOfSeats) {
      toast.error("Row name and seat count required");
      return;
    }

    try {
      await axiosInstance.post("/seat-rows", {
        screenId: Number(screenId),
        rowName: rowName.toUpperCase(),
        numberOfSeats: Number(numberOfSeats),
      });

      toast.success("Row added");

      setRowName("");
      setNumberOfSeats("");
      setShowAddRowForm(false);
      fetchSeatRows();
    } catch {
      toast.error("Failed to add row");
    }
  };

  /* ================= SUBMIT ================= */
  const submitLayout = () => {
    toast.success("Screen layout saved");
    navigate("/manager");
  };

  return (
    <div style={page}>
      <div style={card}>
        <h2 style={heading}>Screen Layout Builder</h2>

        {/* ================= ACTION BUTTONS ================= */}
        <div style={actionRow}>
          <button
            style={primaryBtn}
            onClick={() => setShowAddRowForm(!showAddRowForm)}
          >
            ➕ Add Row
          </button>

          <button style={secondaryBtn} onClick={submitLayout}>
            ✅ Submit Screen Layout
          </button>
        </div>

        {/* ================= ADD ROW FORM ================= */}
        {showAddRowForm && (
          <div style={formBox}>
            <h4>Add Seat Row</h4>

            <input
              placeholder="Row Name (A, B, C...)"
              value={rowName}
              onChange={(e) => setRowName(e.target.value)}
              style={input}
            />

            <input
              type="number"
              placeholder="Number of Seats"
              value={numberOfSeats}
              onChange={(e) => setNumberOfSeats(e.target.value)}
              style={input}
            />

            <button style={primaryBtn} onClick={addRow}>
              Add Row
            </button>
          </div>
        )}

        {/* ================= SCREEN PREVIEW ================= */}
        <div style={screenPreview}>
          <p style={{ marginBottom: 10, fontWeight: 600 }}>
            Screen Preview
          </p>

          {seatRows.length === 0 ? (
            <p>No rows added yet</p>
          ) : (
            seatRows
              .sort((a, b) => a.rowName.localeCompare(b.rowName))
              .map((row) => (
                <div key={row.seatRowId} style={rowLine}>
                  <span style={rowLabel}>{row.rowName}</span>

                  <div style={seatWrap}>
                    {row.seats.map((seat) => (
                      <div key={seat.seatId} style={seatBox}>
                        {seat.seatNumber}
                      </div>
                    ))}
                  </div>
                </div>
              ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ScreenLayoutBuilder;

/* ================= STYLES ================= */

const page = {
  minHeight: "90vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const card = {
  width: "100%",
  maxWidth: 900,
  padding: 30,
  borderRadius: 14,
  background: "#fff",
  boxShadow: "0 10px 30px rgba(0,0,0,0.12)",
};

const heading = {
  textAlign: "center",
  marginBottom: 20,
};

const actionRow = {
  display: "flex",
  justifyContent: "center",
  gap: 20,
  marginBottom: 20,
};

const formBox = {
  padding: 20,
  borderRadius: 10,
  background: "#f9f9f9",
  marginBottom: 30,
};

const input = {
  width: "100%",
  padding: 10,
  marginBottom: 10,
  borderRadius: 6,
  border: "1px solid #ccc",
};

const primaryBtn = {
  padding: "10px 18px",
  background: "#f84464",
  color: "#fff",
  border: "none",
  borderRadius: 6,
  cursor: "pointer",
};

const secondaryBtn = {
  padding: "10px 18px",
  background: "#4caf50",
  color: "#fff",
  border: "none",
  borderRadius: 6,
  cursor: "pointer",
};

const screenPreview = {
  marginTop: 20,
  padding: 20,
  background: "#fafafa",
  borderRadius: 10,
};

const rowLine = {
  display: "flex",
  alignItems: "center",
  marginBottom: 10,
};

const rowLabel = {
  width: 30,
  fontWeight: 700,
};

const seatWrap = {
  display: "flex",
  flexWrap: "wrap",
  gap: 6,
};

const seatBox = {
  width: 32,
  height: 32,
  borderRadius: 4,
  background: "#e0e0e0",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: 12,
};
