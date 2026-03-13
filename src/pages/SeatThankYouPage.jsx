import React from "react";
import { useNavigate } from "react-router-dom";
import { Bus, ArrowLeft, Home } from "lucide-react";

const SeatThankYouPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white flex items-center justify-center px-4 py-10">
      <div className="max-w-lg w-full bg-white rounded-2xl shadow-xl p-8 sm:p-10 text-center">
        <div className="mb-6">
          <Bus className="h-20 w-20 sm:h-24 sm:w-24 text-green-500 mx-auto" />
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
          Thank You!
        </h1>

        <p className="text-lg sm:text-xl text-gray-600 mb-8 leading-relaxed">
          Your seat is reserved sucessfully! We look forward to having you on
          board for an unforgettable tour experience.
        </p>

        <div className="space-y-4 sm:space-y-0 sm:flex sm:gap-4 sm:justify-center">
          <button
            onClick={() => navigate("/")}
            className="w-full sm:w-auto px-8 py-4 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition font-medium flex items-center justify-center gap-2 text-lg"
          >
            <Home size={20} />
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default SeatThankYouPage;
