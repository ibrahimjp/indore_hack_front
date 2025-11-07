import { useState, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AppContext } from "../../context/AppContext";
import axios from "axios";

const AuthModal = ({ isOpen, onClose }) => {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { backendUrl, setToken, setUserData } = useContext(AppContext);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      let response;
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
            setFormData({ name: "", email: "", password: "" });
            onClose();
            console.log(
              isLoginMode ? "Login successful!" : "Registration successful!",
            );
          }
        } catch (userError) {
          console.error("Failed to load user profile:", userError);
          setError("Login successful but failed to load profile");
        }
      } else {
        setError(response.data.message || "An error occurred");
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
    setFormData({ name: "", email: "", password: "" });
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
            className="bg-dark-bg border border-light-black rounded-2xl p-8 w-full max-w-md relative"
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
                {isLoginMode ? "Welcome Back" : "Create Account"}
              </h2>
              <p className="text-footer-gray">
                {isLoginMode
                  ? "Sign in to access your appointments and profile"
                  : "Join us to book appointments and manage your health"}
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
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
                    ? "Signing In..."
                    : "Creating Account..."
                  : isLoginMode
                    ? "Sign In"
                    : "Create Account"}
              </button>
            </form>

            {/* Toggle Mode */}
            <div className="text-center mt-6 pt-6 border-t border-light-black">
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
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default AuthModal;
