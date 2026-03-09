// context/TourAppContext.jsx

import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const TourAppContext = createContext();

const TourAppContextProvider = (props) => {
  const currencySymbol = "₹";
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [tours, setTours] = useState([]);
  const [availableYears, setAvailableYears] = useState([]);

  const [token, setToken] = useState(
    localStorage.getItem("token") ? localStorage.getItem("token") : false,
  );

  const [userData, setUserData] = useState(false);

  // ────────────────────────────────────────────────
  //               Tours & Years
  // ────────────────────────────────────────────────

  const getToursData = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/tour/list`);
      if (data.success) {
        setTours(data.tours);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message || "Failed to load tours");
    }
  };

  const getAvailableTourYears = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/tour/year`);
      if (data.success) {
        setAvailableYears(data.years);
      } else {
        toast.error(data.message || "Failed to load tour years");
      }
    } catch (error) {
      console.error("Error fetching tour years:", error);
      toast.error("Could not load years");
    }
  };

  const getToursByYear = async (year) => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/tour/year/${year}`);
      if (data.success) {
        return {
          selectedYear: data.selectedYear,
          totalTours: data.totalTours,
          availableCount: data.availableCount,
          soldOutCount: data.soldOutCount,
          tours: data.tours,
        };
      } else {
        toast.error(data.message || "No tours found for this year");
        return null;
      }
    } catch (error) {
      console.error(`Error fetching tours for year ${year}:`, error);
      toast.error("Server error while loading tours");
      return null;
    }
  };

  // ────────────────────────────────────────────────
  //               User Profile & Auth
  // ────────────────────────────────────────────────

  const loadUserProfileData = async () => {
    if (!token) return;
    try {
      const { data } = await axios.get(`${backendUrl}/api/user/get-profile`, {
        headers: { token },
      });
      if (data.success) {
        setUserData(data.user);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const logout = () => {
    setToken(false);
    setUserData(false);
    localStorage.removeItem("token");
    toast.success("Logged out successfully!");
  };

  // ────────────────────────────────────────────────
  //          Booking + Terms Agreement APIs
  // ────────────────────────────────────────────────

  // Get current active Terms & Conditions (shown before agreement)
  const getCurrentTourTerms = async () => {
    try {
      const { data } = await axios.get(
        `${backendUrl}/api/bookings/terms/current`,
      );

      if (data.success) {
        return {
          success: true,
          terms: data.data,
        };
      } else {
        return { success: false, message: data.message };
      }
    } catch (error) {
      const msg =
        error.response?.data?.message ||
        error.message ||
        "Failed to fetch current terms";
      console.error("getCurrentTourTerms error:", error);
      toast.error(msg);
      return { success: false, message: msg };
    }
  };

  // Submit emergency contact + terms agreement for a booking (TNR)
  const submitBookingTermsAgreement = async (
    tnr,
    emergencyContact,
    termsAgreed = true,
  ) => {
    if (!tnr || tnr.length !== 6 || !/^[A-Z0-9]{6}$/i.test(tnr)) {
      toast.error("Invalid booking reference (TNR)");
      return { success: false, message: "Invalid TNR format" };
    }

    if (!emergencyContact || !/^[0-9]{10}$/.test(emergencyContact)) {
      toast.error("Please enter a valid 10-digit emergency contact number");
      return { success: false, message: "Invalid emergency contact" };
    }

    if (!termsAgreed) {
      toast.error("You must agree to the terms and conditions");
      return { success: false, message: "Terms must be agreed" };
    }

    try {
      const { data } = await axios.post(
        `${backendUrl}/api/bookings/${tnr.toUpperCase()}/agree-terms`,
        {
          emergencyContact,
          termsAgreed,
        },
      );

      if (data.success) {
        return { success: true, data: data.data };
      } else {
        return { success: false, message: data.message };
      }
    } catch (error) {
      const msg =
        error.response?.data?.message ||
        error.message ||
        "Failed to submit terms agreement";
      console.error("submitBookingTermsAgreement error:", error);
      toast.error(msg);
      return { success: false, message: msg };
    }
  };

  // Get basic booking summary by TNR (title, date, traveller count...)
  const getBookingSummary = async (tnr) => {
    if (!tnr || tnr.length !== 6 || !/^[A-Z0-9]{6}$/i.test(tnr)) {
      toast.error("Invalid booking reference (TNR)");
      return { success: false, message: "Invalid TNR" };
    }

    try {
      const { data } = await axios.get(
        `${backendUrl}/api/bookings/${tnr.toUpperCase()}/summary`,
      );

      if (data.success) {
        return { success: true, data: data.data };
      } else {
        return { success: false, message: data.message };
      }
    } catch (error) {
      const msg =
        error.response?.data?.message ||
        error.message ||
        "Failed to fetch booking summary";
      toast.error(msg);
      return { success: false, message: msg };
    }
  };

  // ────────────────────────────────────────────────
  //                   Context Value
  // ────────────────────────────────────────────────

  const value = {
    // Tours
    tours,
    setTours,
    getToursData,
    availableYears,
    getAvailableTourYears,
    getToursByYear,
    currencySymbol,

    // Auth & User
    token,
    setToken,
    userData,
    setUserData,
    loadUserProfileData,
    logout,

    // Booking + Terms
    getCurrentTourTerms,
    submitBookingTermsAgreement,
    getBookingSummary,

    backendUrl,
  };

  // ────────────────────────────────────────────────
  //                   Effects
  // ────────────────────────────────────────────────

  useEffect(() => {
    getToursData();
    getAvailableTourYears();
  }, []);

  useEffect(() => {
    if (token) {
      loadUserProfileData();
    } else {
      setUserData(false);
    }
  }, [token]);

  return (
    <TourAppContext.Provider value={value}>
      {props.children}
    </TourAppContext.Provider>
  );
};

export default TourAppContextProvider;
