import React, { useState, useRef, useEffect } from "react";
import { FaHome } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const DashboardNavbar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef();

  const handleLogout = async () => {
    try {
      await fetch("http://localhost:3008/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
      localStorage.clear();
      navigate("/");
    } catch (error) {
      console.error("Logout Error", error);
    }
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex">
      {/* Sidebar */}
     <aside
  className={`bg-neutral-800 text-white w-64 lg:w-72 min-h-screen px-6 py-6 shadow-lg transform transition-transform duration-300 z-50 ${
    sidebarOpen ? "fixed top-0 left-0" : "fixed -translate-x-full top-0 left-0 lg:static lg:translate-x-0"
  }`}
>
        <h1 className="text-2xl font-bold text-white mb-8">
          Fitness Tracker
        </h1>
        <ul className="space-y-10 font-medium">
          <li>
            <Link to="/dashboard" className="hover:text-neutral-600 transition" > 
                Dashboard
            </Link>
          </li>
          <li>
            <Link
              to="/dashboard/workout"
              className="hover:text-neutral-600 transition"
            >
              Workout Tracking
            </Link>
          </li>
          <li>
            <Link
              to="/dashboard/nutrition"
              className="hover:text-neutral-600 transition"
            >
              Nutrition Tracking
            </Link>
          </li>
          <li>
            <Link
              to="/dashboard/bmi"
              className="hover:text-neutral-600 transition"
            >
              BMI Calculator
            </Link>
          </li>
          <li>
            <Link
              to="/dashboard/progress"
              className="hover:text-neutral-600 transition"
            >
              Progress Tracking
            </Link>
          </li>
          <li className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="hover:text-black transition flex items-center gap-1 w-full"
            >
              Account
              <svg
                className={`w-4 h-4 transform transition-transform ${
                  dropdownOpen ? "rotate-180" : "rotate-0"
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M19 9l-7 7-7-7"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            {dropdownOpen && (
              <div className="mt-2 ml-2 w-48 bg-white text-black rounded-lg shadow-lg overflow-hidden z-50">
                <Link
                  to="/dashboard/profile"
                  className="block px-4 py-2 text-sm hover:bg-neutral-100 hover:text-neutral-600 transition-all"
                  onClick={() => setDropdownOpen(false)}
                >
                  Profile
                </Link>
                <Link
                  to="/dashboard/settings"
                  className="block px-4 py-2 text-sm hover:bg-neutral-100 hover:text-neutral-600 transition-all"
                  onClick={() => setDropdownOpen(false)}
                >
                  Settings
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setDropdownOpen(false);
                  }}
                  className="block w-full text-left px-4 py-2 text-sm hover:bg-neutral-100 hover:text-neutral-600 transition-all"
                >
                  Logout
                </button>
              </div>
            )}
          </li>
        </ul>
      </aside>

      {/* Mobile toggle button */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 bg-neutral-900 text-white p-2 rounded-md shadow-md"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          {sidebarOpen ? (
            <path
              d="M6 18L18 6M6 6l12 12"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          ) : (
            <path
              d="M4 6h16M4 12h16M4 18h16"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          )}
        </svg>
      </button>
    </div>
  );
};

export default DashboardNavbar;
