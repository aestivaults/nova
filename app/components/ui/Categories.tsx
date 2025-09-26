"use client";
import Button from "@/app/components/ui/button";
import { useSetParams } from "@/app/hooks/useSetParams";
import {
  Camera,
  Gem,
  Globe2,
  MenuSquare,
  Music,
  Palette,
  SlidersHorizontal,
  TrainTrack,
  Video,
} from "lucide-react";

export default function CategoriesNavigation() {
  const { setParams, searchParams } = useSetParams();
  const currentCategory = searchParams.get("category") || "all";

  return (
    <section className="py-8 md:col-span-2">
      <div className="container">
        <div className="overflow-x-auto">
          <div className="flex gap-4 pb-2 min-w-max">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={
                  category.id === currentCategory ? "primary" : "secondary"
                }
                size="small"
                onClick={() => setParams({ category: category.id })}
                className="min-w-max"
                icon={category.icon}
              >
                {category.name}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export const categories = [
  { id: "all", name: "All Categories", icon: <MenuSquare /> },
  { id: "art", name: "Art", icon: <Palette /> },
  { id: "music", name: "Music", icon: <Music /> },
  { id: "video", name: "Video", icon: <Video /> },
  { id: "photography", name: "Photography", icon: <Camera /> }, // covers 'camera'
  { id: "collectibles", name: "Collectibles", icon: <Gem /> },
  { id: "sports", name: "Sports", icon: <TrainTrack /> },
  { id: "virtual-worlds", name: "Virtual Worlds", icon: <Globe2 /> },
  { id: "abstract", name: "Abstract", icon: <SlidersHorizontal /> },
];
