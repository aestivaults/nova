import Button from "@/app/components/ui/button";
import { PlusCircle } from "lucide-react";
import Link from "next/link";

export default function Hero() {
  return (
    <div className="flex pt-16 flex-col md:flex-row justify-between items-start md:items-center mb-2 md:mb-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">NFT Marketplace</h1>
        <p className="text-light/70">
          Discover, buy, and sell extraordinary NFTs
        </p>
      </div>

      <div className="mt-4 md:mt-0">
        <Link href="/dashboard/create-nft">
          <Button variant="primary" icon={<PlusCircle />}>
            Create NFT
          </Button>
        </Link>
      </div>
    </div>
  );
}
