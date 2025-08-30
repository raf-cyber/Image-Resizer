// components/image-resizer.tsx
"use client";

import { useState, useRef, useEffect } from "react";
import Button from "./ui/button";
import UploadArea from "./ui/upload-area";

type ImageFormat = "image/jpeg" | "image/png" | "image/webp";

export default function ImageResizer() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [resizedUrl, setResizedUrl] = useState<string | null>(null);
  const [scale, setScale] = useState<number>(1);
  const [width, setWidth] = useState<number>(800);
  const [height, setHeight] = useState<number>(600);
  const [format, setFormat] = useState<ImageFormat>("image/jpeg");
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
      if (resizedUrl) URL.revokeObjectURL(resizedUrl);
    };
  }, [previewUrl, resizedUrl]);

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
    setResizedUrl(null);
    setScale(1);
    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);
  };

  const resizeImage = async () => {
    if (!previewUrl || !canvasRef.current) return;

    const img = new Image();
    img.src = previewUrl;
    await img.decode();

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const aspectRatio = img.width / img.height;
    let newWidth = width * scale;
    let newHeight = height * scale;

    if (newWidth / newHeight !== aspectRatio) {
      if (newWidth / aspectRatio <= newHeight)
        newHeight = newWidth / aspectRatio;
      else newWidth = newHeight * aspectRatio;
    }

    newWidth = Math.min(newWidth, 2000);
    newHeight = Math.min(newHeight, 2000);

    canvas.width = newWidth;
    canvas.height = newHeight;

    ctx.clearRect(0, 0, newWidth, newHeight);
    ctx.drawImage(img, 0, 0, newWidth, newHeight);

    canvas.toBlob(
      (blob) => {
        if (!blob) return;
        if (resizedUrl) URL.revokeObjectURL(resizedUrl);
        const url = URL.createObjectURL(blob);
        setResizedUrl(url);
      },
      format,
      0.9
    );
  };

  const downloadImage = () => {
    if (!resizedUrl || !selectedFile) return;
    const link = document.createElement("a");
    link.href = resizedUrl;
    link.download = `resized-${selectedFile.name}`;
    link.click();
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Resize Your Image</h1>

      {!previewUrl ? (
        <UploadArea onFileSelect={handleFileSelect} />
      ) : (
        <div className="space-y-6">
          {/* Images side by side */}
          <div className="flex flex-col md:flex-row gap-6 justify-center items-start">
            {/* Original */}
            <div className="flex-1 text-center">
              <h3 className="font-medium mb-2">Original</h3>
              <img
                src={previewUrl}
                alt="Original Preview"
                className="max-h-64 w-auto mx-auto rounded shadow"
              />
            </div>

            {/* Resized */}
            {resizedUrl && (
              <div className="flex-1 text-center">
                <h3 className="font-medium mb-2">Resized</h3>
                <img
                  src={resizedUrl}
                  alt="Resized Preview"
                  className="max-h-64 w-auto mx-auto rounded shadow"
                />
              </div>
            )}
          </div>

          {/* Resize Controls */}
          <div className="bg-gray-50 p-4 rounded-lg space-y-4">
            <h3 className="font-medium mb-2 text-center">Resize Options</h3>

            {/* Scale presets */}
            <div className="flex flex-wrap justify-center gap-2">
              {[0.5, 0.75, 1, 1.25, 1.5, 2].map((s) => (
                <Button
                  key={s}
                  variant={scale === s ? "primary" : "secondary"}
                  onClick={() => setScale(s)}
                  className="text-sm"
                >
                  {s * 100}%
                </Button>
              ))}
            </div>

            {/* Width, Height, Format */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block mb-1 text-sm font-medium">
                  Width (px)
                </label>
                <input
                  type="number"
                  value={width}
                  min={100}
                  max={2000}
                  onChange={(e) => setWidth(Number(e.target.value))}
                  className="w-full border rounded p-2"
                />
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium">
                  Height (px)
                </label>
                <input
                  type="number"
                  value={height}
                  min={100}
                  max={2000}
                  onChange={(e) => setHeight(Number(e.target.value))}
                  className="w-full border rounded p-2"
                />
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium">Format</label>
                <select
                  value={format}
                  onChange={(e) => setFormat(e.target.value as ImageFormat)}
                  className="w-full border rounded p-2"
                >
                  <option value="image/jpeg">JPEG</option>
                  <option value="image/png">PNG</option>
                  <option value="image/webp">WEBP</option>
                </select>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-4 mt-4">
              <Button onClick={resizeImage}>Resize Image</Button>
              {resizedUrl && <Button onClick={downloadImage}>Download</Button>}
              <Button
                variant="secondary"
                onClick={() => {
                  setSelectedFile(null);
                  if (previewUrl) URL.revokeObjectURL(previewUrl);
                  if (resizedUrl) URL.revokeObjectURL(resizedUrl);
                  setPreviewUrl(null);
                  setResizedUrl(null);
                  setScale(1);
                  setWidth(800);
                  setHeight(600);
                  setFormat("image/jpeg");
                }}
              >
                Upload Different Image
              </Button>
            </div>
          </div>
        </div>
      )}

      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
}
