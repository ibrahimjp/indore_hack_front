// File: src/components/Cta.jsx

import React from 'react';

const Cta = () => {
  return (
    <section className="py-20 px-6">
      <div className="max-w-4xl mx-auto bg-dark-bg border border-light-black rounded-2xl p-10 md:p-20 text-center flex flex-col items-center">
        <h2 className="text-3xl md:text-5xl font-medium text-balance mb-4">Ready to transform your business?</h2>
        <p className="text-footer-gray max-w-lg mb-8 text-balance">
          Schedule a free consultation to see how our AI automation solutions can help you save time, reduce costs, and scale your operations.
        </p>
        <a href="#" className="bg-primary-green hover:bg-green-500 transition-colors text-black font-bold py-4 px-8 rounded-xl">
          Book Your Free Call
        </a>
      </div>
    </section>
  );
};

export default Cta;