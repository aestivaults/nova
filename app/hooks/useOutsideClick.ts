"use client";
import { useRef, useEffect, RefObject } from "react";

export function UseOutsideClick(close: () => void): {
  handleBackdropClick: (e: React.MouseEvent<HTMLDivElement>) => void;
  modalRef: RefObject<HTMLDivElement | null>;
} {
  const modalRef = useRef<HTMLDivElement | null>(null);

  // Close modal when clicking on backdrop
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      close();
    }
  };

  // Close modal on escape key
  useEffect(() => {
    const handleEscKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        close();
      }
    };

    document.addEventListener("keydown", handleEscKey);

    return () => {
      document.removeEventListener("keydown", handleEscKey);
    };
  }, [close]);

  return { handleBackdropClick, modalRef };
}
