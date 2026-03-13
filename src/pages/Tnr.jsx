// src/components/Tnr.jsx
import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TourAppContext } from "../context/TourAppContext";
import {
  Loader2,
  AlertCircle,
  CheckCircle2,
  Bus,
  Train,
  Plane,
  Users,
  CreditCard,
  Calendar,
  Phone,
  Mail,
  ArrowLeftCircle,
  Clock3, // for "in process"
  XCircle, // for cancelled/rejected
} from "lucide-react";

const Tnr = () => {
  const { getBookingDetailsByTNR, getSeatAllocationByTNR } =
    useContext(TourAppContext); // added getSeatAllocationByTNR
  const navigate = useNavigate();

  const [tnr, setTnr] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [booking, setBooking] = useState(null);
  const [seatData, setSeatData] = useState(null); // added to fetch vehicle names
  const [showInput, setShowInput] = useState(true);

  // Scroll to top when component mounts or showInput changes
  useEffect(() => {
    if (showInput) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [showInput]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setBooking(null);
    setSeatData(null); // reset seat data

    const upperTnr = tnr.trim().toUpperCase();

    if (!upperTnr || upperTnr.length !== 6 || !/^[A-Z0-9]{6}$/.test(upperTnr)) {
      setError("Please enter a valid 6-digit TNR (letters & numbers)");
      return;
    }

    setLoading(true);

    try {
      const [bookingRes, seatRes] = await Promise.all([
        getBookingDetailsByTNR(upperTnr),
        getSeatAllocationByTNR(upperTnr), // fetch seat data for vehicle names
      ]);

      if (bookingRes.success) {
        setBooking(bookingRes.booking);
        setShowInput(false);
      } else {
        setError(bookingRes.message || "Failed to fetch booking details");
      }

      if (seatRes.success) {
        setSeatData(seatRes.data);
      }
    } catch (err) {
      setError("Failed to load details");
    } finally {
      setLoading(false);
    }
  };

  const resetAndSearchAgain = () => {
    setTnr("");
    setError("");
    setBooking(null);
    setSeatData(null);
    setShowInput(true);
  };

  const handleSelectSeat = () => {
    if (booking?.tnr) {
      navigate(`/seat-allocation/${booking.tnr}`);
      setTimeout(() => {
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: "smooth",
        });
      }, 0);
    }
  };

  // NEW: Helper to get vehicle name from seat number
  const getVehicleNameForSeat = (seatNumber) => {
    if (!seatData?.vehicles || !seatNumber) return "";

    for (const vehicle of seatData.vehicles) {
      // Check leader row
      if (vehicle.leaderRow?.includes(seatNumber)) {
        return vehicle.vehicleName || "";
      }
      // Check passenger rows
      for (const row of vehicle.passengerRows || []) {
        if (row.includes(seatNumber)) {
          return vehicle.vehicleName || "";
        }
      }
    }
    return "";
  };

  // Determine status badge (cancellation has priority)
  const getStatusBadge = () => {
    const cancelled = booking?.cancelled || {};

    if (cancelled.byTraveller && !cancelled.byAdmin) {
      return {
        text: "Cancellation Request in Process",
        color: "bg-yellow-100 text-yellow-800 border-yellow-300",
        icon: <Clock3 size={20} />,
        isActionable: true,
      };
    }
    if (cancelled.byTraveller && cancelled.byAdmin) {
      return {
        text: "Traveller Cancelled",
        color: "bg-red-100 text-red-800 border-red-300",
        icon: <XCircle size={20} />,
        isActionable: false,
      };
    }
    if (cancelled.byAdmin && !cancelled.byTraveller) {
      return {
        text: "Booking Rejected",
        color: "bg-red-100 text-red-800 border-red-300",
        icon: <XCircle size={20} />,
        isActionable: false,
      };
    }

    return {
      text: booking?.isBookingCompleted
        ? "Booking Completed"
        : "Booking Active",
      color: booking?.isBookingCompleted
        ? "bg-green-100 text-green-800 border-green-300"
        : "bg-amber-100 text-amber-800 border-amber-300",
      icon: booking?.isBookingCompleted ? <CheckCircle2 size={20} /> : null,
      isActionable: true,
    };
  };

  const status = getStatusBadge();

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-teal-50 py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="fixed inset-0 pointer-events-none overflow-hidden opacity-20 z-0">
        <div className="absolute top-0 left-0 w-80 h-80 bg-gradient-to-br from-blue-300 to-cyan-300 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-10 right-5 w-64 h-64 bg-gradient-to-tl from-teal-300 to-indigo-300 rounded-full blur-3xl animate-pulse-slow delay-2000"></div>
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        {showInput && (
          <>
            <div className="text-center mb-10 sm:mb-12">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-indigo-900 mb-3 tracking-tight">
                Booking Details by TNR
              </h1>
              <p className="text-base sm:text-lg text-gray-700 max-w-xl mx-auto px-2">
                Enter your 6-digit booking reference to view complete details
                and proceed.
              </p>
            </div>

            <form
              onSubmit={handleSubmit}
              className="bg-white/90 backdrop-blur-lg shadow-2xl rounded-2xl p-6 sm:p-8 border border-indigo-100/50"
            >
              <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
                <input
                  type="text"
                  value={tnr}
                  onChange={(e) => setTnr(e.target.value.toUpperCase())}
                  placeholder="Enter 6-digit TNR"
                  maxLength={6}
                  className="w-full sm:w-80 px-6 py-4 border border-gray-300 rounded-xl text-center text-xl uppercase tracking-widest focus:ring-2 focus:ring-indigo-500 transition-all shadow-sm"
                />
                <button
                  type="submit"
                  disabled={loading || tnr.length !== 6}
                  className="w-full sm:w-auto px-10 py-4 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white font-semibold rounded-xl hover:from-indigo-700 hover:to-indigo-800 disabled:opacity-50 transition-all shadow-lg flex items-center justify-center gap-3 text-lg"
                >
                  {loading ? (
                    <Loader2 className="animate-spin" size={22} />
                  ) : (
                    "View Details"
                  )}
                </button>
              </div>
              {error && (
                <div className="mt-6 flex items-center justify-center gap-3 text-red-700 bg-red-50 p-4 rounded-2xl border border-red-200">
                  <AlertCircle size={24} />
                  <p className="font-medium">{error}</p>
                </div>
              )}
            </form>
          </>
        )}

        {booking && (
          <div className="space-y-8 animate-fade-in">
            <div className="text-center">
              <h2 className="text-3xl sm:text-4xl font-bold text-indigo-900">
                Booking Details of TNR:{" "}
                <span className="text-indigo-700">{booking.tnr}</span>
              </h2>
            </div>

            <div className="flex justify-center">
              <div
                className={`inline-flex items-center gap-2 px-6 py-3 rounded-full border text-base sm:text-lg font-semibold ${status.color}`}
              >
                {status.icon}
                {status.text}
              </div>
            </div>

            {/* Main Booking Card */}
            <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 border border-gray-100">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {booking?.tourData?.title || "Tour Name Not Available"}
                  </h3>
                  <p className="text-gray-600">
                    Booked on{" "}
                    {new Date(booking.bookingDate).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                </div>
                <div className="flex flex-col items-start lg:items-end">
                  <span className="text-sm text-gray-600">
                    Type: <strong>{booking.bookingType?.toUpperCase()}</strong>
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                <InfoItem
                  icon={<Calendar />}
                  label="Booking Date"
                  value={new Date(booking.bookingDate).toLocaleDateString(
                    "en-IN",
                  )}
                />
                <InfoItem
                  icon={<Users />}
                  label="Total Travellers"
                  value={booking.travellers?.length || 0}
                />
                <InfoItem
                  icon={<CreditCard />}
                  label="Advance Payment"
                  value={
                    <span
                      className={
                        booking.payment?.advance?.paid
                          ? "text-green-600 font-bold"
                          : "text-red-600 font-bold"
                      }
                    >
                      {booking.payment?.advance?.paid ? "Paid" : "Pending"}
                    </span>
                  }
                />
                <InfoItem
                  icon={<CreditCard />}
                  label="Balance Payment"
                  value={
                    <span
                      className={
                        booking.payment?.balance?.paid
                          ? "text-green-600 font-bold"
                          : "text-red-600 font-bold"
                      }
                    >
                      {booking.payment?.balance?.paid ? "Paid" : "Pending"}
                    </span>
                  }
                />
                <InfoItem
                  icon={<CheckCircle2 />}
                  label="Terms Agreed"
                  value={booking.termsAgreed ? "Yes" : "No"}
                />
                {booking.contact?.mobile && (
                  <InfoItem
                    icon={<Phone />}
                    label="Mobile"
                    value={booking.contact.mobile}
                  />
                )}
              </div>
            </div>

            {/* Travellers Section */}
            {booking.travellers?.length > 0 && (
              <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 border border-gray-100">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                  <Users size={28} className="text-indigo-600" />
                  Travellers ({booking.travellers.length})
                </h3>
                <div className="space-y-6">
                  {booking.travellers.map((t, idx) => {
                    const bookingCancelledByAdmin = booking.cancelled?.byAdmin;
                    const bookingCancelledByTraveller =
                      booking.cancelled?.byTraveller;

                    const travellerCancelledByAdmin = t.cancelled?.byAdmin;
                    const travellerCancelledByTraveller =
                      t.cancelled?.byTraveller;

                    const isCancelled =
                      bookingCancelledByAdmin ||
                      bookingCancelledByTraveller ||
                      travellerCancelledByAdmin ||
                      travellerCancelledByTraveller;
                    const isRejected =
                      bookingCancelledByAdmin || travellerCancelledByAdmin;

                    // Get vehicle name
                    const vehicleName = t.seatNumber
                      ? getVehicleNameForSeat(t.seatNumber)
                      : "";

                    return (
                      <div
                        key={idx}
                        className={`p-5 sm:p-6 rounded-2xl border transition-all ${
                          isCancelled
                            ? "bg-red-50/50 border-red-200"
                            : "bg-gray-50 border-gray-200 hover:border-indigo-200"
                        }`}
                      >
                        <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                          <div className="flex-1">
                            {isCancelled && (
                              <div
                                className={`mb-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold uppercase ${
                                  isRejected
                                    ? "bg-red-100 text-red-800 border border-red-200"
                                    : "bg-yellow-100 text-yellow-800 border border-yellow-200"
                                }`}
                              >
                                {isRejected ? (
                                  <XCircle size={14} />
                                ) : (
                                  <Clock3 size={14} />
                                )}
                                {isRejected
                                  ? "Cancelled / Rejected"
                                  : "Cancellation Pending"}
                              </div>
                            )}

                            <p
                              className={`text-xl font-semibold ${isRejected ? "text-red-900" : "text-gray-900"}`}
                            >
                              {t.title} {t.firstName} {t.lastName}
                            </p>

                            <div
                              className={`mt-2 space-y-1 text-sm sm:text-base ${isRejected ? "text-red-700/60" : "text-gray-600"}`}
                            >
                              <p>
                                Age: {t.age} • {t.gender}
                              </p>
                              <p>
                                Sharing: {t.sharingType} • Package:{" "}
                                {t.packageType}
                              </p>

                              {t.seatNumber && (
                                <p
                                  className={`font-medium ${isRejected ? "line-through text-red-400" : "text-indigo-700"}`}
                                >
                                  Seat: {t.seatNumber}{" "}
                                  {vehicleName ? ` - ${vehicleName}` : ""}{" "}
                                  {t.seatLocked ? "(Locked)" : ""}
                                </p>
                              )}
                            </div>

                            {t.cancelled?.reason && (
                              <p className="mt-2 text-xs italic text-red-600">
                                Reason: {t.cancelled.reason}
                              </p>
                            )}
                          </div>

                          {t.seatNumber && !isRejected && (
                            <span className="bg-indigo-100 text-indigo-800 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap">
                              Seat {t.seatNumber}
                              {vehicleName ? ` - ${vehicleName}` : ""}
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
              {status.isActionable && (
                <button
                  onClick={handleSelectSeat}
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white text-lg font-semibold rounded-xl hover:from-indigo-700 hover:to-indigo-800 shadow-lg transform hover:-translate-y-1 transition-all min-w-[220px]"
                >
                  <Bus size={20} />
                  Select Seat Now
                </button>
              )}

              <button
                onClick={resetAndSearchAgain}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gray-200 text-gray-800 text-lg font-semibold rounded-xl hover:bg-gray-300 transition-all shadow-md min-w-[220px]"
              >
                <ArrowLeftCircle size={20} />
                Search Another TNR
              </button>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fadeIn 0.7s ease-out forwards;
        }
        @keyframes pulse-slow {
          0%,
          100% {
            transform: scale(1);
            opacity: 0.3;
          }
          50% {
            transform: scale(1.1);
            opacity: 0.5;
          }
        }
        .animate-pulse-slow {
          animation: pulse-slow 14s infinite ease-in-out;
        }
      `}</style>
    </div>
  );
};

const InfoItem = ({ icon, label, value }) => (
  <div className="flex items-start gap-4 bg-gray-50 p-5 rounded-2xl border border-gray-200">
    <div className="text-indigo-600 mt-1 flex-shrink-0">{icon}</div>
    <div className="flex-1 min-w-0">
      <p className="text-xs text-gray-600 mb-1">{label}</p>
      <div className="text-lg font-semibold text-gray-900 break-words">
        {value || "—"}
      </div>
    </div>
  </div>
);

export default Tnr;
