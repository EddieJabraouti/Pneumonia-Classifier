import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const AnimatedHero = () => {
  const headingText = " Advanced Pneumonia Detection";
  const [displayedText, setDisplayedText] = useState("");
  const [showCursor, setShowCursor] = useState(false);
  const [fadeInDesc, setFadeInDescription] = useState(false);
  const [fadeInButtons, setFadeInButtons] = useState(false);

  useEffect(() => {
    let i = 0;
    setShowCursor(true);

    const timer = setInterval(() => {
      if (i < headingText.length) {
        setDisplayedText((prev) => prev + headingText.charAt(i));
        i += 1;
      } else {
        clearInterval(timer);
        setFadeInDescription(true);
        setTimeout(() => {
          setFadeInButtons(true);
          setTimeout(() => setShowCursor(false), 800);
        }, 500);
      }
    }, 30);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="bg-white text-black">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-10 pb-16 lg:pt-16 lg:pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* LEFT: text */}
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white/70 px-3.5 py-2 text-sm text-gray-700 shadow-sm">
              <svg
                viewBox="0 0 24 24"
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <path d="M12 3l8 4v6c0 5-3.5 7.5-8 8-4.5-.5-8-3-8-8V7l8-4Z" />
              </svg>
              AI-Powered Medical Diagnosis
            </div>

            <h1 className="mt-6 text-5xl md:text-6xl font-semibold leading-[1.05] tracking-tight text-[#0b0b19]">
              {displayedText}
              {showCursor && <span className="animate-blink ml-0.5">|</span>}
            </h1>

            <p
              className={`mt-6 text-lg md:text-xl text-gray-500 max-w-2xl transition-opacity duration-1000 ${
                fadeInDesc ? "opacity-100" : "opacity-0"
              }`}
            >
              Artificial intelligence for accurate
              pneumonia classification from chest X-rays. The system
              combines computer vision and natural language processing to
              provide reliable medical insights.
            </p>

            <div
              className={`mt-8 flex flex-wrap items-center gap-4 transition-opacity duration-700 ${
                fadeInButtons ? "opacity-100" : "opacity-0"
              }`}
            >
              <Link to="/Model">
                <button className="inline-flex items-center gap-2 rounded-md bg-[#0b0b19] px-5 py-3 text-base font-medium text-white shadow-sm hover:bg-black/90">
                  Upload X-Ray
                  <svg
                    viewBox="0 0 24 24"
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12h14M13 5l7 7-7 7" />
                  </svg>
                </button>
              </Link>

              <Link to="/Technology">
                <button className="inline-flex items-center rounded-md border border-gray-300 bg-white px-5 py-3 text-base font-medium text-gray-900 hover:bg-gray-50">
                  Learn More
                </button>
              </Link>
            </div>

            {/* Feature bullets */}
            <div className="mt-14 grid grid-cols-1 sm:grid-cols-3 gap-8">
              <div className="flex flex-col items-center text-center">
                <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center shadow-sm">
                  <svg
                    viewBox="0 0 24 24"
                    className="h-6 w-6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M13 3l-1 6h6l-9 12 1-6H4l9-12z" />
                  </svg>
                </div>
                <div className="mt-3 font-semibold">Fast Results</div>
                <div className="text-sm text-gray-500">
                  Instant analysis
                </div>
              </div>

              <div className="flex flex-col items-center text-center">
                <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center shadow-sm">
                  <svg
                    viewBox="0 0 24 24"
                    className="h-6 w-6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M12 3a9 9 0 1 0 9 9" />
                    <path d="M9.5 13a3 3 0 1 1 5 0" />
                  </svg>
                </div>
                <div className="mt-3 font-semibold">AI-Powered</div>
                <div className="text-sm text-gray-500">
                  Advanced ML model
                </div>
              </div>

              <div className="flex flex-col items-center text-center">
                <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center shadow-sm">
                  <svg
                    viewBox="0 0 24 24"
                    className="h-6 w-6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M12 22s8-3 8-10V7l-8-4-8 4v5c0 7 8 10 8 10z" />
                  </svg>
                </div>
                <div className="mt-3 font-semibold">Reliable</div>
                <div className="text-sm text-gray-500">
                  90% accuracy
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: image card */}
          <div className="relative">
            <div className="rounded-3xl overflow-hidden shadow-[0_30px_60px_-15px_rgba(0,0,0,0.35)] bg-gray-200">
              {/* TODO: Replace with your chest X-ray image */}
              <img
                src="./public/images/xray.jpg"
                alt="Chest X-Ray"
                className="h-[460px] w-full object-cover"
              />
            </div>

            <div className="absolute bottom-5 left-6 right-6">
              <div className="rounded-2xl bg-black/30 backdrop-blur-sm px-5 py-4 text-white">
                <div className="text-lg font-semibold">
                  Chest X-Ray Analysis
                </div>
                <div className="text-sm text-gray-200">
                  Advanced image processing for medical reasoning
                </div>
              </div>
            </div>

            {/* soft background glow */}
            <div className="absolute -inset-x-6 -bottom-8 h-24 rounded-3xl bg-black/5 blur-2xl" />
          </div>
        </div>
      </div>

      {/* cursor blink keyframe (add once if not already in your CSS) */}
      <style>{`
        @keyframes blink { 0%, 49% { opacity: 1 } 50%, 100% { opacity: 0 } }
        .animate-blink { animation: blink 1s step-start infinite; }
      `}</style>
    </section>
  );
};

export default AnimatedHero;
