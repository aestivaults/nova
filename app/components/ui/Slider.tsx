"use client";

import { ReactNode, useEffect, useMemo, useRef, useState } from "react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export type SliderProps<T> = {
  items: T[];
  renderItem: (item: T, index: number) => ReactNode;
  children?: ReactNode;
  title?: string;
  subtitle?: string;
  slidesToShow?: number;
  autoplay?: boolean;
  autoplaySpeed?: number;
  showArrows?: boolean;
  infiniteLoop?: boolean;
  className?: string;
  showDots?: boolean;
};

export default function Slider<T>({
  items,
  renderItem,
  children,
  title,
  subtitle,
  slidesToShow = 1,
  autoplay = false,
  autoplaySpeed = 3000,
  showArrows = true,
  showDots = false,
  infiniteLoop = true,
  className = "",
}: SliderProps<T>) {
  const prevRef = useRef<HTMLDivElement | null>(null);
  const nextRef = useRef<HTMLDivElement | null>(null);

  const slides = useMemo(() => {
    if (children) return children;
    if (!items || !renderItem) return null;
    return items.map((item, index) => (
      <SwiperSlide key={index}>{renderItem(item, index)}</SwiperSlide>
    ));
  }, [items, renderItem, children]);

  const breakpoints = useMemo(
    () => ({
      0: {
        slidesPerView: 2,
      },
      640: {
        slidesPerView: 3,
      },
      1024: {
        slidesPerView: slidesToShow,
      },
    }),
    [slidesToShow]
  );

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <div className={`slider-wrapper ${className}`}>
      {(title || subtitle) && (
        <div className="mb-6 flex flex-col md:flex-row md:items-end md:justify-between">
          <div>
            {title && <h2 className="text-2xl font-bold mb-2">{title}</h2>}
            {subtitle && <p className="text-light/70">{subtitle}</p>}
          </div>
        </div>
      )}

      <div className="relative">
        {showArrows && (
          <>
            <div
              ref={prevRef}
              className="swiper-button-prev slider-arrow absolute z-10 left-0 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center bg-light/10 hover:bg-primary-600 text-light transition-colors cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </div>
            <div
              ref={nextRef}
              className="swiper-button-next slider-arrow absolute z-10 right-0 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center bg-light/10 hover:bg-primary-600 text-light transition-colors cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>
          </>
        )}

        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          loop={infiniteLoop}
          onBeforeInit={(swiper) => {
            const navigation = swiper.params.navigation;

            if (navigation && typeof navigation === "object") {
              navigation.prevEl = prevRef.current;
              navigation.nextEl = nextRef.current;
            }
          }}
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
          pagination={showDots ? { clickable: true } : false}
          autoplay={
            autoplay
              ? {
                  delay: autoplaySpeed,
                  disableOnInteraction: false,
                }
              : false
          }
          breakpoints={breakpoints}
          spaceBetween={16}
          className="slider-container"
        >
          {slides}
        </Swiper>
      </div>
    </div>
  );
}
