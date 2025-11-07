import React, { useState, useEffect, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const Appointments = () => {
  const { userData, token, backendUrl } = useContext(AppContext);
  const [appointments, setAppointments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [cancellingId, setCancellingId] = useState(null);
  const [payingId, setPayingId] = useState(null);

  useEffect(() => {
    if (token) {
      fetchAppointments();
    }
  }, [token]);

  const fetchAppointments = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(backendUrl + "/api/user/appointments", {
        headers: { token },
      });

      if (response.data.success) {
        setAppointments(response.data.appointments || []);
      } else {
        setMessage({
          type: "error",
          text: response.data.message || "Failed to fetch appointments",
        });
        toast.error(response.data.message || "Failed to fetch appointments");
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        "An error occurred while fetching appointments";
      setMessage({ type: "error", text: errorMessage });
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const cancelAppointment = async (appointmentId) => {
    try {
      setCancellingId(appointmentId);
      const response = await axios.post(
        backendUrl + "/api/user/cancel-appointment",
        { appointmentId },
        {
          headers: { token },
        },
      );

      if (response.data.success) {
        toast.success("Appointment cancelled successfully");
        setMessage({
          type: "success",
          text: "Appointment cancelled successfully",
        });

        // Fetch appointments without setting loading state to prevent blank screen
        try {
          const appointmentsResponse = await axios.get(
            backendUrl + "/api/user/appointments",
            { headers: { token } },
          );

          if (appointmentsResponse.data.success) {
            setAppointments(appointmentsResponse.data.appointments || []);
          }
        } catch (fetchError) {
          console.error("Error fetching updated appointments:", fetchError);
        }
      } else {
        setMessage({
          type: "error",
          text: response.data.message || "Failed to cancel appointment",
        });
        toast.error(response.data.message || "Failed to cancel appointment");
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        "An error occurred while cancelling appointment";
      setMessage({ type: "error", text: errorMessage });
      toast.error(errorMessage);
    } finally {
      setCancellingId(null);
    }
  };

  const makePayment = async (appointmentId) => {
    try {
      setPayingId(appointmentId);
      const response = await axios.post(
        backendUrl + "/api/user/make-payment",
        { appointmentId },
        {
          headers: { token },
        },
      );

      if (response.data.success) {
        toast.success("Payment completed successfully");
        setMessage({ type: "success", text: "Payment completed successfully" });

        // Fetch appointments without setting loading state to prevent blank screen
        try {
          const appointmentsResponse = await axios.get(
            backendUrl + "/api/user/appointments",
            { headers: { token } },
          );

          if (appointmentsResponse.data.success) {
            setAppointments(appointmentsResponse.data.appointments || []);
          }
        } catch (fetchError) {
          console.error("Error fetching updated appointments:", fetchError);
        }
      } else {
        setMessage({
          type: "error",
          text: response.data.message || "Payment failed",
        });
        toast.error(response.data.message || "Payment failed");
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "An error occurred during payment";
      setMessage({ type: "error", text: errorMessage });
      toast.error(errorMessage);
    } finally {
      setPayingId(null);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatTime = (timeString) => {
    const [hours, minutes] = timeString.split(":");
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? "PM" : "AM";
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  const getStatusColor = (appointment) => {
    if (appointment.cancelled)
      return "text-red-400 bg-red-500/10 border-red-500/20";
    if (!appointment.payment)
      return "text-yellow-400 bg-yellow-500/10 border-yellow-500/20";
    return "text-green-400 bg-green-500/10 border-green-500/20";
  };

  const getStatusText = (appointment) => {
    if (appointment.cancelled) return "Cancelled";
    if (!appointment.payment) return "Payment Pending";
    return "Confirmed";
  };

  if (!userData) {
    return (
      <div className="min-h-screen bg-dark-bg flex items-center justify-center">
        <div className="text-off-white">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-bg pt-32 pb-16">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-off-white mb-2">
              My Appointments
            </h1>
            <p className="text-footer-gray">
              Manage your healthcare appointments and payments
            </p>
          </div>

          {/* Message */}
          <AnimatePresence>
            {message.text && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className={`mb-6 p-4 rounded-xl border ${
                  message.type === "success"
                    ? "bg-green-500/10 border-green-500/20 text-green-400"
                    : "bg-red-500/10 border-red-500/20 text-red-400"
                }`}
              >
                {message.text}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Loading State */}
          {isLoading && (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[...Array(6)].map((_, index) => (
                <div
                  key={index}
                  className="bg-light-black border border-medium-gray rounded-2xl p-6 animate-pulse"
                >
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-16 h-16 bg-medium-gray rounded-full"></div>
                    <div className="flex-1">
                      <div className="h-4 bg-medium-gray rounded mb-2"></div>
                      <div className="h-3 bg-medium-gray rounded w-3/4"></div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-3 bg-medium-gray rounded"></div>
                    <div className="h-3 bg-medium-gray rounded w-2/3"></div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Appointments List */}
          {!isLoading && appointments.length === 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-light-black border border-medium-gray rounded-2xl p-12 text-center"
            >
              <div className="w-16 h-16 bg-primary-green/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-primary-green"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4m-6 0h6a2 2 0 012 2v10a2 2 0 01-2 2H8a2 2 0 01-2-2V9a2 2 0 012-2z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-off-white mb-2">
                No Appointments Yet
              </h3>
              <p className="text-footer-gray mb-6">
                You haven't booked any appointments yet. Start by finding a
                doctor.
              </p>
              <a
                href="/Doctor"
                className="inline-block bg-primary-green text-dark-bg font-semibold px-6 py-3 rounded-xl hover:bg-deep-green transition-colors"
              >
                Find a Doctor
              </a>
            </motion.div>
          )}

          {!isLoading && appointments.length > 0 && (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {appointments.map((appointment, index) => (
                <motion.div
                  key={appointment._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="bg-light-black border border-medium-gray rounded-2xl p-6 hover:shadow-lg transition-all duration-300"
                >
                  {/* Doctor Info */}
                  <div className="flex items-center space-x-4 mb-4">
                    <img
                      src={
                        appointment.docData?.image ||
                        "https://via.placeholder.com/64x64?text=Dr"
                      }
                      alt={appointment.docData?.name}
                      className="w-16 h-16 rounded-full object-cover border-2 border-primary-green/30"
                      onError={(e) => {
                        e.target.src =
                          "https://via.placeholder.com/64x64?text=Dr";
                      }}
                    />
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-off-white">
                        Dr. {appointment.docData?.name}
                      </h3>
                      <p className="text-footer-gray text-sm">
                        {appointment.docData?.speciality}
                      </p>
                    </div>
                  </div>

                  {/* Appointment Details */}
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center text-footer-gray">
                      <svg
                        className="w-4 h-4 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4m-6 0h6a2 2 0 012 2v10a2 2 0 01-2 2H8a2 2 0 01-2-2V9a2 2 0 012-2z"
                        />
                      </svg>
                      <span className="text-sm">
                        {formatDate(appointment.slotDate)}
                      </span>
                    </div>
                    <div className="flex items-center text-footer-gray">
                      <svg
                        className="w-4 h-4 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <span className="text-sm">
                        {formatTime(appointment.slotTime)}
                      </span>
                    </div>
                    <div className="flex items-center text-footer-gray">
                      <svg
                        className="w-4 h-4 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                        />
                      </svg>
                      <span className="text-sm font-semibold">
                        ${appointment.amount}
                      </span>
                    </div>
                  </div>

                  {/* Status */}
                  <div
                    className={`inline-block px-3 py-1 rounded-full text-xs font-medium border mb-4 ${getStatusColor(appointment)}`}
                  >
                    {getStatusText(appointment)}
                  </div>

                  {/* Actions */}
                  <div className="flex space-x-2">
                    {!appointment.cancelled && !appointment.payment && (
                      <>
                        <button
                          onClick={() => makePayment(appointment._id)}
                          disabled={payingId === appointment._id}
                          className="flex-1 bg-primary-green text-dark-bg font-semibold py-2 px-3 rounded-lg text-sm hover:bg-deep-green transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {payingId === appointment._id
                            ? "Processing..."
                            : "Pay Now"}
                        </button>
                        <button
                          onClick={() => cancelAppointment(appointment._id)}
                          disabled={cancellingId === appointment._id}
                          className="flex-1 bg-red-500/20 text-red-400 font-semibold py-2 px-3 rounded-lg text-sm hover:bg-red-500/30 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {cancellingId === appointment._id
                            ? "Cancelling..."
                            : "Cancel"}
                        </button>
                      </>
                    )}

                    {!appointment.cancelled && appointment.payment && (
                      <div className="w-full text-center py-2 text-green-400 font-medium text-sm">
                        ✓ Appointment Confirmed
                      </div>
                    )}

                    {appointment.cancelled && (
                      <div className="w-full text-center py-2 text-red-400 font-medium text-sm">
                        ✗ Appointment Cancelled
                      </div>
                    )}
                  </div>

                  {/* Booking Date */}
                  <div className="mt-4 pt-4 border-t border-medium-gray">
                    <p className="text-xs text-footer-gray">
                      Booked on{" "}
                      {new Date(appointment.date).toLocaleDateString()}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Appointments;
