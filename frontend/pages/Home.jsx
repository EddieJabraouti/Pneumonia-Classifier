import React from "react";
import Summary from "../components/Summary";

const Home = () => {
  return (
    <section className="py-20 px-6 lg:px-12 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <span className="inline-flex items-center rounded-full border border-gray-200 bg-white/70 px-3.5 py-1 text-sm text-gray-600 shadow-sm">
          Powered by Advanced AI
        </span>
        <h2 className="mt-6 text-3xl md:text-4xl font-semibold tracking-tight text-gray-900">
          Cutting-Edge Technology Stack
        </h2>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-500">
          Pneumonia detection model combines computer
          vision with advanced natural language processing to deliver accurate
          diagnoses and comprehensive explanations.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
        {/* Left: cards */}
        <div className="flex flex-col gap-6">
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900">
              Custom Trained ResNet-18
            </h3>
            <p className="text-sm text-gray-500">Computer Vision Model</p>
            <p className="mt-3 text-gray-600">
              The Customized ResNet-18 architecture has been specifically trained on
              thousands of chest X-ray images to identify pneumonia patterns
              with acceptable accuracy.
            </p>
            <ul className="mt-4 grid grid-cols-2 gap-y-2 text-sm text-gray-600">
              <li>• 18-layer deep network</li>
              <li>• 10K+ training images</li>
              <li>• Sub-second inference</li>
              <li>• Optimized for medical imaging</li>
            </ul>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900">
              GPT-5 Integration
            </h3>
            <p className="text-sm text-gray-500">Natural Language Processing</p>
            <p className="mt-3 text-gray-600">
              GPT-5 provides detailed explanations of findings,
              helping anyone understand the reasoning behind
              each classification.
            </p>
            <ul className="mt-4 space-y-2 text-sm text-gray-600">
              <li>• Detailed explanations</li>
              <li>• Medical terminology and context</li>
              <li>• Treatment recommendations</li>
              <li>• Risk factor analysis</li>
            </ul>
          </div>
        </div>

        {/* Right: image card */}
        <div className="relative">
          <div className="rounded-3xl overflow-hidden shadow-[0_30px_60px_-15px_rgba(0,0,0,0.35)]">
            {/* TODO: replace with your own image */}
            <img
              src="./public/images/doc1.jpg"
              alt="AI-Powered Analysis"
              className="h-[500px] w-full object-cover"
            />
          </div>
          <div className="absolute bottom-5 left-6 right-6">
            <div className="rounded-2xl bg-black/30 backdrop-blur-sm px-5 py-4 text-white">
              <div className="text-lg font-semibold">AI-Powered Analysis</div>
              <div className="text-sm text-gray-200">
                Advanced machine learning for medical diagnosis
              </div>
            </div>
          </div>
        </div>
      </div>
      <br></br>
      <br></br>
      <br></br>
      <Summary/>
    </section>
  );
};

export default Home;
