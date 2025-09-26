"use client";
import Button from "@/app/components/ui/button";
import { NftPayload } from "@/app/types/nftTypes";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import NFTDetail from "./NFTDetail";

export default function NFTdetailPage({ nft }: { nft: NftPayload }) {
  return (
    <section className="py-20">
      <div className="container">
        <div className="mb-6 ">
          <Link href={"/marketplace"}>
            <Button
              variant="text"
              className="text-light/60 hover:text-light transition-colors"
              icon={<ArrowLeft className="mr-2" />}
            >
              Back to Marketplace
            </Button>
          </Link>
        </div>
        <NFTDetail nft={nft} />
        <div className="mt-12">
          <h3 className="text-2xl font-bold mb-6">More Like This</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            <div className="col-span-full text-center py-8">
              <p className="text-light/60">
                No similar items found at this time.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
