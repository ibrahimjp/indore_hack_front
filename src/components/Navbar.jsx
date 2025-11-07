import React from "react";
// File: src/components/Navbar.jsx

import { useState, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { logo } from "../assets";
import { AppContext } from "../context/AppContext";
import AuthModal from "./Auth/AuthModal";
import UserMenu from "./Auth/UserMenu";

const navLinks = [
  { title: "Home", href: "/" },
  { title: "Find Doctor", href: "/Doctor" },
  // { title: "Ai Assistent", href: "#" },
  { title: "Pharmacy", href: "/Pharmacy" },
  { title: "Plus", href: "/Price" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const { userData, token, setToken, setUserData } = useContext(AppContext);
  const navigate = useNavigate();

  const toggleMenu = () => setIsOpen(!isOpen);
  const openAuthModal = () => setIsAuthModalOpen(true);
  const closeAuthModal = () => setIsAuthModalOpen(false);

  const logout = () => {
    setToken(false);
    setUserData(false);
    localStorage.removeItem("token");
    navigate("/");
  };

  const menuVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.1 } },
  };

  const linkVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <>
      <header className="fixed top-0 md:top-8 left-1/2 -translate-x-1/2 w-full max-w-[1200px] px-6 md:px-10 z-50">
        <div className="flex items-center justify-between w-full h-20 md:h-auto p-4 md:p-0 bg-dark-bg/60 md:bg-transparent backdrop-blur-md md:backdrop-blur-none border-b md:border-none border-light-black">
          <a href="/" className="z-10">
            <img
              src={logo}
              alt="Helium AI Agency Logo"
              className="h-8 w-8 md:h-10 md:w-10"
            />
          </a>

          <nav className="hidden md:flex items-center gap-8 bg-dark-bg/70 backdrop-blur-md border border-light-black rounded-2xl px-8 py-3">
            {navLinks.map((link) => (
              <a
                key={link.title}
                href={link.href}
                className="text-footer-gray hover:text-off-white transition-colors text-sm font-medium"
              >
                {link.title}
              </a>
            ))}
          </nav>

          {/* Desktop Authentication Section */}
          <div className="hidden md:flex items-center">
            {token && userData ? (
              // User is logged in - show user menu
              <UserMenu />
            ) : (
              // User is not logged in - show login button
              <button
                onClick={openAuthModal}
                className="bg-primary-green text-dark-bg font-semibold py-3 px-6 rounded-xl text-sm shadow-lg hover:bg-deep-green transition-all duration-200 transform hover:scale-105"
              >
                Login
              </button>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden z-50" onClick={toggleMenu}>
            <div className="space-y-1.5 cursor-pointer">
              <motion.span
                animate={{ rotate: isOpen ? 45 : 0, y: isOpen ? 6 : 0 }}
                className="block w-6 h-0.5 bg-white"
              ></motion.span>
              <motion.span
                animate={{ opacity: isOpen ? 0 : 1 }}
                className="block w-6 h-0.5 bg-white"
              ></motion.span>
              <motion.span
                animate={{ rotate: isOpen ? -45 : 0, y: isOpen ? -6 : 0 }}
                className="block w-6 h-0.5 bg-white"
              ></motion.span>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="md:hidden fixed inset-0 bg-black bg-opacity-90 backdrop-blur-lg z-40 pt-24"
          >
            <motion.nav
              variants={menuVariants}
              initial="hidden"
              animate="visible"
              className="flex flex-col items-center gap-8"
            >
              {navLinks.map((link) => (
                <motion.a
                  key={link.title}
                  href={link.href}
                  variants={linkVariants}
                  onClick={toggleMenu}
                  className="text-footer-gray hover:text-off-white transition-colors text-lg"
                >
                  {link.title}
                </motion.a>
              ))}

              {/* Mobile Authentication */}
              <motion.div variants={linkVariants} className="mt-4">
                {token && userData ? (
                  <div className="flex flex-col items-center space-y-4">
                    <div className="flex items-center space-x-3">
                      <img
                        src={
                          userData.image ||
                          "https://i.pinimg.com/736x/b9/aa/0f/b9aa0f112ac344f7f0a7254ffa94c42c.jpg"
                        }
                        alt={userData.name || "User"}
                        className="w-12 h-12 rounded-full object-cover border-2 border-primary-green"
                        onError={(e) => {
                          e.target.src =
                            "https://i.pinimg.com/736x/b9/aa/0f/b9aa0f112ac344f7f0a7254ffa94c42c.jpg";
                        }}
                      />
                      <div>
                        <p className="text-off-white font-semibold">
                          {userData.name}
                        </p>
                        <p className="text-footer-gray text-sm">
                          {userData.email}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col space-y-2 w-full max-w-xs">
                      <button
                        onClick={() => {
                          toggleMenu();
                          navigate("/profile");
                        }}
                        className="bg-primary-green text-dark-bg font-medium py-2 px-4 rounded-xl text-sm hover:bg-deep-green transition-colors"
                      >
                        My Profile
                      </button>
                      <button
                        onClick={() => {
                          toggleMenu();
                          navigate("/appointments");
                        }}
                        className="bg-dark-green text-off-white font-medium py-2 px-4 rounded-xl text-sm hover:bg-primary-green transition-colors"
                      >
                        My Appointments
                      </button>
                      <button
                        onClick={() => {
                          toggleMenu();
                          logout();
                        }}
                        className="bg-red-500/20 text-red-400 font-medium py-2 px-4 rounded-xl text-sm hover:bg-red-500/30 transition-colors"
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      toggleMenu();
                      openAuthModal();
                    }}
                    className="bg-primary-green text-dark-bg font-semibold py-3 px-8 rounded-xl text-lg shadow-lg hover:bg-deep-green transition-colors"
                  >
                    Login
                  </button>
                )}
              </motion.div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Authentication Modal */}
      <AuthModal isOpen={isAuthModalOpen} onClose={closeAuthModal} />
    </>
  );
};

export default Navbar;
