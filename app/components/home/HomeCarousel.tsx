"use client";
import NFTCard from "@/app/components/ui/NFTCard";
import { NftPayload } from "@/app/types/nftTypes";
import { Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { memo, useEffect, useState } from "react";
import Button from "../ui/button";
import { useInView } from "@/app/hooks/inView";
import Image from "next/image";

const HeroCarousel = memo(({ data }: { data: NftPayload[] }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const router = useRouter();
  const { ref, inView } = useInView<HTMLDivElement>();
  const navigate = (path: string) => router.push(path);

  useEffect(() => {
    if (!inView || isHovered) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % data.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [inView, isHovered, data.length]);

  const current = data[currentSlide];

  return (
    <div
      ref={ref}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative md:h-[600px] h-screen p-8 w-full overflow-hidden bg-gradient-to-b from-dark to-darker"
    >
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
            <Image
              src={current.media_url}
              fill
              alt="background image"
              priority
              quality={85}
              className="object-cover"
              sizes="100vw"
              placeholder="blur"
              blurDataURL={"/logo.png"}
              unoptimized={current.media_url.endsWith(".gif")} // only if you have gifs/webp issues
            />
          )}

          <div className="absolute inset-0 bg-black/60" />
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
                    icon={<Sparkles />}
                    onClick={() => navigate(`/marketplace/${current._id}`)}
                  >
                    View Nft
                  </Button>
                </motion.div>
              </motion.div>
            </AnimatePresence>

            <AnimatePresence mode="wait">
              <motion.div
                key={current?._id}
                initial={{ x: 100, opacity: 0, rotateY: 45 }}
                animate={{ x: 0, opacity: 1, rotateY: 0 }}
                exit={{ x: -100, opacity: 0, rotateY: -45 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="relative"
              >
                <div className="relative aspect-[4/5] w-full max-w-md mx-auto lg:mx-0">
                  <NFTCard variant="compact" nft={current} />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
});

HeroCarousel.displayName = "HeroCarousel";

export default HeroCarousel;
