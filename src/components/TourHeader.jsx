

// import React from "react";

// const TourHeader = () => {
//   return (
//     <div className="
//       relative 
//       min-h-[65vh] xs:min-h-[70vh] sm:min-h-[75vh] md:min-h-[80vh] lg:min-h-[85vh] 
//       flex items-center justify-center 
//       px-4 xs:px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 
//       py-12 sm:py-16 md:py-20 lg:py-24 xl:py-28
//     ">
//       {/* Glassmorphic container - same style as Banner */}
//   <div className="
//   w-full 
//   max-w-[94vw] xs:max-w-[94%] sm:max-w-[96%] md:max-w-[92vw] 
//   lg:max-w-[90vw] xl:max-w-[88vw] 2xl:max-w-[86vw]
//   mx-auto
//   rounded-2xl sm:rounded-3xl md:rounded-[2.5rem] lg:rounded-[3rem]
//   backdrop-blur-xl bg-white/45 border border-white/50
//   shadow-xl md:shadow-2xl
//   overflow-hidden
//   p-6 xs:p-8 sm:p-10 md:p-12 lg:p-16 xl:p-20
// ">
//         <div className="space-y-8 sm:space-y-10 md:space-y-12 lg:space-y-14 animate-fade-in text-center">
//           {/* Main Heading */}
//           <h1 className="
//             text-3xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 
//             font-extrabold text-gray-900 leading-[1.1] tracking-tight
//           ">
//             <span className="block">Embark on a Journey</span>
//             <span className="
//               block mt-2 sm:mt-3 md:mt-4 lg:mt-5 
//               bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent
//             ">
//               of Peace & Discovery
//             </span>
//           </h1>

//           {/* Subheading */}
//           <p className="
//             text-base xs:text-lg sm:text-xl md:text-2xl lg:text-[1.35rem] 
//             text-gray-700 max-w-4xl mx-auto 
//             leading-relaxed font-light
//           ">
//             Let us take care of every detail while you relax and immerse yourself in beautiful
//             destinations. Travel with comfort, confidence, and calm — the way it should be.
//           </p>

//           {/* Trust badge - centered with light glass */}
//           <div className="flex justify-center mt-8 md:mt-10">
//             <div className="bg-white/60 backdrop-blur-sm px-8 py-5 rounded-2xl shadow-md border border-white/70">
//               <p className="text-gray-800 font-semibold text-base sm:text-lg md:text-xl">
//                 Trusted by thousands of travelers
//               </p>
//               <p className="text-gray-600 text-sm md:text-base mt-1">
//                 4.7/5 from 600+ heartfelt reviews
//               </p>
//             </div>
//           </div>

//           {/* CTA Button - centered */}
//           <div className="flex justify-center mt-10 md:mt-12 lg:mt-14">
//             <a
//               href="#speciality"
//               className="
//                 inline-flex items-center justify-center 
//                 px-8 sm:px-10 md:px-12 lg:px-14 py-4 md:py-5 
//                 bg-gradient-to-r from-blue-600 to-indigo-600 
//                 hover:from-blue-700 hover:to-indigo-700 
//                 text-white font-medium text-base sm:text-lg md:text-xl 
//                 rounded-full 
//                 transition-all duration-300 
//                 hover:scale-105 hover:shadow-2xl
//                 shadow-xl shadow-blue-600/20
//                 min-w-[240px] sm:min-w-[280px] md:min-w-[320px]
//               "
//             >
//               Explore Our Tours
//             </a>
//           </div>
//         </div>
//       </div>

//       {/* Animation styles */}
//       <style>{`
//         @keyframes fadeIn {
//           from { opacity: 0; transform: translateY(50px); }
//           to   { opacity: 1; transform: translateY(0); }
//         }

//         .animate-fade-in > * {
//           opacity: 0;
//           animation: fadeIn 1.4s ease-out forwards;
//         }

//         .animate-fade-in > *:nth-child(1) { animation-delay: 0.2s; }
//         .animate-fade-in > *:nth-child(2) { animation-delay: 0.6s; }
//         .animate-fade-in > *:nth-child(3) { animation-delay: 1.0s; }
//         .animate-fade-in > *:nth-child(4) { animation-delay: 1.4s; }
//       `}</style>
//     </div>
//   );
// };

// export default TourHeader;



import React from "react";

const TourHeader = () => {
  return (
    <div className="
      relative 
    min-h-[65vh] xs:min-h-[70vh] sm:min-h-[75vh] md:min-h-[80vh] lg:min-h-[85vh] 
    flex items-center justify-center 
    px-4 xs:px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 
    pt-0 pb-12 sm:pb-16 md:pb-20 lg:pb-24 xl:pb-28
    ">
      {/* Wider glass container */}
      <div className="
        w-full 
        max-w-[98%] xs:max-w-[96%] sm:max-w-[98%] md:max-w-[96vw] 
        lg:max-w-[94vw] xl:max-w-[92vw] 2xl:max-w-[90vw]
        rounded-3xl sm:rounded-[2.5rem] md:rounded-[3rem] lg:rounded-[3.5rem] xl:rounded-[4rem]
        backdrop-blur-xl bg-white/40 border border-white/50
        shadow-2xl md:shadow-[0_30px_90px_-15px_rgba(0,0,0,0.12)]
        overflow-hidden
        p-8 xs:p-10 sm:p-12 md:p-16 lg:p-20 xl:p-24
      ">
        <div className="space-y-8 sm:space-y-10 md:space-y-12 lg:space-y-14 animate-fade-in text-center">
          {/* Main Heading */}
          <h1 className="
            text-3xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 
            font-extrabold text-gray-900 leading-[1.1] tracking-tight
          ">
            <span className="block">Embark on a Journey</span>
            <span className="
              block mt-2 sm:mt-3 md:mt-4 lg:mt-5 
              bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent
            ">
              of Peace & Discovery
            </span>
          </h1>

          {/* Subheading */}
          <p className="
            text-base xs:text-lg sm:text-xl md:text-2xl lg:text-[1.35rem] 
            text-gray-700 max-w-4xl mx-auto 
            leading-relaxed font-light
          ">
            Let us take care of every detail while you relax and immerse yourself in beautiful
            destinations. Travel with comfort, confidence, and calm — the way it should be.
          </p>

          {/* Trust badge */}
          <div className="flex justify-center mt-8 md:mt-10">
            <div className="bg-white/60 backdrop-blur-sm px-8 py-5 rounded-2xl shadow-md border border-white/70">
              <p className="text-gray-800 font-semibold text-base sm:text-lg md:text-xl">
                Trusted by thousands of travelers
              </p>
              <p className="text-gray-600 text-sm md:text-base mt-1">
                4.7/5 from 600+ heartfelt reviews
              </p>
            </div>
          </div>

          {/* CTA Button */}
          <div className="flex justify-center mt-10 md:mt-12 lg:mt-14">
            <a
              href="#speciality"
              className="
                inline-flex items-center justify-center 
                px-8 sm:px-10 md:px-12 lg:px-14 py-4 md:py-5 
                bg-gradient-to-r from-blue-600 to-indigo-600 
                hover:from-blue-700 hover:to-indigo-700 
                text-white font-medium text-base sm:text-lg md:text-xl 
                rounded-full 
                transition-all duration-300 
                hover:scale-105 hover:shadow-2xl
                shadow-xl shadow-blue-600/20
                min-w-[240px] sm:min-w-[280px] md:min-w-[320px]
              "
            >
              Explore Our Tours
            </a>
          </div>
        </div>
      </div>

      {/* Animation styles remain unchanged */}
      <style>{`
        @keyframes fadeIn { /* ... your existing animation ... */ }
        .animate-fade-in > * { /* ... */ }
        /* ... rest of animation ... */
      `}</style>
    </div>
  );
};

export default TourHeader;