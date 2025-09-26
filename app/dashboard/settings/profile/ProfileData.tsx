import { ChangeEvent } from "react";
import { UserProfile } from "../profilesettings";
import { BarChart3, Mail, User } from "lucide-react";

export default function ProfileData({
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
        <User className="w-5 h-5 text-primary" />
        <h3 className="text-lg font-semibold">Basic Information</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="form-label">Full Name</label>
          <div className="relative">
            <input
              type="text"
              name="name"
              className="form-input pl-10"
              value={profileForm.name}
              onChange={handleProfileChange}
              required
            />
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/50" />
          </div>
        </div>

        <div>
          <label className="form-label">Username</label>
          <div className="relative">
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
              <span className="text-white/50">@</span>
            </div>
            <input
              type="text"
              name="username"
              className="form-input pl-8"
              value={profileForm.username}
              onChange={handleProfileChange}
              required
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
        <div>
          <label className="form-label">Email Address</label>
          <div className="relative">
            <input
              type="email"
              name="email"
              className="form-input pl-10 bg-white/5 cursor-not-allowed"
              value={profileForm.email}
              disabled
            />
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/30" />
          </div>
          <p className="text-xs text-white/60 mt-1">
            Contact support to change email
          </p>
        </div>

        <div>
          <label className="form-label">Trading Style</label>
          <div className="relative">
            <input
              type="text"
              name="tradingStyle"
              className="form-input pl-10"
              value={profileForm.tradingStyle}
              onChange={handleProfileChange}
              placeholder="e.g., Long-term holder, Day trader"
            />
            <BarChart3 className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/50" />
          </div>
        </div>
      </div>
    </div>
  );
}
