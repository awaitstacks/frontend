import React, { useContext, useState, useRef, useEffect } from "react";
import { assets } from "../assets/assets.js";
import { NavLink, useNavigate } from "react-router-dom";
import { TourAppContext } from "../context/TourAppContext.jsx";

const TourNavbar = () => {
  const navigate = useNavigate();
  const { token, setToken, userData } = useContext(TourAppContext);
  const [showMenu, setShowMenu] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const dropdownRef = useRef(null);

  const logout = () => {
    setToken(false);
    localStorage.removeItem("token");
    navigate("/");
    setShowMenu(false);
    setShowDropdown(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNavigation = (path) => {
    navigate(path);
    setShowMenu(false);
    setShowDropdown(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    if (showDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showDropdown]);

  return (
    <>
      <div className="flex items-center justify-between text-sm py-4 mb-5 border-b border-b-gray-300">
        <img
          onClick={() => handleNavigation("/")}
          className="w-44 cursor-pointer transition-transform hover:scale-105"
          src={assets.logo}
          alt="Logo"
        />

        <ul className="hidden md:flex items-center gap-8 font-medium text-gray-700">
          <NavLink
            to="/"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="relative group py-2"
          >
            <span>HOME</span>
            <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
          </NavLink>
          <NavLink
            to="/tours"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="relative group py-2"
          >
            <span>ALL TOURS</span>
            <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
          </NavLink>
          <NavLink
            to="/about"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="relative group py-2"
          >
            <span>ABOUT</span>
            <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
          </NavLink>
          <NavLink
            to="/contact"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="relative group py-2"
          >
            <span>CONTACT</span>
            <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
          </NavLink>
        </ul>

        <div className="flex items-center gap-6">
          {token && userData ? (
            <div className="relative" ref={dropdownRef}>
              <div
                className="flex items-center gap-3 cursor-pointer select-none"
                onClick={() => setShowDropdown(!showDropdown)}
              >
                <img
                  className="w-9 rounded-full ring-2 ring-blue-100 transition-all hover:ring-blue-300"
                  src={userData.image}
                  alt="Profile"
                />
                <img
                  className={`w-3 transition-transform duration-300 ${
                    showDropdown ? "rotate-180" : ""
                  }`}
                  src={assets.dropdown_icon}
                  alt="Dropdown"
                />
              </div>

              <div
                className={`absolute right-0 mt-4 w-56 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden py-3 transition-all duration-300 ease-out origin-top-right ${
                  showDropdown
                    ? "opacity-100 visible scale-100"
                    : "opacity-0 invisible scale-95 pointer-events-none"
                }`}
              >
                <div
                  className="px-6 py-3 hover:bg-blue-50 transition-colors cursor-pointer"
                  onClick={() => handleNavigation("/my-profile")}
                >
                  <p className="font-medium text-gray-800">My Profile</p>
                </div>
                <div
                  className="px-6 py-3 hover:bg-blue-50 transition-colors cursor-pointer"
                  onClick={() => handleNavigation("/my-trolly")}
                >
                  <p className="font-medium text-gray-800">My Trolly</p>
                </div>
                <hr className="mx-4 my-2 border-gray-200" />
                <div
                  className="px-6 py-3 hover:bg-red-50 transition-colors cursor-pointer"
                  onClick={logout}
                >
                  <p className="font-medium text-red-600">Logout</p>
                </div>
              </div>
            </div>
          ) : (
            <button
              onClick={() => handleNavigation("/login")}
              className="hidden md:block bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-3 rounded-full font-medium transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Create Account
            </button>
          )}

          {/* Mobile Menu Toggle */}
          <img
            onClick={() => setShowMenu(true)}
            className="w-7 md:hidden cursor-pointer"
            src={assets.menu_icon}
            alt="Menu"
          />
        </div>
      </div>

      {/* Mobile Menu with Smooth Slide-In Animation */}
      <div
        className={`fixed inset-0 z-50 md:hidden transition-transform duration-500 ease-in-out ${
          showMenu ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Dark overlay */}
        <div
          className="absolute inset-0 bg-black/50"
          onClick={() => setShowMenu(false)}
        />

        {/* Sliding Sidebar */}
        <div
          className="absolute right-0 top-0 h-full w-full max-w-sm bg-white shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between px-6 py-6 border-b border-gray-200">
            <img className="w-36" src={assets.logo} alt="Logo" />
            <img
              className="w-8 cursor-pointer"
              onClick={() => setShowMenu(false)}
              src={assets.cross_icon}
              alt="Close"
            />
          </div>

          <ul className="flex flex-col items-center gap-6 mt-12 text-xl font-medium text-gray-800 px-6">
            <p
              onClick={() => handleNavigation("/")}
              className="px-8 py-4 rounded-full hover:bg-blue-50 transition w-full text-center cursor-pointer"
            >
              HOME
            </p>
            <p
              onClick={() => handleNavigation("/tours")}
              className="px-8 py-4 rounded-full hover:bg-blue-50 transition w-full text-center cursor-pointer"
            >
              ALL TOURS
            </p>
            <p
              onClick={() => handleNavigation("/about")}
              className="px-8 py-4 rounded-full hover:bg-blue-50 transition w-full text-center cursor-pointer"
            >
              ABOUT
            </p>
            <p
              onClick={() => handleNavigation("/contact")}
              className="px-8 py-4 rounded-full hover:bg-blue-50 transition w-full text-center cursor-pointer"
            >
              CONTACT
            </p>

            {token && userData && (
              <>
                <div className="w-full border-t border-gray-200 pt-6 mt-4">
                  <p
                    onClick={() => handleNavigation("/my-profile")}
                    className="px-8 py-4 rounded-full hover:bg-blue-50 transition w-full text-center cursor-pointer"
                  >
                    My Profile
                  </p>
                  <p
                    onClick={() => handleNavigation("/my-trolly")}
                    className="px-8 py-4 rounded-full hover:bg-blue-50 transition w-full text-center cursor-pointer"
                  >
                    My Trolly
                  </p>
                  <p
                    onClick={logout}
                    className="px-8 py-4 rounded-full hover:bg-red-50 text-red-600 transition w-full text-center font-semibold cursor-pointer"
                  >
                    Logout
                  </p>
                </div>
              </>
            )}

            {!token && (
              <p
                onClick={() => handleNavigation("/login")}
                className="px-10 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full shadow-xl mt-8 cursor-pointer"
              >
                LOGIN
              </p>
            )}
          </ul>
        </div>
      </div>
    </>
  );
};

export default TourNavbar;
