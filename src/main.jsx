import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import AppContextProvider from "./context/AppContext.jsx";
import App from "./App.jsx";
import Pharmacy from "./components/Pharmacy/Pharmacy.jsx";
import Payment from "./components/Payment/Payment.jsx";
import PriceApp from "./components/Price/Price.jsx";
import Footer from "./components/Footer/Footer.jsx";
import Navbar from "./components/Navbar.jsx";
import FindDoctorPage from "./components/FindDoctorPage/FindDoctorPage.jsx";
import Profile from "./pages/Profile.jsx";
import { ToastProvider } from "./components/Toast/Toast.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ToastProvider>
      <AppContextProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/Doctor" element={<FindDoctorPage />} />
            <Route path="/Pharmacy" element={<Pharmacy />} />
            <Route path="/Payment" element={<Payment />} />
            <Route path="/Price" element={<PriceApp />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
          <Footer />
        </Router>
      </AppContextProvider>
    </ToastProvider>
  </StrictMode>,
);
