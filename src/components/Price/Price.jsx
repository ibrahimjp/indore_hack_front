import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Price.css';

const Price = {
  monthly: {
    basic: { price: '$0', sub: 'PER MONTH, BILLED MONTHLY' },
    plus: { price: '$29', sub: 'PER MONTH, BILLED MONTHLY' },
    premium: { price: '$59', sub: 'PER MONTH, BILLED MONTHLY' },
  },
  yearly: {
    basic: { price: '$0', sub: 'PER YEAR, BILLED YEARLY' },
    plus: { price: '$290', sub: 'PER YEAR, BILLED YEARLY' },
    premium: { price: '$590', sub: 'PER YEAR, BILLED YEARLY' },
  },
};

const faqItemsData = [
  {
    question: 'How do I cancel my subscription?',
    answer: "You can cancel anytime from your account settings. After cancellation, you'll still have access until the end of your current billing period.",
  },
  {
    question: 'Is my medical data secure with MediConnect?',
    answer: "Absolutely. We use bank-level encryption and comply with all healthcare privacy regulations (HIPAA, GDPR) to ensure your data remains completely secure and private.",
  },
  {
    question: 'How quickly can I get a doctor consultation?',
    answer: 'With our PLUS and Premium plans, you can typically connect with a healthcare professional within minutes. Basic users may experience longer wait times during peak hours.',
  },
  {
    question: 'Can I upgrade or downgrade my plan?',
    answer: "Yes, you can change your plan at any time. When upgrading, you'll get immediate access to new features. Downgrades will take effect at your next billing cycle.",
  },
  {
    question: 'Do you offer family plans?',
    answer: 'Our Premium plan includes coverage for up to 4 family members. You can add family members through your account dashboard after subscription.',
  },
];

const App = () => {
  const navigate = useNavigate();
  const [isYearly, setIsYearly] = useState(false);
  const [activeFaqIndex, setActiveFaqIndex] = useState(null);
  const [formData, setFormData] = useState({ fullName: '', email: '', message: '' });

  // Corrected line: 'pricingData' changed to 'Price'
  const currentPrices = isYearly ? Price.yearly : Price.monthly;

  const redirectToPayment = (plan) => {
    navigate(`/Payment?plan=${encodeURIComponent(plan)}&yearly=${isYearly}`);
  };

  const handleFaqClick = (index) => {
    setActiveFaqIndex(activeFaqIndex === index ? null : index);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (!formData.fullName || !formData.email || !formData.message) {
      alert('Please fill in all required fields');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      alert('Please enter a valid email address');
      return;
    }

    alert('Thank you for your message! We will get back to you soon.');
    setFormData({ fullName: '', email: '', message: '' });
  };

  useEffect(() => {
    const createParticles = () => {
      const particlesContainer = document.getElementById('particles');
      if (!particlesContainer) return;
      const particleCount = 20;
      for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        const size = Math.random() * 5 + 2;
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        const delay = Math.random() * 10;
        const duration = Math.random() * 10 + 10;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${posX}%`;
        particle.style.top = `${posY}%`;
        particle.style.animation = `
          floatUp ${duration}s linear ${delay}s infinite,
          fadeInOut ${duration / 2}s ease-in-out ${delay}s infinite alternate
        `;
        particlesContainer.appendChild(particle);
      }
    };
    createParticles();
  }, []);

  return (
    <>
      <div className="mesh-bg" aria-hidden="true">
        <div className="blob b1"></div>
        <div className="blob b2"></div>
        <div className="blob b3"></div>
        <div className="blob b4"></div>
        <div className="blob b5"></div>
        <div className="blob b6"></div>
      </div>
      <div className="floating-circle circle-1" aria-hidden="true"></div>
      <div className="floating-circle circle-2" aria-hidden="true"></div>
      <div className="floating-circle circle-3" aria-hidden="true"></div>
      <div className="container">
        {/* Pricing Header */}
        <div className="pricing-header">
          <h5>PRICINGS</h5>
          <h2>PLUS?</h2>
          <div className="toggle-container">
            <div className="toggle">
              <button className={!isYearly ? 'active' : ''} onClick={() => setIsYearly(false)}>
                Monthly
              </button>
              <button className={isYearly ? 'active' : ''} onClick={() => setIsYearly(true)}>
                Yearly
              </button>
            </div>
          </div>
        </div>
        <section className="pricing-section">
          {/* Basic Card */}
          <div className="pricing-card">
            <div className="bubble"></div>
            <h3>BASIC</h3>
            <p>Essential healthcare access.</p>
            <div className="price">{currentPrices.basic.price}</div>
            <div className="price-sub">{currentPrices.basic.sub}</div>
            <button className="btn btn-dark" onClick={() => redirectToPayment('basic')}>
              Get Started
            </button>
            <ul className="features">
              <li>Browse doctor profiles</li>
              <li>Read reviews and ratings</li>
              <li>Basic AI assistant (3 queries/day)</li>
              <li>Medicine price comparison</li>
              <li>Community health articles</li>
            </ul>
          </div>
          {/* MediConnect Plus Card */}
          <div className="pricing-card">
            <span className="badge">Most Popular</span>
            <div className="bubble bubble-2"></div>
            <h3>MediConnect PLUS</h3>
            <p>Premium healthcare experience</p>
            <div className="price">{currentPrices.plus.price}</div>
            <div className="price-sub">{currentPrices.plus.sub}</div>
            <button className="btn btn-light" onClick={() => redirectToPayment('plus')}>
              Get Started
            </button>
            <ul className="features">
              <li>All basic features</li>
              <li>Unlimited AI assistant access</li>
              <li>Priority booking (jump the queue)</li>
              <li>Instant chat with doctors</li>
              <li>24/7 phone support hotline</li>
              <li>Free medicine delivery</li>
              <li>Health tracking dashboard</li>
              <li>Exclusive webinars & content</li>
              <li>Monthly health check reminders</li>
              <li>30% discount on consultations</li>
            </ul>
          </div>
          {/* Premium Care Card */}
          <div className="pricing-card">
            <div className="bubble bubble-3"></div>
            <h3>Premium Care</h3>
            <p>Complete healthcare solution.</p>
            <div className="price">{currentPrices.premium.price}</div>
            <div className="price-sub">{currentPrices.premium.sub}</div>
            <button className="btn btn-dark" onClick={() => redirectToPayment('premium')}>
              Get Started
            </button>
            <ul className="features">
              <li>All PLUS features</li>
              <li>Dedicated personal health advisor</li>
              <li>Unlimited free consultations</li>
              <li>Home visit arrangements</li>
              <li>Specialist referrals included</li>
              <li>Advanced health analytics</li>
              <li>Family plan (up to 4 members)</li>
              <li>Emergency consultation access</li>
              <li>Prescription management</li>
              <li>Annual health checkup package</li>
            </ul>
          </div>
        </section>
        {/* Feature Boxes */}
        <section className="features-section">
          <div className="feature-box">
            <div className="icon-container pulse-icon">
              <div className="icon-bg"></div>
              <div className="icon">
                <i className="fas fa-headset"></i>
              </div>
            </div>
            <h3>Premium Support</h3>
            <p>24/7 medical support and emergency consultation access</p>
          </div>
          <div className="feature-box">
            <div className="icon-container rotating-icon">
              <div className="icon-bg"></div>
              <div className="icon">
                <i className="fas fa-heartbeat"></i>
              </div>
            </div>
            <h3>Health Tracking</h3>
            <p>Advanced analytics and personalized health insights</p>
          </div>
          <div className="feature-box">
            <div className="icon-container particle-icon">
              <div className="icon-bg"></div>
              <div className="icon">
                <i className="fas fa-robot"></i>
              </div>
              <div className="particle particle-1"></div>
              <div className="particle particle-2"></div>
              <div className="particle particle-3"></div>
            </div>
            <h3>Unlimited AI</h3>
            <p>Chat with our medical AI assistant without limits</p>
          </div>
        </section>
        {/* FAQ Section */}
        <section className="faq-section">
          <div className="faq-container">
            <div className="faq-left">
              <div className="subtitle">ANSWERS</div>
              <div className="title">FAQs</div>
            </div>
            <div className="faq-right">
              {faqItemsData.map((item, index) => (
                <React.Fragment key={index}>
                  <div className={`faq-item ${activeFaqIndex === index ? 'active' : ''}`} onClick={() => handleFaqClick(index)}>
                    <h3>{item.question}</h3>
                    <div className="plus">+</div>
                  </div>
                  <div className="faq-answer" style={{ maxHeight: activeFaqIndex === index ? '200px' : '0' }}>
                    <p>{item.answer}</p>
                  </div>
                </React.Fragment>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default App;