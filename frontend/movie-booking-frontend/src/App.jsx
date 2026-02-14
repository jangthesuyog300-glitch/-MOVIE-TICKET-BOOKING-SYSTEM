import { Toaster } from "react-hot-toast";
import AppRoutes from "./routes/AppRoutes";
import { useEffect } from "react";

export default function App() {
  return (
    <>
      <Toaster />
      <AppRoutes />
    </>
  );
}
