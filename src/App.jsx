import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import LandingPage from "./pages/LandingPage";
import BuilderPage from "./pages/BuilderPage";

export default function App() {
  return (
    <BrowserRouter>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "#111620",
            color: "#e8edf5",
            border: "1px solid rgba(0,212,255,0.2)",
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "14px",
          },
          success: {
            iconTheme: { primary: "#00ff88", secondary: "#111620" },
          },
          error: {
            iconTheme: { primary: "#ff4444", secondary: "#111620" },
          },
        }}
      />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/builder" element={<BuilderPage />} />
      </Routes>
    </BrowserRouter>
  );
}
