/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { TourAppContext } from "../context/TourAppContext.jsx";

const Tours = () => {
  const { batch } = useParams();
  const navigate = useNavigate();
  const { tours, currencySymbol, availableYears } = useContext(TourAppContext);

  const [filterTour, setFilterTour] = useState([]);
  const [visibleCount, setVisibleCount] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedYear, setSelectedYear] = useState("all");
  const [selectedMonth, setSelectedMonth] = useState("all"); // ← Missing state added
  const [availability, setAvailability] = useState("available"); // Default blinking Available
  const [activeCategory, setActiveCategory] = useState(null);

  useEffect(() => {
    let filtered = tours || [];

    if (batch) {
      filtered = filtered.filter((tour) => tour.batch === batch);
    }

    if (activeCategory) {
      filtered = filtered.filter((tour) => tour.batch === activeCategory);
    }

    if (selectedYear !== "all") {
      filtered = filtered.filter((tour) => {
        if (!tour.lastBookingDate) return false;
        const tourYear = new Date(tour.lastBookingDate)
          .getFullYear()
          .toString();
        return tourYear === selectedYear;
      });
    }

    // Month Filter (added)
    if (selectedMonth !== "all") {
      filtered = filtered.filter((tour) => {
        if (!tour.lastBookingDate) return false;
        const tourMonth = new Date(tour.lastBookingDate).getMonth() + 1; // 1-12
        return tourMonth === parseInt(selectedMonth);
      });
    }

    if (availability === "available") {
      filtered = filtered.filter((tour) => tour.available === true);
    } else if (availability === "soldout") {
      filtered = filtered.filter((tour) => tour.available === false);
    }

    if (searchTerm.trim()) {
      filtered = filtered.filter((tour) =>
        tour.title.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    filtered = filtered.sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

    setFilterTour(filtered);
    setVisibleCount(5);
  }, [
    tours,
    batch,
    activeCategory,
    selectedYear,
    selectedMonth,
    availability,
    searchTerm,
  ]);

  const handleCardClick = (tourId) => {
    navigate(`/tour-details/${tourId}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleShowMore = () => {
    setVisibleCount((prev) => prev + 5);
  };

  const displayedTours = filterTour.slice(0, visibleCount);

  const categories = [
    { name: "Historical", value: "Historical" },
    { name: "Jolly", value: "Jolly" },
    { name: "Spiritual", value: "Spiritual" },
    { name: "Spiritual + Sightseeing", value: "Spiritual+Sightseeing" },
    { name: "International", value: "International" },
  ];

  // Reset active category on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".category-button")) {
        setActiveCategory(null);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <section
      className="
      relative 
      min-h-[65vh] xs:min-h-[70vh] sm:min-h-[75vh] md:min-h-[80vh] lg:min-h-[85vh] 
      flex items-center justify-center 
      px-4 xs:px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 
      pt-0 pb-12 sm:pb-16 md:pb-20 lg:pb-24 xl:pb-28
      "
    >
      {/* Main Glass Container */}
      <div
        className="
        w-full 
        max-w-[94vw] xs:max-w-[94%] sm:max-w-[96%] md:max-w-[92vw] 
        lg:max-w-[90vw] xl:max-w-[88vw] 2xl:max-w-[86vw]
        mx-auto
        rounded-2xl sm:rounded-3xl md:rounded-[2.5rem] lg:rounded-[3rem]
        backdrop-blur-xl bg-white/45 border border-white/50
        shadow-xl md:shadow-2xl
        overflow-hidden
        p-6 xs:p-8 sm:p-10 md:p-12 lg:p-16 xl:p-20
      "
      >
        {/* Title */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 tracking-tight">
            Explore All Our Tours
          </h1>
          <p className="text-gray-600 max-w-xl mx-auto text-lg">
            Carefully curated experiences for a journey of peace and discovery.
          </p>
        </div>

        {/* Filters */}
        <div className="mb-12 space-y-6">
          {/* Top Row */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 flex-wrap">
            <div className="flex items-center gap-4 flex-wrap justify-center">
              <button
                onClick={() => setSelectedYear("all")}
                className={`px-7 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 border backdrop-blur-md ${
                  selectedYear === "all"
                    ? "bg-blue-600 text-white border-blue-600 shadow-xl shadow-blue-200/30 scale-105"
                    : "bg-white/70 border-gray-200 text-gray-700 hover:bg-white/90 hover:border-blue-300 hover:text-blue-700"
                }`}
              >
                All Tours
              </button>

              {/* Year Dropdown */}
              <div className="relative min-w-[160px]">
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  className="
                    appearance-none w-full px-6 py-3 pr-12 
                    rounded-full bg-white/70 backdrop-blur-xl 
                    border border-white/40 shadow-lg shadow-black/5
                    text-gray-800 text-sm font-medium
                    focus:outline-none focus:ring-4 focus:ring-indigo-300/50 focus:border-indigo-500
                    transition-all duration-300 cursor-pointer
                    hover:bg-white/90 hover:shadow-xl"
                >
                  <option value="all">All Years</option>
                  {availableYears?.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
                {/* Custom elegant arrow */}
                <span className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-indigo-500 text-base font-bold">
                  ▼
                </span>
              </div>

              {/* Month Dropdown */}
              <div className="relative min-w-[180px]">
                <select
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(e.target.value)}
                  className="
                    appearance-none w-full px-6 py-3 pr-12 
                    rounded-full bg-white/70 backdrop-blur-xl 
                    border border-white/40 shadow-lg shadow-black/5
                    text-gray-800 text-sm font-medium
                    focus:outline-none focus:ring-4 focus:ring-indigo-300/50 focus:border-indigo-500
                    transition-all duration-300 cursor-pointer
                    hover:bg-white/90 hover:shadow-xl"
                >
                  <option value="all">All Months</option>
                  <option value="1">January</option>
                  <option value="2">February</option>
                  <option value="3">March</option>
                  <option value="4">April</option>
                  <option value="5">May</option>
                  <option value="6">June</option>
                  <option value="7">July</option>
                  <option value="8">August</option>
                  <option value="9">September</option>
                  <option value="10">October</option>
                  <option value="11">November</option>
                  <option value="12">December</option>
                </select>
                <span className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-indigo-500 text-base font-bold">
                  ▼
                </span>
              </div>
            </div>

            {/* Availability Buttons */}
            <div className="flex gap-3 flex-wrap justify-center">
              {["Available", "Sold Out"].map((label) => {
                const value = label.toLowerCase().replace(" ", "");
                return (
                  <button
                    key={label}
                    onClick={() => setAvailability(value)}
                    className={`px-7 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 border backdrop-blur-md ${
                      availability === value
                        ? label === "Available"
                          ? "bg-green-600 text-white border-green-600 shadow-xl shadow-green-200/30 scale-105"
                          : "bg-red-600 text-white border-red-600 shadow-xl shadow-red-200/30 scale-105"
                        : "bg-white/70 border-gray-200 text-gray-700 hover:bg-white/90 hover:border-gray-300 hover:text-gray-700"
                    }`}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Category Buttons */}
          <div className="flex flex-wrap gap-4 justify-center">
            {categories.map((cat) => (
              <button
                key={cat.value || "all"}
                onClick={() => {
                  setActiveCategory(cat.value);
                  navigate(cat.value ? `/tours/${cat.value}` : "/tours");
                }}
                className={`category-button px-7 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 border backdrop-blur-md ${
                  activeCategory === cat.value
                    ? "bg-blue-600 text-white border-blue-600 shadow-xl shadow-blue-200/30 scale-105"
                    : "bg-white/70 border-gray-200 text-gray-700 hover:bg-white/90 hover:border-blue-300 hover:text-blue-700"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Clear Filters Button */}
          <div className="flex justify-center mt-6">
            <button
              onClick={() => {
                setSelectedMonth("all");
                setSelectedYear("all");
                setAvailability("available");
                setActiveCategory(null);
                navigate("/tours");
              }}
              className="px-10 py-4 bg-white-50 text-indigo-700 rounded-full font-medium hover:bg-blue-50 transition-all shadow-md hover:shadow-lg text-red-700 "
            >
              Clear Filters
            </button>
          </div>
        </div>

        {/* Tour Grid */}
        {filterTour.length === 0 ? (
          <div className="text-center py-20 bg-white/70 backdrop-blur-md rounded-3xl border border-gray-100">
            <p className="text-gray-500 font-medium text-lg">
              {batch ||
              selectedMonth !== "all" ||
              selectedYear !== "all" ||
              availability !== "available" ||
              activeCategory
                ? "No tours found matching your filters."
                : "No tours available at the moment."}
            </p>
            {(batch || activeCategory) && (
              <button
                onClick={() => {
                  setSelectedMonth("all");
                  setSelectedYear("all");
                  setAvailability("available");
                  setActiveCategory(null);
                  navigate("/tours");
                }}
                className="mt-4 text-blue-600 font-bold hover:underline"
              >
                Clear filters & View all tours
              </button>
            )}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8 max-w-3xl mx-auto">
              {displayedTours.map((item) => (
                <div
                  key={item._id}
                  onClick={() => handleCardClick(item._id)}
                  className="group relative bg-white rounded-2xl overflow-hidden shadow hover:shadow-md transition-all duration-500 hover:-translate-y-2 cursor-pointer border border-gray-50"
                >
                  {/* Hover glow */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-300/3 to-indigo-300/3 opacity-0 group-hover:opacity-100 transition-opacity duration-600"></div>

                  {/* Image */}
                  <div className="relative overflow-hidden">
                    <img
                      src={item.titleImage}
                      alt={item.title}
                      className="w-full h-40 md:h-44 object-cover group-hover:scale-105 transition-transform duration-800"
                    />
                  </div>

                  {/* Content */}
                  <div className="relative p-4 md:p-5 text-left">
                    <div className="flex items-center gap-2 text-xs mb-2">
                      <div
                        className={`w-1.5 h-1.5 rounded-full ${
                          item.available ? "bg-green-500" : "bg-gray-400"
                        }`}
                      />
                      <span
                        className={`text-xs font-medium ${
                          item.available ? "text-green-700" : "text-gray-500"
                        }`}
                      >
                        {item.available ? "Available" : "Sold Out"}
                      </span>
                    </div>

                    <h3 className="text-base md:text-lg font-semibold text-gray-800 group-hover:text-blue-700 transition-colors duration-400 line-clamp-2 mb-1">
                      {item.title}
                    </h3>

                    <div className="space-y-1 text-xs text-gray-600">
                      <p className="text-gray-500">Batch: {item.batch}</p>
                      <p className="text-sm font-medium text-gray-800">
                        {currencySymbol}
                        {item.price.doubleSharing.toLocaleString()}
                      </p>
                      <p className="text-xs text-gray-500">
                        {item.duration.days}D/{item.duration.nights}N
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Show More */}
            {filterTour.length > visibleCount && (
              <div className="text-center mt-16">
                <button
                  onClick={handleShowMore}
                  className="px-10 py-4 bg-indigo-100 text-indigo-700 rounded-xl font-medium hover:bg-indigo-200 transition-all shadow-md hover:shadow-lg"
                >
                  Show More Tours
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* Pulse animation */}
      <style>{`
        @keyframes pulse-slow {
          0%, 100% { transform: scale(1); opacity: 0.2; }
          50% { transform: scale(1.05); opacity: 0.3; }
        }
        .animate-pulse-slow { animation: pulse-slow 15s ease-in-out infinite; }
        .delay-2000 { animation-delay: 2s; }
      `}</style>
    </section>
  );
};

export default Tours;
