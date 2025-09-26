import { Bid } from "./bids";
import { CollectionPayload } from "./collection";
import { User } from "./user";

export type NftPayload = {
  _id: string;
  updatedAt: string;
  createdAt: string;
  title: string;
  price: number;
  token_id: string;
  current_bid: number;
  auctionEndTime?: string;
  type: "auction" | "sale";
  media_url: string;
  media_type: "image" | "video";
  creator: User;
  owner: User;
  metadata: {
    contract: string;
    blockchain: string;
    tokenStandard: string;
  };
  bids?: Bid[];
  owning_collection: CollectionPayload;
  likes_count: number;
  description: string;
  isLiked: boolean;
};

export type NftInput = Omit<
  NftPayload,
  | "_id"
  | "creator"
  | "owner"
  | "collection"
  | "updatedAt"
  | "createdAt"
  | "bids"
  | "isLiked"
  | "owning_collection"
> & {
  creator: string;
  owner: string;
  owning_collection: string;
  bids?: string[];
};
