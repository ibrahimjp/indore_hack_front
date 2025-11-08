// File: src/components/Footer.jsx

import React from 'react';
import { logo } from '../assets';

const Footer = () => {
  return (
    <footer className="py-20 px-6 border-t border-light-black">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between gap-12">
        <div className="max-w-sm">
          <img src={logo} alt="SympAI Logo" className="h-10 w-10 mb-4" />
          <p className="text-footer-gray">
            🧠 SympAI – Where Artificial Intelligence Becomes Real Care. An AI-powered system that talks like a human, learns like a doctor, and thinks like a scientist.
          </p>
        </div>
        
        <div className="flex flex-wrap gap-12">
          <div>
            <h4 className="font-medium text-off-white mb-4">Company</h4>
            <ul className="space-y-3">
              <li><a href="#how-it-works" className="text-footer-gray hover:text-white">How It Works</a></li>
              <li><a href="#services" className="text-footer-gray hover:text-white">Features</a></li>
              <li><a href="/Doctor" className="text-footer-gray hover:text-white">Find Doctor</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-off-white mb-4">Mission</h4>
            <ul className="space-y-3">
              <li className="text-footer-gray">Predict. Prevent. Protect.</li>
              <li className="text-footer-gray">From Reactive to Preventive Healthcare</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="max-w-6xl mx-auto mt-12 pt-8 border-t border-light-black text-center md:text-left">
        <p className="text-footer-gray text-sm">© 2024 SympAI. All Rights Reserved. Built with ❤️ by Team SympAI</p>
      </div>
    </footer>
  );
};

export default Footer;