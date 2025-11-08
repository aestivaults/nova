import { Bid } from "../types/bids";
import { api } from "../utils/api";

export async function getUsers() {
  try {
    const { data } = await api.get(`/admin/users?page=1&limit=${15}`);

    return data;
  } catch (erorr) {
    throw new Error(
      erorr instanceof Error ? erorr.message : "failed to fetch users"
    );
  }
}

export async function getTransactions() {
  try {
    const { data } = await api.get(`/admin/transactions?page=1&limit=${15}`);

    return data;
  } catch (erorr) {
    throw new Error(
      erorr instanceof Error ? erorr.message : "failed to fetch transactions"
    );
  }
}

export async function UpdateBidStatus(
  status: string = "accept",
  bid: Bid
): Promise<void> {
  try {
    await api.patch("/bids", {
      _id: bid._id,
      status,
      nft: bid.nft._id,
      bidder: bid.bidder._id,
    });
  } catch (error) {
    // Optional: enrich error
    const message =
      error instanceof Error ? error.message : "Failed to update bid";

    // Re-throw so TanStack Query catches it
    throw new Error(message);
  }
}

export async function getUserCollections() {
  try {
    let collections = [];
    const res = await api.get("/users/collections");
    if (Array.isArray(res.data.data)) collections = res.data.data;
    return collections;
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Something wernt wrong"
    );
  }
}
