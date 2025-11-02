import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Malpy from "./pages/Malpy";
import Ezhuth from "./pages/Ezhuth";

export default function App() {
  React.useEffect(() => {
    document.title = "function";
  }, []);

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-gray-100">
        {/* Navbar */}
        <nav className="flex justify-between items-center px-6 py-4 border-b border-gray-700 bg-gray-800">
          <h1 className="text-2xl font-bold text-blue-400">function</h1>
          <div className="flex gap-4">
            <Link to="/" className="hover:text-blue-400 transition">
              Malpy
            </Link>
            <Link to="/ezhuth" className="hover:text-blue-400 transition">
              Ezhuth
            </Link>
          </div>
        </nav>

        <div className="p-6">
          <Routes>
            <Route path="/" element={<Malpy />} />
            <Route path="/ezhuth" element={<Ezhuth />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}
