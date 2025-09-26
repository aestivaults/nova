import { NFTGridSkeleton } from "@/app/components/ui/Loader";
import { Suspense } from "react";
import Stats from "../components/home/stats";
import Footer from "../components/layout/Footer";
import Navbar from "../components/layout/navbar";
import CategoriesNavigation from "../components/ui/Categories";
import { formatEthPrice, formatNumber } from "../utils/formatters";
import Collections from "./Collections";
import Creators from "./Creators";
import CTA from "./CTA";
import FeaturedNFTs from "./FeaturedNfts";
import Hero from "./Hero";
import { getNfts } from "../lib/getnfts";

export default async function Explore({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; limit?: string }>;
}) {
  const value = await searchParams;
  const page = value.page || "1";
  const { data, error, pagination } = await getNfts(page);

  return (
    <>
      <Navbar />
      <Hero />
      <Stats stats={marketStats} small={true} />

      {error ? (
        <div className="text-center mt-10 text-red-500">
          <p>Error loading NFTs: {error}</p>
        </div>
      ) : !data ? (
        <NFTGridSkeleton />
      ) : (
        <Suspense fallback={<NFTGridSkeleton />}>
          <CategoriesNavigation />
          <FeaturedNFTs nfts={data} pagination={pagination} />
          <Collections />
        </Suspense>
      )}

      <Creators />
      <CTA />
      <Footer />
    </>
  );
}

const marketStats = [
  { label: "Total Volume", value: formatEthPrice(1240.8) },
  { label: "NFTs", value: formatNumber(18720) },
  { label: "Active Auctions", value: formatEthPrice(426) },
  { label: "Floor Price", value: formatNumber(0.5) },
];
