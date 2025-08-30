"use client";

import ImageResizer from "./components/image-resizer";
import Logo from "./components/logo";
import Services from "./components/Services";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Main split layout */}
      <div className="flex flex-col md:flex-row flex-1">
        {/* Left Panel: Image Resizer */}
        <div className="w-full md:w-1/2 bg-white p-8 md:p-16 flex flex-col justify-center">
          <Logo />
          <ImageResizer />
        </div>

        {/* Right Panel: Info / How it works */}
        <div className="w-full md:w-1/2 relative overflow-hidden rounded-3xl flex items-center justify-center bg-gray-50 mr-6">
          {/* Soft gradient circles */}
          <div className="absolute -top-32 -left-32 w-80 h-80 bg-gradient-to-tr from-[#15FFA3] to-[#0ee08a] opacity-30 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-br from-[#15FFA3] to-[#0ee08a] opacity-20 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-gradient-to-tr from-[#15FFA3] to-[#0ee08a] opacity-10 rounded-full blur-2xl -translate-x-1/2 -translate-y-1/2"></div>

          {/* How it works card */}
          <div className="relative z-10 w-full max-w-md mx-auto p-12 bg-white rounded-2xl shadow-lg">
            <h3 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
              How It Works
            </h3>
            <ol className="space-y-4 text-gray-700 list-decimal list-inside">
              <li>Upload your image using the upload area on the left.</li>
              <li>Set the desired width, height, and format for your image.</li>
              <li>
                Click <span className="font-medium">Resize Image</span> to
                process.
              </li>
              <li>
                Download your resized image instantly and use it anywhere.
              </li>
            </ol>
            <div className="mt-8 text-center">
              <p className="text-gray-500">
                Fast, client-side image resizing without uploading to a server.
              </p>
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
