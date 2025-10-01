"use client";
import { Clock, Filter, Gavel } from "lucide-react";
import { useEffect, useState } from "react";
import Footer from "../components/layout/Footer";
import Navbar from "../components/layout/navbar";
import NFTCard from "../components/ui/NFTCard"; // Assuming this is your custom NFTCard component
import { getNfts } from "../lib/getnfts";
import { NftPayload } from "../types/nftTypes";

// Sample filters - you can expand this
const filterOptions = [
  { value: "all", label: "All Auctions" },
  { value: "ending-soon", label: "Ending Soon" },
  { value: "high-bid", label: "Highest Bid" },
  { value: "new", label: "Newly Listed" },
];

export default function Auctions() {
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [filteredNFTs, setFilteredNFTs] = useState<NftPayload[]>([]); // Load from API later

  // Placeholder functions - you'll implement these
  const handleBid = (nftId: NftPayload) => {
    console.log(`Bid on NFT ${nftId}`);
  };

  const handleBuy = (nftId: NftPayload) => {
    console.log(`Buy NFT ${nftId}`);
  };

  useEffect(() => {
    async function getauctions() {
      const { data, error, pagination } = await getNfts("1");
      if (!error && data && data.length > 0) {
        const currentAuctions = data.filter(
          (nft) =>
            nft.auctionEndTime && new Date(nft.auctionEndTime) > new Date()
        );
        setFilteredNFTs(currentAuctions);
      }
    }
    getauctions();
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden pt-20 md:pt-0">
      <Navbar />

      <main className="container mx-auto px-4 py-8 sm:py-12 lg:py-16 relative z-10">
        <section className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-indigo-500/20 to-purple-500/20 border border-indigo-500/40 backdrop-blur-md text-indigo-200 text-sm font-mono font-bold mb-8 tracking-wide shadow-lg">
            <Gavel className="w-4 h-4" />
            AUREUSNOVA Auctions v3.0
          </div>
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold mb-6 bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300 bg-clip-text text-transparent leading-none">
            Auctions
            <span className="block text-3xl sm:text-4xl md:text-5xl font-mono text-indigo-100/70 mt-2">
              Bid on the Future
            </span>
          </h1>
          <p className="text-xl sm:text-2xl max-w-4xl mx-auto mb-12 leading-relaxed text-indigo-100/80 font-light tracking-wide">
            Discover and bid on exclusive NFTs in real-time auctions.
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-300 to-indigo-300">
              {" "}
              Powered by secure blockchain.
            </span>
          </p>
        </section>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {filterOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => setSelectedFilter(option.value)}
              className={`px-6 py-3 rounded-xl font-mono text-sm font-bold transition-all duration-300 ${
                selectedFilter === option.value
                  ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg scale-105"
                  : "bg-black/50 border border-indigo-500/30 text-indigo-200 hover:bg-indigo-500/20"
              } backdrop-blur-sm`}
            >
              <Filter className="w-4 h-4 inline mr-2" />
              {option.label}
            </button>
          ))}
        </div>

        {/* Auction Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredNFTs.map((nft) => (
            <NFTCard
              key={nft._id}
              nft={nft}
              onBid={handleBid}
              onBuy={handleBuy}
            />
          ))}
        </div>

        {filteredNFTs.length === 0 && (
          <div className="text-center py-20">
            <Clock className="w-16 h-16 mx-auto text-indigo-300 mb-4 animate-pulse" />
            <p className="text-2xl font-mono text-indigo-100">
              No auctions found. Check back soon!
            </p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
