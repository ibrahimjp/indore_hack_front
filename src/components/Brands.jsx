// File: src/components/Brands.jsx

import React from 'react';
import Marquee from 'react-fast-marquee';
import { logoTribe, logoNotion, logoLoom } from '../assets';

const logos = [logoTribe, logoNotion, logoLoom, logoTribe, logoNotion, logoLoom]; // Repeating for a seamless loop

const Brands = () => {
  return (
    <section id="brands" className="py-20 px-6">
      <div className="max-w-4xl mx-auto flex flex-col items-center gap-8">
        <p className="text-footer-gray font-medium text-center text-balance">
          Trusted by 150+ startups & teams
        </p>
        <div className="w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_12.5%,white_87.5%,transparent)]">
          <Marquee gradient={false} speed={40}>
            <div className="flex items-center gap-16">
              {logos.map((logo, index) => (
                <img 
                  key={index} 
                  src={logo} 
                  alt={`Client logo ${index + 1}`} 
                  className="h-8 object-contain opacity-70"
                />
              ))}
            </div>
          </Marquee>
        </div>
      </div>
    </section>
  );
};

export default Brands;