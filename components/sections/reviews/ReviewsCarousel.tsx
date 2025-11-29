import { useRef, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { ReviewCard } from "./ReviewCard";

interface ReviewsCarouselProps {
  reviews: any[];
  loading: boolean;
}

export function ReviewsCarousel({ reviews, loading }: ReviewsCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollIndex, setScrollIndex] = useState(0);
  const [totalDots, setTotalDots] = useState(1);
  const [showArrows, setShowArrows] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const cardWidth = 340;

  useEffect(() => {
    const updateScrollState = () => {
      if (!scrollRef.current) return;

      const container = scrollRef.current;
      const hasOverflow = container.scrollWidth > container.clientWidth;

      setShowArrows(hasOverflow);

      if (hasOverflow) {
        const scrollLeft = container.scrollLeft;
        const maxScroll = container.scrollWidth - container.clientWidth;

        setCanScrollLeft(scrollLeft > 0);
        setCanScrollRight(scrollLeft < maxScroll - 1); // -1 for floating point precision

        if (window.innerWidth < 768) {
          const visibleCards =
            Math.floor(container.clientWidth / cardWidth) || 1;
          setTotalDots(Math.max(1, reviews.length - visibleCards + 1));
        } else {
          setTotalDots(Math.max(1, Math.ceil(maxScroll / cardWidth) + 1));
        }
      } else {
        setTotalDots(1);
        setCanScrollLeft(false);
        setCanScrollRight(false);
      }
    };

    updateScrollState();
    window.addEventListener("resize", updateScrollState);
    return () => window.removeEventListener("resize", updateScrollState);
  }, [reviews.length]);

  const handleScroll = () => {
    if (!scrollRef.current) return;

    const container = scrollRef.current;
    const scrollLeft = container.scrollLeft;
    const maxScroll = container.scrollWidth - container.clientWidth;

    // Update arrow states
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft < maxScroll - 1);

    // Update dot index
    let idx = Math.round(scrollLeft / cardWidth);
    if (window.innerWidth < 768) {
      idx = Math.min(idx, totalDots - 1);
    }
    setScrollIndex(idx);
  };

  const scrollToCard = (idx: number) => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollTo({
      left: idx * cardWidth,
      behavior: "smooth",
    });
  };

  const handleArrow = (dir: "left" | "right") => {
    if (!scrollRef.current) return;

    const container = scrollRef.current;
    const currentScroll = container.scrollLeft;
    const containerWidth = container.clientWidth;

    let newScrollPosition;
    if (dir === "left") {
      newScrollPosition = Math.max(0, currentScroll - containerWidth);
    } else {
      const maxScroll = container.scrollWidth - container.clientWidth;
      newScrollPosition = Math.min(maxScroll, currentScroll + containerWidth);
    }

    container.scrollTo({
      left: newScrollPosition,
      behavior: "smooth",
    });
  };

  return (
    <div className="relative">
      {/* Arrow left (desktop/tablet only) - Only show when can scroll left */}
      {showArrows && canScrollLeft && (
        <button
          type="button"
          aria-label="Scroll left"
          className="absolute left-2 top-1/2 -translate-y-1/2 z-10 rounded-full shadow-lg p-2 hidden md:flex items-center justify-center transition-opacity hover:opacity-80"
          style={{
            backgroundColor: "var(--color-surface)",
            color: "var(--color-text-primary)",
            border: "1px solid var(--color-accent)",
            transition: "var(--transition-normal)",
          }}
          onClick={() => handleArrow("left")}
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
      )}

      {/* Arrow right (desktop/tablet only) - Only show when can scroll right */}
      {showArrows && canScrollRight && (
        <button
          type="button"
          aria-label="Scroll right"
          className="absolute right-2 top-1/2 -translate-y-1/2 z-10 rounded-full shadow-lg p-2 hidden md:flex items-center justify-center transition-opacity hover:opacity-80"
          style={{
            backgroundColor: "var(--color-surface)",
            color: "var(--color-text-primary)",
            border: "1px solid var(--color-accent)",
            transition: "var(--transition-normal)",
          }}
          onClick={() => handleArrow("right")}
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      )}

      {/* Reviews container - centered */}
      <div className="flex justify-center">
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex gap-6 overflow-x-auto no-scrollbar pb-2 scroll-smooth max-w-full"
          style={{
            WebkitOverflowScrolling: "touch",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {loading
            ? Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={i}
                  className="min-w-[340px] max-w-xs w-full flex-shrink-0"
                  style={{
                    backgroundColor: "var(--color-surface)",
                    borderRadius: "var(--radius-lg)",
                    padding: "1.5rem",
                  }}
                >
                  <Skeleton className="h-6 w-32 mb-2" />
                  <Skeleton className="h-4 w-24 mb-2" />
                  <Skeleton className="h-20 w-full" />
                </div>
              ))
            : reviews.map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))}
        </div>
      </div>

      {/* Dot pagination - only show if there are multiple dots */}
      {totalDots > 1 && (
        <div className="flex justify-center mt-6">
          {Array.from({ length: totalDots }).map((_, idx) => (
            <button
              key={idx}
              className={`h-3 w-3 rounded-full mx-1 transition-all`}
              style={{
                backgroundColor:
                  scrollIndex === idx
                    ? "var(--color-accent)"
                    : "var(--color-surface-light)",
                transform: scrollIndex === idx ? "scale(1.25)" : "scale(1)",
                transition: "var(--transition-normal)",
                outline: "none",
                border: "none",
              }}
              aria-label={`Go to review card ${idx + 1}`}
              onClick={() => scrollToCard(idx)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
