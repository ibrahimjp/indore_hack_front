import { useState, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AppContext } from "../../context/AppContext";
import axios from "axios";
import { useToast } from "../Toast/Toast";
import { URLS } from "../../config/urls.js";

const AuthModal = ({ isOpen, onClose }) => {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [isDoctorMode, setIsDoctorMode] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    // Doctor signup fields
    speciality: "",
    degree: "",
    experience: "",
    about: "",
    fees: "",
    address: JSON.stringify({
      street: "",
      city: "",
      state: "",
      pincode: "",
    }),
  });
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { backendUrl, setToken, setUserData, setDToken, setDoctorData, urls } = useContext(AppContext);
  const toast = useToast();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (error) setError("");
  };

  // Safe address parsing helper
  const getAddressValue = (field) => {
    try {
      const addr = JSON.parse(formData.address || '{}');
      return addr[field] || "";
    } catch {
      return "";
    }
  };

  const updateAddressField = (field, value) => {
    try {
      const addr = JSON.parse(formData.address || '{}');
      setFormData({
        ...formData,
        address: JSON.stringify({ ...addr, [field]: value }),
      });
    } catch {
      // If parsing fails, create new address object
      setFormData({
        ...formData,
        address: JSON.stringify({ [field]: value }),
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      let response;
      if (isDoctorMode) {
        // Doctor authentication
        if (isLoginMode) {
          response = await axios.post(backendUrl + "/api/doctor/login", {
            email: formData.email,
            password: formData.password,
          });
        } else {
          // Doctor signup requires all fields
          try {
            const addressObj = JSON.parse(formData.address);
            response = await axios.post(backendUrl + "/api/doctor/signup", {
              name: formData.name,
              email: formData.email,
              password: formData.password,
              speciality: formData.speciality,
              degree: formData.degree,
              experience: formData.experience,
              about: formData.about,
              fees: formData.fees,
              address: addressObj,
            });
          } catch (parseError) {
            setError("Invalid address format. Please fill all address fields.");
            setIsSubmitting(false);
            return;
          }
        }

        if (response.data.success) {
          const newDToken = response.data.token;

          // Fetch doctor data with the new token directly
          try {
            const doctorResponse = await axios.get(
              backendUrl + "/api/doctor/profile",
              {
                headers: { dToken: newDToken },
              },
            );

            if (doctorResponse.data.success) {
              // Set everything at once to prevent blank screen
              setDoctorData(doctorResponse.data.profileData);
              localStorage.setItem("dToken", newDToken);
              setDToken(newDToken);

              // Close modal and show success message
              setFormData({
                name: "",
                email: "",
                password: "",
                speciality: "",
                degree: "",
                experience: "",
                about: "",
                fees: "",
                address: JSON.stringify({
                  street: "",
                  city: "",
                  state: "",
                  pincode: "",
                }),
              });
              onClose();
              toast.success(isLoginMode ? "Doctor login successful!" : "Doctor registration successful!");
              // Redirect to doctor dashboard
              window.location.href = `${urls.DOCTOR_DASHBOARD_URL}/doctor/dashboard`;
            }
          } catch (doctorError) {
            console.error("Failed to load doctor profile:", doctorError);
            setError("Login successful but failed to load profile");
          }
        } else {
          setError(response.data.message || "An error occurred");
        }
      } else {
        // User authentication
        if (isLoginMode) {
          response = await axios.post(backendUrl + "/api/user/login", {
            email: formData.email,
            password: formData.password,
          });
        } else {
          response = await axios.post(backendUrl + "/api/user/register", {
            name: formData.name,
            email: formData.email,
            password: formData.password,
          });
        }

        if (response.data.success) {
          const newToken = response.data.token;

          // Fetch user data with the new token directly
          try {
            const userResponse = await axios.get(
              backendUrl + "/api/user/get-profile",
              {
                headers: { token: newToken },
              },
            );

            if (userResponse.data.success) {
              // Set everything at once to prevent blank screen
              setUserData(userResponse.data.userData);
              localStorage.setItem("token", newToken);
              setToken(newToken);

              // Close modal and show success message
              setFormData({
                name: "",
                email: "",
                password: "",
                speciality: "",
                degree: "",
                experience: "",
                about: "",
                fees: "",
                address: JSON.stringify({
                  street: "",
                  city: "",
                  state: "",
                  pincode: "",
                }),
              });
              onClose();
              toast.success(isLoginMode ? "Login successful!" : "Registration successful!");
            }
          } catch (userError) {
            console.error("Failed to load user profile:", userError);
            setError("Login successful but failed to load profile");
          }
        } else {
          setError(response.data.message || "An error occurred");
        }
      }
    } catch (error) {
      console.error("Auth error:", error);
      setError(error.response?.data?.message || "An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleMode = () => {
    setIsLoginMode(!isLoginMode);
    setError("");
    setFormData({
      name: "",
      email: "",
      password: "",
      speciality: "",
      degree: "",
      experience: "",
      about: "",
      fees: "",
      address: JSON.stringify({
        street: "",
        city: "",
        state: "",
        pincode: "",
      }),
    });
  };

  const toggleDoctorMode = () => {
    setIsDoctorMode(!isDoctorMode);
    setError("");
    setFormData({
      name: "",
      email: "",
      password: "",
      speciality: "",
      degree: "",
      experience: "",
      about: "",
      fees: "",
      address: JSON.stringify({
        street: "",
        city: "",
        state: "",
        pincode: "",
      }),
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="bg-dark-bg border border-light-black rounded-2xl p-8 w-full max-w-md relative max-h-[90vh] overflow-hidden flex flex-col"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-footer-gray hover:text-off-white transition-colors"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* Header */}
            <div className="text-center mb-8">
              <h2 className="text-2xl font-semibold text-off-white mb-2">
                {isDoctorMode 
                  ? (isLoginMode ? "Doctor Login" : "Doctor Sign Up")
                  : (isLoginMode ? "Welcome Back" : "Create Account")}
              </h2>
              <p className="text-footer-gray">
                {isDoctorMode
                  ? (isLoginMode 
                      ? "Sign in to access your doctor dashboard"
                      : "Join SympAI as a healthcare provider")
                  : (isLoginMode
                      ? "Sign in to access your appointments and profile"
                      : "Join us to book appointments and manage your health")}
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6 flex-1 overflow-y-auto pr-2">
              {!isLoginMode && (
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-off-white mb-2"
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required={!isLoginMode}
                    className="w-full px-4 py-3 bg-light-black border border-medium-gray rounded-xl text-off-white placeholder-footer-gray focus:outline-none focus:ring-2 focus:ring-primary-green focus:border-primary-green transition-all"
                    placeholder="Enter your full name"
                  />
                </div>
              )}

              {/* Doctor Signup Additional Fields */}
              {!isLoginMode && isDoctorMode && (
                <>
                  <div>
                    <label
                      htmlFor="speciality"
                      className="block text-sm font-medium text-off-white mb-2"
                    >
                      Speciality *
                    </label>
                    <input
                      type="text"
                      id="speciality"
                      name="speciality"
                      value={formData.speciality}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-light-black border border-medium-gray rounded-xl text-off-white placeholder-footer-gray focus:outline-none focus:ring-2 focus:ring-primary-green focus:border-primary-green transition-all"
                      placeholder="e.g., Cardiologist, Dermatologist"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="degree"
                      className="block text-sm font-medium text-off-white mb-2"
                    >
                      Degree *
                    </label>
                    <input
                      type="text"
                      id="degree"
                      name="degree"
                      value={formData.degree}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-light-black border border-medium-gray rounded-xl text-off-white placeholder-footer-gray focus:outline-none focus:ring-2 focus:ring-primary-green focus:border-primary-green transition-all"
                      placeholder="e.g., MBBS, MD"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="experience"
                      className="block text-sm font-medium text-off-white mb-2"
                    >
                      Experience *
                    </label>
                    <input
                      type="text"
                      id="experience"
                      name="experience"
                      value={formData.experience}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-light-black border border-medium-gray rounded-xl text-off-white placeholder-footer-gray focus:outline-none focus:ring-2 focus:ring-primary-green focus:border-primary-green transition-all"
                      placeholder="e.g., 5 years"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="about"
                      className="block text-sm font-medium text-off-white mb-2"
                    >
                      About *
                    </label>
                    <textarea
                      id="about"
                      name="about"
                      value={formData.about}
                      onChange={handleInputChange}
                      required
                      rows={3}
                      className="w-full px-4 py-3 bg-light-black border border-medium-gray rounded-xl text-off-white placeholder-footer-gray focus:outline-none focus:ring-2 focus:ring-primary-green focus:border-primary-green transition-all resize-none"
                      placeholder="Tell us about yourself"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="fees"
                      className="block text-sm font-medium text-off-white mb-2"
                    >
                      Consultation Fees (₹) *
                    </label>
                    <input
                      type="number"
                      id="fees"
                      name="fees"
                      value={formData.fees}
                      onChange={handleInputChange}
                      required
                      min="0"
                      className="w-full px-4 py-3 bg-light-black border border-medium-gray rounded-xl text-off-white placeholder-footer-gray focus:outline-none focus:ring-2 focus:ring-primary-green focus:border-primary-green transition-all"
                      placeholder="e.g., 500"
                    />
                  </div>

                  <div className="space-y-3">
                    <label className="block text-sm font-medium text-off-white mb-2">
                      Address *
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <input
                        type="text"
                        name="address_street"
                        value={getAddressValue("street")}
                        onChange={(e) => updateAddressField("street", e.target.value)}
                        required
                        className="col-span-2 px-4 py-2 bg-light-black border border-medium-gray rounded-xl text-off-white placeholder-footer-gray focus:outline-none focus:ring-2 focus:ring-primary-green focus:border-primary-green transition-all text-sm"
                        placeholder="Street"
                      />
                      <input
                        type="text"
                        name="address_city"
                        value={getAddressValue("city")}
                        onChange={(e) => updateAddressField("city", e.target.value)}
                        required
                        className="px-4 py-2 bg-light-black border border-medium-gray rounded-xl text-off-white placeholder-footer-gray focus:outline-none focus:ring-2 focus:ring-primary-green focus:border-primary-green transition-all text-sm"
                        placeholder="City"
                      />
                      <input
                        type="text"
                        name="address_state"
                        value={getAddressValue("state")}
                        onChange={(e) => updateAddressField("state", e.target.value)}
                        required
                        className="px-4 py-2 bg-light-black border border-medium-gray rounded-xl text-off-white placeholder-footer-gray focus:outline-none focus:ring-2 focus:ring-primary-green focus:border-primary-green transition-all text-sm"
                        placeholder="State"
                      />
                      <input
                        type="text"
                        name="address_pincode"
                        value={getAddressValue("pincode")}
                        onChange={(e) => updateAddressField("pincode", e.target.value)}
                        required
                        className="col-span-2 px-4 py-2 bg-light-black border border-medium-gray rounded-xl text-off-white placeholder-footer-gray focus:outline-none focus:ring-2 focus:ring-primary-green focus:border-primary-green transition-all text-sm"
                        placeholder="Pincode"
                      />
                    </div>
                  </div>
                </>
              )}

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-off-white mb-2"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-light-black border border-medium-gray rounded-xl text-off-white placeholder-footer-gray focus:outline-none focus:ring-2 focus:ring-primary-green focus:border-primary-green transition-all"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-off-white mb-2"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-light-black border border-medium-gray rounded-xl text-off-white placeholder-footer-gray focus:outline-none focus:ring-2 focus:ring-primary-green focus:border-primary-green transition-all"
                  placeholder={
                    isLoginMode
                      ? "Enter your password"
                      : "Create a password (min. 8 characters)"
                  }
                  minLength={isLoginMode ? undefined : 8}
                />
              </div>

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-500 text-sm bg-red-500/10 border border-red-500/20 rounded-lg p-3"
                >
                  {error}
                </motion.div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary-green text-dark-bg font-semibold py-3 px-4 rounded-xl hover:bg-deep-green transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting
                  ? isLoginMode
                    ? (isDoctorMode ? "Signing In..." : "Signing In...")
                    : (isDoctorMode ? "Creating Account..." : "Creating Account...")
                  : isLoginMode
                    ? (isDoctorMode ? "Sign In as Doctor" : "Sign In")
                    : (isDoctorMode ? "Sign Up as Doctor" : "Create Account")}
              </button>
            </form>

            {/* Toggle Mode */}
            <div className="text-center mt-6 pt-6 border-t border-light-black space-y-4">
              <p className="text-footer-gray">
                {isLoginMode
                  ? "Don't have an account?"
                  : "Already have an account?"}{" "}
                <button
                  type="button"
                  onClick={toggleMode}
                  className="text-primary-green hover:text-deep-green font-medium transition-colors"
                >
                  {isLoginMode ? "Sign Up" : "Sign In"}
                </button>
              </p>
              
              {/* Doctor/User Mode Toggle */}
              <div className="border-t border-light-black pt-4">
                <button
                  type="button"
                  onClick={toggleDoctorMode}
                  className="text-footer-gray hover:text-primary-green text-sm font-medium transition-colors"
                >
                  {isDoctorMode 
                    ? (isLoginMode ? "← Login as User" : "← Sign Up as User")
                    : (isLoginMode ? "Sign in as a Doctor →" : "Sign up as a Doctor →")}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default AuthModal;
