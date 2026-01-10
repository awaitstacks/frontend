

import React from "react";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";

const Footer = () => {
  const navigate = useNavigate();

  const handleNavClick = (path) => {
    navigate(path);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative mt-12 md:mt-16 lg:mt-20">
      {/* Signature Calming wave pattern overlay */}
      <div className="absolute inset-0 opacity-5 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_70%,rgba(147,197,253,0.3)_0%,transparent_50%),radial-gradient(circle_at_70%_30%,rgba(165,180,252,0.2)_0%,transparent_50%)]"></div>
      </div>

      {/* Glass Container - same as Banner */}
      <div className="
        w-full 
        max-w-[94%] xs:max-w-[90%] sm:max-w-5xl md:max-w-6xl 
        lg:max-w-7xl xl:max-w-[88vw] 2xl:max-w-[84vw]
        mx-auto
        rounded-3xl sm:rounded-[2.5rem] md:rounded-[3rem] lg:rounded-[3.5rem] xl:rounded-[4rem]
        backdrop-blur bg-white/20 border border-white/50
        shadow-2xl md:shadow-[0_25px_80px_-12px_rgba(0,0,0,0.12)]
        overflow-hidden
        p-8 xs:p-10 sm:p-12 md:p-16 lg:p-20 xl:p-24
      ">
        {/* Grid: 1 column on mobile & tablet, 3 columns only on large desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 sm:gap-12 md:gap-16 lg:gap-24 text-center lg:text-left">
          {/* Left: Logo & Description */}
          <div className="space-y-6 flex flex-col items-center lg:items-start">
            <img
              onClick={() => handleNavClick("/")}
              className="w-40 xs:w-44 md:w-52 cursor-pointer transition-all duration-300 hover:opacity-75"
              src={assets.logo}
              alt="Tour Planners Logo"
            />
            <p className="text-gray-500 leading-relaxed text-sm md:text-base max-w-sm">
              Crafting peaceful and meaningful travel experiences. We take care
              of every detail so you can focus on the discovery.
            </p>
          </div>

          {/* Center: Quick Links */}
          <div className="space-y-6 flex flex-col items-center lg:items-start">
            <h4 className="text-sm font-bold uppercase tracking-widest text-gray-800">
              Explore
            </h4>
            <ul className="space-y-4">
              {["Home", "About", "Tours", "Contact"].map((item) => (
                <li key={item}>
                  <button
                    onClick={() =>
                      handleNavClick(
                        item === "Home" ? "/" : `/${item.toLowerCase()}`
                      )
                    }
                    className="
                      text-gray-500 hover:text-blue-600 
                      transition-colors duration-300 
                      text-sm md:text-base font-medium 
                      flex items-center justify-center lg:justify-start gap-2 
                      group w-full
                    "
                  >
                    <span className="h-px w-0 bg-blue-600 transition-all duration-300 group-hover:w-4"></span>
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Right: Get In Touch */}
          <div className="space-y-6 flex flex-col items-center lg:items-start">
            <h4 className="text-sm font-bold uppercase tracking-widest text-gray-800">
              Get In Touch
            </h4>
            <ul className="space-y-5">
              <li className="flex items-center justify-center lg:justify-start gap-4 group cursor-default">
                <div className="w-10 h-10 rounded-full bg-white/60 flex items-center justify-center border border-gray-100 group-hover:bg-blue-50 group-hover:border-blue-100 transition-all duration-300 shadow-sm flex-shrink-0">
                  <svg
                    className="w-5 h-5 text-blue-600"
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
                <span className="text-gray-600 font-medium truncate max-w-[220px] xs:max-w-[260px] sm:max-w-full">
                  +91 9003998648
                </span>
              </li>

              <li className="flex items-center justify-center lg:justify-start gap-4 group cursor-default">
                <div className="w-10 h-10 rounded-full bg-white/60 flex items-center justify-center border border-gray-100 group-hover:bg-blue-50 group-hover:border-blue-100 transition-all duration-300 shadow-sm flex-shrink-0">
                  <svg
                    className="w-5 h-5 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <span className="text-gray-600 font-medium truncate max-w-[220px] xs:max-w-[260px] sm:max-w-full">
                  gvtourplanners@gmail.com
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider & Copyright */}
        <div className="mt-16 pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
          <p className="text-gray-400 text-xs md:text-sm">
            © 2026 GV - Tour Planners LLP. All rights reserved.
          </p>
          <p className="text-gray-500 text-sm">
            Crafted with{" "}
            <span className="text-red-400 animate-pulse mx-1">❤️</span> by{" "}
            <span className="font-bold text-gray-800 hover:text-blue-600 cursor-pointer transition-colors">
              awaitStacks
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;