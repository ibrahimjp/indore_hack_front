import React, { useState } from 'react';
import './Form.css';
function Form() {
  // State to hold all form data
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dob: '',
    reason: '',
  });

  const [message, setMessage] = useState('');

  // Handle changes to form inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if required fields are filled
    const { firstName, lastName, email, phone, dob } = formData;
    if (!firstName || !lastName || !email || !phone || !dob) {
      setMessage("Please fill in all required fields.");
      return;
    }

    // Simulate form submission and display a success message
    setMessage("Form submitted successfully! Check the console for data.");
    console.log("Form Data:", formData);

    // In a real application, you would send this data to a backend API.
    // e.g., fetch('/api/submit', { method: 'POST', body: JSON.stringify(formData) });
  };

  return (
    <>
      <div className="container">
        {/* Doctor Info */}
        <div className="doctor-card">
          <img src="https://placehold.co/80x80/245f37/ffffff?text=Doctor" alt="Doctor" className="doctor-img" />
          <div>
            <h2>Dr. Sarah Johnson</h2>
            <p>Cardiology</p>
            <span>⭐ 4.9 (234 reviews)</span>
          </div>
        </div>

        {/* Patient Form */}
        <div className="form-card">
          <h3>Patient Information</h3>
          {message && (
            <div className="message-box">{message}</div>
          )}
          <form id="patientForm" onSubmit={handleSubmit}>
            <div className="row">
              <div className="form-group">
                <label>First Name *</label>
                <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label>Last Name *</label>
                <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required />
              </div>
            </div>

            <div className="row">
              <div className="form-group">
                <label>Email Address *</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label>Phone Number *</label>
                <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required />
              </div>
            </div>

            <div className="row">
              <div className="form-group">
                <label>Date of Birth *</label>
                <input type="date" name="dob" value={formData.dob} onChange={handleChange} required />
              </div>
            </div>

            <div className="form-group">
              <label>Reason for Consultation</label>
              <textarea name="reason" rows="3" value={formData.reason} onChange={handleChange}></textarea>
            </div>

            <div className="actions">
              <button type="button" onClick={() => window.history.back()} className="btn back-btn">Back</button>
              <button type="submit" className="btn btn-primary">Continue</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Form;
