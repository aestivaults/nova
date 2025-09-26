"use client";
import { useSearchParams, useRouter } from "next/navigation";

// Define the type for the updates passed to setParams
type ParamValue = string | number | boolean | null | undefined;
type ParamUpdates = Record<string, ParamValue>;

interface NavigateOptions {
  state?: {
    from?: string;
  };
}

function useSetParams() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const setParams = (updates: ParamUpdates = {}) => {
    const params = new URLSearchParams(searchParams.toString());

    for (const key in updates) {
      const value = updates[key];
      if (value === null || value === undefined) {
        params.delete(key);
      } else {
        params.set(key, String(value));
      }
    }

    router.push(`?${params.toString()}`);
  };

  const navigate = (path: string, options?: NavigateOptions) => {
    const url = new URL(path, window.location.origin);
    if (options?.state?.from) {
      url.searchParams.set("from", options.state.from);
    }
    router.push(url.pathname + url.search);
  };

  return { setParams, navigate, searchParams };
}

export { useSetParams };
