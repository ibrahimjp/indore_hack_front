import React from 'react';
import './Confirmed.css';
function Confirmed() {
  // Handles the "Book Another Consultation" button click
  const handleBookAnotherClick = () => {
    // Navigates back to the main booking page
    window.location.href = 'index.html';
  };

  return (
    <>
      {/* The `font-awesome` icon library is loaded for the checkmark and other icons */}
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css" />

      <div className="container confirm">
        {/* Doctor Info */}
        <div className="section">
          {/* Using a placeholder image since the original path 'doctor1.jpg' is not accessible */}
          <img src="https://placehold.co/60x60/1a1a1a/245f37?text=Doc" alt="Doctor" className="doctor-img" />
          <h2>Dr. Sarah Johnson</h2>
          <p>Cardiology</p>
          <p>⭐ 4.9 (234 reviews)</p>
        </div>

        {/* Confirmation Box */}
        <div className="section">
          <div className="icon"><i className="fas fa-check-circle"></i></div>
          <h2 id="item">Booking Confirmed!</h2>
          <p>Your consultation with <b>Dr. Sarah Johnson</b> has been scheduled for <b>Saturday, Jan 18 at 11:00 AM</b>.</p>
          
          <div className="next-steps">
            <h3><i className="fas fa-calendar-check"></i> What's Next?</h3>
            <ul>
              <li><i className="fas fa-envelope"></i> You’ll receive a confirmation email with meeting details</li>
              <li><i className="fas fa-video"></i> Join the consultation 5 minutes before your scheduled time</li>
              <li><i className="fas fa-notes-medical"></i> Prepare any questions or symptoms you’d like to discuss</li>
            </ul>
          </div>

          <button className="btn" onClick={handleBookAnotherClick}>
            <i className="fas fa-calendar-plus"></i> Book Another Consultation
          </button>
        </div>
      </div>
    </>
  );
}

export default Confirmed;
