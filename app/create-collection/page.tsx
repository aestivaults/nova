"use client";
import { useAuth } from "@/app/context/AuthContext";
import { useNotifications } from "@/app/context/NotificationProvider";
import { retryUploadImage } from "@/app/lib/uploadImages";
import { CollectionInput } from "@/app/types/collection";
import { api } from "@/app/utils/api";
import { AxiosError } from "axios";
import { FormEvent, useEffect, useState } from "react";
import CreateCollection from "./CreateCollection";
import { useRouter } from "next/navigation";
import Navbar from "../components/layout/navbar";
import Footer from "../components/layout/Footer";

export default function CreateCollectionPage() {
  const { toast } = useNotifications();
  const { user } = useAuth();
  const [user_id, setUser_id] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (user) setUser_id(user._id);
  }, [user]);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const logo_image = formData.get("logo_image") as File;
    if (!logo_image || !logo_image.size) {
      toast(
        "error",
        "system",
        "Invalid Logo image",
        "Please Add a Logo Image",
        5000
      );
      return;
    }

    const banner_image = formData.get("banner_image") as File;
    if (!banner_image || !banner_image.size) {
      toast(
        "error",
        "system",
        "Invalid Banner image",
        "Please Add a Banner Image",
        5000
      );
      return;
    }

    try {
      setIsLoading(true);

      const [logoRes, bannerRes] = await Promise.allSettled([
        retryUploadImage(logo_image, "collections"),
        retryUploadImage(banner_image, "collections"),
      ]);

      if (logoRes.status === "rejected" || bannerRes.status === "rejected") {
        throw new Error("Failed to upload images");
      }

      const payload: CollectionInput = {
        name: formData.get("name") as string,
        description: formData.get("description") as string,
        category: formData.get("category") as string,
        royalties: Number(formData.get("royalties")) || 0,
        logo_image: logoRes.value,
        banner_image: bannerRes.value,
        featured: false,
        floor_price: 0,
        owner: user_id,
        creator: user_id,
        total_volume: 0,
        owners: [user_id], // will be filled by backend
        nfts: [],
      };
      const res = await api.post("/collections", payload);
      if (res.data.error) {
        toast(
          "error",
          "system",
          "Something went wrong",
          "Please Try again",
          5000
        );
      }
      if (res.data.data) {
        toast(
          "success",
          "system",
          "Success!",
          "Collection Created Successfully!",
          5000
        );

        router.push("/dashboard/collections");
      }
    } catch (error) {
      console.log(error);
      const errMsg =
        error instanceof AxiosError
          ? error.response?.data.message
          : "Failed to Create Collection";

      toast("error", "system", "Error!", errMsg, 5000);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen relative">
        <div className="relative z-10 pt-24 pb-16">
          <div className="container mx-auto px-6">
            {/* Header Section */}
            <div className="text-center mb-12">
              <h1 className="text-5xl font-bold bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent mb-4">
                Create Collection
              </h1>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                Launch your own NFT collection and join the future of digital
                ownership
              </p>
            </div>
            <div className="relative">
              <div className="max-w-6xl mx-auto px-3">
                <form onSubmit={handleSubmit}>
                  <CreateCollection user={user} isLoading={isLoading} />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
