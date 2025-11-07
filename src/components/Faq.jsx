// File: src/components/Faq.jsx

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const faqData = [
  {
    question: "What kind of businesses do you work with?",
    answer: "We work with a wide range of businesses, from startups to established companies, across various industries. If you have repetitive workflows and a desire to improve efficiency, we can likely help."
  },
  {
    question: "How long does it take to build an automation?",
    answer: "The timeline depends on the complexity of the workflow. Simple automations can be built in as little as a week, while more complex, multi-platform integrations may take a few weeks. We provide a detailed timeline after our initial discovery call."
  },
  {
    question: "What tools do you integrate with?",
    answer: "We can integrate with hundreds of popular tools, including CRMs like Salesforce and HubSpot, communication platforms like Slack and Email, project management tools like Asana and Trello, and many more through APIs."
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