import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchCitiesApi } from "../../features/city/cityApi";
import toast from "react-hot-toast";

const CitySelectorModal = () => {
  const navigate = useNavigate();

  const [cities, setCities] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCities();
  }, []);

  const fetchCities = async () => {
    try {
      const data = await fetchCitiesApi();
      setCities(data);
    } catch {
      toast.error("Failed to load cities");
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = (city) => {
    localStorage.setItem("city", city.cityName);
    toast.success(`City selected: ${city.cityName}`);

    // Close modal by navigating back
    navigate(0);
  };

  const filteredCities = cities.filter((c) =>
    c.cityName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.7)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
      }}
    >
      <div
        style={{
          background: "#fff",
          width: "500px",
          borderRadius: "8px",
          padding: "20px",
          maxHeight: "80vh",
          overflowY: "auto",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "15px",
          }}
        >
          <h3>Select Your City</h3>
          
        </div>

        <input
          placeholder="Search city"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ width: "100%", padding: "10px" }}
        />

        <div style={{ marginTop: "20px" }}>
          {loading && <p>Loading cities...</p>}

          {!loading &&
            filteredCities.map((city) => (
              <div
                key={city.cityId}
                onClick={() => handleSelect(city)}
                style={{
                  padding: "10px",
                  cursor: "pointer",
                  borderBottom: "1px solid #eee",
                }}
              >
                <strong>{city.cityName}</strong>
                <div style={{ fontSize: "12px", color: "#888" }}>
                  {city.stateName}, {city.countryName}
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default CitySelectorModal;
