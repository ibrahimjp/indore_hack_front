import { createContext } from "react";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { URLS } from "../config/urls.js";

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const currencySymbol = "$";
  const backendUrl = URLS.BACKEND_URL;
  const [doctors, setDoctors] = useState([]);

  const [token, setToken] = useState(localStorage.getItem("token") || false);
  const [userData, setUserData] = useState(false);
  
  // Doctor authentication
  const [dToken, setDToken] = useState(localStorage.getItem("dToken") || false);
  const [doctorData, setDoctorData] = useState(false);

  const getDoctorsData = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/doctor/list");
      if (data.success) {
        setDoctors(data.doctors);
      }
    } catch (err) {
      console.error(err.response?.data?.message || "Failed to fetch doctors");
    }
  };

  const loadUserProfileData = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/user/get-profile", {
        headers: { token },
      });

      if (data.success) {
        setUserData(data.userData);
      }
    } catch (error) {
      console.error(
        error.response?.data?.message || "Failed to load user profile",
      );
    }
  };

  const loadDoctorProfileData = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/doctor/profile", {
        headers: { dToken },
      });

      if (data.success) {
        setDoctorData(data.profileData);
      }
    } catch (error) {
      console.error(
        error.response?.data?.message || "Failed to load doctor profile",
      );
    }
  };

  useEffect(() => {
    getDoctorsData();
  }, []);

  useEffect(() => {
    if (token) {
      loadUserProfileData();
    } else {
      setUserData(false);
    }
  }, [token]);

  useEffect(() => {
    if (dToken) {
      loadDoctorProfileData();
    } else {
      setDoctorData(false);
    }
  }, [dToken]);

  const value = {
    doctors,
    currencySymbol,
    backendUrl,
    token,
    setToken,
    userData,
    setUserData,
    loadUserProfileData,
    getDoctorsData,
    // Doctor authentication
    dToken,
    setDToken,
    doctorData,
    setDoctorData,
    loadDoctorProfileData,
    // URL Configuration
    urls: URLS,
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export default AppContextProvider;
