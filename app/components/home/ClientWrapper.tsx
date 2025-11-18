"use client";
import { stats } from "@/app/data/stats";
import { getClientNfts } from "@/app/lib/clientFunctions";
import { NftPayload } from "@/app/types/nftTypes";
import { useQuery } from "@tanstack/react-query";
import { Suspense } from "react";
import Auction from "./Auction";
import Hero from "./hero";
import Stats from "./stats";
import TrendingNFTs from "./TrendingNfts";
import dynamic from "next/dynamic";

const HeroCarousel = dynamic(
  () => import("@/app/components/home/HomeCarousel"),
  {
    ssr: false, // or true if you want SSR HTML
    loading: () => <div className="min-h-screen bg-black/50"></div>,
  }
);

export default function ClientWrapper({
  initialData,
}: {
  initialData: NftPayload[];
}) {
  const { data: randomnfts } = useQuery<NftPayload[], Error>({
    queryKey: ["homeNfts"],
    queryFn: () => getClientNfts("1"),
    initialData,
  });

  return (
    <>
      <Hero nfts={randomnfts as NftPayload[]} />
      <Stats small={false} stats={stats} />
      <Suspense fallback={null}>
        <HeroCarousel data={randomnfts as NftPayload[]} />
        <TrendingNFTs nfts={randomnfts as NftPayload[]} />
        <Auction nfts={randomnfts as NftPayload[]} />
      </Suspense>
    </>
  );
}
