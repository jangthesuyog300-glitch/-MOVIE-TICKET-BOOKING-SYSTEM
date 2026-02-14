import * as signalR from "@microsoft/signalr";

let connection = null;
let joinedShowId = null;

export const startSignalRConnection = async (showId, handlers = {}) => {
  if (!showId || connection) return;

  try {
    connection = new signalR.HubConnectionBuilder()
      .withUrl("http://localhost:5020/seat-lock-hub")
      .withAutomaticReconnect()
      .build();

    // ================= EVENTS FROM BACKEND =================
    if (handlers.onSeatLocked) {
      connection.on("SeatLocked", handlers.onSeatLocked);
    }

    if (handlers.onSeatUnlocked) {
      connection.on("SeatUnlocked", handlers.onSeatUnlocked);
    }

    if (handlers.onSeatBooked) {
      connection.on("SeatBooked", handlers.onSeatBooked);
    }

    // ================= START =================
    await connection.start();

    // ================= JOIN GROUP =================
    await connection.invoke("JoinShowGroup", Number(showId));
    joinedShowId = showId;

    console.log("✅ SignalR connected & joined show:", showId);
  } catch (err) {
    console.error("❌ SignalR connection error:", err);
  }
};

export const stopSignalRConnection = async () => {
  try {
    if (
      connection &&
      connection.state === signalR.HubConnectionState.Connected &&
      joinedShowId
    ) {
      await connection.invoke("LeaveShowGroup", Number(joinedShowId));
    }
  } catch {
    // Expected sometimes (refresh / strict mode)
  } finally {
    if (connection) {
      await connection.stop();
      connection = null;
      joinedShowId = null;
    }
  }
};
