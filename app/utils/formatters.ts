export function getRandomItems<T>(arr: T[], n: number) {
  if (n > arr.length) return arr;

  // {
  // throw new Error("Requested number exceeds array length");
  // }

  const result: T[] = [];
  const usedIndices = new Set();

  while (result.length < n) {
    const randomIndex = Math.floor(Math.random() * arr.length);
    if (!usedIndices.has(randomIndex)) {
      usedIndices.add(randomIndex);
      result.push(arr[randomIndex]);
    }
  }

  return result;
}

// Format ETH price with proper symbol
export function formatEthPrice(price: number) {
  const maximumFractionDigits = 2;
  const minimumFractionDigits = 2;

  if (price === undefined || price === null) return "";

  const formattedPrice = parseFloat(String(price)).toLocaleString(undefined, {
    maximumFractionDigits,
    minimumFractionDigits,
  });

  return `${formattedPrice} ETH`;
}

// Format currency (USD)
export function formatCurrency(amount: number, currency = "USD") {
  const maximumFractionDigits = 2;
  const minimumFractionDigits = 2;

  if (amount === undefined || amount === null) return "";

  return new Intl.NumberFormat(undefined, {
    style: "currency",
    currency,
    maximumFractionDigits,
    minimumFractionDigits,
  }).format(amount);
}

// Format date relative to now (e.g., "2 hours ago")
export function formatRelativeTime(dateString: string) {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (isNaN(diffInSeconds)) return "";

  if (diffInSeconds < 60) {
    return "just now";
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes} ${diffInMinutes === 1 ? "minute" : "minutes"} ago`;
  }

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours} ${diffInHours === 1 ? "hour" : "hours"} ago`;
  }

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 30) {
    return `${diffInDays} ${diffInDays === 1 ? "day" : "days"} ago`;
  }

  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths < 12) {
    return `${diffInMonths} ${diffInMonths === 1 ? "month" : "months"} ago`;
  }

  const diffInYears = Math.floor(diffInMonths / 12);
  return `${diffInYears} ${diffInYears === 1 ? "year" : "years"} ago`;
}

// Format date in preferred format
export function formatDate(dateString: string, format = "medium") {
  if (!dateString) return "";

  const date = new Date(dateString);
  if (isNaN(date.getTime())) return "";

  switch (format) {
    case "short":
      return date.toLocaleDateString();
    case "medium":
      return date.toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    case "long":
      return date.toLocaleDateString(undefined, {
        year: "numeric",
        month: "long",
        day: "numeric",
        weekday: "long",
      });
    case "time":
      return date.toLocaleTimeString(undefined, {
        hour: "2-digit",
        minute: "2-digit",
      });
    case "datetime":
      return `${date.toLocaleDateString()} ${date.toLocaleTimeString(
        undefined,
        {
          hour: "2-digit",
          minute: "2-digit",
        }
      )}`;
    default:
      return date.toLocaleString();
  }
}

// Format large numbers with abbreviations (K, M, B)
export function formatNumber(number: number) {
  const maximumFractionDigits = 1;
  const minimumFractionDigits = 0;

  if (number === undefined || number === null) return "";

  if (number < 1000) {
    return number.toLocaleString(undefined, {
      maximumFractionDigits,
      minimumFractionDigits,
    });
  }

  const tiers = [
    { threshold: 1e12, suffix: "T" },
    { threshold: 1e9, suffix: "B" },
    { threshold: 1e6, suffix: "M" },
    { threshold: 1e3, suffix: "K" },
  ];

  for (const { threshold, suffix } of tiers) {
    if (number >= threshold) {
      return (
        (number / threshold).toLocaleString(undefined, {
          maximumFractionDigits,
          minimumFractionDigits,
        }) + suffix
      );
    }
  }

  return number.toString();
}

// Truncate wallet address with ellipsis
export function truncateAddress(address: string, startChars = 6, endChars = 4) {
  if (!address) return "";
  if (address.length <= startChars + endChars) return address;

  return `${address.substring(0, startChars)}...${address.substring(
    address.length - endChars
  )}`;
}

// Truncate long text with ellipsis
export function truncateText(text: string, maxLength = 100) {
  if (!text) return "";
  if (text.length <= maxLength) return text;

  return text.substring(0, maxLength) + "...";
}

// Format time remaining (for auctions)
export function formatTimeRemaining(endDateString: string) {
  if (!endDateString) return "";

  const endDate = new Date(endDateString);
  const now = new Date();

  if (isNaN(endDate.getTime())) return "";

  if (endDate <= now) {
    return "Ended";
  }

  const totalSeconds = Math.floor((endDate.getTime() - now.getTime()) / 1000);

  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  if (days > 0) {
    return `${days}d ${hours}h ${minutes}m`;
  }

  if (hours > 0) {
    return `${hours}h ${minutes}m ${seconds}s`;
  }

  if (minutes > 0) {
    return `${minutes}m ${seconds}s`;
  }

  return `${seconds}s`;
}

export function getInitials(name: string) {
  if (!name) return "";

  const parts = name.trim().split(" ");
  if (parts.length === 1) {
    return parts[0].charAt(0).toUpperCase();
  }

  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
}

export function parseCommaSeparated(value: string): string[] {
  return value
    .split(",")
    .map((s) => s.trim())
    .filter((s) => s.length > 0);
}

export const getStatsColor = (value: number) => {
  if (value >= 100) return "text-green-400";
  if (value >= 10) return "text-blue-400";
  return "text-white/70";
};
