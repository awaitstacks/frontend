/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TourAppContext } from "../context/TourAppContext";
import axios from "axios";
import { toast } from "react-toastify";
import {
  ChevronDown,
  ChevronUp,
  IndianRupee,
  Users,
  Copy, // ← Added this import (fixes the error)
} from "lucide-react";

const MyBookings = () => {
  const { backendUrl, token, currencySymbol } = useContext(TourAppContext);
  const [bookings, setBookings] = useState([]);
  const [expandedBooking, setExpandedBooking] = useState(null);
  const [cancelPopup, setCancelPopup] = useState({
    show: false,
    tnr: null,
    travellerId: null,
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [visibleCount, setVisibleCount] = useState(10);
  const navigate = useNavigate();

  const getUserBookings = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/user/my-trolly`, {
        headers: { token },
      });
      if (data.success) {
        setBookings(data.bookings.reverse());
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Failed to fetch bookings");
    }
  };

  useEffect(() => {
    setVisibleCount(10);
  }, [searchTerm, statusFilter]);

  const confirmCancellation = async () => {
    const { tnr, travellerId } = cancelPopup;
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/user/cancel-traveller`,
        { tnr, travellerId },
        { headers: { token } },
      );
      if (data.success) {
        toast.success(data.message);
        getUserBookings();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Failed to cancel traveller",
      );
    } finally {
      setCancelPopup({ show: false, tnr: null, travellerId: null });
    }
  };

  const initPay = (order, tnr, paymentType) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currencySymbol,
      name: "Tour Booking Payment",
      description: `${paymentType.toUpperCase()} Payment`,
      order_id: order.id,
      handler: async (response) => {
        try {
          const { data } = await axios.post(
            `${backendUrl}/api/user/verifyRazorpay`,
            { ...response, tnr, paymentType },
            { headers: { token } },
          );
          if (data.success) {
            toast.success(data.message);
            getUserBookings();
            navigate("/my-trolly");
          } else {
            toast.error(data.message);
          }
        } catch (error) {
          console.error(error);
          toast.error(error.message || "Payment verification failed");
        }
      },
      theme: { color: "#2563EB" },
    };
    new window.Razorpay(options).open();
  };

  const bookingRazorpay = async (tnr, paymentType) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/user/payment-razorpay`,
        { tnr, paymentType },
        { headers: { token } },
      );
      if (data.success) {
        initPay(data.order, tnr, paymentType);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Payment initiation failed");
    }
  };

  useEffect(() => {
    if (token) getUserBookings();
  }, [token]);

  const slotDateFormat = (dateStr) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-GB") + " " + d.toLocaleTimeString();
  };

  const allTravellersCancelled = (item) => {
    if (!item.travellers || item.travellers.length === 0) return false;
    return item.travellers.every((t) => {
      const byT = t?.cancelled?.byTraveller;
      const byA = t?.cancelled?.byAdmin;
      return byA || (byT && byA);
    });
  };

  const canShowBalanceButton = (item) => {
    if (item.bookingType !== "online") return false;
    if (!item.payment?.advance?.paid) return false;
    if (item.payment?.balance?.paid) return false;
    if (allTravellersCancelled(item)) return false;

    const travellers = item.travellers || [];
    const hasUserOnlyCancel = travellers.some(
      (t) => t?.cancelled?.byTraveller && !t?.cancelled?.byAdmin,
    );
    return !hasUserOnlyCancel;
  };

  const renderStatus = (item) => {
    if (item.isBookingCompleted) return "Booking Completed";

    if (allTravellersCancelled(item)) return "Booking Cancelled";

    if (item.cancelled?.byTraveller) return "Booking cancelled by user";
    if (item.cancelled?.byAdmin) return "Booking rejected by admin";

    const hasPendingCancellation = item.travellers?.some(
      (t) => t?.cancelled?.byTraveller && !t?.cancelled?.byAdmin,
    );
    if (hasPendingCancellation) return "Cancellation Requested";

    if (item.bookingType === "offline") {
      if (!item.payment?.advance?.paid) return "Awaiting Booking Confirmation";
      if (item.payment?.advance?.paid && !item.payment?.balance?.paid)
        return "Advance Received and booking reserved";
      if (item.payment?.advance?.paid)
        return "Balance Received and waiting for booking completion";
    }

    if (item.bookingType === "online") {
      if (!item.payment?.advance?.paid) return "Awaiting for Advance Payment";
      if (
        item.payment?.advance?.paid &&
        !item.payment?.advance?.paymentVerified
      )
        return "Advance Paid - Pending Verification";
      if (item.payment?.advance?.paid && !item.payment?.balance?.paid)
        return "Advance Paid and Booking reserved";
      if (
        item.payment?.balance?.paid &&
        !item.payment?.balance?.paymentVerified
      )
        return "Balance Paid - Pending Verification";
      if (item.payment?.balance?.paymentVerified)
        return "Balance paid, waiting for booking completion";
    }

    return "Pending";
  };

  const filteredBookings = bookings.filter((item) => {
    const matchesTitle = item.tourData.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    if (!matchesTitle) return false;

    if (statusFilter === "all") return true;

    if (statusFilter !== "all" && allTravellersCancelled(item)) return false;

    let itemStatus = null;
    if (item.isBookingCompleted) {
      itemStatus = "completed";
    } else if (item.payment?.advance?.paid && !item.payment?.balance?.paid) {
      itemStatus = "balance";
    } else if (!item.payment?.advance?.paid) {
      itemStatus = "advance";
    }

    return itemStatus === statusFilter;
  });

  const displayedBookings = filteredBookings.slice(0, visibleCount);

  const handleShowMore = () => {
    setVisibleCount((prev) => prev + 5);
  };

  return (
    <div
      className="
        w-full 
        max-w-[98%] xs:max-w-[96%] sm:max-w-[98%] md:max-w-[96vw] 
        lg:max-w-[94vw] xl:max-w-[92vw] 2xl:max-w-[90vw]
        rounded-3xl sm:rounded-[2.5rem] md:rounded-[3rem] lg:rounded-[3.5rem] xl:rounded-[4rem]
        backdrop-blur-xl bg-white/40 border border-white/50
        shadow-2xl md:shadow-[0_30px_90px_-15px_rgba(0,0,0,0.12)]
        overflow-hidden
        p-8 xs:p-10 sm:p-12 md:p-16 lg:p-20 xl:p-24
      "
    >
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8 text-center">
          My Trolly
        </h1>

        {/* Filters */}
        <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-lg mb-8 flex flex-col md:flex-row gap-4">
          <input
            type="text"
            placeholder="Search by tour title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 px-5 py-4 rounded-xl border border-gray-200 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 transition-all outline-none"
          />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-5 py-4 rounded-xl border border-gray-200 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 transition-all outline-none"
          >
            <option value="all">All Statuses</option>
            <option value="advance">Advance Pending</option>
            <option value="balance">Balance Pending</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        <div className="space-y-8">
          {displayedBookings.length === 0 ? (
            <p className="text-center text-gray-600 text-xl py-12">
              No bookings found.
            </p>
          ) : (
            displayedBookings.map((item) => (
              <div
                key={item.tnr} // ← Use tnr as key (safe & unique)
                className="bg-white/90 backdrop-blur-md rounded-2xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl"
              >
                <div
                  className="flex flex-col md:flex-row gap-6 cursor-pointer"
                  onClick={() =>
                    setExpandedBooking(
                      expandedBooking === item.tnr ? null : item.tnr,
                    )
                  }
                >
                  <img
                    src={item.tourData.titleImage}
                    alt={item.tourData.title}
                    className="w-full md:w-48 h-32 object-cover rounded-xl"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h2 className="text-2xl font-bold text-gray-800">
                        {item.tourData.title}
                      </h2>
                      <div className="flex items-center gap-2">
                        <span className="text-xl font-semibold text-gray-800">
                          TNR:{" "}
                          <code className="bg-gray-100 px-2 py-1 rounded font-mono text-lg">
                            {item.tnr || "N/A"}
                          </code>
                        </span>
                        {item.tnr && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              navigator.clipboard.writeText(item.tnr);
                              toast.success("TNR copied!");
                            }}
                            className="text-blue-600 hover:text-blue-800 p-1 rounded hover:bg-blue-50 transition"
                            title="Copy TNR"
                          >
                            <Copy size={20} />
                          </button>
                        )}
                      </div>
                    </div>

                    <p className="text-gray-600 mb-1">
                      Duration: {item.tourData.duration?.days} Days /{" "}
                      {item.tourData.duration?.nights} Nights
                    </p>
                    <p className="text-gray-600 mb-1">
                      Booking Date: {slotDateFormat(item.bookingDate)}
                    </p>
                    <p className="text-indigo-700 font-medium">
                      Status: {renderStatus(item)}
                    </p>
                  </div>

                  <div className="flex flex-col gap-2 justify-center md:justify-end">
                    {item.bookingType === "online" && (
                      <>
                        {allTravellersCancelled(item) ? (
                          <span className="px-4 py-2 bg-red-100 text-red-700 rounded-xl font-medium text-center">
                            Booking Cancelled
                          </span>
                        ) : (
                          <>
                            {!item.payment?.advance?.paid && (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  bookingRazorpay(item.tnr, "advance");
                                }}
                                className="px-4 py-2 bg-indigo-100 text-indigo-700 rounded-xl font-medium hover:bg-indigo-200 transition-all"
                              >
                                Pay Advance
                              </button>
                            )}
                            {canShowBalanceButton(item) && (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  bookingRazorpay(item.tnr, "balance");
                                }}
                                className="px-4 py-2 bg-green-100 text-green-700 rounded-xl font-medium hover:bg-green-200 transition-all"
                              >
                                Pay Balance
                              </button>
                            )}
                            {item.isBookingCompleted && (
                              <span className="px-4 py-2 bg-green-100 text-green-700 rounded-xl font-medium text-center">
                                Booking Completed
                              </span>
                            )}
                          </>
                        )}
                      </>
                    )}

                    {item.bookingType === "offline" && (
                      <>
                        {allTravellersCancelled(item) ? (
                          <span className="px-4 py-2 bg-red-100 text-red-700 rounded-xl font-medium text-center">
                            Booking Cancelled
                          </span>
                        ) : (
                          <>
                            {!item.payment?.advance?.paid && (
                              <span className="px-4 py-2 bg-gray-100 text-gray-700 rounded-xl font-medium text-center">
                                Awaiting Confirmation
                              </span>
                            )}
                            {item.payment?.advance?.paid &&
                              !item.payment?.balance?.paid && (
                                <span className="px-4 py-2 bg-green-100 text-green-700 rounded-xl font-medium text-center">
                                  Advance Received
                                </span>
                              )}
                            {item.payment?.balance?.paid &&
                              !item.isBookingCompleted && (
                                <span className="px-4 py-2 bg-green-100 text-green-700 rounded-xl font-medium text-center">
                                  Balance Received
                                </span>
                              )}
                            {item.isBookingCompleted && (
                              <span className="px-4 py-2 bg-green-100 text-green-700 rounded-xl font-medium text-center">
                                Booking Completed
                              </span>
                            )}
                          </>
                        )}
                      </>
                    )}
                  </div>
                </div>

                {expandedBooking === item.tnr && (
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">
                      Traveller Details
                    </h3>
                    <div className="space-y-4">
                      {item.travellers?.map((traveller, idx) => {
                        const byT = traveller?.cancelled?.byTraveller;
                        const byA = traveller?.cancelled?.byAdmin;

                        let travellerBadge = null;
                        if (byT && byA) travellerBadge = "Cancelled";
                        else if (byT && !byA)
                          travellerBadge = "Cancellation Requested";
                        else if (!byT && byA)
                          travellerBadge = "Rejected by Admin";

                        const canCancel =
                          !traveller.cancelled?.byTraveller &&
                          !traveller.cancelled?.byAdmin &&
                          item.payment?.advance?.paid;

                        return (
                          <div
                            key={idx}
                            className="bg-indigo-50/50 rounded-xl p-5 transition-all duration-300 hover:bg-indigo-100/50 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
                          >
                            <div className="flex-1">
                              <p className="font-medium text-gray-800">
                                Name: {traveller.title} {traveller.firstName}{" "}
                                {traveller.lastName}
                              </p>
                              <p className="text-gray-600">
                                Age: {traveller.age} | Gender:{" "}
                                {traveller.gender}
                              </p>
                              <p className="text-gray-600">
                                Package:{" "}
                                {traveller.packageType === "main"
                                  ? "Main Package"
                                  : `Variant ${traveller.variantPackageIndex + 1}`}
                              </p>
                              <p className="text-gray-600">
                                Sharing: {traveller.sharingType}
                              </p>
                              {traveller.selectedAddon && (
                                <p className="text-gray-600">
                                  Add-ons: {traveller.selectedAddon.name} (+
                                  {currencySymbol}
                                  {traveller.selectedAddon.price})
                                </p>
                              )}
                              <p className="text-gray-600">
                                Boarding: {traveller.boardingPoint?.stationName}{" "}
                                ({traveller.boardingPoint?.stationCode})
                              </p>
                              <p className="text-gray-600">
                                Deboarding:{" "}
                                {traveller.deboardingPoint?.stationName} (
                                {traveller.deboardingPoint?.stationCode})
                              </p>
                              {traveller.remarks && (
                                <p className="text-gray-600">
                                  Remarks: {traveller.remarks}
                                </p>
                              )}
                              {travellerBadge && (
                                <span
                                  className={`inline-block px-3 py-1 rounded-full text-sm font-medium mt-3 ${
                                    travellerBadge === "Cancelled"
                                      ? "bg-red-100 text-red-700"
                                      : travellerBadge ===
                                          "Cancellation Requested"
                                        ? "bg-orange-100 text-orange-700"
                                        : "bg-purple-100 text-purple-700"
                                  }`}
                                >
                                  {travellerBadge}
                                </span>
                              )}
                            </div>

                            {canCancel && (
                              <div className="md:self-center">
                                <button
                                  onClick={() =>
                                    setCancelPopup({
                                      show: true,
                                      tnr: item.tnr,
                                      travellerId: traveller._id,
                                    })
                                  }
                                  className="w-full md:w-auto px-5 py-2 bg-red-100 text-red-700 rounded-xl font-medium hover:bg-red-200 transition-all shadow-sm hover:shadow"
                                >
                                  Cancel Traveller
                                </button>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            ))
          )}

          {filteredBookings.length > visibleCount && (
            <div className="text-center py-8">
              <button
                onClick={handleShowMore}
                className="px-8 py-3 bg-indigo-100 text-indigo-700 rounded-xl font-medium hover:bg-indigo-200 transition-all shadow-md hover:shadow-lg"
              >
                Show More
              </button>
            </div>
          )}
        </div>

        {/* Cancel Confirmation Popup */}
        {cancelPopup.show && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
            <div className="bg-white/95 backdrop-blur-md rounded-2xl p-8 shadow-2xl max-w-md w-full text-center transition-all duration-300 scale-100">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Confirm Cancellation?
              </h3>
              <p className="text-gray-600 mb-6">
                This action cannot be undone. Are you sure?
              </p>
              <div className="flex justify-center gap-4">
                <button
                  onClick={() =>
                    setCancelPopup({
                      show: false,
                      tnr: null,
                      travellerId: null,
                    })
                  }
                  className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmCancellation}
                  className="px-6 py-3 bg-red-100 text-red-700 rounded-xl font-medium hover:bg-red-200 transition-all"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBookings;
