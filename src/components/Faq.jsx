// File: src/components/Faq.jsx

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const faqData = [
  {
    question: "What is SympAI and how does it work?",
    answer: "SympAI is an AI-powered health companion that listens to your symptoms in any Indian language, analyzes them using advanced NLP and RAG technology, and provides instant guidance. It classifies symptoms as serious (suggests hospitals/doctor consults) or normal (generates case report + OTC suggestions)."
  },
  {
    question: "Is SympAI accurate and safe to use?",
    answer: "SympAI uses RAG (Retrieval-Augmented Generation) to fetch information from verified medical literature, not random internet data. Our system has 85% accuracy in verified tests. However, SympAI is a guidance tool and should not replace professional medical advice for serious conditions."
  },
  {
    question: "Which languages does SympAI support?",
    answer: "SympAI supports 10+ Indian languages, making healthcare accessible to rural populations. You can speak your symptoms in your native language, and SympAI will understand and respond accordingly."
  },
  {
    question: "How does SympAI help prevent disease outbreaks?",
    answer: "SympAI's Analytical Dashboard aggregates anonymized symptom data region-wise, identifies emerging disease patterns, and helps health authorities predict outbreaks before they spread. This enables early response and better disease control."
  },
  {
    question: "Can doctors use SympAI?",
    answer: "Yes! SympAI has a dedicated Doctor Portal where doctors can view patient summaries and medical history. The AI-generated case reports help reduce consult time by 50%, allowing doctors to focus on critical cases."
  }
];

const AccordionItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-light-black py-6">
      <button onClick={() => setIsOpen(!isOpen)} className="w-full flex justify-between items-center text-left">
        <h3 className="text-xl font-medium text-off-white">{question}</h3>
        <motion.div animate={{ rotate: isOpen ? 45 : 0 }}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 0V16M0 8H16" stroke="#A5A5A5" strokeWidth="2"/>
          </svg>
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0, marginTop: 0 }}
            animate={{ height: 'auto', opacity: 1, marginTop: '16px' }}
            exit={{ height: 0, opacity: 0, marginTop: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="text-footer-gray leading-relaxed">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Faq = () => {
  return (
    <section className="py-20 px-6">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-4xl md:text-6xl font-medium text-center mb-12">Frequently Asked Questions</h2>
        <div>
          {faqData.map((item, index) => (
            <AccordionItem key={index} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Faq;