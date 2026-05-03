import { BrowserRouter, Routes, Route } from "react-router-dom";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import Analytics from "./pages/Analytics";
import Landing from "./pages/Landing";
import MainLayout from "./layout/MainLayout";
import ProtectedRoute from "./ProtectedRoute";
import Navbar from "./components/Navbar";

export default function App() {
  return (
    <BrowserRouter>
      <div className="bg-[#0b0f14] text-white min-h-screen">
        <Navbar />

        <div className="pt-17">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Auth />} />
            <Route path="/signup" element={<Auth />} />

            {/* Protected Routes*/}
            <Route
              element={
                <ProtectedRoute>
                  <MainLayout />
                </ProtectedRoute>
              }
            >
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/analytics/:code" element={<Analytics />} />
            </Route>
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}
