import Button from "@/app/components/ui/button";
import { PlusCircle } from "lucide-react";
import Link from "next/link";

export default function Hero() {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Collections</h1>
        <p className="text-light/70">
          Explore curated collections of extraordinary NFTs
        </p>
      </div>

      <div className="mt-4 md:mt-0">
        <Link href="/create-collection">
          <Button variant="primary" icon={<PlusCircle />}>
            Create Collection
          </Button>
        </Link>
      </div>
    </div>
  );
}
