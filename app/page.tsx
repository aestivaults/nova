import ClientWrapper from "./components/home/ClientWrapper";
import TopCreators from "./components/home/TopCreators";
import WhatisAureus from "./components/home/WhatWeAre";
import WhyBuild from "./components/home/WhyBuild";
import Footer from "./components/layout/Footer";
import Navbar from "./components/layout/navbar";
import { getNfts } from "./lib/getnfts";
import { NftPayload } from "./types/nftTypes";
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
      <ClientWrapper initialData={randomnfts} />
      <WhatisAureus />
      <TopCreators />
      <WhyBuild />
      <Footer />
    </>
  );
}
