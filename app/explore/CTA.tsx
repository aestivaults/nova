import Button from "@/app/components/ui/button";
import { Paintbrush, ShoppingCart } from "lucide-react";
import Link from "next/link";

function CTA() {
  return (
    <section className="py-16 relative">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary-900/20 to-secondary-900/20"></div>

        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-primary-500/10 filter blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full bg-secondary-500/10 filter blur-3xl"></div>
      </div>

      <div className="container relative">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">
            Ready to start your NFT journey?
          </h2>
          <p className="text-light/70 text-lg mb-8">
            Join thousands of artists and collectors already using AureusNova to
            discover, collect, and trade extraordinary NFTs.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/marketplace">
              <Button variant="primary" size="large" icon={<ShoppingCart />}>
                Browse Marketplace
              </Button>
            </Link>

            <Link href={"/create-nft"}>
              <Button variant="outline" size="large" icon={<Paintbrush />}>
                Create NFT
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CTA;
