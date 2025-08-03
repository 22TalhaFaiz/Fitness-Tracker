import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const DashboardNavbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
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
    <nav className="bg-black text-white px-6 py-4 shadow-lg">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-orange-500">Fitness Tracker</h1>

        {/* Mobile hamburger */}
        <button
          className="lg:hidden text-white"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {menuOpen ? (
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

        {/* Desktop menu */}
        <ul className="hidden lg:flex gap-8 items-center font-medium">
          <li>
            <Link to="/dashboard" className="hover:text-orange-500 transition">
              Dashboard
            </Link>
          </li>
             <li>
            <Link to="/dashboard/workout" className="hover:text-orange-500 transition">
              Workout Tracking
            </Link>
          </li>
               <li>
            <Link to="/dashboard/nutrition" className="hover:text-orange-500 transition">
             Nutrition Tracking
            </Link>
          </li>
               <li>
            <Link to="/dashboard/bmi" className="hover:text-orange-500 transition">
             BMI Calculator
            </Link>
          </li>
              <li>
            <Link to="/dashboard/progress" className="hover:text-orange-500 transition">
              Progress Tracking
            </Link>
          </li>
          <li className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="hover:text-orange-500 transition flex items-center gap-1"
            >
              Account
              <svg
                className={`w-4 h-4 transform transition-transform ${dropdownOpen ? "rotate-180" : "rotate-0"
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
              <div className="absolute right-0 mt-3 w-48 !bg-white !text-black !rounded-lg !shadow-lg z-50 overflow-hidden">
                <Link
                  to="/dashboard/profile"
                  className="block px-4 py-2 !text-sm !hover:bg-orange-100 !hover:text-orange-600 transition-all"
                  onClick={() => setDropdownOpen(false)}
                >
                  Profile
                </Link>
                <Link
                  to="/dashboard/settings"
                  className="block px-4 py-2 !text-sm !hover:bg-orange-100 !hover:text-orange-600 transition-all"
                  onClick={() => setDropdownOpen(false)}
                >
                  Settings
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setDropdownOpen(false);
                  }}
                  className="block w-full text-left px-4 py-2 !text-sm !hover:bg-orange-100 !hover:text-orange-600 transition-all"
                >
                  Logout
                </button>
              </div>
            )}
          </li>
        </ul>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <ul className="lg:hidden mt-4 space-y-3 font-medium">
          <li>
            <Link
              to="/dashboard"
              className="block hover:text-orange-500"
              onClick={() => setMenuOpen(false)}
            >
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              to="/dashboard/profile"
              className="block hover:text-orange-500"
              onClick={() => setMenuOpen(false)}
            >
              Profile
            </Link>
          </li>
          <li>
            <Link
              to="/dashboard/settings"
              className="block hover:text-orange-500"
              onClick={() => setMenuOpen(false)}
            >
              Settings
            </Link>
          </li>
          <li>
            <button
              onClick={() => {
                handleLogout();
                setMenuOpen(false);
              }}
              className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded w-full text-left"
            >
              Logout
            </button>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default DashboardNavbar;
