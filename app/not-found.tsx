import Link from "next/link";
import Button from "@/app/components/ui/button";
import { HomeIcon, ShoppingBag } from "lucide-react";

export default async function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center">
        <div className="relative mb-8">
          <h1 className="text-9xl font-orbitron font-bold text-light/10 select-none">
            404
          </h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-24 h-24 rounded-full bg-primary-500/30 animate-pulse"></div>
          </div>
        </div>

        <div className="flex items-center justify-center">
          <div className="text-4xl font-bold gradient-text mb-4">Not Found</div>
        </div>

        <p className="text-light/70 mb-8 max-w-lg mx-auto">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
          Don&apos;t worry, you can find plenty of other NFTs to explore!
        </p>

        <div className="flex flex-wrap gap-4 justify-center">
          <Link href="/">
            <Button variant="primary" icon={<HomeIcon />}>
              Go Home
            </Button>
          </Link>

          <Link href="/marketplace">
            <Button variant="secondary" icon={<ShoppingBag />}>
              Explore Marketplace
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
