import { Tag } from "lucide-react";
import { ChangeEvent } from "react";
import { UserProfile } from "../profilesettings";

export default function ProfileCategories({
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
        <Tag className="w-5 h-5 text-primary" />
        <h3 className="text-lg font-semibold">Interests & Categories</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label className="form-label">Personal Tags</label>
          <input
            type="text"
            name="tags"
            className="form-input"
            value={profileForm.tags}
            onChange={handleProfileChange}
            placeholder="art, collectibles, digital art"
          />
          <p className="text-xs text-white/60 mt-1">Comma separated (max 5)</p>
        </div>

        <div>
          <label className="form-label">Favorite Categories</label>
          <input
            type="text"
            name="favoriteCategories"
            className="form-input"
            value={profileForm.favoriteCategories}
            onChange={handleProfileChange}
            placeholder="pfp, gaming, photography"
          />
          <p className="text-xs text-white/60 mt-1">Comma separated (max 8)</p>
        </div>

        <div>
          <label className="form-label">Badges & Achievements</label>
          <div className="form-input bg-white/5 cursor-not-allowed">
            <div className="flex flex-wrap gap-1">
              {profileForm.badges ? (
                profileForm.badges.split(", ").map((badge, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-primary/20 text-primary border border-primary/30"
                  >
                    {badge.trim()}
                  </span>
                ))
              ) : (
                <span className="text-white/50 text-sm">No badges yet</span>
              )}
            </div>
          </div>
          <p className="text-xs text-white/60 mt-1">Earned through activity</p>
        </div>
      </div>
    </div>
  );
}
