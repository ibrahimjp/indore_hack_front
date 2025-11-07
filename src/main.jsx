import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import AppContextProvider from "./context/AppContext.jsx";
import App from "./App.jsx";
import Pharmacy from "./components/Pharmacy/Pharmacy.jsx";
import Payment from "./components/Payment/Payment.jsx";
import Price from "./components/Price/Price.jsx";
import Footer from "./components/Footer/Footer.jsx";
import Navbar from "./components/Navbar.jsx";
import FindDoctorPage from "./components/FindDoctorPage/FindDoctorPage.jsx";
import Profile from "./pages/Profile.jsx";
import Appointments from "./pages/Appointments.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AppContextProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/Doctor" element={<FindDoctorPage />} />
          <Route path="/Pharmacy" element={<Pharmacy />} />
          <Route path="/Payment" element={<Payment />} />
          <Route path="/Price" element={<Price />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/appointments" element={<Appointments />} />
        </Routes>
        <Footer />
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
          toastStyle={{
            backgroundColor: "#1e1e1e",
            color: "#ffffff",
            border: "1px solid rgba(165, 165, 165, 0.2)",
          }}
        />
      </Router>
    </AppContextProvider>
  </StrictMode>,
);
