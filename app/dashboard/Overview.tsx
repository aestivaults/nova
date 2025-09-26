"use client";
import {
  ChartLine,
  Gavel,
  GavelIcon,
  Heart,
  Image as ImageIcon,
  Wallet2Icon,
} from "lucide-react";
import Link from "next/link";
import Button from "../components/ui/button";
import CountdownTimer from "../components/ui/CountdownTimer";
import NFTCard from "../components/ui/NFTCard";
import { useNotifications } from "../context/NotificationProvider";
import { Bid } from "../types/bids";
import { NftPayload } from "../types/nftTypes";
import { User } from "../types/user";
import { formatEthPrice, formatRelativeTime } from "../utils/formatters";
import { getActivityIcon } from "../utils/getIcons";

function Overview({
  user,
  handleTabChange,
  activeBids,
  ownedNFTs,
}: {
  user: User | null;
  activeBids: Bid[];
  handleTabChange: (key: string) => void;
  ownedNFTs: NftPayload[] | undefined;
}) {
  const bidsTorender = activeBids.filter(
    (bid) =>
      bid.nft?.auctionEndTime && new Date(bid.nft.auctionEndTime) > new Date()
  );
  const { notifications } = useNotifications();
  return (
    <div>
      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="glass-card p-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-primary-900/50 flex items-center justify-center">
              <Wallet2Icon />
            </div>
            <div>
              <p className="text-white/60 text-sm">Balance</p>
              <p className="text-xl font-bold">
                {formatEthPrice(user?.walletBalance ?? 0)}
              </p>
            </div>
          </div>
        </div>

        <div className="glass-card p-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-primary-900/50 flex items-center justify-center">
              <Gavel className="text-primary-400" />
            </div>
            <div>
              <p className="text-white/60 text-sm">Active Bids</p>
              <p className="text-xl font-bold">
                {activeBids.filter((bid) => bid.status === "active").length}
              </p>
            </div>
          </div>
        </div>

        <div className="glass-card p-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-primary-900/50 flex items-center justify-center">
              <ImageIcon className="fas fa-images text-primary-400" />
            </div>
            <div>
              <p className="text-white/60 text-sm">Owned NFTs</p>
              <p className="text-xl font-bold">{ownedNFTs?.length}</p>
            </div>
          </div>
        </div>

        <div className="glass-card p-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-primary-900/50 flex items-center justify-center">
              <ChartLine className="text-primary-400" />
            </div>
            <div>
              <p className="text-white/60 text-sm">Total Spent</p>
              <p className="text-xl font-bold">{formatEthPrice(18.6)}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity and Active Bids */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="glass-card p-6 md:col-span-2">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold">Recent Activity</h3>
          </div>

          <div className="divide-y divide-white/10">
            {notifications.slice(0, 7).map((activity) => (
              <div key={activity._id} className="py-4 flex">
                <div className="mr-4 mt-1">
                  <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center">
                    {getActivityIcon(activity.type)}
                  </div>
                </div>

                <div>
                  <div className="flex  justify-between items-start">
                    <h4 className="font-medium">{activity.title}</h4>
                    <span className="text-sm text-white/60">
                      {formatRelativeTime(String(activity.createdAt))}
                    </span>
                  </div>
                  <p className="text-white/70">{activity.message}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-card h-fit p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold">Active Bids</h3>
            <Button
              variant="text"
              size="small"
              onClick={() => handleTabChange("bids")}
            >
              View All
            </Button>
          </div>

          <div className="space-y-4">
            {bidsTorender.length > 0 ? (
              bidsTorender.slice(0, 5).map((bid) => (
                <div
                  key={bid._id}
                  className="flex justify-between items-center"
                >
                  <div>
                    <div className="font-medium">{bid.nft?.title}</div>
                    <div className="text-sm text-white/60">
                      Ends in:
                      <CountdownTimer
                        endTime={bid.nft?.auctionEndTime ?? ""}
                        size="small"
                      />
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-primary-400">
                      {formatEthPrice(bid.amount)}
                    </div>
                    <div className="text-xs text-white/60">
                      {formatRelativeTime(bid.time)}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center col-span-4 py-16">
                <div className="mb-4">
                  <GavelIcon
                    size={50}
                    className="text-4xl max-w-lg mx-auto text-red-500 mb-4"
                  />
                </div>
                <h3 className="text-xl font-medium mb-2">No Bids</h3>
                <p className="text-white/60 mb-6">
                  You Dont have any Active Bids
                </p>
                <Link href="/dashboard/create-nft">
                  <Button variant="primary">Explore Marketplace</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Owned NFTs Preview */}
      <div className="glass-card p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold">Your NFTs</h3>
          <Button
            variant="text"
            size="small"
            onClick={() => handleTabChange("owned")}
          >
            View All
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {ownedNFTs && ownedNFTs?.length > 0 ? (
            ownedNFTs
              .slice(0, 4)
              .map((nft) => (
                <NFTCard key={nft._id} nft={nft} variant="compact" />
              ))
          ) : (
            <div className="text-center col-span-4 py-16">
              <div className="mb-4">
                <Heart
                  size={50}
                  className="text-4xl max-w-lg mx-auto text-red-500 mb-4"
                />
              </div>
              <h3 className="text-xl font-medium mb-2">No NFTs</h3>
              <p className="text-white/60 mb-6">You Dont own any NFT&apos;s</p>
              <Link href="/dashboard/create-nft">
                <Button variant="primary">Explore Marketplace</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Overview;
