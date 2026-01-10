


import React, { useEffect } from "react";
import Banner from "../components/Banner";
import TourHeader from "../components/TourHeader";
import TourSpecialityMenu from "../components/TourSpecialityMenu";
import TopTours from "../components/TopTours";
import CategoryWiseTours from "../components/CategoryWiseTours";

const TourHome = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-reveal");
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    document.querySelectorAll(".scroll-reveal").forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div >
      <main className="relative z-10 w-full">
        {/* Hero section – decent size, touches navbar, balanced height */}
        <section className="scroll-reveal  min-h-[60vh] sm:min-h-[70vh] md:min-h-[80vh] lg:min-h-[85vh] pt-4 pb-8 md:pb-12">
          <TourHeader />
        </section>

        <div className="flex flex-col gap-12 md:gap-20 lg:gap-28 pb-16 md:pb-24 lg:pb-32">
          <section className="scroll-reveal px-4 sm:px-6 lg:px-8">
           
              <TourSpecialityMenu />
          
          </section>

          <section className="scroll-reveal px-4 sm:px-6 lg:px-8">
            
              <TopTours />
          
          </section>

          <section className="scroll-reveal px-4 sm:px-6 lg:px-8">
           
              <CategoryWiseTours />
            
          </section>

          <section className="scroll-reveal px-4 sm:px-6 lg:px-8">
            
              <Banner />
            
          </section>
        </div>
      </main>

      {/* Keep only essential styles */}
      <style>{`
        .glass-card {
          background: rgba(255, 255, 255, 0.45);
          backdrop-filter: blur(1px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.7);
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.03);
        }

        .scroll-reveal {
          opacity: 0;
          transform: translateY(40px);
          transition: opacity 1.2s ease-out, transform 1.2s cubic-bezier(0.22, 1, 0.36, 1);
        }

        .animate-reveal {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }
      `}</style>
    </div>
  );
};

export default TourHome;