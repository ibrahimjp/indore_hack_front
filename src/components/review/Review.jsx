import React from 'react';
import './review.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeartPulse, faBriefcase, faLocationDot, faClock, faCalendarCheck, faComments, faHeart, faUser, faCalendarDays } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons';

const Review = () => {
  return (
    <>
      <div className="profile-card">
        <div className="doctor-header">
          <img src="https://placehold.co/100x100/245F37/FFFFFF?text=Dr" alt="Doctor Profile" />
          <div className="doctor-info">
            <h2>Dr. Sarah Johnson</h2>
            <p><FontAwesomeIcon icon={faHeartPulse} /> Cardiology</p>
            <p><FontAwesomeIcon icon={faBriefcase} /> 15 years experience</p>
            <p><FontAwesomeIcon icon={faLocationDot} /> New York, NY</p>
            <p><FontAwesomeIcon icon={faClock} /> 2:30 PM Today</p>
            <div className="tags">
              <span>English</span>
              <span>Spanish</span>
            </div>
            <div className="action-buttons">
              <button><FontAwesomeIcon icon={faCalendarCheck} /> Book Consultation</button>
              <button><FontAwesomeIcon icon={faComments} /> Quick Chat</button>
              <button><FontAwesomeIcon icon={faHeartRegular} /> Save</button>
            </div>
          </div>
        </div>
      </div>

      <div className="details-card">
        <div className="tabs">
          <a href="overview.html"><FontAwesomeIcon icon={faUser} /> Overview</a>
          <a href="availability.html"><FontAwesomeIcon icon={faCalendarDays} /> Availability</a>
          <a href="articles.html"><FontAwesomeIcon icon={faCalendarDays} /> Articles</a>
          <a href="#" className="active"><FontAwesomeIcon icon={faCalendarDays} /> Reviews</a>
        </div>
        <br />
        <div className="reviews-container">
          <div className="reviews-header">Patient Reviews</div>
          <div className="rating-summary">
            <span role="img" aria-label="star emoji">⭐</span> <span>4.9 (234 reviews)</span>
          </div>

          <div className="review-card">
            <div className="review-header">
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div className="avatar">J</div>
                <div className="review-name">John D. <span className="stars">★★★★★</span></div>
              </div>
              <div className="time">3 days ago</div>
            </div>
            <div className="review-text">Dr. Johnson is exceptional. She took time to explain everything and made me feel comfortable.</div>
            <div className="helpful">Helpful</div>
          </div>

          <div className="review-card">
            <div className="review-header">
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <div className="avatar">M</div>
                  <div className="review-name">Maria S. <span className="stars">★★★★★</span></div>
                </div>
                <div className="time">1 week ago</div>
            </div>
            <div className="review-text">Very knowledgeable and caring. Helped me understand my condition better.</div>
            <div className="helpful">Helpful</div>
          </div>

          <div className="review-card">
            <div className="review-header">
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div className="avatar">R</div>
                <div className="review-name">Robert K. <span className="stars">★★★★★</span></div>
              </div>
              <div className="time">2 weeks ago</div>
            </div>
            <div className="review-text">Professional and thorough. Would definitely recommend to others.</div>
            <div className="helpful">Helpful</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Review;
