"use client";
import { topCreators } from "@/app/data/user";
import { NftPayload } from "@/app/types/nftTypes";
import { getRandomItems } from "@/app/utils/formatters";
import { Paintbrush, ShoppingBag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import Button from "../ui/button";

export default function Hero({ nfts }: { nfts: NftPayload[] }) {
  const videoRef = useRef(null);

  const heroItems = getRandomItems(nfts, 4);
  const creators = getRandomItems(topCreators, 4);

  return (
    <section className="relative overflow-hidden mt-20 py-20 lg:py-32">
      <div className="container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="fade-in-left">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
              Discover, Collect & Sell
              <span className="gradient-text"> Exceptional NFTs</span>
            </h1>

            <p className="text-lg text-light/70 mb-8 max-w-lg">
              AureusNova is the next generation NFT marketplace for digital
              collectibles, powered by blockchain technology.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link href={"/marketplace"}>
                <Button variant="primary" size="large" icon={<ShoppingBag />}>
                  Explore NFTs
                </Button>
              </Link>

              <Link href={"/dashboard/create-nft"}>
                <Button variant="outline" size="large" icon={<Paintbrush />}>
                  Start Minting
                </Button>
              </Link>
            </div>

            <div className="flex items-center gap-4 mt-8">
              <div className="flex -space-x-2">
                {creators.map((creator, index) => (
                  <div
                    key={creator._id}
                    className="relative"
                    style={{ zIndex: 10 - index }}
                  >
                    <Image
                      width={40}
                      height={40}
                      src={creator.avatar || "/pfp.png"}
                      alt={creator.username}
                      className="rounded-full border-2 border-darker"
                    />
                  </div>
                ))}
              </div>
              <div>
                <p className="text-sm text-light/70">
                  <span className="text-light font-bold">+300K</span> NFT
                  Artists have joined us
                </p>
              </div>
            </div>
          </div>

          <div className="relative fade-in-right">
            <div className="grid grid-cols-2 gap-4 max-w-lg mx-auto">
              {heroItems.map((nft, index) => (
                <div
                  key={nft._id}
                  className={`glass-card relative overflow-hidden border.re rounded-lg float-animation-${
                    index + 1
                  }`}
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  {nft.media_type === "video" ? (
                    <video
                      ref={videoRef}
                      src={nft.media_url}
                      loop
                      autoPlay
                      muted
                      playsInline
                      className="aspect-square object-cover"
                    />
                  ) : (
                    <div className="aspect-square">
                      <Image
                        src={nft.media_url}
                        fill
                        alt={nft.title}
                        className="object-cover "
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-gradient-to-br from-primary-400 to-secondary-500 rounded-full blur-xl opacity-70 animate-pulse-slow"></div>
          </div>
        </div>
      </div>

      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-bl from-primary-900/20 to-transparent pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-secondary-900/20 to-transparent pointer-events-none"></div>
    </section>
  );
}
