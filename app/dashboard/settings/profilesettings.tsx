"use client";
import Button from "@/app/components/ui/button";
import { useAuth } from "@/app/context/AuthContext";
import { useNotifications } from "@/app/context/NotificationProvider";
import { retryUploadImage } from "@/app/lib/uploadImages";
import { api } from "@/app/utils/api";
import { parseCommaSeparated } from "@/app/utils/formatters";
import { MessageCircle, Star, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";
import AccountDetails from "./profile/AccountDetails";
import ProfileCategories from "./profile/ProfileCategories";
import ProfileData from "./profile/ProfileData";
import ProfileImage from "./profile/ProfileImage";
import ProfileStats from "./profile/ProfileStats";
import SocialMedia from "./profile/SocialMedia";
import TradingProfile from "./profile/TradingProfile";

export interface UserProfile {
  username: string;
  name: string;
  email: string;
  avatar: string;
  location: string;
  userType: string;
  badges: string; // Comma-separated string
  experienceLevel: string;
  availability: string;
  tags: string; // Comma-separated string
  tradingStyle: string;
  preferredBlockchain: string;
  nftsOwned: number;
  nftsSold: number;
  followers: number;
  totalVolume: number;
  favoriteCategories: string; // Comma-separated string
  socialMedia: {
    twitter: string;
    discord: string;
    instagram: string;
  };
}

export default function ProfileSettings() {
  const { user } = useAuth();
  const [profileImg, setProfileImg] = useState<File | null>(null);
  const { addNotification, toast } = useNotifications();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const [profileForm, setProfileForm] = useState<UserProfile>({
    username: user?.username || "",
    name: user?.name || "",
    email: user?.email || "",
    avatar: user?.avatar || "/pfp.png",
    location: user?.location || "",
    userType: user?.userType || "",
    badges: user?.badges?.join(", ") || "",
    experienceLevel: user?.experienceLevel || "",
    availability: user?.availability || "",
    tags: user?.tags?.join(", ") || "",
    tradingStyle: user?.tradingStyle || "",
    preferredBlockchain: user?.preferredBlockchain || "",
    nftsOwned: user?.nftsOwned || 0,
    nftsSold: user?.nftsSold || 0,
    followers: user?.followers || 0,
    totalVolume: user?.totalVolume || 0,
    favoriteCategories: user?.favoriteCategories?.join(", ") || "",
    socialMedia: {
      twitter: user?.socialMedia?.twitter || "",
      discord: user?.socialMedia?.discord || "",
      instagram: user?.socialMedia?.instagram || "",
    },
  });

  const handleProfileChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (name.startsWith("socialMedia.")) {
      const key = name.split(".")[1];
      setProfileForm((prev) => ({
        ...prev,
        socialMedia: {
          ...prev.socialMedia,
          [key]: value,
        },
      }));
    } else {
      setProfileForm((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleProfileUpdate = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      const trimmedUsername = profileForm.username.trim().toLowerCase();

      if (user?.username !== trimmedUsername) {
        const isTaken = await api.get(
          `/users/username?username=${trimmedUsername}`
        );

        if (isTaken.data.data) {
          toast(
            "error",
            "system",
            "Oops!",
            "Username is Taken please try another",
            5000
          );

          return;
        }
      }

      let avatarUrl = profileForm.avatar;

      if (profileImg) {
        avatarUrl = await retryUploadImage(profileImg, "profile images");
        setProfileForm((prev) => ({ ...prev, avatar: avatarUrl }));
      }

      const uploadData = {
        ...profileForm,
        avatar: avatarUrl,
        tags: parseCommaSeparated(profileForm.tags),
        badges: parseCommaSeparated(profileForm.badges),
        favoriteCategories: parseCommaSeparated(profileForm.favoriteCategories),
      };

      const updateUserResponse = await api.post("/users", uploadData);

      if (updateUserResponse.data.error) {
        throw new Error("API update failed");
      }

      addNotification({
        title: "Success!",
        message: "Profile updated successfully",
        type: "success",
        action: "system",
        recipient: user?._id || "",
      });
      router.refresh();
    } catch (error) {
      console.error("upload failed:", error);
      toast(
        "error",
        "system",
        "Oops!",
        "Failed to update profile. Please try again.",
        5000
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="glass-card p-6">
      <div className="flex items-center gap-3 mb-6">
        <User className="w-6 h-6 text-primary" />
        <h2 className="text-2xl font-bold">Profile Settings</h2>
      </div>

      <form onSubmit={handleProfileUpdate}>
        <ProfileImage
          setProfileForm={setProfileForm}
          profileForm={profileForm}
          setProfileImg={setProfileImg}
        />

        {/* Basic Information */}
        <ProfileData
          profileForm={profileForm}
          handleProfileChange={handleProfileChange}
        />

        {/* Account Details (Read-only) */}
        <AccountDetails profileForm={profileForm} />

        {/* Trading Profile */}
        <TradingProfile
          profileForm={profileForm}
          handleProfileChange={handleProfileChange}
        />

        {/* Trading Stats */}
        <ProfileStats profileForm={profileForm} />

        {/* Social Media */}
        <SocialMedia
          profileForm={profileForm}
          handleProfileChange={handleProfileChange}
        />

        {/* Tags & Categories */}
        <ProfileCategories
          profileForm={profileForm}
          handleProfileChange={handleProfileChange}
        />

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-end pt-4 border-t border-white/10">
          <Button
            isLoading={isLoading}
            variant="primary"
            type="submit"
            className="w-full sm:w-auto"
          >
            <Star className="w-4 h-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </form>

      {/* Support Info */}
      <div className="mt-8 p-4 bg-white/5 rounded-lg text-center">
        <p className="text-white/60 mb-2">Need help with your profile?</p>
        <Button variant="outline" size="small">
          <a href="/support" className="flex items-center gap-2">
            <MessageCircle className="w-4 h-4" />
            Contact Support
          </a>
        </Button>
      </div>
    </div>
  );
}
