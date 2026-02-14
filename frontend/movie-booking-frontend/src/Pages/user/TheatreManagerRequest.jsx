import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axiosInstance from "../../app/axiosInstance";

const TheatreManagerRequest = () => {
  const userId = localStorage.getItem("userId");

  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    cityId: "",
    theatreName: "",
    theaterAddressUrl: "",
    address: "",
    govtIdType: "",
    govtIdNumber: "",
    proofDoc: "",
  });

  /* ================= LOAD CITIES ================= */
  useEffect(() => {
    loadCities();
  }, []);

  const loadCities = async () => {
    try {
      const res = await axiosInstance.get("/cities");
      setCities(res.data);
    } catch {
      toast.error("Failed to load cities");
    }
  };

  /* ================= SUBMIT ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !form.cityId ||
      !form.theatreName ||
      !form.address ||
      !form.govtIdType ||
      !form.govtIdNumber
    ) {
      toast.error("All fields are required");
      return;
    }

    const payload = {
      cityId: Number(form.cityId),
      theatreName: form.theatreName,
      theaterAddressUrl: form.theaterAddressUrl || "",
      address: form.address,
      govtIdType: form.govtIdType,
      govtIdNumber: form.govtIdNumber,
      proofDocUrl: form.proofDoc || "",
    };

    try {
      setLoading(true);

      await axiosInstance.post(
        `/theaterManagerRequest/${userId}`,
        payload
      );

      toast.success("Request submitted successfully");

      setForm({
        cityId: "",
        theatreName: "",
        theaterAddressUrl: "",
        address: "",
        govtIdType: "",
        govtIdNumber: "",
        proofDoc: "",
      });
    } catch (err) {
      console.error(err);
      toast.error("Failed to submit request");
    } finally {
      setLoading(false);
    }
  };

  /* ================= UI ================= */
  return (
    <div style={page}>
      <div style={card}>
        <h2 style={heading}>Theatre Manager Request</h2>

        <form onSubmit={handleSubmit} style={formStyle}>
          <label style={label}>City</label>
          <select
            style={input}
            value={form.cityId}
            required
            onChange={(e) =>
              setForm({ ...form, cityId: e.target.value })
            }
          >
            <option value="">Select City</option>
            {cities.map((c) => (
              <option key={c.cityId} value={c.cityId}>
                {c.cityName}
              </option>
            ))}
          </select>

          <label style={label}>Theatre Name</label>
          <input
            style={input}
            value={form.theatreName}
            required
            onChange={(e) =>
              setForm({ ...form, theatreName: e.target.value })
            }
          />

          <label style={label}>Theatre Address URL (Google Maps)</label>
          <input
            type="url"
            style={input}
            value={form.theaterAddressUrl}
            required
            onChange={(e) =>
              setForm({
                ...form,
                theaterAddressUrl: e.target.value,
              })
            }
          />

          <label style={label}>Full Address</label>
          <textarea
            style={{ ...input, height: 80 }}
            value={form.address}
            required
            onChange={(e) =>
              setForm({ ...form, address: e.target.value })
            }
          />

          <label style={label}>Government ID Type</label>
          <select
            style={input}
            value={form.govtIdType}
            required
            onChange={(e) =>
              setForm({ ...form, govtIdType: e.target.value })
            }
          >
            <option value="">Select ID Type</option>
            <option value="Aadhaar">Aadhaar</option>
            <option value="PAN">PAN</option>
            <option value="Driving License">
              Driving License
            </option>
          </select>

          <label style={label}>Government ID Number (Aadhaar)</label>
          <input
            style={input}
            value={form.govtIdNumber}
            required
            pattern="^[0-9]{12}$"
            title="Aadhaar number must be 12 digits"
            onChange={(e) =>
              setForm({
                ...form,
                govtIdNumber: e.target.value,
              })
            }
          />

          <label style={label}>Proof Document URL</label>
          <input
            type="url"
            style={input}
            placeholder="https://example.com/document"
            value={form.proofDoc}
            onChange={(e) =>
              setForm({ ...form, proofDoc: e.target.value })
            }
          />

          <button
            type="submit"
            style={button}
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit Request"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default TheatreManagerRequest;

/* ================= STYLES ================= */
const page = {
  minHeight: "90vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const card = {
  width: "100%",
  maxWidth: 600,
  padding: 30,
  borderRadius: 12,
  background: "#fff",
  boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
};

const heading = {
  textAlign: "center",
  marginBottom: 20,
};

const formStyle = {
  display: "flex",
  flexDirection: "column",
  gap: 12,
};

const label = {
  fontWeight: 600,
};

const input = {
  padding: 10,
  borderRadius: 6,
  border: "1px solid #ccc",
};

const button = {
  marginTop: 20,
  padding: 12,
  background: "#f84464",
  color: "#fff",
  border: "none",
  borderRadius: 8,
  fontSize: 16,
  cursor: "pointer",
};
