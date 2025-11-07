// File: src/components/Navbar.jsx

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { logo } from '../assets';

const navLinks = [
  { title: "Home", href: "/" },
  { title: "Find Doctor", href: "/Doctor" },
  // { title: "Ai Assistent", href: "#" },
  { title: "Pharmacy", href: "/Pharmacy" },
  { title: "Plus", href: "/Price" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);

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
            <img src={logo} alt="Helium AI Agency Logo" className="h-8 w-8 md:h-10 md:w-10" />
          </a>

          <nav className="hidden md:flex items-center gap-8 bg-dark-bg/70 backdrop-blur-md border border-light-black rounded-2xl px-8 py-3">
            {navLinks.map((link) => (
              <a key={link.title} href={link.href} className="text-footer-gray hover:text-off-white transition-colors text-sm font-medium">
                {link.title}
              </a>
            ))}
          </nav>

          <a href="#" className="hidden md:block bg-off-white text-black font-medium py-3 px-6 rounded-xl text-sm shadow-lg hover:bg-gray-200 transition-colors">
            Book a Call
          </a>

          <div className="md:hidden z-50" onClick={toggleMenu}>
            <div className="space-y-1.5 cursor-pointer">
              <motion.span animate={{ rotate: isOpen ? 45 : 0, y: isOpen ? 6 : 0 }} className="block w-6 h-0.5 bg-white"></motion.span>
              <motion.span animate={{ opacity: isOpen ? 0 : 1 }} className="block w-6 h-0.5 bg-white"></motion.span>
              <motion.span animate={{ rotate: isOpen ? -45 : 0, y: isOpen ? -6 : 0 }} className="block w-6 h-0.5 bg-white"></motion.span>
            </div>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="md:hidden fixed inset-0 bg-black bg-opacity-90 backdrop-blur-lg z-40 pt-24">
            <motion.nav variants={menuVariants} initial="hidden" animate="visible" className="flex flex-col items-center gap-8">
              {navLinks.map((link) => (
                <motion.a key={link.title} href={link.href} variants={linkVariants} onClick={toggleMenu} className="text-footer-gray hover:text-off-white transition-colors text-lg">
                  {link.title}
                </motion.a>
              ))}
              <motion.a href="#" variants={linkVariants} className="bg-off-white text-black font-medium py-3 px-6 rounded-xl text-lg mt-4">
                Book a Call
              </motion.a>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;