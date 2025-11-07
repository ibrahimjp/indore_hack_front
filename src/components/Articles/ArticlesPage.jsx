import React from 'react';
import './Articles.css'; // The CSS file remains the same
import { doctorImage } from '../../assets'; // Import the doctor's image

const ArticlesPage = () => {
  return (
    <>
      {/* Doctor Profile Card */}
      <div className="profile-card">
        <div className="doctor-header">
          <img src={doctorImage} alt="Dr. Sarah Johnson" />
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

      {/* Articles Card */}
      <div className="details-card">
        <div className="tabs">
          <a href="#"><i className="fa-solid fa-user"></i> Overview</a>
          <a href="#"><i className="fa-solid fa-calendar-days"></i> Availability</a>
          <a href="#" className="active"><i className="fa-solid fa-newspaper"></i> Articles</a>
          <a href="#"><i className="fa-solid fa-star"></i> Reviews</a>
        </div>
        <div className="container">
          <h2>Recent Articles & Insights</h2>
          <div className="articles">
            <div className="article-card">
              <div className="article-title">10 Heart-Healthy Foods You Should Eat Daily</div>
              <div className="article-meta">2 days ago • 5 min read</div>
              <div className="article-description">
                Discover the top foods that can help maintain cardiovascular health...
              </div>
              <a href="#" className="read-more">Read More →</a>
            </div>

            <div className="article-card">
              <div className="article-title">Understanding High Blood Pressure: Causes and Prevention</div>
              <div className="article-meta">1 week ago • 8 min read</div>
              <div className="article-description">
                Learn about the silent killer and how to prevent it effectively...
              </div>
              <a href="#" className="read-more">Read More →</a>
            </div>

            <div className="article-card">
              <div className="article-title">Exercise and Heart Health: What You Need to Know</div>
              <div className="article-meta">2 weeks ago • 6 min read</div>
              <div className="article-description">
                The relationship between physical activity and cardiovascular wellness...
              </div>
              <a href="#" className="read-more">Read More →</a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ArticlesPage;