import Button from "@/app/components/ui/button";
import { getNft } from "@/app/lib/getnfts";
import { Search, TriangleAlert } from "lucide-react";
import Link from "next/link";
import NFTdetailPage from "./NFTDetailPage";

export default async function NFTDetailPage({
  params,
}: {
  params: Promise<{ marketid: string }>;
}) {
  const { marketid } = await params;

  const { error, data } = await getNft(marketid);

  if (error) {
    return (
      <div className="container py-12">
        <div className="glass-card p-8 text-center">
          <TriangleAlert
            size={50}
            className="text-4xl max-w-lg mx-auto text-red-500 mb-4"
          />

          <h2 className="text-2xl font-bold mb-4">Error Loading NFT</h2>
          <p className="text-light/70 mb-6">{error}</p>
          <Link href={"/marketplace"}>
            <Button>Return to Marketplace</Button>
          </Link>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="container py-12">
        <div className="glass-card p-8 text-center">
          <div className="text-4xl text-light/30 mb-4">
            <Search />
          </div>
          <h2 className="text-2xl font-bold mb-4">NFT Not Found</h2>
          <p className="text-light/70 mb-6">
            The NFT you&apos;re looking for doesn&apos;t exist or has been
            removed.
          </p>
          <Link href={"/marketplace"}>
            <Button>Return to Marketplace</Button>
          </Link>
        </div>
      </div>
    );
  }

  return <NFTdetailPage nft={data} />;
}
