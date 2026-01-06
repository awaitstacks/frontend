import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TourAppContext } from "../context/TourAppContext.jsx";

const CategoryWiseTours = () => {
  const navigate = useNavigate();
  const { tours, currencySymbol } = useContext(TourAppContext);

  // Group available tours by batch and sort newest first
  const groupedTours = tours.reduce((acc, tour) => {
    if (tour.available) {
      if (!acc[tour.batch]) acc[tour.batch] = [];
      acc[tour.batch].push(tour);
    }
    return acc;
  }, {});

  // Sort each category newest first
  Object.keys(groupedTours).forEach((category) => {
    groupedTours[category].sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
  });

  // Search per category
  const [searchTerms, setSearchTerms] = useState({});

  const handleSearchChange = (category, value) => {
    setSearchTerms((prev) => ({ ...prev, [category]: value }));
  };

  const handleCardClick = (tourId) => {
    navigate(`/tour-details/${tourId}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleViewAllCategory = (category) => {
    navigate(`/tours/${category}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section className="relative py-16 md:py-20 lg:py-24 bg-gradient-to-b from-white via-blue-50/8 to-white">
      <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-10">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-3">
            Explore Tours by Category
          </h2>
          <p className="text-sm md:text-base text-gray-600 max-w-xl mx-auto">
            Discover our most loved journeys across India
          </p>
        </div>

        {Object.keys(groupedTours).length === 0 ? (
          <p className="text-center text-gray-500 text-lg py-12">
            No available tours at the moment.
          </p>
        ) : (
          Object.keys(groupedTours).map((category) => {
            const categoryTours = groupedTours[category];
            const search = searchTerms[category] || "";
            const filtered = categoryTours.filter((tour) =>
              tour.title.toLowerCase().includes(search.toLowerCase())
            );
            const displayed = filtered.slice(0, 4);
            const hasMore = filtered.length > 4;

            return (
              <div key={category} className="mb-16">
                {/* Category Title + Search */}
                <div className="flex flex-col sm:flex-row justify-between items-center mb-10">
                  <h3 className="text-xl md:text-2xl font-bold text-gray-800">
                    {category} Tours
                  </h3>
                  <input
                    type="text"
                    placeholder="Search in this category..."
                    value={search}
                    onChange={(e) =>
                      handleSearchChange(category, e.target.value)
                    }
                    className="mt-4 sm:mt-0 w-full sm:w-64 px-6 py-2.5 rounded-full border border-gray-200 focus:border-blue-400 focus:outline-none text-sm"
                  />
                </div>

                {/* Same 2x2 Grid as TopTours */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8 max-w-3xl mx-auto">
                  {displayed.map((item) => (
                    <div
                      key={item._id}
                      onClick={() => handleCardClick(item._id)}
                      className="group relative bg-white rounded-2xl overflow-hidden shadow hover:shadow-md transition-all duration-500 hover:-translate-y-2 cursor-pointer border border-gray-50"
                    >
                      {/* Minimal hover glow */}
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-300/3 to-indigo-300/3 opacity-0 group-hover:opacity-100 transition-opacity duration-600"></div>

                      {/* Image - Exact same size as TopTours */}
                      <div className="relative overflow-hidden">
                        <img
                          src={item.titleImage}
                          alt={item.title}
                          className="w-full h-40 md:h-44 object-cover group-hover:scale-105 transition-transform duration-800"
                        />
                      </div>

                      {/* Content - Identical to TopTours */}
                      <div className="relative p-4 md:p-5 text-left">
                        {/* Availability */}
                        <div className="flex items-center gap-2 text-xs mb-2">
                          <div
                            className={`w-1.5 h-1.5 rounded-full ${
                              item.available ? "bg-green-500" : "bg-gray-400"
                            }`}
                          />
                          <span
                            className={`text-xs font-medium ${
                              item.available
                                ? "text-green-700"
                                : "text-gray-500"
                            }`}
                          >
                            {item.available ? "Available" : "Sold Out"}
                          </span>
                        </div>

                        {/* Title */}
                        <h3 className="text-base md:text-lg font-semibold text-gray-800 group-hover:text-blue-700 transition-colors duration-400 line-clamp-2 mb-1">
                          {item.title}
                        </h3>

                        {/* Details */}
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

                {/* View All Button for this Category */}
                {hasMore && (
                  <div className="text-center mt-10">
                    <button
                      onClick={() => handleViewAllCategory(category)}
                      className="inline-flex items-center gap-2 px-7 py-2.5 bg-white border border-gray-200 text-gray-700 font-medium text-sm rounded-full hover:bg-blue-50 hover:border-blue-200 hover:text-blue-700 hover:shadow transition-all duration-400"
                    >
                      View All {category} Tours
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </button>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </section>
  );
};

export default CategoryWiseTours;
