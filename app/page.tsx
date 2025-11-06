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
import { getRandomItems } from "./utils/formatters";

export default async function Home() {
  let randomnfts: NftPayload[] = [];

  try {
    const { data, error } = await getNfts("1");
    if (data) randomnfts = getRandomItems<NftPayload>(data, 20);
  } catch (error) {
    console.log(error);
  }

  return (
    <>
      <Navbar />
      <Hero nfts={randomnfts as NftPayload[]} />
      <Stats small={false} stats={stats} />
      <Suspense fallback={null}>
        <HeroCarousel data={randomnfts as NftPayload[]} />
        <TrendingNFTs nfts={randomnfts as NftPayload[]} />
        <Auction nfts={randomnfts as NftPayload[]} />
      </Suspense>
      <WhatisAureus />
      <TopCreators />
      <WhyBuild />
      <Footer />
    </>
  );
}
