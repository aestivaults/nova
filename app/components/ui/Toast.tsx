"use client";
import { toastProps } from "@/app/types/notification";
import { Check, InfoIcon, TriangleAlert, X, XCircle } from "lucide-react";
import { RefObject, useEffect, useRef, useState } from "react";

export function Toast({
  message,
  type = "info",
  title,
  duration = 5000,
  onClose,
  position = "top-right", //
  showProgress = true,
}: toastProps) {
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(100);
  const progressInterval: RefObject<ReturnType<typeof setTimeout> | null> =
    useRef(null);

  // Determine background color based on type
  const getBgColor = () => {
    switch (type) {
      case "success":
        return "bg-green-500";
      case "error":
        return "bg-red-500";
      case "warning":
        return "bg-yellow-500";
      case "info":
      default:
        return "bg-primary-500";
    }
  };

  // Determine icon based on type
  const getTypeIcon = () => {
    switch (type) {
      case "success":
        return <Check />;
      case "error":
        return <XCircle />;
      case "warning":
        return <TriangleAlert />;
      case "info":
      default:
        return <InfoIcon />;
    }
  };

  // Position classes
  const positionClasses = {
    "top-right": "top-4 right-4",
    "top-left": "top-4 left-4",
    "bottom-right": "bottom-4 right-4",
    "bottom-left": "bottom-4 left-4",
    "top-center": "top-4 left-1/2 transform -translate-x-1/2",
    "bottom-center": "bottom-4 left-1/2 transform -translate-x-1/2",
  };

  // Close toast
  const close = () => {
    setVisible(false);

    // Allow animation to complete before actually removing
    setTimeout(() => {
      if (onClose) {
        onClose();
      }
    }, 300);
  };

  // Set up progress bar and auto-close
  useEffect(() => {
    if (!duration || !showProgress) return;

    const intervalStep = 10; // Update every 10ms
    const decrementAmount = (intervalStep / duration) * 100;

    progressInterval.current = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev - decrementAmount;
        if (newProgress <= 0) {
          if (progressInterval.current !== null) {
            clearInterval(progressInterval.current);
          }
          close();
          return 0;
        }
        return newProgress;
      });
    }, intervalStep);

    // Clean up
    return () => {
      if (progressInterval.current) {
        clearInterval(progressInterval.current);
      }
    };
  }, [duration, showProgress]);

  if (!visible) return null;

  return (
    <div
      className={`
        fixed z-50 max-w-sm w-full
        ${positionClasses[position]} 
        transform transition-all duration-300 ease-out
        ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}
      `}
    >
      <div className="glass-card shadow-lg backdrop-blur-xl overflow-hidden">
        <div className="p-4">
          <div className="flex items-start">
            {/* Icon */}
            <div
              className={`flex-shrink-0 w-8 h-8 rounded-full ${getBgColor()} flex items-center justify-center mr-3`}
            >
              {getTypeIcon()}
            </div>

            {/* Content */}
            <div className="flex-1">
              {title && <h4 className="font-medium mb-1">{title}</h4>}
              <p className="text-sm text-white/80">{message}</p>
            </div>

            {/* Close button */}
            <button
              className="flex-shrink-0 ml-2 text-white/60 hover:text-white"
              onClick={close}
            >
              <X />
            </button>
          </div>
        </div>

        {/* Progress bar */}
        {showProgress && (
          <div
            className={`h-1 ${getBgColor()}`}
            style={{ width: `${progress}%`, transition: "width 10ms linear" }}
          />
        )}
      </div>
    </div>
  );
}
