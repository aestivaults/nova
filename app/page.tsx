import { Suspense } from "react";
import Auction from "./components/home/Auction";
import Hero from "./components/home/hero";
import HeroCarousel from "./components/home/HomeCarousel";
import Stats from "./components/home/stats";
import TopCreators from "./components/home/TopCreators";
import TrendingNFTs from "./components/home/TrendingNfts";
import WhatisAureus from "./components/home/WhatWeAre";
import Footer from "./components/layout/Footer";
import Navbar from "./components/layout/navbar";
import { stats } from "./data/stats";
import { getNfts } from "./lib/getnfts";
import { NftPayload } from "./types/nftTypes";
import WhyBuild from "./components/home/WhyBuild";

export default async function Home() {
  const { data, error } = await getNfts("3");

  return (
    <>
      <Navbar />
      <Hero nfts={data as NftPayload[]} />
      <Stats small={false} stats={stats} />
      <Suspense fallback={null}>
        <HeroCarousel data={data as NftPayload[]} />
        <TrendingNFTs nfts={data as NftPayload[]} />
        <Auction nfts={data as NftPayload[]} />
      </Suspense>
      <WhatisAureus />
      <TopCreators />
      <WhyBuild />
      <Footer />
    </>
  );
}
