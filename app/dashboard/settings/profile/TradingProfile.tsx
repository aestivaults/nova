import { ChangeEvent } from "react";
import { UserProfile } from "../profilesettings";
import { BarChart3, Clock, Star } from "lucide-react";

export default function TradingProfile({
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
        <BarChart3 className="w-5 h-5 text-primary" />
        <h3 className="text-lg font-semibold">Trading Profile</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="form-label">Experience Level</label>
          <div className="relative">
            <input
              type="text"
              name="experienceLevel"
              className="form-input pl-10"
              value={profileForm.experienceLevel}
              onChange={handleProfileChange}
              placeholder="e.g., Beginner, Intermediate, Expert"
            />
            <Star className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/50" />
          </div>
        </div>

        <div>
          <label className="form-label">Availability</label>
          <div className="relative">
            <input
              type="text"
              name="availability"
              className="form-input pl-10"
              value={profileForm.availability}
              onChange={handleProfileChange}
              placeholder="e.g., Weekends only, Full-time"
            />
            <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/50" />
          </div>
        </div>
      </div>
    </div>
  );
}
