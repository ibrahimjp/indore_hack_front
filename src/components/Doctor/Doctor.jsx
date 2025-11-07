import React, { useState, useEffect } from 'react';
import './Doctor.css';
function Doctor() {
  const [doctors, setDoctors] = useState([
    {
      name: 'Dr. Sarah Johnson',
      specialty: 'Cardiologist',
      experience: '10+ years',
      imgSrc: 'https://placehold.co/100x100/1a1a1a/245f37?text=Doc',
      id: 1,
    },
    {
      name: 'Dr. Emily Rodriguez',
      specialty: 'Dermatologist',
      experience: '7+ years',
      imgSrc: 'https://placehold.co/100x100/1a1a1a/245f37?text=Doc',
      id: 2,
    },
    {
      name: 'Dr. Michael Chen',
      specialty: 'Neurologist',
      experience: '12+ years',
      imgSrc: 'https://placehold.co/100x100/1a1a1a/245f37?text=Doc',
      id: 3,
    },
    {
      name: 'Dr. Robert Kim',
      specialty: 'Orthopedic Surgeon',
      experience: '9+ years',
      imgSrc: 'https://placehold.co/100x100/1a1a1a/245f37?text=Doc',
      id: 4,
    },
    {
      name: 'Dr. Lisa Thompson',
      specialty: 'Pediatrician',
      experience: '6+ years',
      imgSrc: 'https://placehold.co/100x100/1a1a1a/245f37?text=Doc',
      id: 5,
    },
    {
      name: 'Dr. James Wilson',
      specialty: 'Psychiatrist',
      experience: '8+ years',
      imgSrc: 'https://placehold.co/100x100/1a1a1a/245f37?text=Doc',
      id: 6,
    },
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('all specialties');
  const [filteredDoctors, setFilteredDoctors] = useState(doctors);

  useEffect(() => {
    filterDoctors();
  }, [searchQuery, selectedSpecialty]);

  const filterDoctors = () => {
    const query = searchQuery.toLowerCase();
    const specialty = selectedSpecialty.toLowerCase();

    const newFilteredDoctors = doctors.filter(doctor => {
      const name = doctor.name.toLowerCase();
      const spec = doctor.specialty.toLowerCase();
      let matches = true;

      if (query && !name.includes(query) && !spec.includes(query)) {
        matches = false;
      }
      if (specialty !== 'all specialties' && !spec.includes(specialty)) {
        matches = false;
      }

      return matches;
    });

    setFilteredDoctors(newFilteredDoctors);
  };

  return (
    <>
      
      <div className="main-container">
        {/* Hero Section */}
        <div className="hero">
          <h1>Find Your Perfect <span className="highlight">Doctor</span></h1>
          <p>Browse through our network of verified healthcare professionals and book your consultation today.</p>

          <div className="search-box">
            <input
              type="text"
              id="search"
              placeholder=" Search doctors, specialties..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <select
              id="specialty"
              value={selectedSpecialty}
              onChange={(e) => setSelectedSpecialty(e.target.value)}
            >
              <option>All Specialties</option>
              <option>Cardiologist</option>
              <option>Dentist</option>
              <option>Dermatologist</option>
              <option>Pediatrician</option>
            </select>

            <select id="sort">
              <option>Highest Rated</option>
              <option>Most Experienced</option>
              <option>Lowest Fee</option>
            </select>
          </div>
        </div>

        {/* Doctors Section */}
        <section className="doctor-list">
          {filteredDoctors.map((doctor) => (
            <div className="doctor-box" key={doctor.id}>
              <img src={doctor.imgSrc} alt={`Dr. ${doctor.name}`} />
              <div className="doctor-info">
                <h2>{doctor.name}</h2>
                <p>{doctor.specialty}</p>
                <p>Experience: {doctor.experience}</p>
                <div className="btn-group"><br />
                  <a href={`/profile/${doctor.id}`} className="btn">View Profile</a>
                  <a href={`/book-consultation/${doctor.id}`} className="btn">Book Now</a>
                </div>
              </div>
            </div>
          ))}
        </section>
      </div>
    </>
  );
}

export default Doctor;