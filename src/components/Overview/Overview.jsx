import React, { useState } from 'react';
import './Overview.css';
function Overview() {
  // State to manage the active tab for the details section
  const [activeTab, setActiveTab] = useState('overview');

  // Handle tab clicks to change the active state
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <>

      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css" />

      <div className="profile-card">
        <div className="doctor-header">
          {/* Using a placeholder image for the doctor */}
          <img src="https://placehold.co/100x100/245f37/ffffff?text=Doc" alt="Doctor Profile" />
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

      <div className="details-card">
        <div className="tabs">
          <button className={activeTab === 'overview' ? 'active' : ''} onClick={() => handleTabClick('overview')}>
            <i className="fa-solid fa-user"></i> Overview
          </button>
          <button className={activeTab === 'availability' ? 'active' : ''} onClick={() => handleTabClick('availability')}>
            <i className="fa-solid fa-calendar-days"></i> Availability
          </button>
          <button className={activeTab === 'articles' ? 'active' : ''} onClick={() => handleTabClick('articles')}>
            <i className="fa-solid fa-calendar-days"></i> Articles
          </button>
          <button className={activeTab === 'reviews' ? 'active' : ''} onClick={() => handleTabClick('reviews')}>
            <i className="fa-solid fa-calendar-days"></i> Reviews
          </button>
        </div>

        {activeTab === 'overview' && (
          <>
            <div className="section">
              <h3>About Dr. Sarah</h3>
              <p>Dr. Sarah Johnson is a board-certified cardiologist with over 15 years of experience in treating cardiovascular diseases. She specializes in preventive cardiology and has helped thousands of patients maintain healthy hearts through personalized treatment plans.</p>
            </div>

            <div className="section">
              <h3>Specializations</h3>
              <div className="specializations">
                <div className="spec-item"><i className="fa-solid fa-stethoscope"></i> Heart Surgery</div>
                <div className="spec-item"><i className="fa-solid fa-heart-circle-check"></i> Cardiac Care</div>
                <div className="spec-item"><i className="fa-solid fa-heart"></i> Preventive Cardiology</div>
                <div className="spec-item"><i className="fa-solid fa-syringe"></i> Interventional Cardiology</div>
              </div>
            </div>

            <div className="section">
              <h3>Certifications</h3>
              <div className="certifications">
                <div className="cert-item"><i className="fa-solid fa-certificate"></i> Board Certified Cardiologist</div>
                <div className="cert-item"><i className="fa-solid fa-certificate"></i> American Heart Association</div>
                <div className="cert-item"><i className="fa-solid fa-certificate"></i> American College of Cardiology</div>
              </div>
            </div>
          </>
        )}
        {activeTab === 'availability' && (
            <div className="section">
              <h3>Availability</h3>
              <p>Availability details go here.</p>
            </div>
        )}
        {activeTab === 'articles' && (
          <div className="section">
            <h3>Articles</h3>
            <p>List of Dr. Sarah's articles will be displayed here.</p>
          </div>
        )}
        {activeTab === 'reviews' && (
          <div className="section">
            <h3>Reviews</h3>
            <p>Patient reviews will be displayed here.</p>
          </div>
        )}
      </div>
    </>
  );
}

export default Overview;
