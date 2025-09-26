"use client";
import { useEffect, useState } from "react";

export default function CountdownTimer({
  endTime,
  size = "medium", // small, medium, large
  onEnd,
  showLabels = true,
  className = "",
}: {
  endTime: string;
  size?: "small" | "medium" | "large";
  onEnd?: () => void;
  showLabels?: boolean;
  className?: string;
}) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isExpired: false,
  });

  // Size classes
  const sizeClasses = {
    small: "text-xs space-x-1",
    medium: "text-sm space-x-2",
    large: "text-base space-x-3",
  };

  const digitClasses = {
    small: "text-sm font-medium",
    medium: "text-base font-bold",
    large: "text-xl font-bold",
  };

  const labelClasses = {
    small: "text-[8px]",
    medium: "text-[10px]",
    large: "text-xs",
  };

  // Update countdown timer
  useEffect(() => {
    const updateTimer = () => {
      const now = new Date();
      const end = new Date(endTime);
      const difference = Number(end) - Number(now);

      if (difference <= 0) {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          isExpired: true,
        });

        if (onEnd) {
          onEnd();
        }

        return;
      }

      // Calculate time units
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({
        days,
        hours,
        minutes,
        seconds,
        isExpired: false,
      });
    };

    // Initial update
    updateTimer();

    // Set up interval
    const intervalId = setInterval(updateTimer, 1000);

    // Clean up
    return () => clearInterval(intervalId);
  }, [endTime, onEnd]);

  // Format with leading zeros
  const formatNumber = (num: number) => {
    return num.toString().padStart(2, "0");
  };

  if (timeLeft.isExpired) {
    return (
      <div className={`text-red-500 font-medium ${className}`}>
        Auction Ended
      </div>
    );
  }

  return (
    <div className={`countdown ${sizeClasses[size]} flex ${className}`}>
      {timeLeft.days > 0 && (
        <div className="countdown-item">
          <span className={`countdown-value ${digitClasses[size]}`}>
            {formatNumber(timeLeft.days)}
          </span>
          {showLabels && (
            <span className={`countdown-label ${labelClasses[size]} uppercase`}>
              Days
            </span>
          )}
        </div>
      )}

      <div className="countdown-item">
        <span className={`countdown-value ${digitClasses[size]}`}>
          {formatNumber(timeLeft.hours)}
        </span>
        {showLabels && (
          <span className={`countdown-label ${labelClasses[size]} uppercase`}>
            Hrs
          </span>
        )}
      </div>

      <div className="countdown-item">
        <span className={`countdown-value ${digitClasses[size]}`}>
          {formatNumber(timeLeft.minutes)}
        </span>
        {showLabels && (
          <span className={`countdown-label ${labelClasses[size]} uppercase`}>
            Min
          </span>
        )}
      </div>

      <div className="countdown-item">
        <span className={`countdown-value ${digitClasses[size]}`}>
          {formatNumber(timeLeft.seconds)}
        </span>
        {showLabels && (
          <span className={`countdown-label ${labelClasses[size]} uppercase`}>
            Sec
          </span>
        )}
      </div>
    </div>
  );
}
