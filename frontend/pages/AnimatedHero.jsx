import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const AnimatedHero = () => {
  const headingText = " Clarity";
  const [displayedText, setDisplayedText] = useState("");
  const [showCursor, setShowCursor] = useState(false);
  const [fadeInDesc, setFadeInDescription] = useState(false);
  const [fadeInButtons, setFadeInButtons] = useState(false);

  useEffect(() => {
    let i = 0;
    setShowCursor(true);

    const typingTimer = setInterval(() => {
      if (i < headingText.length) {
        setDisplayedText((prev) => prev + headingText.charAt(i));
        i += 1;
      } else {
        clearInterval(typingTimer);
        setFadeInDescription(true);

        setTimeout(() => {
          setFadeInButtons(true);

          // Let the cursor blink a bit after finishing, then hide it
          setTimeout(() => setShowCursor(false), 800);
        }, 500);
      }
    }, 100);

    return () => clearInterval(typingTimer);
  }, []);

  return (
    <section className="min-h-screen bg-white text-black px-6 flex flex-col justify-center items-center">
      <div className="max-w-4xl text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          {displayedText}
          {showCursor && <span className="animate-blink ml-0.5">|</span>}
        </h1>

        <p
          className={`text-lg text-gray-500 mb-6 max-w-xl mx-auto transition-opacity duration-1000 ${
            fadeInDesc ? "opacity-100" : "opacity-0"
          }`}
        >
          Advanced Medical Imagery Disease Detection.
        </p>

        <div
          className={`flex flex-wrap justify-center gap-4 transition-opacity duration-700 ${
            fadeInButtons ? "opacity-100" : "opacity-0"
          }`}
        >
          <Link to="/Model">
            <button className="border-2 border-black bg-black text-white hover:bg-gray-800 px-6 py-2 rounded-md text-lg transition">
              Try it Out
            </button>
          </Link>

          <Link to="/Technology">
            <button className="border-2 border-black bg-black text-white hover:bg-gray-800 px-6 py-2 rounded-md text-lg transition">
              See Technology
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default AnimatedHero;
