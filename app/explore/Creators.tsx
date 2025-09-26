"use client";
import Button from "@/app/components/ui/button";
import UserAvatar from "@/app/components/ui/UserAvatar";
import { formatEthPrice, formatNumber } from "@/app/utils/formatters";
import { topCreators } from "../data/user";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

function Creators() {
  const itemsCreated = 40;
  const isFollowing = false;
  const totalSales = 300;

  return (
    <section className="py-12">
      <div className="container">
        <h2 className="text-2xl font-bold mb-6">Trending Creators</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {topCreators.slice(0, 4).map((creator) => (
            <Link
              href={`/creator/${creator._id}`}
              key={creator._id}
              className="glass-card p-6 flex flex-col items-center text-center cursor-pointer hover:-translate-y-2 transition-transform"
            >
              <UserAvatar
                user={creator}
                size="large"
                showVerified={true}
                className="mb-4"
              />

              <h3 className="font-bold text-lg mb-1">{creator.username}</h3>

              <div className="w-full grid grid-cols-2 gap-2 mb-4">
                <div className="text-center">
                  <p className="text-xs text-light/60">Items</p>
                  <p className="font-medium">{formatNumber(itemsCreated)}</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-light/60">Volume</p>
                  <p className="font-medium">{formatEthPrice(totalSales)}</p>
                </div>
              </div>

              <Button
                variant={isFollowing ? "secondary" : "primary"}
                size="small"
                fullWidth
                onClick={(e) => {
                  e.stopPropagation();
                  // Toggle follow logic
                }}
              >
                {isFollowing ? "following" : "follow"}
              </Button>
            </Link>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link href={"/creators"}>
            <Button
              variant="outline"
              icon={<ArrowRight />}
              iconPosition="right"
            >
              View All Creators
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Creators;
