"use server";

import { cookies } from "next/headers";
import { createServerApi } from "../utils/api";

export async function getUsers() {
  const cookieStore = await cookies();
  const accesstoken = cookieStore.get("token")?.value;
  const refreshToken = cookieStore.get("refreshToken")?.value;

  const serverapi = createServerApi(accesstoken, refreshToken);

  try {
    const { data } = await serverapi.get(`/admin/users?page=1&limit=${15}`);

    return data;
  } catch (erorr) {
    throw new Error(
      erorr instanceof Error ? erorr.message : "failed to fetch users"
    );
  }
}

export async function getTransactions() {
  const cookieStore = await cookies();
  const accesstoken = cookieStore.get("token")?.value;
  const refreshToken = cookieStore.get("refreshToken")?.value;

  const serverapi = createServerApi(accesstoken, refreshToken);

  try {
    const { data } = await serverapi.get(
      `/admin/transactions?page=1&limit=${15}`
    );

    return data;
  } catch (erorr) {
    throw new Error(
      erorr instanceof Error ? erorr.message : "failed to fetch transactions"
    );
  }
}

export async function getUserBids() {
  const cookieStore = await cookies();
  const accesstoken = cookieStore.get("token")?.value;
  const refreshToken = cookieStore.get("refreshToken")?.value;

  const serverapi = createServerApi(accesstoken, refreshToken);

  try {
    const { data } = await serverapi.get("/users/bids");
    if (data.data) return data.data;
  } catch (erorr) {
    throw new Error(
      erorr instanceof Error ? erorr.message : "failed to fetch transactions"
    );
  }
}

export async function getReceivedBid() {
  const cookieStore = await cookies();
  const accesstoken = cookieStore.get("token")?.value;
  const refreshToken = cookieStore.get("refreshToken")?.value;

  const serverapi = createServerApi(accesstoken, refreshToken);

  try {
    const { data } = await serverapi.get("/bids/received");
    if (data.data) return data.data;
  } catch (erorr) {
    throw new Error(
      erorr instanceof Error ? erorr.message : "failed to fetch transactions"
    );
  }
}
