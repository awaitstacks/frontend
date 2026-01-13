// // context/TourAppContext.jsx
// import { createContext, useEffect, useState } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";

// export const TourAppContext = createContext();

// const TourAppContextProvider = (props) => {
//   const currencySymbol = "₹";
//   const backendUrl = import.meta.env.VITE_BACKEND_URL;

//   const [tours, setTours] = useState([]);

//   const [token, setToken] = useState(
//     localStorage.getItem("token") ? localStorage.getItem("token") : false
//   );

//   const [userData, setUserData] = useState(false);

//   const getToursData = async () => {
//     try {
//       const { data } = await axios.get(backendUrl + "/api/tour/list");
//       if (data.success) {
//         setTours(data.tours);
//       } else {
//         toast.error(data.message);
//       }
//     } catch (error) {
//       console.log(error);
//       toast.error(error.message);
//     }
//   };

//   const loadUserProfileData = async () => {
//     if (!token) return;
//     try {
//       const { data } = await axios.get(backendUrl + "/api/user/get-profile", {
//         headers: { token },
//       });
//       if (data.success) {
//         setUserData(data.user);
//       } else {
//         toast.error(data.message);
//       }
//     } catch (error) {
//       console.log(error);
//       toast.error(error.message);
//     }
//   };

//   // LOGOUT FUNCTION
//   const logout = () => {
//     setToken(false);
//     setUserData(false);
//     localStorage.removeItem("token");
//     toast.success("Logged out successfully!");
//   };

//   const value = {
//     tours,
//     setTours,
//     getToursData,
//     currencySymbol,
//     token,
//     setToken,
//     backendUrl,
//     userData,
//     setUserData,
//     loadUserProfileData,
//     logout, // ← Added
//   };

//   useEffect(() => {
//     getToursData();
//   }, []);

//   useEffect(() => {
//     if (token) {
//       loadUserProfileData();
//     } else {
//       setUserData(false);
//     }
//   }, [token]);

//   return (
//     <TourAppContext.Provider value={value}>
//       {props.children}
//     </TourAppContext.Provider>
//   );
// };

// export default TourAppContextProvider;




// context/TourAppContext.jsx
// import { createContext, useEffect, useState } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";

// export const TourAppContext = createContext();

// const TourAppContextProvider = (props) => {
//   const currencySymbol = "₹";
//   const backendUrl = import.meta.env.VITE_BACKEND_URL;

//   const [tours, setTours] = useState([]);
//   const [availableYears, setAvailableYears] = useState([]); // ← List of years for dropdown

//   const [token, setToken] = useState(
//     localStorage.getItem("token") ? localStorage.getItem("token") : false
//   );

//   const [userData, setUserData] = useState(false);

//   // Existing: Load all tours
//   const getToursData = async () => {
//     try {
//       const { data } = await axios.get(`${backendUrl}/api/tour/list`);
//       if (data.success) {
//         setTours(data.tours);
//       } else {
//         toast.error(data.message);
//       }
//     } catch (error) {
//       console.log(error);
//       toast.error(error.message || "Failed to load tours");
//     }
//   };

//   // NEW: Fetch all available years dynamically (for dropdown)
//   const getAvailableTourYears = async () => {
//     try {
//       const { data } = await axios.get(`${backendUrl}/api/tour/year`);
//       if (data.success) {
//         setAvailableYears(data.years); // Expecting: { success: true, years: [2026, 2025, 2024...] }
//       } else {
//         toast.error(data.message || "Failed to load tour years");
//       }
//     } catch (error) {
//       console.error("Error fetching tour years:", error);
//       toast.error("Could not load years");
//     }
//   };

//   // NEW: Fetch all tours (available + sold out) for a specific year
//   const getToursByYear = async (year) => {
//     try {
//       const { data } = await axios.get(`${backendUrl}/api/tour/year/${year}`);
//       if (data.success) {
//         return {
//           selectedYear: data.selectedYear,
//           totalTours: data.totalTours,
//           availableCount: data.availableCount,
//           soldOutCount: data.soldOutCount,
//           tours: data.tours, // Contains both available & sold out
//         };
//       } else {
//         toast.error(data.message || "No tours found for this year");
//         return null;
//       }
//     } catch (error) {
//       console.error(`Error fetching tours for year ${year}:`, error);
//       toast.error("Server error while loading tours");
//       return null;
//     }
//   };

//   const loadUserProfileData = async () => {
//     if (!token) return;
//     try {
//       const { data } = await axios.get(`${backendUrl}/api/user/get-profile`, {
//         headers: { token },
//       });
//       if (data.success) {
//         setUserData(data.user);
//       } else {
//         toast.error(data.message);
//       }
//     } catch (error) {
//       console.log(error);
//       toast.error(error.message);
//     }
//   };

//   const logout = () => {
//     setToken(false);
//     setUserData(false);
//     localStorage.removeItem("token");
//     toast.success("Logged out successfully!");
//   };

//   const value = {
//     tours,
//     setTours,
//     getToursData,
//     currencySymbol,
//     token,
//     setToken,
//     backendUrl,
//     userData,
//     setUserData,
//     loadUserProfileData,
//     logout,

//     // NEW: Export year-related data and functions
//     availableYears,
//     getAvailableTourYears,
//     getToursByYear,
//   };

//   // Load all tours + available years on app start
//   useEffect(() => {
//     getToursData();
//     getAvailableTourYears(); // Automatically fetch years for dropdown
//   }, []);

//   useEffect(() => {
//     if (token) {
//       loadUserProfileData();
//     } else {
//       setUserData(false);
//     }
//   }, [token]);

//   return (
//     <TourAppContext.Provider value={value}>
//       {props.children}
//     </TourAppContext.Provider>
//   );
// };

// export default TourAppContextProvider;

import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const TourAppContext = createContext();

const TourAppContextProvider = (props) => {
  const currencySymbol = "₹";
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [tours, setTours] = useState([]);
  const [availableYears, setAvailableYears] = useState([]); // ← List of years for dropdown

  const [token, setToken] = useState(
    localStorage.getItem("token") ? localStorage.getItem("token") : false
  );

  const [userData, setUserData] = useState(false);

  // Existing: Load all tours
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

  // NEW: Fetch all available years dynamically (for dropdown)
  const getAvailableTourYears = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/tour/year`);
      if (data.success) {
        setAvailableYears(data.years); // Expecting: { success: true, years: [2026, 2025, 2024...] }
      } else {
        toast.error(data.message || "Failed to load tour years");
      }
    } catch (error) {
      console.error("Error fetching tour years:", error);
      toast.error("Could not load years");
    }
  };

  // NEW: Fetch all tours (available + sold out) for a specific year
  const getToursByYear = async (year) => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/tour/year/${year}`);
      if (data.success) {
        return {
          selectedYear: data.selectedYear,
          totalTours: data.totalTours,
          availableCount: data.availableCount,
          soldOutCount: data.soldOutCount,
          tours: data.tours, // Contains both available & sold out
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

  const value = {
    tours,
    setTours,
    getToursData,
    currencySymbol,
    token,
    setToken,
    backendUrl,
    userData,
    setUserData,
    loadUserProfileData,
    logout,

    // NEW: Export year-related data and functions
    availableYears,
    getAvailableTourYears,
    getToursByYear,
  };

  // Load all tours + available years on app start
  useEffect(() => {
    getToursData();
    getAvailableTourYears(); // Automatically fetch years for dropdown
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