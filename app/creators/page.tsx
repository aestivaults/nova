"use client";
import { Instagram, Star, Twitter, Users, Zap } from "lucide-react";
import { useState } from "react";
import Footer from "../components/layout/Footer";
import Navbar from "../components/layout/navbar";
import UserAvatar from "../components/ui/UserAvatar";
import Button from "../components/ui/button";
import { topCreators } from "../data/user";
import { formatEthPrice } from "../utils/formatters";

export default function Creators() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");

  const filteredCreators = topCreators
    .filter(
      (creator) =>
        creator.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        creator.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        creator.tags.some((tag) =>
          tag.toLowerCase().includes(searchTerm.toLowerCase())
        )
    )
    .filter((creator) => {
      if (selectedFilter === "verified") return creator.isVerified;
      return true;
    })
    .sort((a, b) => {
      if (selectedFilter === "most-followers") return b.followers - a.followers;
      if (selectedFilter === "highest-volume")
        return b.totalVolume - a.totalVolume;
      return 0;
    });

  function handleFollow(id: string) {}

  return (
    <div className="min-h-screen relative overflow-hidden pt-20 md:pt-0">
      <Navbar />

      <main className="container mx-auto px-4 py-8 sm:py-12 lg:py-16 relative z-10">
        <section className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-purple-500/20 to-indigo-500/20 border border-purple-500/40 backdrop-blur-md text-purple-200 text-sm font-mono font-bold mb-8 tracking-wide shadow-lg">
            <Users className="w-4 h-4" />
            AUREUSNOVA Creators v3.0
          </div>
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold mb-6 bg-gradient-to-r from-purple-300 via-indigo-300 to-blue-300 bg-clip-text text-transparent leading-none">
            Creator Cosmos
            <span className="block text-3xl sm:text-4xl md:text-5xl font-mono text-purple-100/70 mt-2">
              Discover Visionaries
            </span>
          </h1>
          <p className="text-xl sm:text-2xl max-w-4xl mx-auto mb-12 leading-relaxed text-purple-100/80 font-light tracking-wide">
            Explore and follow innovative creators shaping the NFT universe.
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-purple-300">
              {" "}
              Connect in the metaverse.
            </span>
          </p>
          {/* Search */}
          <div className="max-w-2xl mx-auto flex flex-col sm:flex-row gap-4 mb-12">
            <div className="relative group flex-1">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-indigo-600/20 rounded-xl border border-purple-500/30 blur-sm -z-10"></div>
              <input
                type="text"
                placeholder="Search creators or tags..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-6 py-4 rounded-xl border-2 border-purple-500/30 bg-black/60 backdrop-blur-xl text-purple-100 placeholder-purple-300/70 focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/30 transition-all text-base font-mono shadow-xl"
              />
              <Star className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-300 w-5 h-5" />
            </div>
            <select
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value)}
              className="px-6 py-4 rounded-xl border-2 border-purple-500/30 bg-black/60 backdrop-blur-xl text-purple-100 focus:border-blue-500/50 transition-all font-mono"
            >
              {filterOptions.map((option) => (
                <option
                  key={option.value}
                  value={option.value}
                  className="bg-black text-purple-100"
                >
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCreators.map((creator) => {
            const isFollowing = false; // Placeholder for follow state
            return (
              <div
                key={creator._id}
                className="glass-card h-full p-6 rounded-2xl backdrop-blur-md transition-all duration-300 ease-in-out hover:shadow-2xl relative overflow-hidden border border-purple-400/10"
              >
                <div className="flex flex-col items-center text-center">
                  <UserAvatar
                    user={creator}
                    size="large"
                    showVerified={creator.isVerified}
                    className="mb-4"
                  />

                  <h3 className="font-bold text-2xl text-purple-100 mb-1 tracking-wide">
                    {creator.username}
                  </h3>

                  <p className="text-sm font-mono text-purple-300/80 mb-3">
                    {creator.role}
                  </p>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-3 w-full mb-5 text-purple-200/90">
                    {[
                      {
                        label: "Items Created",
                        value: creator.nftsOwned,
                      },
                      {
                        label: "Sales",
                        value: formatEthPrice(creator.totalVolume),
                      },
                      {
                        label: "Followers",
                        value: creator.followers.toLocaleString(),
                      },
                    ].map(({ label, value }, i) => (
                      <div
                        key={i}
                        className="text-center bg-white/5 p-3 rounded-xl border border-purple-400/10 shadow-inner"
                      >
                        <p className="text-xs text-purple-300/70">{label}</p>
                        <p className="font-semibold text-base">{value}</p>
                      </div>
                    ))}
                  </div>

                  {/* Role (shortened "AM") */}
                  <p className="text-sm font-mono text-purple-300/80 mb-3">
                    {creator.role.replace(/\bAM\b/gi, "Mgr")}
                  </p>

                  {/* Socials with labels */}
                  <div className="flex flex-col gap-2 items-center mb-5">
                    {creator.socialMedia.twitter && (
                      <a
                        href={`https://twitter.com/${creator.socialMedia.twitter}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-purple-300 hover:text-blue-400 transition-colors"
                      >
                        <Twitter className="w-5 h-5" />
                        <span className="text-sm font-medium">Twitter</span>
                      </a>
                    )}
                    {creator.socialMedia.instagram && (
                      <a
                        href={`https://instagram.com/${creator.socialMedia.instagram}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-purple-300 hover:text-pink-400 transition-colors"
                      >
                        <Instagram className="w-5 h-5" />
                        <span className="text-sm font-medium">Instagram</span>
                      </a>
                    )}
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 justify-center mb-5">
                    {creator.favoriteCategories.map((category, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 rounded-full bg-gradient-to-r from-purple-600/20 to-blue-500/20 text-xs font-mono text-purple-200 border border-purple-500/40 hover:scale-105 transition-transform duration-200"
                      >
                        {category}
                      </span>
                    ))}
                  </div>

                  {/* Follow Button */}
                  <Button
                    fullWidth
                    variant={isFollowing ? "primary" : "secondary"}
                    onClick={() => handleFollow(creator._id)}
                  >
                    {isFollowing ? "Following" : "Follow"}
                  </Button>
                </div>
              </div>
            );
          })}
        </div>

        {filteredCreators.length === 0 && (
          <div className="text-center py-20">
            <Star className="w-16 h-16 mx-auto text-purple-300 mb-4 animate-spin slow-spin" />
            <p className="text-2xl font-mono text-purple-100">
              No creators found. Try different search terms or filters!
            </p>
          </div>
        )}

        {/* Call to Action */}
        <div className="mt-16 relative">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 to-indigo-900/30 rounded-3xl blur-2xl -z-10"></div>
          <div className="bg-black/70 backdrop-blur-xl rounded-3xl p-8 border border-purple-500/40 shadow-2xl text-center">
            <h2 className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-blue-300">
              Become a Creator
            </h2>
            <p className="text-xl text-purple-100/80 mb-8 max-w-2xl mx-auto">
              Join the ranks of visionary artists and shape the future of NFTs.
            </p>
            <button className="px-8 py-4 rounded-xl bg-gradient-to-r from-purple-500 to-blue-500 text-white font-bold hover:from-purple-600 hover:to-blue-600 transition-all shadow-lg font-mono text-lg">
              <Zap className="w-5 h-5 inline mr-2" />
              Start Creating
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

const filterOptions = [
  { value: "all", label: "All Creators" },
  { value: "most-followers", label: "Most Followers" },
  { value: "highest-volume", label: "Highest Volume" },
  { value: "verified", label: "Verified Only" },
];
