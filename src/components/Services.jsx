// File: src/components/Services.jsx

import React from 'react';
import { service1, service2 } from '../assets';

const services = [
  {
    id: 1,
    title: 'Automated Lead Management',
    description: 'We build systems that capture, qualify, and nurture leads automatically, ensuring you never miss an opportunity. From contact forms to your CRM, we streamline the entire process.',
    image: service1
  },
  {
    id: 2,
    title: 'Custom Internal Workflows',
    description: 'Eliminate repetitive tasks and free up your team for more important work. We create tailored AI automations for HR, finance, and operations that work seamlessly with your existing tools.',
    image: service2
  },
  // Add more services here if needed
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
          <p className="text-primary-green uppercase tracking-[0.2em] font-medium">Services</p>
          <h2 className="text-4xl md:text-6xl font-medium text-balance">What We Offer</h2>
        </div>

        <div className="w-full flex flex-col md:flex-row gap-8 md:gap-16 items-start">
          {/* Left Column for Images */}
          <div className="w-full md:w-1/2 md:sticky top-24">
            {/* On desktop, you could map through images and change visibility based on scroll.
                For this version, we'll show the primary ones. */}
            <img src={services[0].image} alt={services[0].title} className="rounded-2xl w-full mb-8" />
            <img src={services[1].image} alt={services[1].title} className="rounded-2xl w-full" />
          </div>

          {/* Right Column for Text */}
          <div className="w-full md:w-1/2 flex flex-col gap-16">
            {services.map((service) => (
              <div key={service.id} className="p-8 bg-dark-bg border border-light-black rounded-2xl">
                <h3 className="text-3xl font-medium mb-4">{service.title}</h3>
                <p className="text-footer-gray leading-relaxed">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;