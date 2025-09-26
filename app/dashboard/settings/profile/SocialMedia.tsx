import { Instagram, MessageCircle, Share2, Twitter } from "lucide-react";
import { UserProfile } from "../profilesettings";
import { ChangeEvent } from "react";

export default function SocialMedia({
  profileForm,
  handleProfileChange,
}: {
  profileForm: UserProfile;
  handleProfileChange: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}) {
  return (
    <div className="mb-8 p-4 border border-white/10 rounded-lg">
      <div className="flex items-center gap-3 mb-4">
        <Share2 className="w-5 h-5 text-primary" />
        <h3 className="text-lg font-semibold">Social Media</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="form-label flex items-center gap-2">
            <Twitter className="w-4 h-4 text-blue-400" />
            Twitter
          </label>
          <div className="relative">
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
              <Twitter className="w-4 h-4 text-white/50" />
            </div>
            <input
              type="text"
              name="socialMedia.twitter"
              placeholder="@yourhandle"
              className="form-input pl-10"
              value={profileForm.socialMedia.twitter}
              onChange={handleProfileChange}
            />
          </div>
        </div>

        <div>
          <label className="form-label flex items-center gap-2">
            <MessageCircle className="w-4 h-4 text-indigo-400" />
            Discord
          </label>
          <div className="relative">
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
              <MessageCircle className="w-4 h-4 text-white/50" />
            </div>
            <input
              type="text"
              name="socialMedia.discord"
              placeholder="your#1234"
              className="form-input pl-10"
              value={profileForm.socialMedia.discord}
              onChange={handleProfileChange}
            />
          </div>
        </div>

        <div>
          <label className="form-label flex items-center gap-2">
            <Instagram className="w-4 h-4 text-pink-400" />
            Instagram
          </label>
          <div className="relative">
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
              <Instagram className="w-4 h-4 text-white/50" />
            </div>
            <input
              type="text"
              name="socialMedia.instagram"
              placeholder="@yourhandle"
              className="form-input pl-10"
              value={profileForm.socialMedia.instagram}
              onChange={handleProfileChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
