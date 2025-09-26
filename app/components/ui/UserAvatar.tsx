"use client";

import { useState } from "react";
import Image from "next/image";
import { User } from "@/app/types/user";
import { Check, CheckCircle } from "lucide-react";

export function CreatorAvatar({
  creator,
  size = "small",
  showVerified = true,
  showFollowButton = false,
  onClick,
  className = "",
}: {
  creator: User;
  size: "small" | "medium" | "large" | "xsmall" | "xlarge";
  showVerified: boolean;
  showFollowButton: boolean;
  onClick?: () => void;
  className: string;
}) {
  const [isVerified] = useState(true);
  const [isFollowing, setIsFollowing] = useState(false);

  if (!creator) return null;

  const handleFollow = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIsFollowing(!isFollowing);
    // Trigger API here
  };

  return (
    <div
      className={`flex items-center gap-2 ${className} ${
        onClick ? "cursor-pointer" : ""
      }`}
      onClick={onClick}
    >
      <UserAvatar
        isVerified={isVerified}
        user={creator}
        size={size}
        showVerified={showVerified}
      />

      <div className="flex flex-col">
        <span className="font-medium text-sm line-clamp-1">
          {creator.username || "Unknown Creator"}
          {isVerified && !showVerified && (
            <CheckCircle className="fas fa-check-circle text-primary-400 ml-1 text-xs" />
          )}
        </span>
      </div>

      {showFollowButton && (
        <button
          onClick={handleFollow}
          className={`ml-auto text-xs px-2 py-0.5 rounded-full ${
            isFollowing
              ? "bg-primary-400/20 text-primary-300"
              : "bg-light/10 hover:bg-light/20"
          }`}
        >
          {isFollowing ? "following" : "follow"}
        </button>
      )}
    </div>
  );
}

const sizeClasses = {
  xsmall: "w-6 h-6 text-xs",
  small: "w-8 h-8 text-sm",
  medium: "w-10 h-10 text-base",
  large: "w-16 h-16 text-xl",
  xlarge: "w-24 h-24 text-2xl",
};

const verifiedSizeClasses = {
  xsmall: "w-2.5 h-2.5 -top-0.5 -right-0.5",
  small: "w-3 h-3 -top-0.5 -right-0.5",
  medium: "w-4 h-4 -top-1 -right-1",
  large: "w-5 h-5 -top-1 -right-1",
  xlarge: "w-6 h-6 -top-1 -right-1",
};

export default function UserAvatar({
  user,
  size = "medium",
  showVerified = true,
  onClick,
  isVerified = true,
  className = "",
  ...props
}: {
  user: User;
  size: "xlarge" | "xsmall" | "small" | "medium" | "large";
  onClick?: () => void;
  className?: string;
  showVerified?: boolean;
  isVerified?: boolean;
}) {
  const avatarSize = sizeClasses[size];
  const verifiedSize = verifiedSizeClasses[size];

  return (
    <div
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      aria-label="User avatar"
      className={`relative inline-block ${className}`}
      onClick={onClick}
      {...props}
    >
      {/* Avatar */}
      {user?.avatar ? (
        <div className={`relative ${avatarSize}`}>
          <Image
            src={user.avatar}
            alt={user.username || "User"}
            fill
            className="rounded-full object-cover border-2 border-light/10"
            sizes="100%"
            priority
          />
        </div>
      ) : (
        <div
          className={`${avatarSize} rounded-full bg-gradient-to-br from-primary-700 to-secondary-700 flex items-center justify-center text-light font-medium border-2 border-light/10 ${
            onClick
              ? "cursor-pointer hover:border-primary-400 transition-colors"
              : ""
          }`}
        >
          {getInitials(user?.username)}
        </div>
      )}

      {/* Verified Badge */}
      {showVerified && isVerified && (
        <span
          className={`absolute ${verifiedSize} bg-primary-400 rounded-full flex items-center justify-center text-light`}
        >
          <Check className="text-[0.5em]" />
        </span>
      )}
    </div>
  );
}

function getInitials(username: string) {
  if (!username) return "?";
  const nameParts = username.trim().split(" ");
  return nameParts.length === 1
    ? nameParts[0][0].toUpperCase()
    : nameParts[0][0].toUpperCase() +
        nameParts[nameParts.length - 1][0].toUpperCase();
}
