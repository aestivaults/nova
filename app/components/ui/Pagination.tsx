"use client";
import { useSetParams } from "@/app/hooks/useSetParams";
import { useRouter } from "next/navigation";
import React from "react";

const Pagination = ({
  pagination,
}: {
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}) => {
  const { page, totalPages } = pagination;
  const { setParams } = useSetParams();
  const router = useRouter();

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setParams({ page: newPage });
      router.refresh();
    }
  };

  // Generate array of page numbers to display
  const getPageNumbers = () => {
    const pages = [];
    const maxPagesToShow = 5;
    let startPage = Math.max(1, page - Math.floor(maxPagesToShow / 2));
    const endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

    if (endPage - startPage + 1 < maxPagesToShow) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <div className="flex items-center justify-center gap-2 p-4">
      {/* Previous Button */}
      <button
        className={`btn btn-icon ${
          page === 1 ? "opacity-50 cursor-not-allowed" : ""
        }`}
        onClick={() => handlePageChange(page - 1)}
        disabled={page === 1}
        aria-label="Previous page"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </button>

      {/* Page Numbers */}
      {getPageNumbers().map((pageNumber) => (
        <button
          key={pageNumber}
          className={`btn ${
            pageNumber === page ? "btn-primary" : "btn-secondary"
          }`}
          onClick={() => handlePageChange(pageNumber)}
          aria-current={pageNumber === page ? "page" : undefined}
        >
          {pageNumber}
        </button>
      ))}

      {/* Next Button */}
      <button
        className={`btn btn-icon ${
          page === totalPages ? "opacity-50 cursor-not-allowed" : ""
        }`}
        onClick={() => handlePageChange(page + 1)}
        disabled={page === totalPages}
        aria-label="Next page"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M9 18l6-6-6-6" />
        </svg>
      </button>
    </div>
  );
};

export default Pagination;
