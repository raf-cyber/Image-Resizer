"use client";

import { useState, useRef, DragEvent, ChangeEvent } from "react";
import { UploadCloud } from "lucide-react";

interface UploadAreaProps {
  onFileSelect: (file: File) => void;
}

export default function UploadArea({ onFileSelect }: UploadAreaProps) {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onFileSelect(e.target.files[0]);
    }
  };

  return (
    <div
      className={`relative rounded-2xl border-2 border-dashed p-10 text-center cursor-pointer transition-all shadow-sm 
      ${
        isDragging
          ? "border-[#0ee08a] bg-gradient-to-br from-[#15FFA3]/10 to-[#0ee08a]/10 shadow-lg scale-[1.02]"
          : "border-gray-200 hover:border-[#0ee08a] hover:bg-gradient-to-br hover:from-[#15FFA3]/5 hover:to-[#0ee08a]/5"
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={handleClick}
    >
      <div className="flex flex-col items-center gap-4">
        <div
          className={`rounded-full p-5 transition-colors ${
            isDragging
              ? "bg-[#0ee08a]/20 text-[#0ee08a]"
              : "bg-[#0ee08a]/10 text-[#0ee08a]"
          }`}
        >
          <UploadCloud size={42} strokeWidth={1.8} />
        </div>

        <p className="text-lg font-semibold text-[#0ee08a]">
          Click to upload an image
        </p>
      </div>

      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept="image/*"
        onChange={handleFileChange}
      />
    </div>
  );
}
