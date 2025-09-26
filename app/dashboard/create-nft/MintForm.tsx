"use client";
import Button from "@/app/components/ui/button";
import { CollectionPayload } from "@/app/types/collection";
import { motion } from "framer-motion";
import { CloudUpload, Image as ImageIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { useFormStatus } from "react-dom";
export default function MintForm({
  collections,
}: {
  collections: CollectionPayload[];
}) {
  const [isAuction, setIsAuction] = useState(false);
  const [media_type, setmedia_type] = useState<"image" | "video" | null>(null); // "image" or "video"
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { pending } = useFormStatus();
  const [mediaPreview, setMediaPreview] = useState<string | null>(null);
  const router = useRouter();

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (!file) return;

    if (file.size > 50 * 1024 * 1024) {
      alert("File too large. Max size is 50MB.");
      return;
    }

    if (file.type.startsWith("image/")) {
      setmedia_type("image");
      setMediaPreview(URL.createObjectURL(file));
    } else if (file.type.startsWith("video/")) {
      setmedia_type("video");
      setMediaPreview(URL.createObjectURL(file));
    } else {
      alert("Unsupported file type. Please drop an image or a video.");
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 50 * 1024 * 1024) {
      alert("File too large. Max size is 50MB.");
      return;
    }

    if (file.type.startsWith("image/")) {
      setmedia_type("image");
      setMediaPreview(URL.createObjectURL(file));
    } else if (file.type.startsWith("video/")) {
      setmedia_type("video");
      setMediaPreview(URL.createObjectURL(file));
    } else {
      alert("Unsupported file type. Please drop an image or a video.");
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };
  const handleCollectionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    if (selectedValue === "new") {
      router.push("/dashboard/create-collection");
      return;
    }
  };
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div>
        <div className="mb-6">
          <label className="form-label">Upload File</label>
          <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            className="border-2 border-dashed border-white/20 rounded-lg p-8 text-center hover:border-primary-500 transition-colors"
          >
            <CloudUpload
              size={30}
              className="text-4xl max-w-md mx-auto mb-4 text-white/40"
            />
            <p className="mb-2">Drag and drop file here or click to browse</p>
            <p className="text-xs text-white/60 mb-4">
              Supported formats: JPG, PNG, GIF, MP4, WEBM, MP3. Max size: 50MB
            </p>
            <Button
              type="button"
              onClick={() => inputRef.current?.click()}
              variant="secondary"
              size="small"
            >
              Browse Files
            </Button>
            <input
              type="file"
              name="nft_image"
              onChange={handleFileChange}
              ref={inputRef}
              style={{ display: "none" }}
            />
          </div>
        </div>
        <div className="mb-6">
          <label className="form-label">Preview</label>
          <div className="aspect-square relative rounded-lg bg-white/5 flex items-center justify-center">
            {mediaPreview ? (
              media_type === "image" ? (
                <Image
                  fill
                  src={mediaPreview}
                  alt="Preview"
                  className="object-cover"
                />
              ) : (
                <video
                  src={mediaPreview}
                  controls
                  style={{ maxWidth: "100%", maxHeight: "100%" }}
                />
              )
            ) : (
              <ImageIcon className="text-4xl text-white/20" />
            )}
          </div>
        </div>
      </div>
      <div>
        <div className="mb-6">
          <label htmlFor="name" className="form-label">
            NFT Name
          </label>
          <input
            type="text"
            required
            name="name"
            className="form-input"
            placeholder="Enter NFT name"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <textarea
            name="description"
            required
            className="form-textarea"
            rows={4}
            placeholder="Describe your NFT..."
          ></textarea>
        </div>
        <div className="mb-6">
          <label htmlFor="collection" className="form-label">
            Collection
          </label>
          <select
            onChange={handleCollectionChange}
            name="collection"
            className="form-select bg-black"
          >
            <option value="">Select a collection</option>
            {collections.map((collection) => (
              <option key={collection._id} value={collection._id}>
                {collection.name}
              </option>
            ))}
            <option value="new">+ Create new collection</option>
          </select>
        </div>
        <div className="mb-6">
          <label htmlFor="royalties" className="form-label">
            Royalties
          </label>
          <input
            type="text"
            required
            name="royalty"
            className="form-input"
            placeholder="Royalty percentage (e.g. 5)"
          />
        </div>
        <div className="mb-6">
          <label className="form-label flex items-center gap-2">
            Enable Auction
          </label>
          <input
            type="checkbox"
            checked={isAuction}
            onChange={() => setIsAuction(!isAuction)}
            className="form-checkbox"
          />

          {isAuction && (
            <div className="mt-4">
              <label htmlFor="auctionEndTime" className="form-label">
                Auction End Date
              </label>
              <input
                name="auctionEndTime"
                type="date"
                className="form-input"
                placeholder="Select end date"
              />
            </div>
          )}
        </div>

        <div className="mb-6">
          <label className="form-label">Price ETH </label>
          <input
            name="price"
            type="text"
            required
            className="form-input"
            placeholder="Price ETH"
          />
        </div>
        <div className="glass-card p-4 mb-6">
          <div className="flex justify-between mb-2">
            <span>Minting Fee</span>
            <span className="font-medium">0.15 ETH</span>
          </div>
          <p className="text-xs text-white/60">
            This fee will be charged when you mint your NFT. Make sure you have
            enough ETH in your wallet.
          </p>
        </div>
        <div className="flex gap-4">
          <Button
            type="submit"
            disabled={pending}
            className="w-full bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white font-medium py-3 shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden"
          >
            {pending ? (
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

                <span className="relative z-10">Create NFT</span>
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
