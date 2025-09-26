"use client";

import { useEffect, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";

// Heroicon: Exclamation Triangle (for a better UI icon)
const ErrorIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-16 h-16 text-red-500 mx-auto mb-4"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={1.5}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 9v3m0 4h.01M10.29 3.86L1.82 18a1.5 1.5 0 001.29 2.25h18.78a1.5 1.5 0 001.29-2.25L13.71 3.86a1.5 1.5 0 00-2.42 0z"
    />
  </svg>
);

const ErrorPage: React.FC = () => {
  const searchParams = useSearchParams();

  const message =
    searchParams.get("message") || "An unexpected error occurred.";
  const redirectUrl = searchParams.get("redirect") || "/";
  const timeout = parseInt(searchParams.get("timeout") || "5000", 10);

  const seconds = useMemo(() => Math.ceil(timeout / 1000), [timeout]);

  useEffect(() => {
    const timer = setTimeout(() => {
      window.location.href = redirectUrl;
    }, timeout);

    return () => clearTimeout(timer);
  }, [redirectUrl, timeout]);

  return (
    <motion.section
      className="min-h-screen flex items-center justify-center px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <motion.div
        className="glass-card p-8 max-w-md w-full text-center border border-red-200"
        initial={{ scale: 0.9, y: 30 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <ErrorIcon />

        <h1 className="text-2xl font-semibold text-red-600 mb-2">
          Something went wrong
        </h1>
        <p className="text-gray-700 mb-4">{decodeURIComponent(message)}</p>

        <p className="text-sm text-gray-500">
          Redirecting in <span className="font-semibold">{seconds}</span> second
          {seconds !== 1 ? "s" : ""}...
        </p>

        <motion.button
          className="btn btn-primary mt-6 px-5 py-2 rounded bg-red-500 hover:bg-red-600 text-white transition"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => (window.location.href = redirectUrl)}
        >
          Try Again
        </motion.button>
      </motion.div>
    </motion.section>
  );
};

export default ErrorPage;
