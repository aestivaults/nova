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
