// components/image-resizer.tsx
"use client";

import { useState, useRef } from "react";
import Button from "./ui/button";
import UploadArea from "./ui/upload-area";

export default function ImageResizer() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [resizedUrl, setResizedUrl] = useState<string | null>(null);
  const [scale, setScale] = useState<number>(1);
  const [width, setWidth] = useState<number>(800);
  const [height, setHeight] = useState<number>(600);
  const [quality, setQuality] = useState<number>(90);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreviewUrl(e.target?.result as string);
      setResizedUrl(null);
      setScale(1);
    };
    reader.readAsDataURL(file);
  };

  const resizeImage = () => {
    if (!previewUrl || !canvasRef.current) return;

    const img = new Image();
    img.src = previewUrl;

    img.onload = () => {
      const canvas = canvasRef.current!;
      const ctx = canvas.getContext("2d")!;

      // Calculate new dimensions while maintaining aspect ratio
      const aspectRatio = img.width / img.height;
      let newWidth = width;
      let newHeight = height;

      if (newWidth / newHeight !== aspectRatio) {
        // Maintain aspect ratio
        if (newWidth / aspectRatio <= newHeight) {
          newHeight = newWidth / aspectRatio;
        } else {
          newWidth = newHeight * aspectRatio;
        }
      }

      canvas.width = newWidth;
      canvas.height = newHeight;

      ctx.drawImage(img, 0, 0, newWidth, newHeight);

      setResizedUrl(canvas.toDataURL("image/jpeg", quality / 100));
    };
  };

  const downloadImage = () => {
    if (!resizedUrl) return;

    const link = document.createElement("a");
    link.href = resizedUrl;
    link.download = `resized-${selectedFile?.name || "image"}.jpg`;
    link.click();
  };

  return (
    <div className="max-w-2xl">
      <h1 className="text-4xl font-extrabold mb-4">
        Resize Your Images for Free
      </h1>
      <p className="text-xl text-[#0ee08a] mb-8">Resize your image</p>

      {!previewUrl ? (
        <UploadArea onFileSelect={handleFileSelect} />
      ) : (
        <div className="space-y-6">
          <div className="flex flex-col items-center">
            <div className="mb-4 text-center">
              <h3 className="font-medium mb-2">Original Image</h3>
              <img
                src={previewUrl}
                alt="Preview"
                className="max-h-64 rounded-lg shadow-md"
              />
            </div>

            <div className="mb-6 w-full">
              <h3 className="font-medium mb-2 text-center">Resize Options</h3>
              <div className="flex flex-wrap gap-2 justify-center mb-4">
                {[0.5, 0.75, 1, 1.25, 1.5, 2].map((size) => (
                  <Button
                    key={size}
                    variant={scale === size ? "primary" : "secondary"}
                    onClick={() => {
                      setScale(size);
                      setWidth(Math.round((width * size) / scale));
                      setHeight(Math.round((height * size) / scale));
                    }}
                    className="text-sm"
                  >
                    {size * 100}%
                  </Button>
                ))}
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Width (px)
                    </label>
                    <input
                      type="number"
                      value={width}
                      onChange={(e) => setWidth(Number(e.target.value))}
                      className="w-full p-2 border border-gray-300 rounded-md"
                      min="100"
                      max="2000"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Height (px)
                    </label>
                    <input
                      type="number"
                      value={height}
                      onChange={(e) => setHeight(Number(e.target.value))}
                      className="w-full p-2 border border-gray-300 rounded-md"
                      min="100"
                      max="2000"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Quality (%)
                    </label>
                    <input
                      type="range"
                      value={quality}
                      onChange={(e) => setQuality(Number(e.target.value))}
                      className="w-full accent-[#15FFA3]"
                      min="10"
                      max="100"
                    />
                    <div className="text-center text-sm text-gray-600">
                      {quality}%
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Format
                    </label>
                    <select className="w-full p-2 border border-gray-300 rounded-md">
                      <option>JPEG</option>
                      <option>PNG</option>
                      <option>WEBP</option>
                    </select>
                  </div>
                </div>

                <div className="mt-4 flex justify-center">
                  <Button onClick={resizeImage}>Resize Image</Button>
                </div>
              </div>
            </div>

            {resizedUrl && (
              <div className="text-center">
                <h3 className="font-medium mb-2">Resized Image</h3>
                <img
                  src={resizedUrl}
                  alt="Resized"
                  className="max-h-64 rounded-lg shadow-md mb-4"
                />
                <Button onClick={downloadImage}>Download Resized Image</Button>
              </div>
            )}
          </div>

          <div className="text-center">
            <Button
              variant="secondary"
              onClick={() => {
                setSelectedFile(null);
                setPreviewUrl(null);
                setResizedUrl(null);
              }}
            >
              Upload Different Image
            </Button>
          </div>
        </div>
      )}

      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
}
