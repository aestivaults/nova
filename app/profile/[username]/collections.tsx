import Button from "@/app/components/ui/button";
import { CollectionPayload } from "@/app/types/collection";
import { Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Collections({
  collections,
}: {
  collections: CollectionPayload[];
}) {
  return (
    <div className="glass-card p-8">
      <h3 className="text-2xl font-bold mb-6 text-white">My Collections</h3>
      <div className="overflow-x-auto">
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="border-b border-white/20">
              <th className="text-left py-3 px-4 text-gray-400 uppercase tracking-wide text-sm">
                Collection
              </th>
              <th className="text-left py-3 px-4 text-gray-400 uppercase tracking-wide text-sm">
                Floor Price
              </th>
              <th className="text-left py-3 px-4 text-gray-400 uppercase tracking-wide text-sm">
                No. of Items
              </th>
              <th className="text-left py-3 px-4 text-gray-400 uppercase tracking-wide text-sm">
                Total Value
              </th>
              <th className="text-left py-3 px-4 text-gray-400 uppercase tracking-wide text-sm">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {collections.length > 0 ? (
              collections.slice(0, 15).map((collection) => (
                <tr
                  key={collection._id}
                  className="border-b border-white/10 hover:bg-white/5 transition-colors"
                >
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-14 relative rounded-lg overflow-hidden bg-gradient-to-br from-purple-400 to-pink-600 flex-shrink-0">
                        {collection.banner_image ? (
                          <Image
                            src={collection.banner_image}
                            alt={collection.name}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            className="object-cover"
                          />
                        ) : (
                          <div className="flex items-center justify-center w-full h-full text-white text-xs uppercase bg-gray-700">
                            No Image
                          </div>
                        )}
                      </div>
                      <span className="font-medium text-white">
                        {collection.name}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-gray-300 font-semibold">
                    {collection.floor_price ?? "-"}
                  </td>
                  <td className="py-4 px-4 text-gray-300">
                    {collection.nfts.length}
                  </td>
                  <td className="py-4 px-4 text-green-400 font-semibold">
                    {collection.total_volume ?? "-"}
                  </td>
                  <td className="py-4 px-4">
                    <Link href={`/collections/${collection._id}`}>
                      <Button variant="secondary">View</Button>
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="py-20 text-center text-gray-400">
                  <div className="flex flex-col items-center gap-4">
                    <Search size={48} className="text-primary-400" />
                    <h3 className="text-xl font-semibold">
                      No Collections Found
                    </h3>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
