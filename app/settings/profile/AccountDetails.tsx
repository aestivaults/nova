import { Crown, Hash, MapPin, Share2 } from "lucide-react";
import { UserProfile } from "../profilesettings";
import { getStatsColor } from "@/app/utils/formatters";
export default function AccountDetails({
  profileForm,
}: {
  profileForm: UserProfile;
}) {
  return (
    <div className="mb-8 p-4 border border-white/10 rounded-lg">
      <div className="flex items-center gap-3 mb-4">
        <Crown className="w-5 h-5 text-primary" />
        <h3 className="text-lg font-semibold">Account Details</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="text-center p-4 bg-white/5 rounded-lg">
          <div className="flex justify-center mb-2">
            <MapPin className="w-5 h-5 text-white/50" />
          </div>
          <p className="text-sm font-medium text-white/70 mb-1">Location</p>
          <p className="text-lg font-bold text-white">
            {profileForm.location || "Not set"}
          </p>
          <p className="text-xs text-white/50 mt-1">Set by verification</p>
        </div>

        <div className="text-center p-4 bg-white/5 rounded-lg">
          <div className="flex justify-center mb-2">
            <Hash className="w-5 h-5 text-primary" />
          </div>
          <p className="text-sm font-medium text-white/70 mb-1">User Type</p>
          <p className={`text-lg font-bold ${getStatsColor(1)}`}>
            {profileForm.userType || "Collector"}
          </p>
          <p className="text-xs text-white/50 mt-1">Account classification</p>
        </div>

        <div className="text-center p-4 bg-white/5 rounded-lg">
          <div className="flex justify-center mb-2">
            <Share2 className="w-5 h-5 text-primary" />
          </div>
          <p className="text-sm font-medium text-white/70 mb-1">Blockchain</p>
          <p className="text-lg font-bold text-white">
            {profileForm.preferredBlockchain || "Ethereum"}
          </p>
          <p className="text-xs text-white/50 mt-1">Primary network</p>
        </div>
      </div>
    </div>
  );
}
