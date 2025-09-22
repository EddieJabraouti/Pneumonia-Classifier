import React from "react";
import { Link } from "react-router-dom";
import Toolbar from "../components/Toolbar";

const Technology = () => {
  return (
    <section className="py-20 px-6 lg:px-12 max-w-7xl mx-auto">

      {/* Header */}
      <div className="text-center mb-12">
        <span className="inline-flex items-center rounded-full border border-gray-200 bg-white/70 px-3.5 py-1 text-sm text-gray-600 shadow-sm">
          Model Details & Training Setup
        </span>
        <h1 className="mt-6 text-3xl md:text-4xl font-semibold tracking-tight text-gray-900">
          The Model Architecture
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-500">
          A lightweight convolutional neural network based on{" "}
          <a
            className="underline decoration-dotted hover:text-gray-700"
            href="https://arxiv.org/pdf/1512.03385"
            target="_blank"
            rel="noreferrer"
          >
            ResNet-18 (He et&nbsp;al., 2015)
          </a>{" "}
          tailored for scalable medical image classification.
        </p>
      </div>

      {/* Content grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
        {/* Left column: Architecture + Training */}
        <div className="flex flex-col gap-6">
          {/* Architecture card */}
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900">
              Model Architecture
            </h3>
            <p className="text-sm text-gray-500">Backbone & layers</p>
            <ul className="mt-4 space-y-2 text-sm text-gray-700">
              <li>• <span className="font-medium">Backbone:</span> ResNet-18</li>
              <li>• <span className="font-medium">Layers:</span> 17 convolution layers</li>
              <li>• <span className="font-medium">Pooling:</span> Max pooling (3×3)</li>
              <li>• <span className="font-medium">Head:</span> Final fully connected (MLP) layer</li>
              <li>
                • <span className="font-medium">Regularization:</span> Dropout&nbsp;p=0.7 applied per MLP layer to mitigate
                overfitting due to larger training vs. validation split
              </li>
              <li>
                • <span className="font-medium">Activations (MLP):</span> ReLU vs. SeLU (experimented)
              </li>
              <li>• <span className="font-medium">Input:</span> Normalized prior to training</li>
            </ul>
          </div>

          {/* Training config card */}
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900">
              Training Configuration
            </h3>
            <p className="text-sm text-gray-500">Optimization & scheduling</p>
            <ul className="mt-4 space-y-2 text-sm text-gray-700">
              <li>
                • <span className="font-medium">Optimizer:</span> Adam (lr=1e-3, β₁=0.9, β₂=0.99)
              </li>
              <li>
                • <span className="font-medium">LR Scheduler:</span> CosineAnnealingLR
              </li>
              <li>• <span className="font-medium">Loss:</span> Cross-entropy</li>
              <li>• <span className="font-medium">Batch size:</span> 32</li>
              <li>• <span className="font-medium">Hardware:</span> Single NVIDIA A100 (cloud)</li>
            </ul>
          </div>

          {/* Experimental setup card */}
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900">
              Experimental Setup
            </h3>
            <p className="text-sm text-gray-500">Data & rationale</p>
            <ul className="mt-4 space-y-2 text-sm text-gray-700">
              <li>
                • <span className="font-medium">Dataset split:</span> Training set larger than validation set
              </li>
              <li>
                • <span className="font-medium">Overfitting control:</span> Elevated dropout (0.7) to reduce
                memorization and improve generalization
              </li>
            </ul>
          </div>
        </div>

        {/* Right column: Results & quick facts */}
        <div className="flex flex-col gap-6">
          {/* Results card */}
          <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.25)]">
            <div className="text-sm text-gray-500 mb-2">Evaluation</div>
            <div className="flex items-end gap-4">
              <div>
                <div className="text-5xl font-semibold text-gray-900 leading-tight">90%</div>
                <div className="text-gray-600">Test Accuracy</div>
              </div>
            </div>
            <div className="mt-6 grid grid-cols-2 gap-4 text-sm">
              <div className="rounded-xl border border-gray-100 bg-gray-50 p-4">
                <div className="text-gray-500">Batch Size</div>
                <div className="text-gray-900 font-medium">32</div>
              </div>
              <div className="rounded-xl border border-gray-100 bg-gray-50 p-4">
                <div className="text-gray-500">Scheduler</div>
                <div className="text-gray-900 font-medium">Cosine Annealing</div>
              </div>
              <div className="rounded-xl border border-gray-100 bg-gray-50 p-4">
                <div className="text-gray-500">Optimizer</div>
                <div className="text-gray-900 font-medium">Adam</div>
              </div>
              <div className="rounded-xl border border-gray-100 bg-gray-50 p-4">
                <div className="text-gray-500">Dropout (MLP)</div>
                <div className="text-gray-900 font-medium">0.7</div>
              </div>
            </div>
          </div>

          {/* Notes & references card */}
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900">Notes & References</h3>
            <ul className="mt-4 space-y-2 text-sm text-gray-700">
              <li>
                • Paper:{" "}
                <a
                  className="underline decoration-dotted hover:text-gray-700"
                  href="https://arxiv.org/pdf/1512.03385"
                  target="_blank"
                  rel="noreferrer"
                >
                  Deep Residual Learning for Image Recognition (He et&nbsp;al., 2015)
                </a>
              </li>
              <li>
                • Optimizer: Adam (Kingma &amp; Ba, 2014)
              </li>
              <li>
                • Activation experiments: ReLU vs. SeLU within the MLP head
              </li>
            </ul>

            <div className="mt-6 text-sm text-gray-600">
              Need a quick overview instead?{" "}
              <Link
                to="/"
                className="font-medium underline decoration-dotted hover:text-gray-800"
              >
                Go back to the Home summary
              </Link>
              .
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Technology;
