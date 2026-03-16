import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { TourAppContext } from "../context/TourAppContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Loader2, AlertCircle, CheckCircle } from "lucide-react";

const TermsAgreementPage = () => {
  const { tnr } = useParams();
  const navigate = useNavigate();
  const {
    getCurrentTourTerms,
    getBookingSummary,
    submitBookingTermsAgreement,
  } = useContext(TourAppContext);

  const [bookingInfo, setBookingInfo] = useState(null);
  const [currentTerms, setCurrentTerms] = useState(null);
  const [emergencyContact, setEmergencyContact] = useState("");
  const [termsAgreed, setTermsAgreed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [alreadyAgreed, setAlreadyAgreed] = useState(false);

  useEffect(() => {
    if (!tnr || tnr.length !== 6 || !/^[A-Za-z0-9]{6}$/.test(tnr)) {
      setError("Invalid booking reference (TNR)");
      setIsLoading(false);
      return;
    }

    const loadData = async () => {
      setIsLoading(true);
      setError("");

      try {
        const termsResult = await getCurrentTourTerms();
        if (termsResult.success && termsResult.terms?.points?.length > 0) {
          setCurrentTerms(termsResult.terms);
        }

        const bookingResult = await getBookingSummary(tnr);
        if (bookingResult.success) {
          setBookingInfo(bookingResult.data);
          if (bookingResult.data?.termsAgreed === true) {
            setAlreadyAgreed(true);
          }
        } else {
          setError(bookingResult.message || "Booking not found");
        }
      } catch (err) {
        console.error("Load data failed:", err);
        setError("Failed to load data. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [tnr, getCurrentTourTerms, getBookingSummary]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const trimmed = emergencyContact.trim();

    if (!trimmed) {
      toast.error("Emergency contact is required");
      return;
    }

    if (!/^[\d+\-\s()]{7,25}$/.test(trimmed)) {
      toast.error(
        "Invalid emergency contact format. Use digits, +, -, spaces or parentheses (7–25 characters).",
      );
      return;
    }

    if (!termsAgreed) {
      toast.error("You must agree to the terms and conditions");
      return;
    }
    setIsSubmitting(true);

    const result = await submitBookingTermsAgreement(
      tnr.toUpperCase(),
      emergencyContact,
      true,
    );

    setIsSubmitting(false);

    if (result.success) {
      toast.success("Thank you! Your agreement has been recorded.", {
        autoClose: 2200,
      });

      navigate("/thank-you", { replace: true });
      window.scrollTo({ top: 0, behavior: "instant" });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="h-12 w-12 animate-spin text-indigo-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
        <div className="max-w-md w-full text-center">
          <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Error</h2>
          <p className="text-gray-600">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-6 px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (alreadyAgreed) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <ToastContainer
          position="bottom-center"
          autoClose={4000}
          theme="light"
        />

        <div className="max-w-lg w-full bg-white rounded-2xl shadow-xl p-8 sm:p-10 text-center">
          <CheckCircle className="h-20 w-20 text-green-500 mx-auto mb-6" />
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            Already Agreed!
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Thank you! You have already accepted the terms and conditions for
            booking <strong>TNR: {tnr.toUpperCase()}</strong>.
          </p>
          <p className="text-base text-gray-500 mb-8">
            No further action is needed. We're looking forward to your tour!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate("/")}
              className="px-8 py-4 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition font-medium"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <ToastContainer
        position="top-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnHover
        draggable
        pauseOnFocusLoss
        theme="light"
        style={{
          zIndex: 9999,
          marginTop: "70px", // slightly down from top
        }}
      />

      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 text-white px-6 py-8 sm:px-10 sm:py-10">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center sm:text-left">
            Traveller consent form
          </h1>
          <p className="mt-2 text-indigo-100 text-base sm:text-lg text-center sm:text-left">
            TNR:{" "}
            <strong className="font-mono tracking-wide">
              {tnr.toUpperCase()}
            </strong>
          </p>
        </div>

        {/* Terms Section */}
        <div className="p-6 sm:p-8 md:p-10 border-b bg-white">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-5 flex items-center gap-3">
            <span className="text-indigo-600">Important</span>
            <span className="text-lg sm:text-xl font-normal text-gray-500">
              Terms & Conditions
            </span>
          </h2>

          {currentTerms?.points?.length > 0 ? (
            <div className="prose prose-sm sm:prose-base md:prose-lg max-w-none text-gray-800">
              <ol className="list-decimal pl-5 sm:pl-6 space-y-3 sm:space-y-4 leading-relaxed">
                {currentTerms.points.map((point) => (
                  <li key={point._id || point.order} className="text-gray-800">
                    {point.text}
                  </li>
                ))}
              </ol>
            </div>
          ) : (
            <p className="text-center py-8 text-gray-500 italic text-base sm:text-lg">
              No terms & conditions available right now.
            </p>
          )}

          <p className="mt-6 text-sm sm:text-base text-gray-600 italic text-center sm:text-left">
            By continuing, you confirm you have read and agree to the terms
            above.
          </p>
        </div>

        {/* Booking Summary */}
        <div className="p-6 sm:p-8 md:p-10 bg-gray-50 border-b">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-6">
            Your Booking Details
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-base sm:text-lg mb-8">
            <div>
              <p className="text-gray-600">Tour</p>
              <p className="font-medium text-gray-900 mt-1">
                {bookingInfo?.tourTitle || "—"}
              </p>
            </div>

            <div>
              <p className="text-gray-600">Total Travellers</p>
              <p className="font-medium text-gray-900 mt-1">
                {bookingInfo?.totalTravellers || 0} people
              </p>
            </div>

            <div>
              <p className="text-gray-600">Gender Breakdown</p>
              <p className="font-medium text-gray-900 mt-1">
                {bookingInfo?.males || 0} Male • {bookingInfo?.females || 0}{" "}
                Female
              </p>
            </div>
          </div>

          {/* Travellers Detailed List */}
          <div className="mt-4">
            <p className="text-gray-600 font-medium mb-3">Travellers List</p>
            {bookingInfo?.travellers?.length > 0 ? (
              <div className="space-y-4">
                {bookingInfo.travellers.map((traveller, index) => (
                  <div
                    key={index}
                    className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 text-sm sm:text-base">
                      <div>
                        <span className="text-gray-600">Name:</span>
                        <p className="font-medium text-gray-900">
                          {traveller.title ? `${traveller.title}. ` : ""}
                          {traveller.firstName} {traveller.lastName}
                        </p>
                      </div>
                      <div>
                        <span className="text-gray-600">Age:</span>
                        <p className="font-medium text-gray-900">
                          {traveller.age || "—"}
                        </p>
                      </div>
                      <div>
                        <span className="text-gray-600">Gender:</span>
                        <p className="font-medium text-gray-900">
                          {traveller.gender || "—"}
                        </p>
                      </div>
                      <div className="sm:col-span-2">
                        <span className="text-gray-600">Sharing Type:</span>
                        <p className="font-medium text-gray-900 capitalize">
                          {traveller.sharingType || "—"}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 italic">No travellers added yet.</p>
            )}
          </div>

          {/* Child breakdown - only shown if there are children */}
          {bookingInfo?.children?.total > 0 && (
            <div className="mt-8 pt-6 border-t border-gray-200">
              <p className="text-gray-600 font-medium mb-2">
                Children ({bookingInfo.children.total})
              </p>
              <div className="grid grid-cols-2 gap-4 text-base">
                <div>
                  <span className="text-gray-700">With Berth:</span>{" "}
                  <strong>{bookingInfo.children.withBerth || 0}</strong>
                </div>
                <div>
                  <span className="text-gray-700">Without Berth:</span>{" "}
                  <strong>{bookingInfo.children.withoutBerth || 0}</strong>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Agreement Form */}
        <form
          onSubmit={handleSubmit}
          className="p-6 sm:p-8 md:p-10 space-y-7 sm:space-y-8"
        >
          <div>
            <label className="block text-lg sm:text-xl font-medium text-gray-800 mb-3">
              Emergency Contact <span className="text-red-600">*</span>
            </label>
            <input
              type="tel"
              inputMode="numeric"
              value={emergencyContact}
              onChange={(e) => setEmergencyContact(e.target.value)}
              maxLength={25}
              placeholder="Emergency contact (with country code if international)"
              className="w-full px-5 py-4 border border-gray-300 rounded-xl text-lg sm:text-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
              required
            />
            <p className="mt-2 text-sm text-gray-600">
              Used only in case of emergency during the tour
            </p>
          </div>

          <div className="flex items-start gap-4 bg-indigo-50/40 p-5 rounded-xl border border-indigo-100">
            <input
              type="checkbox"
              id="termsAgreed"
              checked={termsAgreed}
              onChange={(e) => setTermsAgreed(e.target.checked)}
              className="mt-1.5 h-6 w-6 text-indigo-600 border-gray-400 rounded focus:ring-indigo-500"
              required
            />
            <label
              htmlFor="termsAgreed"
              className="text-base sm:text-lg text-gray-800 leading-relaxed cursor-pointer"
            >
              I have read and fully agree to all the Terms & Conditions above{" "}
              <span className="text-red-600">*</span>
            </label>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-5 sm:py-6 px-8 rounded-xl text-white text-lg sm:text-xl font-bold transition flex items-center justify-center gap-3 shadow-md ${
              isSubmitting
                ? "bg-indigo-400 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800"
            }`}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-6 w-6 animate-spin" />
                Processing...
              </>
            ) : (
              "Confirm & Agree"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default TermsAgreementPage;
