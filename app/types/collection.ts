import { NftPayload } from "./nftTypes";
import { User } from "./user";

export type CollectionPayload = {
  _id: string;
  updatedAt: string;
  createdAt: string;
  name: string;
  description: string;
  banner_image: string;
  logo_image: string;
  featured: boolean;
  category: string;
  royalties: number;
  creator: User;
  owner: User;
  nfts: NftPayload[];
  owners: User[];
  floor_price: number;
  total_volume: number;
};

export type CollectionInput = Omit<
  CollectionPayload,
  "_id" | "updatedAt" | "createdAt" | "creator" | "owner" | "nfts" | "owners"
> & {
  creator: string;
  owner: string;
  nfts?: string[];
  owners: string[];
};
