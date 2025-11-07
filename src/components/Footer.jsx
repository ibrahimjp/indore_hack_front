// File: src/components/Footer.jsx

import React from 'react';
import { logo } from '../assets';

const Footer = () => {
  return (
    <footer className="py-20 px-6 border-t border-light-black">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between gap-12">
        <div className="max-w-sm">
          <img src={logo} alt="Helium AI Agency Logo" className="h-10 w-10 mb-4" />
          <p className="text-footer-gray">
            Helium AI Automation Agency helps businesses streamline operations and boost efficiency with custom-built AI workflows.
          </p>
        </div>
        
        <div className="flex flex-wrap gap-12">
          <div>
            <h4 className="font-medium text-off-white mb-4">Company</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-footer-gray hover:text-white">About Us</a></li>
              <li><a href="#" className="text-footer-gray hover:text-white">Services</a></li>
              <li><a href="#" className="text-footer-gray hover:text-white">Case Studies</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-off-white mb-4">Contact</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-footer-gray hover:text-white">hello@helium.co</a></li>
              <li><a href="#" className="text-footer-gray hover:text-white">Book a Call</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="max-w-6xl mx-auto mt-12 pt-8 border-t border-light-black text-center md:text-left">
        <p className="text-footer-gray text-sm">© 2024 Helium. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;