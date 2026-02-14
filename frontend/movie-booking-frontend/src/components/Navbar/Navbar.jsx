import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CitySelectorModal from "./CitySelectorModal";
import ProfileSidebar from "./ProfileSidebar";

const Navbar = ({ isAdmin = false, isManager = false }) => {
  const navigate = useNavigate();
  const [showCityModal, setShowCityModal] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const city = localStorage.getItem("city");

  // Function to handle logo click based on role
  const handleLogoClick = () => {
    const role = localStorage.getItem("role");

    if (role === "Admin") navigate("/admin");
    else if (role === "TheatreManager") navigate("/manager");
    else navigate("/"); // regular user
  };

  return (
    <>
      <nav
        style={{
          height: "64px",
          backgroundColor: "#1f2533",
          display: "flex",
          alignItems: "center",
          padding: "0 24px",
          color: "#fff",
          justifyContent: "space-between",
        }}
      >
        {/* Logo */}
        <div
          style={{ fontWeight: "bold", fontSize: "22px", cursor: "pointer" }}
          onClick={handleLogoClick} // Updated
        >
          Movie<span style={{ color: "#f84464" }}>Mitra</span>
        </div>

        {/* Search bar (User only) */}
        {!isAdmin && !isManager && (
          <input
            placeholder="Search for Movies"
            onFocus={() => navigate("/search")}
            style={{
              width: "40%",
              padding: "10px",
              borderRadius: "6px",
              border: "none",
            }}
          />
        )}

        {/* Right section */}
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          {!isAdmin && !isManager && (
            <button
              onClick={() => setShowCityModal(true)}
              style={{
                background: "transparent",
                color: "#fff",
                border: "none",
                cursor: "pointer",
              }}
            >
              {city || "Select City"}
            </button>
          )}

          {/* Profile Icon */}
          <div
            onClick={() => setShowProfile(true)}
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "50%",
              backgroundColor: "#f84464",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            U
          </div>
        </div>
      </nav>

      {showCityModal && (
        <CitySelectorModal onClose={() => setShowCityModal(false)} />
      )}
      {showProfile && <ProfileSidebar onClose={() => setShowProfile(false)} />}
    </>
  );
};

export default Navbar;
