"use client";
import Button from "@/app/components/ui/button";
import { useAuth } from "@/app/context/AuthContext";
import { User } from "@/app/types/user";
import { formatEthPrice } from "@/app/utils/formatters";
import { Copy, Pencil, Share2, Verified } from "lucide-react";
import Image from "next/image";

export default function Profile({ user }: { user: User }) {
  const { isAuthenticated } = useAuth();
  const copyAddress = () => {
    navigator.clipboard.writeText(user?.owner_id);
  };
  return (
    <div className="lg:col-span-1">
      <div className="glass-card p-8 text-center">
        <div className="relative inline-block mb-6">
          {/* Avatar with gradient border */}
          <div className="w-40 h-40 rounded-full bg-gradient-to-br from-blue-400 to-purple-600 p-[3px]">
            <div className="w-full relative h-full rounded-full overflow-hidden bg-white">
              <Image
                src={user?.avatar}
                fill
                alt={user?.username}
                className="object-cover rounded-full"
              />
            </div>
          </div>

          {/* Verified Badge */}
          <div
            className="absolute bottom-1 right-1 bg-blue-600 p-1 rounded-full border-2 border-white shadow-md"
            title="Verified User"
          >
            <Verified size={20} className="text-white" />
          </div>
        </div>

        <div className="flex items-center gap-3 justify-center my-3">
          <h2 className="text-xl font-bold mb-2">{user?.name}</h2>
          <p className="text-sm font-bold mb-2">(@{user?.username})</p>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between bg-white/5 rounded-xl p-4">
            <span className="text-gray-400">Wallet</span>
            {user?.owner_id ? (
              <div className="flex items-center gap-2">
                <code className="text-sm">{user?.owner_id}</code>
                <button
                  onClick={copyAddress}
                  className="text-blue-400 hover:text-blue-300"
                >
                  <Copy size={14} />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <code className="text-sm">No Wallet Connected</code>
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/5 rounded-xl p-4">
              <div className="text-2xl font-bold text-blue-400">
                {user?.nftsOwned}
              </div>
              <div className="text-sm text-gray-400">NFTs Owned</div>
            </div>
            <div className="bg-white/5 rounded-xl p-4">
              <div className="text-2xl font-bold text-green-400">
                {user?.nftsSold}
              </div>
              <div className="text-sm text-gray-400">NFTs Sold</div>
            </div>
            <div className="bg-white/5 rounded-xl p-4">
              <div className="text-2xl font-bold text-purple-400">
                {(user?.followers / 1000).toFixed(1)}K
              </div>
              <div className="text-sm text-gray-400">Followers</div>
            </div>
            <div className="bg-white/5 rounded-xl p-4">
              <div className="text-2xl font-bold text-orange-400">
                {formatEthPrice(user?.totalVolume)}
              </div>
              <div className="text-sm text-gray-400">Total Volume</div>
            </div>
          </div>

          <div className="flex gap-3">
            {isAuthenticated && (
              <Button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-3 rounded-xl transition-colors">
                <Pencil className="w-4 h-4 mr-2 inline" />
                Edit Profile
              </Button>
            )}
            <Button
              variant="outline"
              className="bg-white/10 hover:bg-white/20 text-white font-medium px-4 py-3 rounded-xl transition-colors"
            >
              <Share2 size={16} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
