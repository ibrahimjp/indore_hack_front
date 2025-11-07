// File: src/App.jsx

import React from "react";
import Hero from "./components/Hero";
import Brands from "./components/Brands";
import HowItWorks from "./components/HowItWorks";
import Services from "./components/Services";
import Faq from "./components/Faq";
import Cta from "./components/Cta";

function App() {
  return (
    <div className="bg-black relative overflow-x-hidden">
      <main>
        <Hero />
        <Brands />
        <HowItWorks />
        <Services />
        <Faq />
        <Cta />
      </main>
    </div>
  );
}

export default App;
