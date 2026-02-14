import React from "react";
import { Route, Routes } from "react-router-dom";

import Login from "./pages/Login.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import MyProfile from "./pages/MyProfile.jsx";

import Footer from "./components/Footer.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Tours from "./pages/Tours.jsx";
import TourHome from "./pages/TourHome.jsx";
import TourNavbar from "./components/TourNavbar.jsx";
import TourBooking from "./pages/Booking.jsx";
import MyBookings from "./pages/MyBookings.jsx";
import TourDetails from "./pages/TourDetails.jsx";

const TourApp = () => {
  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden bg-gradient-to-b from-white via-sky-50 to-sky-100">
      {/* Toast Notifications */}
      <ToastContainer />

      {/* Subtle floating watermark icons – visible on all pages */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-1/4 left-8 text-8xl text-blue-300 animate-float-slow">
          📍
        </div>
        <div className="absolute top-1/3 right-16 text-9xl text-sky-300 animate-float-slow delay-1000">
          🧳
        </div>
        <div className="absolute bottom-1/3 left-1/3 text-7xl text-blue-200 animate-float-slow delay-2000">
          🧭
        </div>
        <div className="absolute bottom-44 right-12 text-8xl text-sky-200 animate-float-slow delay-3000">
          ✈️
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-9xl text-blue-100 animate-float-slow delay-4000">
          🌍
        </div>
      </div>

      {/* Fixed Glass Navbar */}
      <header className="fixed top-0 left-0 right-0 z-50">
        <div className="sticky top-0 z-50 bg-white">
          <div className="mx-4 sm:mx-[10%]">
            <TourNavbar />
          </div>
        </div>
      </header>

      {/* Spacer below fixed navbar */}
      <div className="h-20" />

      {/* Main Content Area */}
      <main className="flex-1 relative z-10 mx-4 sm:mx-[10%] pb-12">
        <Routes>
          <Route path="/" element={<TourHome />} />
          <Route path="/tours" element={<Tours />} />
          <Route path="/tour-details/:tourId" element={<TourDetails />} />
          <Route path="/tours/:batch" element={<Tours />} />
          <Route path="/login" element={<Login />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/my-profile" element={<MyProfile />} />
          <Route path="/booking/:tourId" element={<TourBooking />} />
          <Route path="/my-trolly" element={<MyBookings />} />
        </Routes>
      </main>

      {/* Footer */}
      <footer className="relative z-20 mx-6 sm:mx-[11%] mt-12 pt-8">
        <Footer />
      </footer>

      {/* Soft fade-in at bottom */}
      <div className="h-8 bg-gradient-to-t from-white via-white/80 to-transparent pointer-events-none" />

      {/* Animations */}
      <style>{`
        @keyframes float-slow {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-40px) rotate(8deg);
          }
        }

        .animate-float-slow {
          animation: float-slow 25s ease-in-out infinite;
        }

        .delay-1000 { animation-delay: 1s; }
        .delay-2000 { animation-delay: 2s; }
        .delay-3000 { animation-delay: 3s; }
        .delay-4000 { animation-delay: 4s; }
      `}</style>
    </div>
  );
};

export default TourApp;
