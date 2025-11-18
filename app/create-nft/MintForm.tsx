"use client";
import { generateNftTokenId } from "@/app/backend/jwt/create_ids";
import Button from "@/app/components/ui/button";
import { useAuth } from "@/app/context/AuthContext";
import { useNotifications } from "@/app/context/NotificationProvider";
import { uploadWithRetry } from "@/app/lib/uploadImages";
import { CollectionPayload } from "@/app/types/collection";
import { NftInput } from "@/app/types/nftTypes";
import { api } from "@/app/utils/api";
import { CloudUpload, Image as ImageIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FormEvent, useRef, useState } from "react";
export default function MintForm({
  collections,
}: {
  collections: CollectionPayload[];
}) {
  const [isAuction, setIsAuction] = useState(false);
  const { toast } = useNotifications();
  const { user } = useAuth();
  const [media_type, setmedia_type] = useState<"image" | "video" | null>(null); // "image" or "video"
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [pending, setPending] = useState(false);
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
      router.push("/create-collection");
      return;
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const nft = formData.get("nft_image") as File;
    if (!nft || !nft.size) {
      toast(
        "error",
        "system",
        "Invalid Image",
        "Please Add image to be minted",
        5000
      );
      return;
    }

    try {
      setPending(true);
      const [nftres] = await Promise.allSettled([uploadWithRetry(nft)]);

      if (nftres.status === "rejected") {
        toast("error", "system", "Mint Failed", "Please Try Again", 5000);
        return;
      }

      const payload: NftInput = {
        title: formData.get("name") as string,
        description: formData.get("description") as string,
        owning_collection: formData.get("collection") as string,
        creator: user?._id || "",
        owner: user?._id || "",
        token_id: generateNftTokenId(),
        type: formData.get("auctionEndTime") ? "auction" : "sale",
        price: Number(formData.get("price")),
        likes_count: 0,
        media_type: "image",
        media_url: nftres.value,
        current_bid: 0,
        metadata: {
          contract: "0x57f1887a8BF19b14fC0dF6Fd9B2acc9Af147eA85",
          blockchain: "Ethereum",
          tokenStandard: "ERC-721",
        },
      };
      const auctionEndTime = formData.get("auctionEndTime") as string;
      if (auctionEndTime) {
        const [year, month, day] = auctionEndTime.split("-").map(Number);
        const date = new Date(Date.UTC(year, month - 1, day));
        const isoString = date.toISOString().replace("Z", "+00:00");

        payload.auctionEndTime = isoString;
        payload.current_bid = Number(formData.get("price"));
      }

      const res = await api.post("/nfts", payload);
      console.log(res);
      if (res.data.error) {
        toast("error", "system", "Mint Failed", "Please Try Again", 5000);
        return;
      }
      if (res.data.data) {
        toast(
          "success",
          "system",
          "Mint Successful!",
          "NFT Created Successfully!",
          5000
        );
        router.push("/dashboard/my-nfts");
      }
    } catch (error) {
      console.error("something went wrong", error);
      console.log(error);
      toast("error", "system", "Error!", "Something Went wrong", 5000);
    } finally {
      setPending(false);
    }
  };

  return (
    <form className="p-4 md:p-8" onSubmit={handleSubmit}>
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
              This fee will be charged when you mint your NFT. Make sure you
              have enough ETH in your wallet.
            </p>
          </div>
          <div className="flex gap-4">
            <Button isLoading={pending} type="submit" disabled={pending}>
              Create NFT
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
}
