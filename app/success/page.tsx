"use client";

import { useEffect, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";

// ✅ Heroicon: Check Circle Icon
const SuccessIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-16 h-16 text-green-500 mx-auto mb-4"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={1.5}
  >
    <motion.path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    />
  </svg>
);

const SuccessPage: React.FC = () => {
  const searchParams = useSearchParams();

  const message = searchParams.get("message") || "Operation successful!";
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
        className="glass-card p-6 max-w-md w-full text-center border border-green-200"
        initial={{ scale: 0.9, y: 30 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <SuccessIcon />

        <h1 className="text-2xl font-semibold text-green-600 mb-2">Success</h1>
        <p className="text-gray-700 mb-4">{decodeURIComponent(message)}</p>

        <p className="text-sm text-gray-500">
          Redirecting in <span className="font-semibold">{seconds}</span> second
          {seconds !== 1 ? "s" : ""}...
        </p>

        <motion.button
          className="btn btn-primary mt-6 px-5 py-2 rounded bg-green-500 hover:bg-green-600 text-white transition"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => (window.location.href = redirectUrl)}
        >
          Go Back Now
        </motion.button>
      </motion.div>
    </motion.section>
  );
};

export default SuccessPage;
