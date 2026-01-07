import React from "react";

const Contact = () => {
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-white via-sky-50 to-sky-100 py-12 md:py-20 lg:py-24">
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
        {/* Page Title */}
        <div className="text-center mb-12 md:mb-20 lg:mb-24">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 leading-tight">
            Contact{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-700">
              support
            </span>
          </h1>
          <p className="mt-4 md:mt-6 text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto px-4">
            We're here to assist you in planning your dream journey
          </p>
        </div>

        <div className="glass-card rounded-2xl md:rounded-3xl p-6 sm:p-8 md:p-12 lg:p-16 shadow-2xl border border-white/50">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 text-center mb-8 md:mb-12">
            Get in Touch
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16">
            {/* Contact Information */}
            <div className="space-y-8 md:space-y-10">
              {/* Company Name */}
              <div>
                <p className="text-xs sm:text-sm uppercase tracking-wider text-blue-600 font-semibold mb-2">
                  Company
                </p>
                <p className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800">
                  GV - Tour Planners LLP
                </p>
              </div>

              {/* Address */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-xs sm:text-sm uppercase tracking-wider text-blue-600 font-semibold mb-2">
                    Registered Office
                  </p>
                  <p className="text-gray-700 leading-relaxed text-sm sm:text-base md:text-lg">
                    23, Nehru Street,
                    <br />
                    Jaihindpuram,
                    <br />
                    Madurai - 625011
                    <br />
                    Tamil Nadu, India
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-xs sm:text-sm uppercase tracking-wider text-blue-600 font-semibold mb-2">
                    Customer Care
                  </p>
                  <a
                    href="tel:+919003998648"
                    className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 hover:text-blue-600 transition"
                  >
                    +91 90039 98648,
                  </a>
                  <br />
                  <a
                    href="tel:+919003998648"
                    className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 hover:text-blue-600 transition"
                  >
                    +91 93444 57790
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-xs sm:text-sm uppercase tracking-wider text-blue-600 font-semibold mb-2">
                    Email Us
                  </p>
                  <a
                    href="mailto:gvtphelpdesk@gmail.com"
                    className="text-lg sm:text-xl md:text-2xl font-medium text-gray-800 hover:text-blue-600 transition break-all"
                  >
                    info@gvtourplanners.com
                  </a>
                </div>
              </div>
            </div>

            {/* Legal & Support Info */}
            <div className="space-y-8 md:space-y-10">
              {/* Legal Details */}
              <div className="bg-blue-50/70 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-blue-100">
                <p className="text-xs sm:text-sm uppercase tracking-wider text-blue-700 font-bold mb-4">
                  Legal Information
                </p>
                <div className="space-y-5 text-gray-700">
                  <div>
                    <p className="text-xs sm:text-sm text-gray-600">
                      LLP Identification Number (LLPIN)
                    </p>
                    <p className="text-base sm:text-lg md:text-xl font-bold text-gray-900 mt-1">
                      ACK-2472
                    </p>
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm text-gray-600">
                      Tax Deduction Account Number (TAN)
                    </p>
                    <p className="text-base sm:text-lg md:text-xl font-bold text-gray-900 mt-1">
                      MRIG03766A
                    </p>
                  </div>
                </div>
              </div>

              {/* Support Hours */}
              <div className="text-center lg:text-left space-y-6">
                <div>
                  <p className="text-xs sm:text-sm uppercase tracking-wider text-blue-600 font-semibold mb-3">
                    Working Days
                  </p>
                  <p className="text-gray-700 text-base sm:text-lg md:text-xl font-medium">
                    Monday – Saturday
                  </p>
                </div>

                <div>
                  <p className="text-xs sm:text-sm uppercase tracking-wider text-blue-600 font-semibold mb-3">
                    Working Hours
                  </p>
                  <div className="space-y-2 text-gray-700 text-sm sm:text-base md:text-lg">
                    <p className="font-medium">11:00 AM – 2:00 PM IST</p>
                    <p className="font-medium">3:00 PM – 5:00 PM IST</p>
                    <p className="text-gray-500 italic mt-4">
                      Closed on Sundays and Public Holidays
                    </p>
                  </div>
                </div>

                <p className="text-gray-600 text-sm sm:text-base pt-4">
                  We typically respond within a few hours ✨
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FIXED: Removed `jsx global` → now using regular <style> */}
      <style>{`
        @keyframes float-slow {
          0%,
          100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-40px) rotate(8deg);
          }
        }
        .animate-float-slow {
          animation: float-slow 25s ease-in-out infinite;
        }
        .delay-1000 {
          animation-delay: 1s;
        }
        .delay-2000 {
          animation-delay: 2s;
        }
        .delay-3000 {
          animation-delay: 3s;
        }

        .glass-card {
          background: rgba(255, 255, 255, 0.82);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(255, 255, 255, 0.5);
          box-shadow: 0 12px 40px rgba(0, 0, 0, 0.1);
        }
      `}</style>
    </div>
  );
};

export default Contact;
