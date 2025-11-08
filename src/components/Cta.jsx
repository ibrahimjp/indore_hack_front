// File: src/components/Cta.jsx

import React from 'react';

const Cta = () => {
  return (
    <section className="py-20 px-6">
      <div className="max-w-4xl mx-auto bg-dark-bg border border-light-black rounded-2xl p-10 md:p-20 text-center flex flex-col items-center">
        <h2 className="text-3xl md:text-5xl font-medium text-balance mb-4">Ready to Experience AI-Powered Healthcare?</h2>
        <p className="text-footer-gray max-w-lg mb-8 text-balance">
          Get instant health guidance in your native language, 24/7 accessible care, and help build a healthier future. Join thousands who are already using SympAI to stay healthy.
        </p>
        <a href="/Doctor" className="bg-primary-green hover:bg-green-500 transition-colors text-black font-bold py-4 px-8 rounded-xl">
          Find a Doctor Now
        </a>
      </div>
    </section>
  );
};

export default Cta;