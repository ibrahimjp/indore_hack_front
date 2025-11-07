import React from 'react';
import './Availability.css'; // Import the new CSS file
import { doctorImage } from '../../assets'; // Import the image

const AvailabilityPage = () => {
  return (
    <>
      {/* Doctor Profile Card */}
      <div className="profile-card">
        <div className="doctor-header">
          <img src={doctorImage} alt="Doctor Profile" />
          <div className="doctor-info">
            <h2>Dr. Sarah Johnson</h2>
            <p><i className="fa-solid fa-heart-pulse"></i> Cardiology</p>
            <p><i className="fa-solid fa-briefcase"></i> 15 years experience</p>
            <p><i className="fa-solid fa-location-dot"></i> New York, NY</p>
            <p><i className="fa-solid fa-clock"></i> 2:30 PM Today</p>
            <div className="tags">
              <span>English</span>
              <span>Spanish</span>
            </div>
            <div className="action-buttons">
              <button><i className="fa-solid fa-calendar-check"></i> Book Consultation</button>
              <button><i className="fa-solid fa-comments"></i> Quick Chat</button>
              <button><i className="fa-regular fa-heart"></i> Save</button>
            </div>
          </div>
        </div>
      </div>

      {/* Doctor Details Card */}
      <div className="details-card">
        <div className="tabs">
          <a href="#"><i className="fa-solid fa-user"></i> Overview</a>
          <a href="#" className="active"><i className="fa-solid fa-calendar-days"></i> Availability</a>
          <a href="#"><i className="fa-solid fa-newspaper"></i> Articles</a>
          <a href="#"><i className="fa-solid fa-star"></i> Reviews</a>
        </div>
        <div className="container">
          <h2>Available Time Slots</h2>
          <div className="card-grid">
            <div className="card">
              <div className="time">9:00 AM</div>
              <div className="type">Video Call</div>
              <div className="price">$50</div>
            </div>
            <div className="card">
              <div className="time">11:30 AM</div>
              <div className="type">In-Person</div>
              <div className="price">$50</div>
            </div>
            <div className="card">
              <div className="time">2:00 PM</div>
              <div className="type">Phone Call</div>
              <div className="price">$50</div>
            </div>
            <div className="card">
              <div className="time">4:00 PM</div>
              <div className="type">Video Call</div>
              <div className="price">$50</div>
            </div>
            <div className="card">
              <div className="time">6:00 PM</div>
              <div className="type">In-Person</div>
              <div className="price">$50</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AvailabilityPage;