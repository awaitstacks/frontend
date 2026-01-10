

import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { TourAppContext } from "../context/TourAppContext.jsx";

const TopTours = () => {
  const navigate = useNavigate();
  const { tours, currencySymbol } = useContext(TourAppContext);

  const handleCardClick = (tourId) => {
    navigate(`/tour-details/${tourId}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleViewAll = () => {
    navigate("/tours");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const featuredTours = tours.slice(0, 4);

  return (
    <section >
      {/* Very subtle calming orbs - reduced opacity for cleaner look */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-12 xs:top-16 left-4 xs:left-1/6 w-48 xs:w-64 h-48 xs:h-64 bg-gray-100/20 rounded-full blur-2xl sm:blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-12 xs:bottom-20 right-4 xs:right-1/6 w-48 xs:w-56 h-48 xs:h-56 bg-gray-50/15 rounded-full blur-2xl sm:blur-3xl animate-pulse-slow delay-1000"></div>
      </div>

      {/* Main Content Wrapper - ultra responsive width */}
  <div className="
  w-full 
  max-w-[94vw] xs:max-w-[94%] sm:max-w-[96%] md:max-w-[92vw] 
  lg:max-w-[90vw] xl:max-w-[88vw] 2xl:max-w-[86vw]
  mx-auto
  rounded-2xl sm:rounded-3xl md:rounded-[2.5rem] lg:rounded-[3rem]
  backdrop-blur-xl bg-white/45 border border-white/50
  shadow-xl md:shadow-2xl
  overflow-hidden
  p-6 xs:p-8 sm:p-10 md:p-12 lg:p-16 xl:p-20
">
     {/* Heading */}
  <div className="text-center mb-8 xs:mb-10 sm:mb-12 md:mb-14">
    <h1 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 md:mb-4 tracking-tight">
      Our Most Loved Tours
    </h1>
    <p className="text-sm xs:text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl md:max-w-3xl mx-auto leading-relaxed">
      Curated experiences that inspire peace and wonder.
    </p>
  </div>

        {/* Responsive Grid: 1 → 2 columns */}
       {/* Responsive Grid - smaller cards */}
<div className="grid grid-cols-1 sm:grid-cols-2 gap-5 xs:gap-6 sm:gap-7 md:gap-8 lg:gap-10 max-w-4xl lg:max-w-5xl mx-auto">
  {featuredTours.map((item) => (
    <div
      key={item._id}
      onClick={() => handleCardClick(item._id)}
      className="
        group relative 
        rounded-xl sm:rounded-2xl overflow-hidden 
        bg-white/60 backdrop-blur-sm border border-white/70
        shadow-lg hover:shadow-xl transition-all duration-500 
        hover:-translate-y-2 cursor-pointer
      "
    >
      {/* Minimal hover glow */}
      <div className="absolute inset-0 rounded-xl sm:rounded-2xl bg-gradient-to-br from-blue-100/10 to-indigo-100/10 opacity-0 group-hover:opacity-100 transition-opacity duration-600"></div>

      {/* Smaller Image */}
      <div className="relative overflow-hidden">
        <img
          src={item.titleImage}
          alt={item.title}
          className="
            w-full 
            h-36 xs:h-40 sm:h-44 md:h-48 lg:h-52    // ← Reduced heights (was 48/52/56/60/64/72)
            object-cover 
            group-hover:scale-105 transition-transform duration-800
          "
        />
      </div>

      {/* Reduced Padding & Text */}
      <div className="relative p-3 xs:p-4 sm:p-5 md:p-6">
        {/* Availability */}
        <div className="flex items-center gap-2 text-xs mb-2">
          <div
            className={`w-2 h-2 rounded-full ${item.available ? "bg-green-500" : "bg-gray-400"}`}
          />
          <span className={`font-medium ${item.available ? "text-green-700" : "text-gray-500"}`}>
            {item.available ? "Available" : "Sold Out"}
          </span>
        </div>

        {/* Title - slightly smaller */}
        <h3 className="
          text-sm xs:text-base sm:text-lg md:text-xl 
          font-semibold text-gray-900 group-hover:text-blue-700 
          transition-colors duration-400 line-clamp-2 mb-2
        ">
          {item.title}
        </h3>

        {/* Details - compact */}
        <div className="space-y-1 text-xs xs:text-sm text-gray-700">
          <p>Batch: {item.batch}</p>
          <p className="font-medium text-gray-900">
            {currencySymbol}{item.price.doubleSharing.toLocaleString()}
          </p>
          <p>{item.duration.days}D / {item.duration.nights}N</p>
        </div>
      </div>
    </div>
  ))}
</div>

        {/* CTA Button - centered & responsive */}
      <div className="flex justify-center mt-10 xs:mt-12 sm:mt-14 md:mt-16">
          <button
            onClick={handleViewAll}
            className="
              inline-flex items-center gap-2 sm:gap-3 
              px-6 xs:px-8 sm:px-10 py-3 sm:py-4 
              bg-white border border-gray-200 
              text-gray-700 font-medium text-sm sm:text-base 
              rounded-full 
              hover:bg-blue-50 hover:border-blue-200 hover:text-blue-700 
              hover:shadow transition-all duration-400
            "
          >
            View All Tours
            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Pulse animation */}
      <style>{`
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.06; transform: scale(1); }
          50% { opacity: 0.12; transform: scale(1.03); }
        }
        .animate-pulse-slow { animation: pulse-slow 20s ease-in-out infinite; }
        .delay-1000 { animation-delay: 5s; }
      `}</style>
    </section>
  );
};

export default TopTours;