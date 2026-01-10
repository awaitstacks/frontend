// import React from "react";
// import { Link } from "react-router-dom";
// import { batch } from "../assets/tourAsset.js";

// const TourSpecialityMenu = () => {
//   // Limit to 9 for perfect 3x3 grid
//   const displayedCategories = batch.slice(0, 9);

//   return (
//     <section
      
//     >
//       {/* Consistent Calming wave pattern overlay from Header */}
//       <div className="absolute inset-0 opacity-5 pointer-events-none">
//         <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_70%,rgba(147,197,253,0.3)_0%,transparent_50%),radial-gradient(circle_at_30%_30%,rgba(165,180,252,0.2)_0%,transparent_50%)]"></div>
//       </div>

//       {/* Subtle Background Blobs for depth */}
//       <div className="absolute top-0 left-0 w-96 h-96 bg-blue-50 rounded-full blur-[120px] opacity-40"></div>
//       <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-50 rounded-full blur-[120px] opacity-40"></div>

//               <div className="
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
//         {/* Compact Heading */}
//         <div className="mb-16 md:mb-20">
//           <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-4 tracking-tight">
//             Find Your Perfect <span className="text-blue-600">Journey</span>
//           </h2>
//           <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
//             Choose from our curated tour categories designed for every type of
//             explorer.
//           </p>
//         </div>

//         {/* Clean 3x3 Grid – Glassmorphism Cards */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto">
//           {displayedCategories.map((item, index) => (
//             <Link
//               key={index}
//               to={`/tours/${item.speciality}`}
//               onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
//               className="group relative p-8 bg-white/40 backdrop-blur-md rounded-3xl border border-white/60 shadow-[0_4px_20px_0_rgba(148,163,184,0.1)] hover:shadow-[0_20px_40px_0_rgba(148,163,184,0.15)] transition-all duration-500 hover:-translate-y-2 flex flex-col items-center justify-center min-h-32 md:min-h-40 overflow-hidden"
//             >
//               {/* Internal Glossy Shine Effect */}
//               <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/40 to-transparent pointer-events-none"></div>

//               {/* Category Name */}
//               <h3 className="relative z-10 text-lg md:text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
//                 {item.speciality}
//               </h3>

//               {/* Animated underline */}
//               <div className="mt-3 w-8 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center"></div>
//             </Link>
//           ))}
//         </div>

//         {/* Minimal CTA */}
//         {batch.length > 9 && (
//           <div className="mt-16">
//             <Link
//               to="/tours"
//               className="text-gray-500 hover:text-blue-600 font-semibold uppercase tracking-widest text-sm transition-all flex items-center justify-center gap-2 group"
//             >
//               View all tours
//               <span className="group-hover:translate-x-1 transition-transform">
//                 →
//               </span>
//             </Link>
//           </div>
//         )}
//       </div>
//     </section>
//   );
// };

// export default TourSpecialityMenu;


import React from "react";
import { Link } from "react-router-dom";
import { batch } from "../assets/tourAsset.js";

const TourSpecialityMenu = () => {
  // Limit to 9 for perfect 3x3 grid
  const displayedCategories = batch.slice(0, 9);

  return (
    <section className="relative py-12 xs:py-16 sm:py-20 md:py-24 lg:py-28 xl:py-32">
      {/* Subtle overlay - kept as is */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_70%,rgba(147,197,253,0.3)_0%,transparent_50%),radial-gradient(circle_at_30%_30%,rgba(165,180,252,0.2)_0%,transparent_50%)]"></div>
      </div>

      {/* Main Content Wrapper - same width as TourHeader */}
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
        {/* Heading - perfectly centered */}
        <div className="text-center mb-10 xs:mb-12 sm:mb-16 md:mb-20">
          <h2 className="text-2xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-4xl font-bold text-gray-900 mb-4 md:mb-6 tracking-tight">
            Find Your Perfect <span className="text-blue-600">Journey</span>
          </h2>
          <p className="text-base xs:text-lg sm:text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Choose from our curated tour categories designed for every type of explorer.
          </p>
        </div>

        {/* Clean 3x3 Grid – centered items */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 xs:gap-8 md:gap-10 lg:gap-12 max-w-5xl mx-auto">
          {displayedCategories.map((item, index) => (
            <Link
              key={index}
              to={`/tours/${item.speciality}`}
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="
                group relative 
                flex flex-col items-center justify-center 
                p-6 xs:p-8 sm:p-10 md:p-12 
                bg-white/50 backdrop-blur-md 
                rounded-2xl sm:rounded-3xl 
                border border-white/60 
                shadow-lg hover:shadow-xl 
                transition-all duration-500 hover:-translate-y-2 
                min-h-[120px] sm:min-h-[140px] md:min-h-[160px] 
                overflow-hidden
                text-center
              "
            >
              {/* Internal Glossy Shine */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent pointer-events-none"></div>

              {/* Category Name - centered */}
              <h3 className="
                relative z-10 
                text-lg xs:text-xl sm:text-xl md:text-1xl 
                font-bold text-gray-900 
                group-hover:text-blue-600 
                transition-colors duration-300
              ">
                {item.speciality}
              </h3>

              {/* Animated underline */}
              <div className="mt-3 w-8 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center"></div>
            </Link>
          ))}
        </div>

        {/* Minimal CTA - centered */}
        {batch.length > 9 && (
          <div className="mt-12 md:mt-16 text-center">
            <Link
              to="/tours"
              className="
                inline-flex items-center gap-2 
                text-gray-600 hover:text-blue-600 
                font-semibold uppercase tracking-widest 
                text-sm sm:text-base 
                transition-all
              "
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