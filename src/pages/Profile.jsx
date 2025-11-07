import React, { useState, useEffect, useContext } from "react";
import { motion } from "framer-motion";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const Profile = () => {
  const { userData, token, backendUrl, loadUserProfileData } =
    useContext(AppContext);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    gender: "",
    dob: "",
    address: { line1: "", line2: "" },
  });
  const [profileImage, setProfileImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  useEffect(() => {
    if (userData) {
      setFormData({
        name: userData.name || "",
        email: userData.email || "",
        phone: userData.phone || "",
        gender: userData.gender || "Not Selected",
        dob: userData.dob || "Not Selected",
        address: userData.address || { line1: "Google Siuu", line2: "" },
      });
    }
  }, [userData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.includes("address.")) {
      const addressField = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        address: {
          ...prev.address,
          [addressField]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage({ type: "", text: "" });

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("phone", formData.phone);
      formDataToSend.append("gender", formData.gender);
      formDataToSend.append("dob", formData.dob);
      formDataToSend.append("address", JSON.stringify(formData.address));

      if (profileImage) {
        formDataToSend.append("image", profileImage);
      }

      const response = await axios.post(
        backendUrl + "/api/user/update-profile",
        formDataToSend,
        {
          headers: {
            token: token,
            "Content-Type": "multipart/form-data",
          },
        },
      );

      if (response.data.success) {
        setMessage({ type: "success", text: "Profile updated successfully!" });
        setIsEditing(false);
        await loadUserProfileData();
        setProfileImage(null);
        toast.success("Profile updated successfully!");
      } else {
        setMessage({
          type: "error",
          text: response.data.message || "Failed to update profile",
        });
        toast.error(response.data.message || "Failed to update profile");
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        "An error occurred while updating profile";
      setMessage({ type: "error", text: errorMessage });
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const cancelEdit = () => {
    setIsEditing(false);
    setProfileImage(null);
    if (userData) {
      setFormData({
        name: userData.name || "",
        email: userData.email || "",
        phone: userData.phone || "",
        gender: userData.gender || "Not Selected",
        dob: userData.dob || "Not Selected",
        address: userData.address || { line1: "Google Siuu", line2: "" },
      });
    }
    setMessage({ type: "", text: "" });
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
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-light-black border border-medium-gray rounded-2xl overflow-hidden"
        >
          {/* Header */}
          <div className="px-8 py-6 border-b border-medium-gray bg-gradient-to-r from-primary-green/10 to-deep-green/10">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold text-off-white">My Profile</h1>
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="bg-primary-green text-dark-bg font-semibold px-6 py-2 rounded-xl hover:bg-deep-green transition-colors"
                >
                  Edit Profile
                </button>
              ) : (
                <div className="flex space-x-3">
                  <button
                    onClick={cancelEdit}
                    className="bg-medium-gray text-dark-bg font-semibold px-6 py-2 rounded-xl hover:bg-footer-gray transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSubmit}
                    disabled={isLoading}
                    className="bg-primary-green text-dark-bg font-semibold px-6 py-2 rounded-xl hover:bg-deep-green transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? "Saving..." : "Save Changes"}
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Message */}
          {message.text && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`mx-8 mt-6 p-4 rounded-xl border ${
                message.type === "success"
                  ? "bg-green-500/10 border-green-500/20 text-green-400"
                  : "bg-red-500/10 border-red-500/20 text-red-400"
              }`}
            >
              {message.text}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="p-8">
            {/* Profile Image Section */}
            <div className="flex items-center space-x-6 mb-8">
              <div className="relative">
                <img
                  src={
                    userData.image ||
                    "https://i.pinimg.com/736x/b9/aa/0f/b9aa0f112ac344f7f0a7254ffa94c42c.jpg"
                  }
                  alt={userData.name || "Profile"}
                  className="w-24 h-24 rounded-full object-cover border-4 border-primary-green/30"
                  onError={(e) => {
                    e.target.src =
                      "https://i.pinimg.com/736x/b9/aa/0f/b9aa0f112ac344f7f0a7254ffa94c42c.jpg";
                  }}
                />
                {isEditing && (
                  <label className="absolute bottom-0 right-0 bg-primary-green text-dark-bg rounded-full p-2 cursor-pointer hover:bg-deep-green transition-colors">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </label>
                )}
              </div>
              <div>
                <h3 className="text-xl font-semibold text-off-white mb-1">
                  {userData.name}
                </h3>
                <p className="text-footer-gray">{userData.email}</p>
                {profileImage && (
                  <p className="text-sm text-primary-green mt-1">
                    New image selected
                  </p>
                )}
              </div>
            </div>

            {/* Form Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-off-white mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="w-full px-4 py-3 bg-dark-bg border border-medium-gray rounded-xl text-off-white placeholder-footer-gray focus:outline-none focus:ring-2 focus:ring-primary-green focus:border-primary-green transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-off-white mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  disabled
                  className="w-full px-4 py-3 bg-dark-bg border border-medium-gray rounded-xl text-footer-gray cursor-not-allowed opacity-50"
                  placeholder="Email cannot be changed"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-off-white mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="w-full px-4 py-3 bg-dark-bg border border-medium-gray rounded-xl text-off-white placeholder-footer-gray focus:outline-none focus:ring-2 focus:ring-primary-green focus:border-primary-green transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  placeholder="Enter your phone number"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-off-white mb-2">
                  Gender
                </label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="w-full px-4 py-3 bg-dark-bg border border-medium-gray rounded-xl text-off-white focus:outline-none focus:ring-2 focus:ring-primary-green focus:border-primary-green transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <option value="Not Selected">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-off-white mb-2">
                  Date of Birth
                </label>
                <input
                  type="date"
                  name="dob"
                  value={formData.dob === "Not Selected" ? "" : formData.dob}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="w-full px-4 py-3 bg-dark-bg border border-medium-gray rounded-xl text-off-white focus:outline-none focus:ring-2 focus:ring-primary-green focus:border-primary-green transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-off-white mb-2">
                  Address Line 1
                </label>
                <input
                  type="text"
                  name="address.line1"
                  value={formData.address.line1}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="w-full px-4 py-3 bg-dark-bg border border-medium-gray rounded-xl text-off-white placeholder-footer-gray focus:outline-none focus:ring-2 focus:ring-primary-green focus:border-primary-green transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  placeholder="Enter address line 1"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-off-white mb-2">
                  Address Line 2 (Optional)
                </label>
                <input
                  type="text"
                  name="address.line2"
                  value={formData.address.line2}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="w-full px-4 py-3 bg-dark-bg border border-medium-gray rounded-xl text-off-white placeholder-footer-gray focus:outline-none focus:ring-2 focus:ring-primary-green focus:border-primary-green transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  placeholder="Enter address line 2 (optional)"
                />
              </div>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default Profile;
