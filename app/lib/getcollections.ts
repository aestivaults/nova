import { CollectionPayload } from "../types/collection";
import { createServerApi } from "../utils/api";
import { pagination } from "./getnfts";

export async function getCollections(page: string) {
  let collections: CollectionPayload[] = [];
  let error: string | null = null;
  let pagination: pagination | null = null;

  const limit = 20;
  try {
    const serverApi = createServerApi("", "");
    const res = await serverApi.get(`/collections?page=${page}&limit=${limit}`);

    if (Array.isArray(res.data.data)) {
      collections = res.data.data as CollectionPayload[];
      pagination = res.data.pagination;
    } else {
      error = "Invalid API response: collections is not an array.";
    }
  } catch (err) {
    console.error("Failed to fetch collections:", err);
    error = "Failed to load collections. Please try again later.";
  }

  return { collections, error, pagination };
}
