// File: src/components/Hero.jsx

import React from 'react';
import { motion } from 'framer-motion';
import { greenBall, testimonialAvatar } from '../assets';


const GreenBall = ({ className }) => (
  <motion.div 
    className={`absolute z-0 bg-gradient-to-br from-green-400 to-green-600 rounded-full ${className}`}
    initial={{ opacity: 0.6, y: 0 }}
    animate={{ opacity: 0.6, y: [-20, 2, -20] }}
    transition={{ duration: 3, repeat: Infinity }}
  >
    <img 
      src={greenBall} 
      alt="Green gradient sphere" 
      className="w-full h-full object-contain opacity-80"
      onError={(e) => {
        console.log('Image failed to load:', greenBall);
        e.target.style.display = 'none';
      }}
    />
  </motion.div>
);

const  Hero = () => {
  const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.3 } } };
  const itemVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } } };
  const textVariants = {
    hidden: { opacity: 0, y: 10, filter: "blur(8px)" },
    visible: (i) => ({ opacity: 1, y: 0, filter: "blur(0px)", transition: { delay: i * 0.1 + 0.5, duration: 0.5 } }),
  };
  const heroWords = ["Automate,", "Optimize,", "Scale", "With", "AI"];

  return (
    <section className="relative min-h-screen w-full flex items-center justify-start pt-32 md:pt-40 pb-20 px-6">
      <GreenBall className="top-[-30%] left-[70%] w-[300px] h-[300px] md:w-[600px] md:h-[600px]" />
      <GreenBall className="top-[140%] left-[-30%] w-[300px] h-[300px] md:w-[600px] md:h-[600px] blur-lg" />
      <motion.div className="max-w-4xl w-full flex flex-col items-start text-left gap-12 pl-[144px] pr-10 py-10" variants={containerVariants} initial="hidden" animate="visible">
        <motion.figure className="flex flex-col items-start gap-4" variants={itemVariants}>
          <p className="text-xl md:text-2xl italic font-medium text-balance">“Data dashboards now run themselves. We just watch.”</p>
          <figcaption className="flex items-center gap-3 bg-dark-bg/80 border border-light-black px-4 py-2 rounded-full">
            <img src={testimonialAvatar} alt="Jamal Ortiz" className="w-7 h-7 rounded-full" />
            <div className="text-left text-sm">
              <span className="text-off-white font-medium">Jamal Ortiz</span>
              <span className="text-light-gray block">Co-founder, Taskflux</span>
            </div>
          </figcaption>
        </motion.figure>

        <motion.h1 className="text-5xl md:text-7xl lg:text-8xl font-medium tracking-tighter text-balance" variants={itemVariants}>
           {heroWords.map((word, i) => (
             <motion.span key={word} custom={i} variants={textVariants} className="inline-block mr-3 md:mr-5">{word}</motion.span>
           ))}
        </motion.h1>

        <motion.p className="max-w-2xl text-medium-gray text-base md:text-lg text-balance" variants={itemVariants}>
          Boost efficiency and eliminate repetitive tasks with AI-powered automation solutions tailored to your business needs.
        </motion.p>
        
        <motion.div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto" variants={itemVariants}>
          <a href="#" className="bg-dark-green hover:bg-primary-green transition-colors text-white font-medium py-4 px-8 rounded-2xl w-full sm:w-auto">Book a Call</a>
          <a href="#services" className="bg-light-black hover:bg-gray-800 transition-colors border border-gray-700 text-white font-medium py-4 px-8 rounded-2xl w-full sm:w-auto">Our Services</a>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;