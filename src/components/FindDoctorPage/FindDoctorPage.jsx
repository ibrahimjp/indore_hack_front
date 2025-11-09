import React, { useState, useEffect, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Clock, Calendar, Star, CheckCircle } from "lucide-react";
import { AppContext } from "../../context/AppContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useToast } from "../Toast/Toast";
import { URLS } from "../../config/urls.js";

// --- BookingModal Component ---
const BookingModal = ({ isOpen, onClose, doctor }) => {
  const { token, backendUrl, urls } = useContext(AppContext);
  const navigate = useNavigate();
  const toast = useToast();
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [isBooking, setIsBooking] = useState(false);

  // Generate dates for the next 7 days
  const generateDates = () => {
    const dates = [];
    const today = new Date();

    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);

      const dayName = date
        .toLocaleDateString("en-US", { weekday: "short" })
        .toUpperCase();
      const dayNum = date.getDate();
      const month = date.toLocaleDateString("en-US", { month: "short" });

      // Check available slots from doctor's available slots
      const dateStr = `${date.getDate()}_${date.getMonth() + 1}_${date.getFullYear()}`;
      const availableSlotsList = doctor?.available_slots?.[dateStr] || [];
      const availableSlots = availableSlotsList.length;

      dates.push({
        dayName,
        date: `${dayNum} ${month}`,
        fullDate: dateStr,
        slots: `${availableSlots} Slots`,
        availableSlots: availableSlots,
      });
    }

    return dates;
  };

  // Regenerate dates when doctor or doctor's available_slots change
  const [availableDates, setAvailableDates] = useState(generateDates());
  
  useEffect(() => {
    if (doctor) {
      setAvailableDates(generateDates());
    }
  }, [doctor?.available_slots]);

  // Generate time slots
  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 10; hour < 21; hour++) {
      const time12hr = hour > 12 ? hour - 12 : hour;
      const ampm = hour >= 12 ? "PM" : "AM";
      slots.push(`${time12hr}:00 ${ampm}`);
      slots.push(`${time12hr}:30 ${ampm}`);
    }
    return slots;
  };

  const timeSlots = generateTimeSlots();

  // Get available time slots for selected date
  const getAvailableTimeSlots = () => {
    if (!selectedDate || !doctor) return [];
    const availableSlotsList = doctor.available_slots?.[selectedDate] || [];
    return availableSlotsList;
  };

  const availableTimeSlots = getAvailableTimeSlots();

  const handleContinue = async () => {
    if (!token) {
      alert("Please login to book an appointment");
      onClose();
      return;
    }

    if (!selectedDate || !selectedTime) {
      alert("Please select both date and time");
      return;
    }

    setIsBooking(true);

    try {
      const response = await axios.post(
        backendUrl + "/api/user/book-appointment",
        {
          docId: doctor.id,
          slotDate: selectedDate,
          slotTime: selectedTime,
        },
        {
          headers: { token },
        },
      );

      if (response.data.success) {
        setIsBooking(false);
        setSelectedDate("");
        setSelectedTime("");
        onClose();

        console.log("Appointment booked successfully!");

        // Navigate after a brief delay to ensure modal is fully closed
        setTimeout(() => {
          window.location.href = `${urls.USER_DASHBOARD_URL}/appointments`;
        }, 300);
      } else {
        setIsBooking(false);
        alert(response.data.message || "Failed to book appointment");
      }
    } catch (error) {
      setIsBooking(false);
      alert(error.response?.data?.message || "Failed to book appointment");
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
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
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  Book Appointment
                </h2>
                <div className="flex items-center mt-2">
                  <img
                    src={doctor?.imgSrc}
                    alt={doctor?.name}
                    className="w-6 h-6 rounded-full mr-2"
                  />
                  <span className="text-sm text-gray-600">
                    {doctor?.name} - {doctor?.specialty}
                  </span>
                </div>
                <div className="mt-1">
                  <span className="text-sm font-semibold text-green-600">
                    Consultation Fee: ${doctor?.fees}
                  </span>
                </div>
              </div>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 transition"
              >
                <X size={24} />
              </button>
            </div>

            {/* Content */}
            <div className="p-6">
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
                        dateObj.availableSlots === 0
                          ? "opacity-50 cursor-not-allowed border border-gray-200"
                          : selectedDate === dateObj.fullDate
                            ? "bg-green-100 border-2 border-green-500"
                            : "border border-gray-200 hover:border-gray-300"
                      }`}
                      onClick={() => {
                        if (dateObj.availableSlots > 0) {
                          setSelectedDate(dateObj.fullDate);
                          setSelectedTime("");
                        }
                      }}
                    >
                      <div className="text-xs text-gray-500 mb-1">
                        {dateObj.dayName}
                      </div>
                      <div className="font-medium text-gray-900 mb-1">
                        {dateObj.date}
                      </div>
                      <div className="text-xs text-green-600">
                        {dateObj.slots}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Time Selection */}
              {selectedDate && (
                <div className="mb-6">
                  <h3 className="font-medium text-gray-900 mb-4">
                    Select Time
                    <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full ml-2">
                      {availableTimeSlots.length} Available
                    </span>
                  </h3>
                  {availableTimeSlots.length > 0 ? (
                    <div className="grid grid-cols-3 gap-2">
                      {availableTimeSlots.map((time, index) => (
                        <button
                          key={index}
                          className={`p-3 rounded-xl text-sm font-medium transition-all ${
                            selectedTime === time
                              ? "bg-green-100 border-2 border-green-500 text-green-700"
                              : "border border-gray-200 text-gray-700 hover:border-gray-300"
                          }`}
                          onClick={() => setSelectedTime(time)}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 text-center py-4">
                      No slots available for this date
                    </p>
                  )}
                </div>
              )}

              {/* Summary */}
              {selectedDate && selectedTime && (
                <div className="bg-green-50 rounded-xl p-4 mb-6 border border-green-200">
                  <h4 className="font-medium text-gray-900 mb-2">
                    Booking Summary
                  </h4>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-2 text-green-600" />
                      <span>{selectedDate}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-2 text-green-600" />
                      <span>{selectedTime}</span>
                    </div>
                    <div className="flex items-center justify-between border-t pt-2 mt-2">
                      <span className="font-medium">Consultation Fee:</span>
                      <span className="font-bold text-green-600">
                        ${doctor?.fees}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Continue Button */}
              <button
                onClick={handleContinue}
                disabled={!selectedDate || !selectedTime || isBooking}
                className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-medium py-3 px-4 rounded-xl transition-colors"
              >
                {isBooking ? "Booking..." : "Book Appointment"}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
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
          src={
            doctor.imgSrc || "https://via.placeholder.com/400x300?text=Doctor"
          }
          alt={doctor.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          onError={(e) => {
            e.target.src = "https://via.placeholder.com/400x300?text=Doctor";
          }}
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-white">{doctor.name}</h3>
        <p className="text-green-400 font-medium mb-2">{doctor.specialty}</p>
        <p className="text-gray-300 text-sm mb-4">
          <span className="font-semibold text-white">{doctor.experience}</span>{" "}
          of experience
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
  const { doctors: contextDoctors, getDoctorsData } = useContext(AppContext);
  const [doctors, setDoctors] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("all specialties");
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  useEffect(() => {
    if (contextDoctors && contextDoctors.length > 0) {
      // Format doctors data from backend
      const formattedDoctors = contextDoctors.map((doc) => ({
        id: doc._id,
        name: doc.name,
        specialty: doc.speciality,
        experience: doc.experience,
        description: doc.about,
        imgSrc: doc.image,
        fees: doc.fees,
        address: doc.address,
        degree: doc.degree,
        available: doc.available,
        slots_booked: doc.slots_booked || {},
        available_slots: doc.available_slots || {},
      }));
      setDoctors(formattedDoctors);
      setFilteredDoctors(formattedDoctors);
    }
  }, [contextDoctors]);

  // Refresh doctors list when booking modal opens to get latest slots
  useEffect(() => {
    if (bookingModalOpen) {
      getDoctorsData();
    }
  }, [bookingModalOpen]);

  // Update selectedDoctor with latest data when doctors list updates
  useEffect(() => {
    if (selectedDoctor && doctors.length > 0) {
      const updatedDoctor = doctors.find((doc) => doc.id === selectedDoctor.id);
      if (updatedDoctor) {
        setSelectedDoctor(updatedDoctor);
      }
    }
  }, [doctors]);

  useEffect(() => {
    const query = searchQuery.toLowerCase();
    const specialty = selectedSpecialty.toLowerCase();

    const newFilteredDoctors = doctors.filter((doctor) => {
      const name = doctor.name.toLowerCase();
      const spec = doctor.specialty.toLowerCase();

      const nameMatches = name.includes(query);
      const specialtyMatches =
        specialty === "all specialties" || spec.includes(specialty);

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
            Browse our network of verified healthcare professionals and book
            your consultation with ease.
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
            <p className="text-gray-300 col-span-full text-center">
              No doctors found matching your criteria.
            </p>
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
