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
    <div className="relative min-h-screen w-full overflow-x-hidden">
      {/* Background layers */}
      <div className="fixed inset-0 -z-20 bg-gradient-to-br from-white-50 via-white-50 to-white-100" />
      <div className="fixed inset-0 pointer-events-none z-0 opacity-10">
        <div className="absolute top-1/4 left-8 text-8xl text-blue-300 animate-float-slow">
          📍
        </div>
        <div className="absolute top-1/3 right-16 text-9xl text-indigo-300 animate-float-slow delay-1000">
          🧳
        </div>
        <div className="absolute bottom-1/3 left-1/3 text-7xl text-blue-200 animate-float-slow delay-2000">
          🧭
        </div>
        <div className="absolute bottom-44 right-12 text-8xl text-indigo-200 animate-float-slow delay-3000">
          ✈️
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-9xl text-blue-100 animate-float-slow delay-4000">
          🌍
        </div>
      </div>
      <div className="fixed inset-0 -z-10 opacity-[0.03] pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(147,197,253,0.4)_0%,transparent_50%),radial-gradient(circle_at_80%_70%,rgba(165,180,252,0.3)_0%,transparent_50%)]"></div>
      </div>
      <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
        <div className="absolute top-[10%] left-[-10%] w-[50%] h-[40%] bg-blue-100/20 rounded-full blur-[120px] animate-float-slow"></div>
        <div className="absolute bottom-[10%] right-[-10%] w-[40%] h-[40%] bg-indigo-100/10 rounded-full blur-[120px] animate-float-slow delay-2000"></div>
      </div>

      <main className="relative z-10 w-full">
        <section className="scroll-reveal">
          <TourHeader />
        </section>

        <div className="flex flex-col gap-12 md:gap-20 lg:gap-32 pb-20">
          <section className="scroll-reveal px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto glass-card rounded-[2.5rem] overflow-hidden transition-all duration-500">
              <TourSpecialityMenu />
            </div>
          </section>

          <section className="scroll-reveal px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto glass-card rounded-[2.5rem] overflow-hidden">
              <TopTours />
            </div>
          </section>

          <section className="scroll-reveal px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto glass-card rounded-[2.5rem] overflow-hidden">
              <CategoryWiseTours />
            </div>
          </section>

          <section className="scroll-reveal px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
              <Banner />
            </div>
          </section>
        </div>
      </main>

      {/* Fixed: Removed `jsx global` → now just <style> */}
      <style>{`
        /* Smooth Entrance */
        .scroll-reveal {
          opacity: 0;
          transform: translateY(40px);
          transition: opacity 1.2s ease-out,
            transform 1.2s cubic-bezier(0.22, 1, 0.36, 1);
          will-change: transform, opacity;
        }

        .animate-reveal {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }

        /* Responsive Glassmorphism */
        .glass-card {
          background: rgba(255, 255, 255, 0.45);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.7);
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.03);
        }

        /* Premium Floating Animation */
        @keyframes float-slow {
          0%,
          100% {
            transform: translate(0, 0) scale(1);
          }
          50% {
            transform: translate(20px, -30px) scale(1.05);
          }
        }

        .animate-float-slow {
          animation: float-slow 20s ease-in-out infinite;
        }

        .delay-2000 {
          animation-delay: 2s;
        }

        /* Custom Scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
        }
        ::-webkit-scrollbar-track {
          background: #f8fafc;
        }
        ::-webkit-scrollbar-thumb {
          background: #e2e8f0;
          border-radius: 10px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: #cbd5e1;
        }
      `}</style>
    </div>
  );
};

export default TourHome;
