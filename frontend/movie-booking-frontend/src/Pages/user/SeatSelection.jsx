import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";

import {
  fetchSeatLayout,
  setMaxSeats,
  toggleSeat,
} from "../../features/seat/seatSlice";

import {
  startSignalRConnection,
  stopSignalRConnection,
} from "../../app/signalRConnection";

import "../../styles/seat-layout.css";

/* =====================================================
   NORMALIZE BACKEND DATA → BOOKMYSHOW FORMAT
   ===================================================== */
const normalizeSeatLayout = (seatRows = []) => {
  const rowMap = {};

  seatRows.forEach((row) => {
    if (!rowMap[row.rowName]) {
      rowMap[row.rowName] = {
        rowName: row.rowName,
        seats: [],
      };
    }

    if (Array.isArray(row.seats)) {
      rowMap[row.rowName].seats.push(...row.seats);
    }
  });

  return Object.values(rowMap)
    .sort((a, b) => a.rowName.localeCompare(b.rowName))
    .map((row) => ({
      ...row,
      seats: row.seats.sort((a, b) => {
        const aNum = parseInt(a.seatNumber.replace(/\D/g, ""));
        const bNum = parseInt(b.seatNumber.replace(/\D/g, ""));
        return aNum - bNum;
      }),
    }));
};

const SeatSelection = () => {
  const { showId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { layout, selectedSeats, maxSeats, loading } = useSelector(
    (state) => state.seat
  );

  const [showSeatPopup, setShowSeatPopup] = useState(true);

  /* ================= FETCH SEATS AFTER COUNT ================= */
  useEffect(() => {
    if (!showSeatPopup) {
      dispatch(fetchSeatLayout(showId));

      startSignalRConnection(showId, {
        onSeatLocked: () => {},
        onSeatUnlocked: () => {},
        onSeatBooked: () => {},
      });
    }

    return () => stopSignalRConnection();
  }, [dispatch, showId, showSeatPopup]);

  /* ================= SEAT COUNT MODAL ================= */
  if (showSeatPopup) {
    return (
      <div className="seat-count-backdrop">
        <div className="seat-count-modal">
          <h3>Select number of seats</h3>

          <div className="seat-count-options">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
              <button
                key={n}
                onClick={() => {
                  dispatch(setMaxSeats(n));
                  setShowSeatPopup(false);
                }}
              >
                {n}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (loading) return <p className="loading">Loading seats...</p>;

  const rows = normalizeSeatLayout(layout);

  return (
    <div className="seat-page">
      {/* ================= SCREEN ================= */}
      <div className="screen-wrapper">
        <div className="screen-curve" />
        <p className="screen-text">SCREEN THIS WAY</p>
      </div>

      {/* ================= SEATS ================= */}
      <div className="seat-layout">
        {rows.map((row) => (
          <div key={row.rowName} className="seat-row">
            <div className="row-name">{row.rowName}</div>

            <div className="row-seats">
              {row.seats.map((seat) => {
                const isSelected = selectedSeats.some(
                  (s) => s.showSeatStatusId === seat.showSeatStatusId
                );

                return (
                  <div
                    key={seat.showSeatStatusId}
                    className={`seat ${
                      seat.status !== "AVAILABLE"
                        ? "seat-booked"
                        : isSelected
                        ? "seat-selected"
                        : "seat-available"
                    }`}
                    title={`₹${seat.price}`}
                    onClick={() =>
                      seat.status === "AVAILABLE" &&
                      dispatch(toggleSeat(seat))
                    }
                  >
                    {seat.seatNumber}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* ================= FOOTER ================= */}
      {selectedSeats.length > 0 && (
        <div className="seat-footer">
          <button
            className="book-now-btn"
            onClick={() =>
              navigate("/booking/confirm", {
                state: {
                  showId,
                  seats: selectedSeats,
                },
              })
            }
          >
            Book {selectedSeats.length} Tickets
          </button>
        </div>
      )}
    </div>
  );
};

export default SeatSelection;
