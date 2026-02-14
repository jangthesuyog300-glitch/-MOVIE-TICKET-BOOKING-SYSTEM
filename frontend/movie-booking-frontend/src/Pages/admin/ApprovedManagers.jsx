import { useEffect, useState } from "react";
import axiosInstance from "../../app/axiosInstance";
import toast from "react-hot-toast";

const ApprovedManagers = () => {
  const [approvedManagers, setApprovedManagers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchApprovedManagers();
  }, []);

  const fetchApprovedManagers = async () => {
    try {
      const res = await axiosInstance.get(
        "/theaterManagerRequest"
      );

      // Filter only approved requests
      const approved = res.data.filter(
        (req) => req.status === "APPROVED"
      );

      setApprovedManagers(approved);
    } catch (error) {
      toast.error("Failed to load approved managers");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="page">
        <p>Loading approved managers...</p>
      </div>
    );
  }

  return (
    <div className="page">
      <h2 style={{ marginBottom: "20px" }}>
        Approved Theatre Managers
      </h2>

      {approvedManagers.length === 0 && (
        <div className="card">
          <p>No approved theatre managers found.</p>
        </div>
      )}

      {approvedManagers.map((manager) => (
        <div
          key={manager.requestId}
          className="card"
          style={{ marginBottom: "15px" }}
        >
          <h4>{manager.theatreName}</h4>

          <p>
            <strong>Manager User ID:</strong>{" "}
            {manager.userId}
          </p>

          <p>
            <strong>City:</strong>{" "}
            {manager.city?.cityName}
          </p>

          <p>
            <strong>Address:</strong>{" "}
            {manager.address}
          </p>

          <p>
            <strong>Approved At:</strong>{" "}
            {manager.reviewedAt
              ? new Date(manager.reviewedAt).toLocaleString()
              : "N/A"}
          </p>
        </div>
      ))}
    </div>
  );
};

export default ApprovedManagers;
