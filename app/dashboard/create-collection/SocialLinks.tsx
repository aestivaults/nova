import { User } from "@/app/types/user";
import { Globe2 } from "lucide-react";
import React, { ChangeEvent, Dispatch, SetStateAction } from "react";

export default function SocialLinks({
  socialLinks,
  setSocialLinks,
}: {
  socialLinks: User["socialMedia"] | undefined;
  setSocialLinks: Dispatch<SetStateAction<User["socialMedia"] | undefined>>;
}) {
  const handleSocialLinksChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setSocialLinks((prev) => ({
      twitter: prev?.twitter || "",
      discord: prev?.discord || "",
      instagram: prev?.instagram || "",
      [name]: value,
    }));
  };

  return (
    <div className="glass-card py-10 space-y-4 px-3">
      <div>
        <h2 className="flex items-center">
          <Globe2 className="w-5 h-5 mr-2 text-green-400" />
          Social Links
        </h2>
        <span className="text-gray-400">
          Connect your social media accounts
        </span>
      </div>
      <div className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="instagram" className="form-label">
            Instagram
          </label>
          <input
            name="instagram"
            onChange={handleSocialLinksChange}
            placeholder="@cryptofish"
            className="form-input"
            value={socialLinks?.instagram || ""}
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="discord" className="form-label">
            Discord
          </label>
          <input
            name="discord"
            onChange={handleSocialLinksChange}
            placeholder="https://discord.gg/..."
            className="form-input"
            value={socialLinks?.discord || ""}
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="twitter" className="form-label">
            Twitter
          </label>
          <input
            name="twitter"
            onChange={handleSocialLinksChange}
            placeholder="@yourusername"
            className="form-input"
            value={socialLinks?.twitter || ""}
          />
        </div>
      </div>
    </div>
  );
}
