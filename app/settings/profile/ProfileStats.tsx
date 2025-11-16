import { DollarSign, ImagesIcon, SwitchCamera, Users } from "lucide-react";
import { UserProfile } from "../profilesettings";
import { formatNumber, getStatsColor } from "@/app/utils/formatters";

export default function ProfileStats({
  profileForm,
}: {
  profileForm: UserProfile;
}) {
  return (
    <div className="mb-8 p-4 border border-white/10 rounded-lg">
      <div className="flex items-center gap-3 mb-4">
        <DollarSign className="w-5 h-5 text-primary" />
        <h3 className="text-lg font-semibold">Trading Stats</h3>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div className="text-center p-4 bg-gradient-to-br from-blue/10 to-blue/5 rounded-lg">
          <div className="flex justify-center mb-2">
            <ImagesIcon size={30} className="text-primary-400" />
          </div>
          <p className="text-sm font-medium text-white/70 mb-1">NFTs Owned</p>
          <p
            className={`text-xl font-bold ${getStatsColor(
              profileForm.nftsOwned
            )}`}
          >
            {formatNumber(profileForm.nftsOwned)}
          </p>
        </div>

        <div className="text-center p-4 bg-gradient-to-br from-green/10 to-green/5 rounded-lg">
          <div className="flex justify-center mb-2">
            <SwitchCamera size={30} className="text-green-400" />
          </div>
          <p className="text-sm font-medium text-white/70 mb-1">NFTs Sold</p>
          <p
            className={`text-xl font-bold ${getStatsColor(
              profileForm.nftsSold
            )}`}
          >
            {formatNumber(profileForm.nftsSold)}
          </p>
        </div>

        <div className="text-center p-4 bg-gradient-to-br from-purple/10 to-purple/5 rounded-lg">
          <div className="flex justify-center mb-2">
            <Users className="w-5 h-5 text-purple-400" />
          </div>
          <p className="text-sm font-medium text-white/70 mb-1">Followers</p>
          <p
            className={`text-xl font-bold ${getStatsColor(
              profileForm.followers
            )}`}
          >
            {formatNumber(profileForm.followers)}
          </p>
        </div>

        <div className="text-center p-4 bg-gradient-to-br from-yellow/10 to-yellow/5 rounded-lg">
          <div className="flex justify-center mb-2">
            <DollarSign className="w-5 h-5 text-yellow-400" />
          </div>
          <p className="text-sm font-medium text-white/70 mb-1">Total Volume</p>
          <p className="text-xl font-bold text-yellow-400">
            ${formatNumber(profileForm.totalVolume)}
          </p>
        </div>
      </div>

      <p className="text-xs text-white/50 mt-3 text-center">
        Stats update automatically. Contact support for discrepancies.
      </p>
    </div>
  );
}
