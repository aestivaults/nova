"use client";

import Button from "@/app/components/ui/button";
import { categories } from "@/app/components/ui/Categories";
import CollectionCard from "@/app/components/ui/CollectionCard";
import { useAuth } from "@/app/context/AuthContext";
import { motion } from "framer-motion";
import { Sparkles, Star, TrendingUp, Zap } from "lucide-react";
import { ChangeEvent, useState } from "react";
import { useFormStatus } from "react-dom";
import MediaUpload from "./MediaUpload";
import SocialLinks from "./SocialLinks";
import { useNotifications } from "@/app/context/NotificationProvider";

export default function CreateCollection() {
  const { user } = useAuth();
  const { pending: isPending } = useFormStatus();
  const { toast } = useNotifications();

  const [media_type, setmedia_type] = useState<"image" | "video" | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    logo_image: "/placeholder.webp",
    banner_image: "/placeholder.webp",
    category: "",
    royalties: 5,
    isExplicit: false,
    creator: user!,
    nfts: [],
    _id: Date.now.toString(),
    updatedAt: String(Math.random() * 10),
    createdAt: String(Date.now.toString),
    featured: false,
    owner: user!,
    owners: [user!],
    floor_price: 0,
    total_volume: 0,
  });

  const [socialLinks, setSocialLinks] = useState(user?.socialMedia);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files?.[0];
    const name = e.target.name as "logo_image" | "banner_image";

    if (!file) return;

    if (file.size > 50 * 1024 * 1024) {
      toast(
        "error",
        "system",
        "Error!",
        "File too large. Max size is 50MB.",
        5000
      );
      return;
    }

    if (file.type.startsWith("image/")) {
      setmedia_type("image");

      setFormData((prev) => ({
        ...prev,
        [name]: URL.createObjectURL(file),
      }));
    } else if (file.type.startsWith("video/")) {
      setmedia_type("video");

      setFormData((prev) => ({
        ...prev,
        [name]: URL.createObjectURL(file),
      }));
    } else {
      alert("Unsupported file type. Please upload an image or a video.");
    }
  };

  const handlechange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name } = e.target;
    const { value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDrop = (
    e: React.DragEvent<HTMLDivElement>,
    name: "logo_image" | "banner_image"
  ) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];

    if (!file) return;

    if (file.size > 50 * 1024 * 1024) {
      alert("File too large. Max size is 50MB.");
      return;
    }
    if (file) {
      if (file.type.startsWith("image/")) {
        setmedia_type("image");
        setFormData((prev) => ({
          ...prev,
          [name]: URL.createObjectURL(file),
        }));
      } else if (file.type.startsWith("video/")) {
        setmedia_type("video");
        setFormData((prev) => ({
          ...prev,
          [name]: URL.createObjectURL(file),
        }));
      } else {
        alert("Unsupported file type. Please drop an image or a video.");
      }
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Main Form */}
      <div className="lg:col-span-2 space-y-6">
        {/* Basic Information */}

        <div className="glass-card py-10 space-y-4 px-3">
          <div>
            <h2 className="text-white flex items-center">
              <Sparkles className="w-5 h-5 mr-2 text-purple-400" />
              Basic Information
            </h2>
            <span className="text-gray-400">
              Set up the core details of your collection
            </span>
          </div>
          <div className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="name" className="form-label">
                Collection Name *
              </label>
              <input
                id="name"
                name="name"
                value={formData.name}
                onChange={handlechange}
                placeholder="Enter collection name"
                className="form-input"
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="description" className="form-label">
                Description *
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handlechange}
                placeholder="Describe your collection..."
                className="form-textarea"
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="category" className="form-label">
                Category *
              </label>
              <select name="category" className="form-select">
                <option>Select a category</option>
                {categories.map((item) => (
                  <option key={item.id}>{item.name}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Media Upload */}
        <MediaUpload
          media_type={media_type}
          formData={formData}
          handleFileChange={handleFileChange}
          handleDrop={handleDrop}
        />

        <div className="glass-card py-10 space-y-4 px-3">
          <div>
            <h2 className=" flex items-center">
              <Zap className="w-5 h-5 mr-2 text-yellow-400" />
              Advanced Settings
            </h2>
            <span className="text-gray-400">
              Configure royalties and collection properties
            </span>
          </div>
          <div className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="royalties" className="form-label">
                Creator Royalties ({formData.royalties}%)
              </label>
              <div className="space-y-3">
                <input
                  type="range"
                  min="0"
                  value={formData.royalties}
                  onChange={handlechange}
                  max="20"
                  name="royalties"
                  className="w-full h-2 bg-primary-700 rounded-lg appearance-none cursor-pointer slider"
                />

                <p className="text-sm text-secondary-800">
                  Suggested: 0%, 2.5%, 5%, 10%. Maximum is 20%.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Social Links */}

        <SocialLinks
          socialLinks={socialLinks}
          setSocialLinks={setSocialLinks}
        />
      </div>

      {/* Preview Sidebar */}
      <div className="lg:col-span-1">
        <div className="glass-card py-10 space-y-4 px-3">
          <div>
            <h2 className=" flex items-center">
              <Star className="w-5 h-5 mr-2 text-pink-400" />
              Preview
            </h2>
            <span className="text-gray-400">
              How your collection will appear
            </span>
          </div>
          <div className="space-y-4">
            {/* Collection Preview */}
            <CollectionCard collection={formData} />

            <div className="border-t border-gray-700/50 pt-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">Royalties</span>
                <span className="text-white font-medium">
                  {formData.royalties}%
                </span>
              </div>
            </div>

            <Button
              type="submit"
              disabled={isPending || !formData.name || !formData.description}
              className="w-full bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white font-medium py-3 shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden"
            >
              {isPending ? (
                <motion.div
                  className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
              ) : (
                <>
                  <motion.div
                    className="absolute inset-0 bg-white/20"
                    animate={{ x: ["-100%", "100%"] }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />

                  <TrendingUp className="w-5 h-5 mr-2 relative z-10" />
                  <span className="relative z-10">Create Collection</span>
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
