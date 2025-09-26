import Button from "@/app/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative py-20 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <Image
          fill
          src="https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80"
          alt="Banner"
          className="object-cover opacity-20"
        />

        <div className="absolute inset-0 bg-gradient-to-b from-dark to-transparent"></div>
      </div>

      <div className="container relative">
        <div className="max-w-2xl">
          <h1 className="text-4xl font-bold mb-4 mt-2">Explore AureusNova</h1>
          <p className="text-light/70 text-lg mb-6">
            Discover the best NFT collections, trending creators, and rare
            digital items across the marketplace.
          </p>

          <div className="flex gap-4">
            <Link href="/marketplace">
              <Button variant="primary" size="large">
                Browse Marketplace
              </Button>
            </Link>

            <Link href="/collections">
              <Button variant="secondary" size="large">
                View Collections
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
