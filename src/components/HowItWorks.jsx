// File: src/components/HowItWorks.jsx

import React from 'react';

const steps = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 13V12M12 11V7M19.5 16.5L21 12L19.5 7.5L16.5 4.5L12 3L7.5 4.5L4.5 7.5L3 12L4.5 16.5L7.5 19.5L12 21L16.5 19.5L19.5 16.5Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: "Share Your Workflow",
    description: "From lead gen to client onboarding, just share your workflow and the tools you use.",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M16.8286 9.17148L15.4144 7.75727L8.34334 14.8283L9.75755 16.2425" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: "We Build the System",
    description: "We design and set up custom automations that connect your tools with AI—so work happens while you sleep.",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M15 15L21 21M3 21L21 3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M9.0001 21H3.0001V15M15.0001 3H21.0001V9" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: "Launch and Take Control",
    description: "You get a plug-and-play dashboard with a walkthrough to manage everything easily.",
  },
];

const StepCard = ({ icon, title, description, index }) => (
  <li className="flex-1 p-6 bg-dark-bg border-t-2 border-light-black rounded-2xl flex flex-col gap-6">
    <div className="flex items-center gap-4">
      <div className="w-14 h-14 bg-light-black rounded-full flex items-center justify-center">
        {icon}
      </div>
      <span className="text-5xl font-geist font-medium text-footer-gray">0{index + 1}</span>
    </div>
    <h3 className="text-2xl font-medium text-off-white">{title}</h3>
    <p className="text-footer-gray">{description}</p>
  </li>
);

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-20 px-6">
      <div className="max-w-6xl mx-auto flex flex-col items-center text-center gap-12">
        <div className="flex flex-col gap-4">
          <p className="text-primary-green uppercase tracking-[0.2em] font-medium">Process</p>
          <h2 className="text-4xl md:text-6xl font-medium text-balance">How it works</h2>
        </div>
        <ol className="flex flex-col md:flex-row gap-8 list-none">
          {steps.map((step, index) => (
            <StepCard key={index} {...step} index={index} />
          ))}
        </ol>
      </div>
    </section>
  );
};

export default HowItWorks;