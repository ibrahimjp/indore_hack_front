// File: src/components/Services.jsx

import React from 'react';
import { service1, service2 } from '../assets';

const services = [
  {
    id: 1,
    title: '🧠 RAG-based Diagnosis',
    description: 'Fetches information from medical research papers, not random internet data. 85% accurate responses with verified medical literature.',
    image: service1
  },
  {
    id: 2,
    title: '🌐 Multilingual Conversational AI',
    description: 'Supports 10+ Indian languages. Reaches rural populations with instant health guidance in their native language, 24/7 accessible care.',
    image: service2
  },
  {
    id: 3,
    title: '📊 Smart Analytical Dashboard',
    description: 'Aggregates anonymized data to track health trends & predict disease outbreaks. Enables early response and helps authorities detect outbreaks before they spread.',
    image: service1
  },
  {
    id: 4,
    title: '🩺 Doctor Portal',
    description: 'Quick access to summarized patient history. Detailed AI case reports help doctors spend time solving, not noting. Reduces consult time by 50%.',
    image: service2
  },
];

const Services = () => {
  // NOTE: A true sticky scroll animation as seen in the original Framer site
  // requires more complex logic with scroll progress listeners, which can be done
  // with Framer Motion's `useScroll` hook. For simplicity and clarity, this version
  // provides a clean, responsive, and static layout that presents the same information effectively.
  return (
    <section id="services" className="py-20 px-6">
      <div className="max-w-6xl mx-auto flex flex-col items-center gap-12">
        <div className="text-center">
          <p className="text-primary-green uppercase tracking-[0.2em] font-medium">Features</p>
          <h2 className="text-4xl md:text-6xl font-medium text-balance">Core Innovations</h2>
        </div>

        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service) => (
            <div key={service.id} className="p-8 bg-dark-bg border border-light-black rounded-2xl hover:border-primary-green transition-colors">
              <h3 className="text-2xl md:text-3xl font-medium mb-4 text-off-white">{service.title}</h3>
              <p className="text-footer-gray leading-relaxed">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;