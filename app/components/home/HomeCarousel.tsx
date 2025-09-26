"use client";
import NFTCard from "@/app/components/ui/NFTCard";
import { AnimatePresence, motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Button from "../ui/button";
import { NftPayload } from "@/app/types/nftTypes";
import { getRandomItems } from "@/app/utils/formatters";

const HeroCarousel = ({ data: carouselItems }: { data: NftPayload[] }) => {
  const data = getRandomItems<NftPayload>(carouselItems, 20);
  const [currentSlide, setCurrentSlide] = useState(0);

  const router = useRouter();
  const navigate = (path: string) => router.push(path);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % data.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const current = data[currentSlide];

  return (
    <div className="relative md:h-[600px] h-screen p-8 w-full overflow-hidden bg-gradient-to-b from-dark to-darker">
      {/* Background Image with Parallax Effect */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current?._id}
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 z-0"
        >
          {current.media_type === "video" ? (
            <video
              src={current.media_url}
              loop
              autoPlay
              muted
              playsInline
              className="w-full h-full object-cover"
            />
          ) : (
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${current?.media_url})` }}
            />
          )}

          <div className="absolute inset-0 bg-black/60" />
          {/* <div
            className={`absolute inset-0 bg-gradient-to-r ${current?.gradient} opacity-40`}
          /> */}
        </motion.div>
      </AnimatePresence>

      {/* Main Content */}
      <div className="relative z-20 h-full flex items-center">
        <div className="container mx-auto px-6 flex items-center h-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center w-full h-full">
            {/* Left Content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={current?._id}
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 100, opacity: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="space-y-8 h-full justify-center flex flex-col"
              >
                {/* Title */}
                <div className="space-y-4">
                  <motion.h1
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="text-5xl lg:text-7xl font-bold bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent leading-tight"
                  >
                    {current?.title}
                  </motion.h1>
                </div>

                {/* Description */}
                <motion.p
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="text-xl text-gray-300 leading-relaxed max-w-lg"
                >
                  {current?.description}
                </motion.p>

                {/* Action Buttons */}
                <motion.div
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.7 }}
                  className="flex flex-wrap gap-4"
                >
                  <Button
                    onClick={() => navigate("/explore")}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden group"
                  >
                    <motion.div
                      className="absolute inset-0 bg-white/20"
                      animate={{ x: ["-100%", "100%"] }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    />

                    <Sparkles className="w-5 h-5 mr-2 relative z-10" />
                    <span className="relative z-10">Explore Collection</span>
                  </Button>
                </motion.div>
              </motion.div>
            </AnimatePresence>

            {/* Right Content - NFT Preview */}
            <AnimatePresence mode="wait">
              <motion.div
                key={current?._id}
                initial={{ x: 100, opacity: 0, rotateY: 45 }}
                animate={{ x: 0, opacity: 1, rotateY: 0 }}
                exit={{ x: -100, opacity: 0, rotateY: -45 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="relative"
              >
                <div className="relative max-h-[90%] aspect-[4/5] w-full max-w-md">
                  <div
                    className={`absolute inset-0 bg-gradient-to-r ${"from-primary-500 via-secondary-600 to-primary-500"} rounded-2xl blur-xl opacity-50`}
                  />

                  {/* NFT Card */}
                  <NFTCard variant="compact" nft={current} />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroCarousel;
