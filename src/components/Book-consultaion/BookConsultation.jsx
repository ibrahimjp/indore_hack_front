import { useState, useEffect } from 'react';
import './Bookconsultation.css'
function BookConsultation() {
  // State to track selected options (not in original JS, but a best practice for React)
  const [selectedConsultation, setSelectedConsultation] = useState(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);

  // This handles the "Continue" button click as requested
  const handleContinueClick = () => {
    // The original JS logic to redirect the page
    window.location.href = "form.html";
  };
  
  // Handlers to update state based on user clicks
  const handleConsultationClick = (type) => {
    setSelectedConsultation(type);
  };
  
  const handleTimeSlotClick = (time) => {
    setSelectedTimeSlot(time);
  };

  return (
    <>

      <div className="container">
        
        {/* Doctor Info */}
        <div className="section">
           <img src="https://placehold.co/90x90/1a1a1a/245f37?text=Doc" alt="Doctor" className="doctor-img" />
          <h2>Dr. Sarah Johnson</h2>
          <p>Cardiology</p>
          <p>⭐ 4.9 (234 reviews)</p>
        </div>
    
        {/* Consultation Type */}
        <div className="section">
          <h3>Choose Consultation Type</h3>
          <div className="options consult-options">
            <div 
              className={`option consult-option ${selectedConsultation === 'video' ? 'selected' : ''}`}
              data-type="video"
              onClick={() => handleConsultationClick('video')}
            >
              <h4>💻 Video Call</h4>
              <p>$50 • 30 minutes</p>
            </div>
            <div 
              className={`option consult-option ${selectedConsultation === 'phone' ? 'selected' : ''}`}
              data-type="phone"
              onClick={() => handleConsultationClick('phone')}
            >
              <h4>📞 Phone Call</h4>
              <p>$40 • 30 minutes</p>
            </div>
            <div 
              className={`option consult-option ${selectedConsultation === 'chat' ? 'selected' : ''}`}
              data-type="chat"
              onClick={() => handleConsultationClick('chat')}
            >
              <h4>💬 Text Chat</h4>
              <p>$0 • 24h response</p>
            </div>
          </div>
        </div>
    
        {/* Available Time */}
        <div className="section">
          <h3>Select Available Time</h3>
          <div className="options time-options">
            <div 
              className={`option time-slot ${selectedTimeSlot === 'Today • 2:30 PM' ? 'selected' : ''}`}
              data-time="2:30PM"
              onClick={() => handleTimeSlotClick('Today • 2:30 PM')}
            >Today • 2:30 PM</div>
            <div 
              className={`option time-slot ${selectedTimeSlot === 'Today • 4:00 PM' ? 'selected' : ''}`}
              data-time="4:00PM"
              onClick={() => handleTimeSlotClick('Today • 4:00 PM')}
            >Today • 4:00 PM</div>
            <div 
              className={`option time-slot ${selectedTimeSlot === 'Tomorrow • 9:00 AM' ? 'selected' : ''}`}
              data-time="9:00AM"
              onClick={() => handleTimeSlotClick('Tomorrow • 9:00 AM')}
            >Tomorrow • 9:00 AM</div>
            <div 
              className={`option time-slot ${selectedTimeSlot === 'Tomorrow • 11:30 AM' ? 'selected' : ''}`}
              data-time="11:30AM"
              onClick={() => handleTimeSlotClick('Tomorrow • 11:30 AM')}
            >Tomorrow • 11:30 AM</div>
            <div 
              className={`option time-slot ${selectedTimeSlot === 'Tomorrow • 2:00 PM' ? 'selected' : ''}`}
              data-time="2:00PM"
              onClick={() => handleTimeSlotClick('Tomorrow • 2:00 PM')}
            >Tomorrow • 2:00 PM</div>
            <div 
              className={`option time-slot ${selectedTimeSlot === 'Friday • 10:00 AM' ? 'selected' : ''}`}
              data-time="10:00AM"
              onClick={() => handleTimeSlotClick('Friday • 10:00 AM')}
            >Friday • 10:00 AM</div>
            <div 
              className={`option time-slot ${selectedTimeSlot === 'Friday • 3:30 PM' ? 'selected' : ''}`}
              data-time="3:30PM"
              onClick={() => handleTimeSlotClick('Friday • 3:30 PM')}
            >Friday • 3:30 PM</div>
            <div 
              className={`option time-slot ${selectedTimeSlot === 'Saturday • 11:00 AM' ? 'selected' : ''}`}
              data-time="11:00AM"
              onClick={() => handleTimeSlotClick('Saturday • 11:00 AM')}
            >Saturday • 11:00 AM</div>
          </div>
        </div>
    
        {/* Continue Button */}
        <button 
          id="continueBtn" 
          className="btn"
          onClick={handleContinueClick}
        >
          Continue
        </button>
      </div>
    </>
  );
}

export default BookConsultation;
