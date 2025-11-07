import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import './Payment.css'; // Assuming you save the CSS in a separate file

const Payment = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const selectedPlan = searchParams.get('plan') || 'plus';
  const isYearly = searchParams.get('yearly') === 'true';
  const [showSuccess, setShowSuccess] = useState(false);

  // Pricing data
  const pricingData = {
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

  const currentPricing = isYearly ? pricingData.yearly : pricingData.monthly;

  const showSuccessMessage = () => {
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
    }, 3500);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    showSuccessMessage();
  };

  useEffect(() => {
    const cardInputs = document.querySelectorAll('input[type="text"][placeholder*="Card Number"]');
    cardInputs.forEach(input => {
      const handleInput = () => {
        let value = input.value.replace(/\D/g, '');
        if (value.length > 16) value = value.slice(0, 16);
        let formattedValue = '';
        for (let i = 0; i < value.length; i++) {
          if (i > 0 && i % 4 === 0) formattedValue += ' ';
          formattedValue += value[i];
        }
        input.value = formattedValue;
      };
      input.addEventListener('input', handleInput);
      return () => input.removeEventListener('input', handleInput);
    });

    const expiryInputs = document.querySelectorAll('input[placeholder="MM/YY"]');
    expiryInputs.forEach(input => {
      const handleInput = () => {
        let value = input.value.replace(/\D/g, '');
        if (value.length > 4) value = value.slice(0, 4);
        if (value.length >= 2) {
          input.value = value.slice(0, 2) + '/' + value.slice(2);
        } else {
          input.value = value;
        }
      };
      input.addEventListener('input', handleInput);
      return () => input.removeEventListener('input', handleInput);
    });

    const cvcInputs = document.querySelectorAll('input[placeholder="123"]');
    cvcInputs.forEach(input => {
      const handleInput = () => {
        input.value = input.value.replace(/\D/g, '').slice(0, 4);
      };
      input.addEventListener('input', handleInput);
      return () => input.removeEventListener('input', handleInput);
    });
  }, []); // Empty dependency array means this effect runs once after the initial render

  return (
    <div className="container">
      <button onClick={() => navigate('/Price')} className="back-link">
        <i className="fas fa-arrow-left"></i> Back to Plans
      </button>
      
      <div className="payment-header">
        <h1>Complete Your Payment</h1>
        <p>Choose your plan and enter payment details to get started with MediConnect</p>
      </div>
      
      <div className="payment-options">
        {selectedPlan === 'basic' && (
          <div className="payment-card">
            <div className="plan-header">
              <h2>Basic Plan</h2>
              <div className="price">{currentPricing.basic.price}</div>
              <div className="billing">{currentPricing.basic.sub}</div>
            </div>
            
            <div className="plan-features">
              <ul>
                <li>Browse doctor profiles</li>
                <li>Read reviews and ratings</li>
                <li>Basic AI assistant (3 queries/day)</li>
                <li>Medicine price comparison</li>
                <li>Community health articles</li>
              </ul>
            </div>
            
            <form className="payment-form" onSubmit={handleFormSubmit}>
              <div className="form-group">
                <label htmlFor="basic-email">Email Address</label>
                <input type="email" id="basic-email" placeholder="your@email.com" required />
              </div>
              
              <button type="submit" className="pay-btn">Get Started - {currentPricing.basic.price}</button>
            </form>
            
            <div className="secure-note">
              <i className="fas fa-lock"></i>
              <span>Your information is secure and private</span>
            </div>
          </div>
        )}
        
        {selectedPlan === 'plus' && (
          <div className="payment-card">
            <div className="plan-header">
              <h2>MediConnect PLUS</h2>
              <div className="price">{currentPricing.plus.price}</div>
              <div className="billing">{currentPricing.plus.sub}</div>
            </div>
            
            <div className="plan-features">
              <ul>
                <li>All basic features</li>
                <li>Unlimited AI assistant access</li>
                <li>Priority booking (jump the queue)</li>
                <li>Instant chat with doctors</li>
                <li>24/7 phone support hotline</li>
              </ul>
            </div>
            
            <form className="payment-form" onSubmit={handleFormSubmit}>
              <div className="form-group">
                <label htmlFor="plus-card-name">Name on Card</label>
                <input type="text" id="plus-card-name" placeholder="John Smith" required />
              </div>
              
              <div className="form-group">
                <label htmlFor="plus-card-number">Card Number</label>
                <input type="text" id="plus-card-number" placeholder="1234 5678 9012 3456" required />
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="plus-card-expiry">Expiration Date</label>
                  <input type="text" id="plus-card-expiry" placeholder="MM/YY" required />
                </div>
                
                <div className="form-group">
                  <label htmlFor="plus-card-cvc">Security Code</label>
                  <input type="text" id="plus-card-cvc" placeholder="123" required />
                </div>
              </div>
              
              <div className="form-group">
                <label htmlFor="plus-email">Email Address</label>
                <input type="email" id="plus-email" placeholder="your@email.com" required />
              </div>
              
              <button type="submit" className="pay-btn">Pay Now - {currentPricing.plus.price}/{isYearly ? 'year' : 'month'}</button>
            </form>
            
            <div className="payment-methods">
              <div className="payment-icon visa">
                <i className="fab fa-cc-visa"></i>
              </div>
              <div className="payment-icon mastercard">
                <i className="fab fa-cc-mastercard"></i>
              </div>
              <div className="payment-icon amex">
                <i className="fab fa-cc-amex"></i>
              </div>
              <div className="payment-icon discover">
                <i className="fab fa-cc-discover"></i>
              </div>
            </div>
            
            <div className="secure-note">
              <i className="fas fa-lock"></i>
              <span>Your payment information is encrypted and secure</span>
            </div>
          </div>
        )}
        
        {selectedPlan === 'premium' && (
          <div className="payment-card featured">
            <div className="plan-header">
              <h2>Premium Care</h2>
              <div className="price">{currentPricing.premium.price}</div>
              <div className="billing">{currentPricing.premium.sub}</div>
            </div>
            
            <div className="plan-features">
              <ul>
                <li>All PLUS features</li>
                <li>Dedicated personal health advisor</li>
                <li>Unlimited free consultations</li>
                <li>Home visit arrangements</li>
                <li>Family plan (up to 4 members)</li>
              </ul>
            </div>
            
            <form className="payment-form" onSubmit={handleFormSubmit}>
              <div className="form-group">
                <label htmlFor="premium-card-name">Name on Card</label>
                <input type="text" id="premium-card-name" placeholder="John Smith" required />
              </div>
              
              <div className="form-group">
                <label htmlFor="premium-card-number">Card Number</label>
                <input type="text" id="premium-card-number" placeholder="1234 5678 9012 3456" required />
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="premium-card-expiry">Expiration Date</label>
                  <input type="text" id="premium-card-expiry" placeholder="MM/YY" required />
                </div>
                
                <div className="form-group">
                  <label htmlFor="premium-card-cvc">Security Code</label>
                  <input type="text" id="premium-card-cvc" placeholder="123" required />
                </div>
              </div>
              
              <div className="form-group">
                <label htmlFor="premium-email">Email Address</label>
                <input type="email" id="premium-email" placeholder="your@email.com" required />
              </div>
              
              <button type="submit" className="pay-btn">Pay Now - {currentPricing.premium.price}/{isYearly ? 'year' : 'month'}</button>
            </form>
            
            <div className="payment-methods">
              <div className="payment-icon visa">
                <i className="fab fa-cc-visa"></i>
              </div>
              <div className="payment-icon mastercard">
                <i className="fab fa-cc-mastercard"></i>
              </div>
              <div className="payment-icon amex">
                <i className="fab fa-cc-amex"></i>
              </div>
              <div className="payment-icon discover">
                <i className="fab fa-cc-discover"></i>
              </div>
            </div>
            
            <div className="secure-note">
              <i className="fas fa-lock"></i>
              <span>Your payment information is encrypted and secure</span>
            </div>
          </div>
        )}
      </div>

      <div className={`success-message ${showSuccess ? 'show' : ''}`}>
        <i className="fas fa-check-circle"></i>
        <span>Payment successfully! Now you are a premium member. Enjoy!</span>
      </div>
    </div>
  );
};

export default Payment;