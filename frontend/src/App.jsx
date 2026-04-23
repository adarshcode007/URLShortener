import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Analytics from "./pages/Analytics";
import MainLayout from "./layout/MainLayout";
import Signup from "./pages/Signup";
import ProtectedRoute from "./ProtectedRoute";
import Navbar from "./components/Navbar";

export default function App() {
  return (
    <BrowserRouter>
      <div className="bg-[#0f172a] text-white min-h-screen">
        <Navbar />

        <div className="pt-17">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

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
