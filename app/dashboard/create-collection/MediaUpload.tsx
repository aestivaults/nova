"use client";

import Button from "@/app/components/ui/button";
import { Image as ImageIcon, Upload } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";

type MediaUploadProps = {
  formData: {
    logo_image: string | null;
    banner_image: string | null;
  };
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleDrop: (
    e: React.DragEvent<HTMLDivElement>,
    field: "logo_image" | "banner_image"
  ) => void;
  media_type: "image" | "video" | null;
};

export default function MediaUpload({
  formData,
  handleFileChange,
  handleDrop,
}: MediaUploadProps) {
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) =>
    e.preventDefault();

  const collectionRef = useRef<HTMLInputElement | null>(null);
  const bannerRef = useRef<HTMLInputElement | null>(null);

  return (
    <div className="glass-card py-10 space-y-4 px-3">
      <div>
        <h2 className="flex items-center">
          <ImageIcon className="w-5 h-5 mr-2 text-cyan-400" />
          Media & Branding
        </h2>
        <span className="text-gray-400">
          Upload images to represent your collection
        </span>
      </div>

      {/* Collection Image Upload */}
      <div
        onDrop={(e) => handleDrop(e, "logo_image")}
        onDragOver={handleDragOver}
        className="space-y-2 mb-6"
      >
        <label className="form-label">Collection Image *</label>
        <div className="border-2 border-dashed border-gray-600/50 rounded-lg p-8 text-center hover:border-purple-500/50 transition-colors">
          {formData.logo_image ? (
            <div className="relative w-full aspect-[3/2] rounded overflow-hidden">
              <Image
                alt="Collection image preview"
                src={formData.logo_image}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-white transition hover:bg-black/50">
                <Upload className="w-12 h-12 text-white mb-2" />
                <p className="mb-1 font-semibold">Change collection image</p>
                <p className="text-sm text-gray-200 mb-2">
                  400x400 recommended.
                </p>
                <Button
                  type="button"
                  variant="primary"
                  onClick={() => collectionRef.current?.click()}
                >
                  Choose File
                </Button>
              </div>
            </div>
          ) : (
            <>
              <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-400 mb-2">
                Drag and drop or click to upload
              </p>
              <p className="text-sm text-gray-500">PNG, JPG, GIF up to 10MB.</p>
              <Button
                type="button"
                variant="outline"
                onClick={() => collectionRef.current?.click()}
              >
                Choose File
              </Button>
            </>
          )}
        </div>
        <input
          name="logo_image"
          type="file"
          ref={collectionRef}
          accept="image/*"
          onChange={handleFileChange}
          style={{ display: "none" }}
        />
      </div>

      {/* Banner Image Upload */}
      <div
        onDrop={(e) => handleDrop(e, "banner_image")}
        onDragOver={handleDragOver}
        className="space-y-2"
      >
        <label className="form-label">Banner Image</label>
        <div className="border-2 border-dashed border-gray-600/50 rounded-lg p-8 text-center hover:border-purple-500/50 transition-colors">
          {formData.banner_image ? (
            <div className="relative w-full aspect-[3/2] rounded overflow-hidden">
              <Image
                alt="Banner image preview"
                src={formData.banner_image}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-white transition hover:bg-black/50">
                <Upload className="w-12 h-12 text-white mb-2" />
                <p className="mb-1 font-semibold">Change banner image</p>
                <p className="text-sm text-gray-200 mb-2">
                  1400x400 recommended.
                </p>
                <Button
                  type="button"
                  variant="primary"
                  onClick={() => bannerRef.current?.click()}
                >
                  Choose File
                </Button>
              </div>
            </div>
          ) : (
            <>
              <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="mb-1">Upload banner image</p>
              <p className="text-sm text-gray-500 mb-2">
                1400x400 recommended.
              </p>
              <Button
                type="button"
                variant="outline"
                onClick={() => bannerRef.current?.click()}
              >
                Choose File
              </Button>
            </>
          )}
        </div>
        <input
          name="banner_image"
          type="file"
          ref={bannerRef}
          accept="image/*"
          onChange={handleFileChange}
          style={{ display: "none" }}
        />
      </div>
    </div>
  );
}
