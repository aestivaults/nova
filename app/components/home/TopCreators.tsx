"use client";
import Button from "@/app/components/ui/button";
import Slider from "@/app/components/ui/Slider";
import UserAvatar from "@/app/components/ui/UserAvatar";
import { formatEthPrice } from "@/app/utils/formatters";
import { topCreators } from "@/app/data/user";
import { User } from "@/app/types/user";

function TopCreators() {
  const isFollowing = false;
  const totalSales = 20;
  const itemsCreated = 4;

  const renderCreatorCard = (creator: User) => (
    <div className="glass-card h-full p-4">
      <div className="flex flex-col items-center text-center">
        <UserAvatar
          user={creator}
          size="large"
          showVerified={true}
          className="mb-4"
        />

        <h3 className="font-bold mb-1">{creator.username}</h3>

        <div className="flex justify-between w-full mb-4">
          <div className="text-center">
            <p className="text-xs text-light/60">Items</p>
            <p className="font-medium">{itemsCreated}</p>
          </div>
          <div className="text-center">
            <p className="text-xs text-light/60">Sales</p>
            <p className="font-medium">{formatEthPrice(totalSales)}</p>
          </div>
        </div>

        <Button
          variant={isFollowing ? "secondary" : "primary"}
          size="small"
          fullWidth
        >
          {isFollowing ? "Following" : "Follow"}
        </Button>
      </div>
    </div>
  );

  return (
    <section className="py-16 bg-gradient-to-b from-darker to-dark">
      <div className="container">
        <Slider
          title={"Top Creators"}
          subtitle="Meet the artists behind the most popular NFTs"
          items={topCreators}
          renderItem={renderCreatorCard}
          slidesToShow={5}
          autoplay={false}
          showArrows={false}
        />
      </div>
    </section>
  );
}

export default TopCreators;
