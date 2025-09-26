import { NftPayload } from "./nftTypes";
import { User } from "./user";

export type Bid = {
  _id: string;
  updatedAt: string;
  createdAt: string;
  nft: NftPayload;
  bidder: User;
  status: string;
  amount: number;
  time: string;
};

export type BidInput = {
  nft: string;
  bidder: string;
  amount: number;
  time: string;
};
