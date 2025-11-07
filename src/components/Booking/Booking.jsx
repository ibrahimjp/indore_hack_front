import React from 'react';
import './Booking.css';
function Booking() {
  // Handles the "Back" button click to navigate to the previous page
  const handleBackClick = () => {
    window.history.back();
  };

  // Handles the "Pay & Book" button click to navigate to the confirmation page
  const handlePayAndBookClick = () => {
    window.location.href = 'confirmed.html';
  };

  return (
    <>
     
      
      <div className="container2">
        {/* Doctor Info */}
        <div className="section doctor-info">
          <img src="https://placehold.co/60x60/1a1a1a/245f37?text=Doc" alt="Doctor" className="doctor-img" />
          <div>
            <h2>Dr. Sarah Johnson</h2>
            <p>Cardiology</p>
            <p>⭐ 4.9 (234 reviews)</p>
          </div>
        </div>

        {/* Booking Summary Card */}
        <div className="card2">
          <h3 className="section-title">Booking Summary</h3>
          
          <div className="summary"><span>Doctor</span> <strong>Dr. Sarah Johnson</strong></div>
          <div className="summary"><span>Consultation Type</span> <strong>Video Call</strong></div>
          <div className="summary"><span>Date & Time</span> <strong>Tomorrow at 11:30 AM</strong></div>
          <div className="summary"><span>Patient</span> <strong>John Doe</strong></div>

          <div className="total">$50</div>

          <div>Payment Method</div><br />
          <div className="payment-method">
            <strong>Credit Card</strong>
            <p>Secure payment processing</p>
          </div>

          <div className="secure-box">
            ✅ Secure & Confidential — Your information is protected with end-to-end encryption.
          </div>

          <div className="buttons">
            <button type="button" onClick={handleBackClick} className="btn btn-back">Back</button>
            <button className="btn" onClick={handlePayAndBookClick}>Pay & Book</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Booking;
