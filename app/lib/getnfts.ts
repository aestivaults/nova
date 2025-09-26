"use server";
import { cookies } from "next/headers";
import { NftPayload } from "../types/nftTypes";
import { createServerApi } from "../utils/api";
import { AxiosError } from "axios";

const limit = 40;

export type pagination = {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};

export async function getNfts(page: string) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  const refreshToken = cookieStore.get("refreshToken")?.value;
  const serverApi = createServerApi(token, refreshToken);
  let data: NftPayload[] | null = null;
  let error = null;
  let pagination: pagination | null = null;

  try {
    const res = await serverApi.get<{
      pagination: pagination;
      data: NftPayload[];
    }>(`/nfts?page=${page}&limit=${limit}`);

    data = res.data.data;
    pagination = res.data.pagination;
  } catch (err) {
    error =
      err instanceof AxiosError
        ? err.response?.data.message
        : "Failed to load NFTs";
  }

  return { data, error, pagination };
}

export async function getNft(id: string) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  const refreshToken = cookieStore.get("refreshToken")?.value;
  const serverApi = createServerApi(token, refreshToken);

  let data: NftPayload | null = null;
  let error = null;

  try {
    const res = await serverApi.get(`/nfts/${id}`);
    data = res.data.data;
  } catch (err) {
    error =
      err instanceof AxiosError
        ? err.response?.data.message
        : "Failed to load NFTs";
  }

  return { data, error };
}
