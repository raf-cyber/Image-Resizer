"use client";

import { useEffect } from "react";
import ImageResizer from "./components/image-resizer";
import Logo from "./components/logo";
import Services from "./components/Services";

export default function Home() {
  useEffect(() => {
    const widthInput = document.getElementById(
      "widthInput"
    ) as HTMLInputElement;
    const heightInput = document.getElementById(
      "heightInput"
    ) as HTMLInputElement;

    widthInput?.addEventListener("input", function () {
      widthInput.value = this.value;
    });

    heightInput?.addEventListener("input", function () {
      heightInput.value = this.value;
    });
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Main split layout */}
      <div className="flex flex-col md:flex-row flex-1">
        {/* Left Panel (Flat White, No Rounding) */}
        <div className="w-full md:w-1/2 bg-white p-8 md:p-16 flex flex-col justify-center">
          <Logo />
          <ImageResizer />
        </div>

        {/* Right Panel with gradient + rounded edges */}
        <div className="w-full md:w-1/2 relative overflow-hidden rounded-3xl flex items-center justify-center bg-gray-50 mr-6">
          {/* Soft gradient circles */}
          <div className="absolute -top-32 -left-32 w-80 h-80 bg-gradient-to-tr from-[#15FFA3] to-[#0ee08a] opacity-30 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-br from-[#15FFA3] to-[#0ee08a] opacity-20 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-gradient-to-tr from-[#15FFA3] to-[#0ee08a] opacity-10 rounded-full blur-2xl -translate-x-1/2 -translate-y-1/2"></div>

          {/* Control Panel */}
          <div className="relative z-10 w-full max-w-md mx-auto p-12">
            <h3 className="text-3xl font-semibold text-gray-800 mb-8 text-center">
              Image Resizing Model
            </h3>

            <div className="space-y-6">
              {/* Width */}
              <div className="flex items-center justify-between">
                <span className="text-gray-700">Width:</span>
                <input
                  type="number"
                  min="100"
                  max="2000"
                  defaultValue="800"
                  id="widthInput"
                  className="w-24 px-3 py-1.5 border border-gray-300 rounded-md text-gray-800 focus:ring-2 focus:ring-[#15FFA3] focus:outline-none"
                />
              </div>

              {/* Height */}
              <div className="flex items-center justify-between">
                <span className="text-gray-700">Height:</span>
                <input
                  type="number"
                  min="100"
                  max="2000"
                  defaultValue="600"
                  id="heightInput"
                  className="w-24 px-3 py-1.5 border border-gray-300 rounded-md text-gray-800 focus:ring-2 focus:ring-[#15FFA3] focus:outline-none"
                />
              </div>

              {/* Aspect Ratio */}
              <div className="flex items-center justify-between">
                <span className="text-gray-700">Aspect Ratio:</span>
                <select className="border border-gray-300 rounded-md px-3 py-1 text-gray-700 focus:ring-2 focus:ring-[#15FFA3]">
                  <option>Original</option>
                  <option>1:1</option>
                  <option>4:3</option>
                  <option>16:9</option>
                  <option>Custom</option>
                </select>
              </div>

              {/* Action Button */}
              <div className="pt-6 flex justify-center">
                <button className="bg-[#15FFA3] hover:bg-[#0ee08a] text-white font-medium py-2.5 px-8 rounded-full transition-all duration-300 shadow-md hover:shadow-lg">
                  Apply Settings
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <section className="bg-white py-16 px-8 md:px-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 text-center mt-8 mb-12">
            Our Services
          </h2>
          <Services />
        </div>
      </section>
    </div>
  );
}
