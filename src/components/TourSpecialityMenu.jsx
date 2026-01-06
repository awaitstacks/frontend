import React from "react";
import { Link } from "react-router-dom";
import { batch } from "../assets/tourAsset.js";

const TourSpecialityMenu = () => {
  // Limit to 9 for perfect 3x3 grid
  const displayedCategories = batch.slice(0, 9);

  return (
    <section
      className="relative overflow-hidden bg-gradient-to-br from-white-50 via-white-50 to-white-100 py-20 md:py-28 lg:py-32"
      id="speciality"
    >
      {/* Consistent Calming wave pattern overlay from Header */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_70%,rgba(147,197,253,0.3)_0%,transparent_50%),radial-gradient(circle_at_30%_30%,rgba(165,180,252,0.2)_0%,transparent_50%)]"></div>
      </div>

      {/* Subtle Background Blobs for depth */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-50 rounded-full blur-[120px] opacity-40"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-50 rounded-full blur-[120px] opacity-40"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 lg:px-12 text-center">
        {/* Compact Heading */}
        <div className="mb-16 md:mb-20">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-4 tracking-tight">
            Find Your Perfect <span className="text-blue-600">Journey</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Choose from our curated tour categories designed for every type of
            explorer.
          </p>
        </div>

        {/* Clean 3x3 Grid – Glassmorphism Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto">
          {displayedCategories.map((item, index) => (
            <Link
              key={index}
              to={`/tours/${item.speciality}`}
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="group relative p-8 bg-white/40 backdrop-blur-md rounded-3xl border border-white/60 shadow-[0_4px_20px_0_rgba(148,163,184,0.1)] hover:shadow-[0_20px_40px_0_rgba(148,163,184,0.15)] transition-all duration-500 hover:-translate-y-2 flex flex-col items-center justify-center min-h-32 md:min-h-40 overflow-hidden"
            >
              {/* Internal Glossy Shine Effect */}
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/40 to-transparent pointer-events-none"></div>

              {/* Category Name */}
              <h3 className="relative z-10 text-lg md:text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
                {item.speciality}
              </h3>

              {/* Animated underline */}
              <div className="mt-3 w-8 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center"></div>
            </Link>
          ))}
        </div>

        {/* Minimal CTA */}
        {batch.length > 9 && (
          <div className="mt-16">
            <Link
              to="/tours"
              className="text-gray-500 hover:text-blue-600 font-semibold uppercase tracking-widest text-sm transition-all flex items-center justify-center gap-2 group"
            >
              View all tours
              <span className="group-hover:translate-x-1 transition-transform">
                →
              </span>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default TourSpecialityMenu;
