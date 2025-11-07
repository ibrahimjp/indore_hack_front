import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Clock, Calendar, Star, CheckCircle } from 'lucide-react';

// --- BookingModal Component ---
const BookingModal = ({ isOpen, onClose, doctor }) => {
  const [selectedTrialType, setSelectedTrialType] = useState('free');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  
  // Generate dates for the next 7 days
  const generateDates = () => {
    const dates = [];
    const today = new Date();
    
    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      
      const dayName = date.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase();
      const dayNum = date.getDate();
      const month = date.toLocaleDateString('en-US', { month: 'short' });
      const slots = Math.floor(Math.random() * 50) + 5; // Random slots between 5-54
      
      dates.push({
        dayName,
        date: `${dayNum} ${month}`,
        fullDate: date.toISOString().split('T')[0],
        slots: `${slots} Slots`
      });
    }
    
    return dates;
  };

  const [availableDates] = useState(generateDates());
  
  const timeSlots = [
    '08:30 PM', '08:45 PM', '09:00 PM', '09:15 PM', '09:30 PM'
  ];

  const handleContinue = () => {
    if (selectedDate && selectedTime) {
      alert(`Booking confirmed for ${doctor?.name} on ${selectedDate} at ${selectedTime}`);
      onClose();
    } else {
      alert('Please select both date and time');
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={e => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Select Date and Time</h2>
              <div className="flex items-center mt-2">
                <img
                  src={doctor?.imgSrc}
                  alt={doctor?.name}
                  className="w-6 h-6 rounded-full mr-2"
                />
                <span className="text-sm text-gray-600">Book a trial session with {doctor?.name}</span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1 hover:bg-gray-100 rounded-full"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          <div className="p-6">
            {/* Trial Type Selection */}
            <div className="mb-6">
              <h3 className="font-medium text-gray-900 mb-4">Choose Your Trial Type</h3>
              <div className="grid grid-cols-2 gap-4">
                {/* Free Trial */}
                <div
                  className={`border-2 rounded-xl p-4 cursor-pointer transition-all ${
                    selectedTrialType === 'free'
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setSelectedTrialType('free')}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-gray-900">Free Trial</span>
                    <span className="text-blue-600 font-bold">Free</span>
                  </div>
                  <div className="space-y-1 text-sm text-gray-600">
                    <div className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      Basic mentorship session
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      30 minutes session duration
                    </div>
                  </div>
                </div>

                {/* Golden Trial */}
                <div
                  className={`border-2 rounded-xl p-4 cursor-pointer transition-all ${
                    selectedTrialType === 'golden'
                      ? 'border-yellow-500 bg-yellow-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setSelectedTrialType('golden')}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-500 mr-1" />
                      <span className="font-medium text-gray-900">Golden Trial</span>
                    </div>
                    <span className="text-yellow-600 font-bold">₹199</span>
                  </div>
                  <div className="space-y-1 text-sm text-gray-600">
                    <div className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      100% show up by mentor
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      Priority Slot within 24hrs
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      Personalised mentorship plan
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Date Selection */}
            <div className="mb-6">
              <h3 className="font-medium text-gray-900 mb-4">
                Select Date
                <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full ml-2">
                  RECOMMENDED
                </span>
              </h3>
              <div className="grid grid-cols-4 gap-2">
                {availableDates.map((dateObj, index) => (
                  <div
                    key={index}
                    className={`text-center p-3 rounded-xl cursor-pointer transition-all ${
                      selectedDate === dateObj.fullDate
                        ? 'bg-blue-100 border-2 border-blue-500'
                        : 'border border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setSelectedDate(dateObj.fullDate)}
                  >
                    <div className="text-xs text-gray-500 mb-1">{dateObj.dayName}</div>
                    <div className="font-medium text-gray-900 mb-1">{dateObj.date}</div>
                    <div className="text-xs text-green-600">{dateObj.slots}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Time Selection */}
            <div className="mb-6">
              <h3 className="font-medium text-gray-900 mb-4">
                Select Time
                <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full ml-2">
                  RECOMMENDED
                </span>
              </h3>
              <div className="grid grid-cols-3 gap-2">
                {timeSlots.map((time, index) => (
                  <button
                    key={index}
                    className={`p-3 rounded-xl text-sm font-medium transition-all ${
                      selectedTime === time
                        ? 'bg-blue-100 border-2 border-blue-500 text-blue-700'
                        : 'border border-gray-200 text-gray-700 hover:border-gray-300'
                    }`}
                    onClick={() => setSelectedTime(time)}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>

            {/* Summary */}
            {selectedDate && selectedTime && (
              <div className="bg-gray-50 rounded-xl p-4 mb-6">
                <div className="flex items-center text-sm text-gray-600">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span>{selectedDate}</span>
                  <Clock className="w-4 h-4 ml-4 mr-2" />
                  <span>{selectedTime} to 09:00 PM</span>
                  <span className="ml-auto">30min (Session Time Slot)</span>
                </div>
              </div>
            )}

            {/* Continue Button */}
            <button
              onClick={handleContinue}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-xl transition-colors"
            >
              Continue →
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

// --- DoctorCard Component ---
const DoctorCard = ({ doctor, onBookNow }) => {
  return (
    <motion.div
      className="bg-light-black border border-gray-700 rounded-2xl overflow-hidden group transition-all duration-300 hover:border-green-500/50 hover:shadow-2xl hover:shadow-green-500/10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="h-48 overflow-hidden">
        <img 
          src={doctor.imgSrc} 
          alt={`Dr. ${doctor.name}`} 
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-white">{doctor.name}</h3>
        <p className="text-green-400 font-medium mb-2">{doctor.specialty}</p>
        <p className="text-gray-300 text-sm mb-4">
          <span className="font-semibold text-white">{doctor.experience}</span> of experience
        </p>
        <p className="text-gray-400 text-sm mb-6 h-16 overflow-hidden">
          {doctor.description}
        </p>
        <div className="flex items-center gap-4">
          <a 
            href={`/profile/${doctor.id}`} 
            className="flex-1 text-center bg-gray-700 hover:bg-gray-600 transition-colors border border-gray-600 text-white font-medium py-3 px-6 rounded-xl text-sm"
          >
            View Profile
          </a>
          <button 
            onClick={() => onBookNow(doctor)}
            className="flex-1 text-center bg-green-700 hover:bg-green-600 transition-colors text-white font-medium py-3 px-6 rounded-xl text-sm"
          >
            Book Now
          </button>
        </div>
      </div>
    </motion.div>
  );
};

// --- Main FindDoctorPage Component ---
function FindDoctorPage() {
  const [doctors, setDoctors] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('all specialties');
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  useEffect(() => {
    const fetchedDoctors = [
      {
        id: 1,
        name: 'Dr. Sarah Johnson',
        specialty: 'Cardiologist',
        experience: '15+ years',
        description: 'Expert in treating complex heart conditions and promoting cardiovascular wellness through preventative care.',
        imgSrc: 'https://images.pexels.com/photos/4167541/pexels-photo-4167541.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      },
      {
        id: 2,
        name: 'Dr. Emily Rodriguez',
        specialty: 'Dermatologist',
        experience: '7+ years',
        description: 'Specializes in cosmetic dermatology and advanced skin care treatments for all ages.',
        imgSrc: 'https://images.pexels.com/photos/5407206/pexels-photo-5407206.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      },
      {
        id: 3,
        name: 'Dr. Michael Chen',
        specialty: 'Neurologist',
        experience: '12+ years',
        description: 'Focused on diagnosing and treating disorders of the nervous system, including migraines and epilepsy.',
        imgSrc: 'https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      },
      {
        id: 4,
        name: 'Dr. Robert Kim',
        specialty: 'Orthopedic Surgeon',
        experience: '9+ years',
        description: 'Dedicated to restoring mobility and quality of life through advanced surgical techniques.',
        imgSrc: 'https://images.pexels.com/photos/5214995/pexels-photo-5214995.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      },
      {
        id: 5,
        name: 'Dr. Lisa Thompson',
        specialty: 'Pediatrician',
        experience: '6+ years',
        description: 'Compassionate care for children from infancy through adolescence, focusing on development and wellness.',
        imgSrc: 'https://images.pexels.com/photos/3957987/pexels-photo-3957987.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      },
      {
        id: 6,
        name: 'Dr. James Wilson',
        specialty: 'Psychiatrist',
        experience: '8+ years',
        description: 'Providing comprehensive mental health care with a focus on therapy and personalized treatment plans.',
        imgSrc: 'https://images.pexels.com/photos/5327921/pexels-photo-5327921.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      },
    ];
    setDoctors(fetchedDoctors);
    setFilteredDoctors(fetchedDoctors);
  }, []);

  useEffect(() => {
    const query = searchQuery.toLowerCase();
    const specialty = selectedSpecialty.toLowerCase();

    const newFilteredDoctors = doctors.filter(doctor => {
      const name = doctor.name.toLowerCase();
      const spec = doctor.specialty.toLowerCase();
      
      const nameMatches = name.includes(query);
      const specialtyMatches = specialty === 'all specialties' || spec.includes(specialty);

      return nameMatches && specialtyMatches;
    });

    setFilteredDoctors(newFilteredDoctors);
  }, [searchQuery, selectedSpecialty, doctors]);

  const handleBookNow = (doctor) => {
    setSelectedDoctor(doctor);
    setBookingModalOpen(true);
  };

  const closeBookingModal = () => {
    setBookingModalOpen(false);
    setSelectedDoctor(null);
  };

  return (
    <div className="bg-black text-white min-h-screen pt-24 md:pt-20 p-20">
      <main className="main-container px-6">
        {/* Hero Section */}
        <motion.div 
          className="hero text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Find Your <span className="text-green-400">Perfect Doctor</span>
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Browse our network of verified healthcare professionals and book your consultation with ease.
          </p>
        </motion.div>

        {/* Search & Filter Section */}
        <motion.div 
          className="search-box bg-[#000] border border-gray-700 p-4 rounded-2xl flex flex-col md:flex-row gap-4 max-w-4xl mx-auto mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <input
            type="text"
            className="w-full bg-light-black border border-gray-600 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400"
            placeholder="Search by doctor's name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <select
            className="w-full md:w-64 bg-light-black border border-gray-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-green-400"
            value={selectedSpecialty}
            onChange={(e) => setSelectedSpecialty(e.target.value)}
          >
            <option>All Specialties</option>
            <option>Cardiologist</option>
            <option>Dermatologist</option>
            <option>Neurologist</option>
            <option>Orthopedic Surgeon</option>
            <option>Pediatrician</option>
            <option>Psychiatrist</option>
          </select>
        </motion.div>

        {/* Doctors Grid */}
        <div className="doctor-list m-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredDoctors.length > 0 ? (
            filteredDoctors.map((doctor) => (
              <DoctorCard 
                doctor={doctor} 
                key={doctor.id} 
                onBookNow={handleBookNow}
              />
            ))
          ) : (
            <p className="text-gray-300 col-span-full text-center">No doctors found matching your criteria.</p>
          )}
        </div>
      </main>

      {/* Booking Modal */}
      <BookingModal
        isOpen={bookingModalOpen}
        onClose={closeBookingModal}
        doctor={selectedDoctor}
      />
    </div>
  );
}

export default FindDoctorPage;