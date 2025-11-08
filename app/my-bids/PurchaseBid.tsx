import { useQuery } from "@tanstack/react-query";
import { AlertCircle, CheckCircle } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import Button from "../components/ui/button";
import Modal from "../components/ui/Modal";
import { getUserCollections } from "../lib/clientFunctions";
import { CollectionPayload } from "../types/collection";
import { NftPayload } from "../types/nftTypes";
import { api } from "../utils/api";
import { useAuth } from "../context/AuthContext";

interface PurchaseBidProps {
  nft: NftPayload;
  onClose: () => void;
}

const PurchaseBid: React.FC<PurchaseBidProps> = ({ nft, onClose }) => {
  const { user } = useAuth();
  const [selectedCollection, setSelectedCollection] = useState<string>("");
  const [isPurchasing, setIsPurchasing] = useState(false);
  const [purchaseStatus, setPurchaseStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");

  // Fetch user collections
  const { data: collections, isLoading: collectionsLoading } = useQuery<
    CollectionPayload[]
  >({
    queryKey: ["user-collections"],
    queryFn: getUserCollections,
  });

  // Handle NFT purchase
  const handlePurchase = async () => {
    setIsPurchasing(true);
    setPurchaseStatus("idle");
    try {
      const res = await api.patch("/nfts", {
        user_id: user?._id,
        nft_id: nft._id,
        former_collectionID: nft.owning_collection,
        owning_collection: selectedCollection,
      });
      console.log(res);
      //   await purchaseNFT(nft.id, selectedCollection);
      setPurchaseStatus("success");
    } catch (error) {
      console.log(error);
      setPurchaseStatus("error");
      setErrorMessage("Failed to complete the purchase. Please try again.");
    } finally {
      setIsPurchasing(false);
    }
  };

  return (
    <Modal.Window name="purchase-modal" title="Confirm NFT Purchase">
      {/* Content */}

      {/* NFT Details */}
      <div className="flex flex-col space-x-4 mb-6">
        <div className="relative w-full h-[250px] rounded-lg overflow-hidden">
          <Image
            src={nft.media_url}
            fill
            alt={nft.title}
            className="object-cover "
          />
        </div>
        <div className="my-3">
          <h3 className="text-lg font-semibold">{nft.title}</h3>
          <p>{nft.price} ETH</p>
        </div>
      </div>

      {/* Collection Selection */}
      <div className="mb-6">
        <label
          htmlFor="collection"
          className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2"
        >
          Add to Collection
        </label>
        <select
          id="collection"
          value={selectedCollection}
          onChange={(e) => setSelectedCollection(e.target.value)}
          className=" form-select"
          disabled={collectionsLoading || isPurchasing}
        >
          <option value="">Select a collection</option>
          {collections?.map((collection) => (
            <option key={collection._id} value={collection._id}>
              {collection.name}
            </option>
          ))}
        </select>
        {collectionsLoading && (
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            Loading collections...
          </p>
        )}
      </div>

      {/* Purchase Status */}
      {purchaseStatus === "success" && (
        <div className="flex items-center space-x-2 text-green-600 dark:text-green-400 mb-4">
          <CheckCircle size={24} />
          <p>Purchase successful! NFT added to your collection.</p>
        </div>
      )}
      {purchaseStatus === "error" && (
        <div className="flex items-center space-x-2 text-red-600 dark:text-red-400 mb-4">
          <AlertCircle size={24} />
          <p>{errorMessage}</p>
        </div>
      )}

      {/* Footer */}
      <div className="flex justify-end space-x-4 p-6 border-t border-gray-200 dark:border-gray-700">
        <Button variant="secondary" onClick={onClose} disabled={isPurchasing}>
          Cancel
        </Button>
        <Button
          onClick={handlePurchase}
          isLoading={isPurchasing}
          disabled={isPurchasing || !selectedCollection}
        >
          Confirm Purchase
        </Button>
      </div>
    </Modal.Window>
  );
};

export default PurchaseBid;
