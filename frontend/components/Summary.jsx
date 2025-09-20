import React from "react";

const Summary = () => {
  return (
    <section className="bg-gray-50 py-16 px-6 lg:px-12">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-900">
          How It Works
        </h2>
        <p className="mt-2 text-lg text-gray-500">
          Our two-step AI pipeline ensures both accurate detection and comprehensive explanation
        </p>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Step 1 */}
          <div className="flex flex-col items-center text-center">
            <div className="h-14 w-14 flex items-center justify-center rounded-full bg-gray-200 text-lg font-semibold text-gray-800">
              1
            </div>
            <h3 className="mt-4 text-lg font-medium text-gray-900">
              Image Analysis
            </h3>
            <p className="mt-2 text-gray-500 text-sm max-w-xs">
              ResNet-18 processes the X-ray image to identify pneumonia patterns and abnormalities
            </p>
          </div>

          {/* Step 2 */}
          <div className="flex flex-col items-center text-center">
            <div className="h-14 w-14 flex items-center justify-center rounded-full bg-gray-200 text-lg font-semibold text-gray-800">
              2
            </div>
            <h3 className="mt-4 text-lg font-medium text-gray-900">
              Classification
            </h3>
            <p className="mt-2 text-gray-500 text-sm max-w-xs">
              The model outputs a confidence score and classification result for pneumonia presence
            </p>
          </div>

          {/* Step 3 */}
          <div className="flex flex-col items-center text-center">
            <div className="h-14 w-14 flex items-center justify-center rounded-full bg-gray-200 text-lg font-semibold text-gray-800">
              3
            </div>
            <h3 className="mt-4 text-lg font-medium text-gray-900">
              Explanation
            </h3>
            <p className="mt-2 text-gray-500 text-sm max-w-xs">
              GPT-5 generates detailed medical explanations and recommendations based on findings
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Summary;
