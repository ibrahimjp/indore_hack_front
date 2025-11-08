import React, { useState, useRef, useEffect, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import { useToast } from "../Toast/Toast";

const UserMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();
  const { userData, setToken, setUserData } = useContext(AppContext);
  const toast = useToast();

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleMenuItemClick = (action) => {
    setIsMenuOpen(false);

    switch (action) {
      case "profile":
        navigate("/profile");
        break;
      case "appointments":
        window.location.href = "http://localhost:5174/appointments";
        break;
      case "dashboard":
        window.location.href = "http://localhost:5174/dashboard";
        break;
      case "messages":
        window.location.href = "http://localhost:5174/messages";
        break;
      case "logout":
        setToken(false);
        setUserData(false);
        localStorage.removeItem("token");
        navigate("/");
        break;
      default:
        break;
    }
  };

  if (!userData) return null;

  const menuItems = [
    {
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
          />
        </svg>
      ),
      label: "My Profile",
      action: "profile",
    },
    {
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
          />
        </svg>
      ),
      label: "Dashboard",
      action: "dashboard",
    },
    {
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4m-6 0h6a2 2 0 012 2v10a2 2 0 01-2 2H8a2 2 0 01-2-2V9a2 2 0 012-2z"
          />
        </svg>
      ),
      label: "My Appointments",
      action: "appointments",
    },
    {
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
          />
        </svg>
      ),
      label: "Messages",
      action: "messages",
    },
    {
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
          />
        </svg>
      ),
      label: "Logout",
      action: "logout",
    },
  ];

  return (
    <div className="relative" ref={menuRef}>
      {/* User Avatar Button */}
      <button
        onClick={toggleMenu}
        className="flex items-center justify-center w-10 h-10 rounded-full overflow-hidden border-2 border-transparent hover:border-primary-green transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-green focus:ring-offset-2 focus:ring-offset-dark-bg"
      >
        <img
          src={
            userData.image ||
            "https://i.pinimg.com/736x/b9/aa/0f/b9aa0f112ac344f7f0a7254ffa94c42c.jpg"
          }
          alt={userData.name || "User"}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.src =
              "https://i.pinimg.com/736x/b9/aa/0f/b9aa0f112ac344f7f0a7254ffa94c42c.jpg";
          }}
        />
      </button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 mt-2 w-64 bg-dark-bg/95 backdrop-blur-md border border-light-black rounded-2xl shadow-2xl overflow-hidden z-50"
          >
            {/* User Info Header */}
            <div className="px-4 py-4 border-b border-light-black bg-light-black/30">
              <div className="flex items-center space-x-3">
                <img
                  src={
                    userData.image ||
                    "https://i.pinimg.com/736x/b9/aa/0f/b9aa0f112ac344f7f0a7254ffa94c42c.jpg"
                  }
                  alt={userData.name || "User"}
                  className="w-12 h-12 rounded-full object-cover border-2 border-primary-green/20"
                  onError={(e) => {
                    e.target.src =
                      "https://i.pinimg.com/736x/b9/aa/0f/b9aa0f112ac344f7f0a7254ffa94c42c.jpg";
                  }}
                />
                <div className="flex-1 min-w-0">
                  <p className="text-off-white font-semibold text-sm truncate">
                    {userData.name || "User"}
                  </p>
                  <p className="text-footer-gray text-xs truncate">
                    {userData.email || "email@example.com"}
                  </p>
                </div>
              </div>
            </div>

            {/* Menu Items */}
            <div className="py-2">
              {menuItems.map((item, index) => (
                <motion.button
                  key={item.action}
                  onClick={() => handleMenuItemClick(item.action)}
                  className={`w-full flex items-center px-4 py-3 text-left transition-all duration-150 ${
                    item.action === "logout"
                      ? "text-red-400 hover:text-red-300 hover:bg-red-500/10"
                      : "text-footer-gray hover:text-off-white hover:bg-light-black/50"
                  }`}
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.15 }}
                >
                  <span className="mr-3 opacity-70">{item.icon}</span>
                  <span className="font-medium text-sm">{item.label}</span>

                  {/* Arrow Icon */}
                  <svg
                    className="w-4 h-4 ml-auto opacity-40 group-hover:opacity-70 transition-opacity"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UserMenu;
