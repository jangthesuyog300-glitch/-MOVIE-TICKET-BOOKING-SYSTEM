import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  getManagerRequestsApi,
  approveManagerRequestApi,
  rejectManagerRequestApi,
} from "../../features/admin/adminApi";

const TheatreManagerRequests = () => {
  const [requests, setRequests] = useState([]);
  const [tab, setTab] = useState("PENDING");
  const [rejectReason, setRejectReason] = useState("");
  const [selectedRequestId, setSelectedRequestId] = useState(null);
  const [loading, setLoading] = useState(false);

  /* ================= LOAD REQUESTS ================= */
  useEffect(() => {
    loadRequests();
  }, []);

  const loadRequests = async () => {
    try {
      setLoading(true);
      const data = await getManagerRequestsApi();
      console.log("Manager requests:", data); // 🔍 DEBUG
      setRequests(data || []);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load manager requests");
    } finally {
      setLoading(false);
    }
  };

  /* ================= APPROVE ================= */
  const approve = async (requestId) => {
    try {
      await approveManagerRequestApi(requestId , 1);
      toast.success("Request approved");
      loadRequests();
    } catch (err) {
      console.error(err);
      toast.error("Approval failed");
    }
  };

  /* ================= REJECT ================= */
  const reject = async () => {
    if (!rejectReason.trim()) {
      toast.error("Reject reason is required");
      return;
    }

    try {
      await rejectManagerRequestApi(selectedRequestId,localStorage.getItem("userId"), rejectReason);
      toast.success("Request rejected");
      setSelectedRequestId(null);
      setRejectReason("");
      loadRequests();
    } catch (err) {
      console.error(err);
      toast.error("Rejection failed");
    }
  };

  /* ================= FILTER BY TAB ================= */
  const filteredRequests = requests.filter(
    (r) => r.status?.toUpperCase() === tab
  );

  /* ================= UI ================= */
  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{ marginBottom: "20px" }}>
        Theatre Manager Requests
      </h2>

      {/* ===== TABS ===== */}
      <div style={{ display: "flex", gap: "12px", marginBottom: "20px" }}>
        {["PENDING", "APPROVED"].map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            style={{
              padding: "8px 18px",
              borderRadius: "20px",
              border: "none",
              cursor: "pointer",
              background: tab === t ? "#f84464" : "#eee",
              color: tab === t ? "#fff" : "#333",
              fontWeight: 600,
            }}
          >
            {t}
          </button>
        ))}
      </div>

      {/* ===== LOADING ===== */}
      {loading && <p>Loading requests...</p>}

      {/* ===== EMPTY ===== */}
      {!loading && filteredRequests.length === 0 && (
        <p>No {tab.toLowerCase()} requests</p>
      )}

      {/* ===== LIST ===== */}
      {filteredRequests.map((r) => (
        <div
          key={r.requestId}
          style={{
            background: "#fff",
            padding: "16px",
            borderRadius: "10px",
            marginBottom: "12px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
          }}
        >
          <h4 style={{ marginBottom: "6px" }}>
            {r.theatreName}
          </h4>

          <p style={{ margin: "4px 0", color: "#666" }}>
            {r.address}
          </p>

          <p style={{ fontSize: "14px" }}>
            Status:{" "}
            <strong style={{ color: "#f84464" }}>
              {r.status}
            </strong>
          </p>

          {tab === "PENDING" && (
            <div style={{ marginTop: "10px" }}>
              <button
                onClick={() => approve(r.requestId)}
                style={approveBtn}
              >
                Approve
              </button>

              <button
                onClick={() => setSelectedRequestId(r.requestId)}
                style={rejectBtn}
              >
                Reject
              </button>
            </div>
          )}
        </div>
      ))}

      {/* ===== REJECT MODAL ===== */}
      {selectedRequestId && (
        <div style={modalBackdrop}>
          <div style={modal}>
            <h3>Reject Request</h3>

            <textarea
              placeholder="Enter reject reason"
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              style={textarea}
            />

            <div style={{ display: "flex", gap: "10px" }}>
              <button onClick={reject} style={approveBtn}>
                Confirm
              </button>
              <button
                onClick={() => {
                  setSelectedRequestId(null);
                  setRejectReason("");
                }}
                style={rejectBtn}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TheatreManagerRequests;

/* ================= STYLES ================= */
const approveBtn = {
  padding: "6px 14px",
  borderRadius: "6px",
  border: "none",
  background: "#1ea83c",
  color: "#fff",
  cursor: "pointer",
  marginRight: "10px",
};

const rejectBtn = {
  padding: "6px 14px",
  borderRadius: "6px",
  border: "none",
  background: "#e53935",
  color: "#fff",
  cursor: "pointer",
};

const modalBackdrop = {
  position: "fixed",
  inset: 0,
  background: "rgba(0,0,0,0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const modal = {
  background: "#fff",
  padding: "20px",
  borderRadius: "10px",
  width: "350px",
};

const textarea = {
  width: "100%",
  minHeight: "80px",
  margin: "10px 0",
  padding: "8px",
};
