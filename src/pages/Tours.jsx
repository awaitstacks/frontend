import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { TourAppContext } from "../context/TourAppContext.jsx";

const Tours = () => {
  const { batch } = useParams();
  const navigate = useNavigate();
  const { tours, currencySymbol } = useContext(TourAppContext);

  const [filterTour, setFilterTour] = useState([]);
  const [visibleCount, setVisibleCount] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    let filtered = tours;

    if (batch) {
      filtered = filtered.filter((tour) => tour.batch === batch);
    }

    if (searchTerm.trim()) {
      filtered = filtered.filter((tour) =>
        tour.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    filtered = filtered.sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

    setFilterTour(filtered);
    setVisibleCount(5);
  }, [tours, batch, searchTerm]);

  const handleCardClick = (tourId) => {
    navigate(`/tour-details/${tourId}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleShowMore = () => {
    setVisibleCount((prev) => prev + 5);
  };

  const displayedTours = filterTour.slice(0, visibleCount);

  const categories = [
    { name: "All Tours", value: null },
    { name: "Devotional", value: "Devotional" },
    { name: "Religious", value: "Relegious" },
    { name: "Honeymoon", value: "Honeymoon" },
    { name: "Jolly", value: "Jolly" },
    { name: "Spiritual", value: "Spritual" },
    { name: "Spiritual + Sightseeing", value: "Spritual+Sightseeing" },
  ];

  return (
<section  className="
      relative 
      min-h-[55vh] xs:min-h-[70vh] sm:min-h-[75vh] md:min-h-[80vh] lg:min-h-[85vh] 
      flex items-center justify-center 
      px-4 xs:px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 
      pt-1 xs:pt-5 sm:pt-5 md:pt-6 lg:pt-1   // ← Moves content up a little bit
      py-12 sm:py-16 md:py-20 lg:py-24 xl:py-28
    ">
 


  {/* Main Glass Container with top padding */}
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
        {/* Title */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 tracking-tight">
            {batch ? (
              <>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-700">
                  {batch}
                </span>{" "}
                Journeys
              </>
            ) : (
              "Explore All Our Tours"
            )}
          </h1>
          <p className="text-gray-600 max-w-xl mx-auto text-lg">
            Carefully curated experiences for a journey of peace and discovery.
          </p>
        </div>

        {/* Filters + Search */}
        <div className="mb-12 flex flex-col sm:flex-row gap-6 items-center justify-between">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((cat) => (
              <button
                key={cat.value || "all"}
                onClick={() =>
                  navigate(cat.value ? `/tours/${cat.value}` : "/tours")
                }
                className={`px-7 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 border backdrop-blur-md ${
                  batch === cat.value || (!batch && cat.value === null)
                    ? "bg-blue-600 text-white border-blue-600 shadow-xl shadow-blue-200/30 scale-105"
                    : "bg-white/70 border-gray-200 text-gray-700 hover:bg-white/90 hover:border-blue-300 hover:text-blue-700"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          <input
            type="text"
            placeholder="Search tours by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full sm:w-80 px-6 py-3 rounded-full border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-100 transition-all text-gray-800 placeholder-gray-500"
          />
        </div>

        {/* Tour Grid - EXACT SAME as TopTours */}
        {filterTour.length === 0 ? (
          <div className="text-center py-20 bg-white/70 backdrop-blur-md rounded-3xl border border-gray-100">
            <p className="text-gray-500 font-medium text-lg">
              {searchTerm || batch
                ? "No tours found matching your search."
                : "No tours available at the moment."}
            </p>
            {(searchTerm || batch) && (
              <button
                onClick={() => {
                  setSearchTerm("");
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
            {/* 2x2 Grid - Same as TopTours */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8 max-w-3xl mx-auto">
              {displayedTours.map((item) => (
                <div
                  key={item._id}
                  onClick={() => handleCardClick(item._id)}
                  className="group relative bg-white rounded-2xl overflow-hidden shadow hover:shadow-md transition-all duration-500 hover:-translate-y-2 cursor-pointer border border-gray-50"
                >
                  {/* Hover glow */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-300/3 to-indigo-300/3 opacity-0 group-hover:opacity-100 transition-opacity duration-600"></div>

                  {/* Image - Same size as TopTours */}
                  <div className="relative overflow-hidden">
                    <img
                      src={item.titleImage}
                      alt={item.title}
                      className="w-full h-40 md:h-44 object-cover group-hover:scale-105 transition-transform duration-800"
                    />
                  </div>

                  {/* Content - Identical */}
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
