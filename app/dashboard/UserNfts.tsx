import { Filter, Images } from "lucide-react";
import Link from "next/link";
import Button from "../components/ui/button";
import NFTCard from "../components/ui/NFTCard";
import { NftPayload } from "../types/nftTypes";

export default function UserNFTS({
  ownedNFTs,
}: {
  ownedNFTs: NftPayload[] | undefined;
}) {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">My NFTs</h2>

        <div className="flex gap-3">
          <Button variant="secondary" size="small" icon={<Filter />}>
            Filter
          </Button>

          <Link href="/marketplace">
            <Button variant="primary" size="small">
              Browse Marketplace
            </Button>
          </Link>
        </div>
      </div>

      {ownedNFTs && ownedNFTs.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {ownedNFTs.map((nft) => (
            <NFTCard key={nft._id} nft={nft} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 glass-card">
          <div className="mb-4">
            <Images
              size={50}
              className="text-4xl max-w-lg mx-auto text-red-500 mb-4"
            />
          </div>
          <h3 className="text-xl font-medium mb-2">No NFTs Found</h3>
          <p className="text-white/60 mb-6">You don&apos;t own any NFTs yet.</p>
          <Link href={"/marketplace"}>
            <Button variant="primary">Browse Marketplace</Button>
          </Link>
        </div>
      )}
    </div>
  );
}
