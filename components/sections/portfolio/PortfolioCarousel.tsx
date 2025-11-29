import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface PortfolioCarouselProps {
  items: any[];
  loading: boolean;
  onCardClick: (item: any) => void;
}

export function PortfolioCarousel({
  items,
  loading,
  onCardClick,
}: PortfolioCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollIndex, setScrollIndex] = useState(0);
  const [totalDots, setTotalDots] = useState(1);
  const [showArrows, setShowArrows] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  // Card width for scroll calculations (should match min-w-[280px] + gap)
  const cardWidth = 304; // 280px card + 24px gap

  // Check if we should center items (for small quantities)
  const shouldCenterItems = !loading && items.length <= 3;

  useEffect(() => {
    const updateScrollState = () => {
      if (!scrollRef.current || shouldCenterItems) return;

      const container = scrollRef.current;
      const hasOverflow = container.scrollWidth > container.clientWidth;

      setShowArrows(hasOverflow);

      if (hasOverflow) {
        const scrollLeft = container.scrollLeft;
        const maxScroll = container.scrollWidth - container.clientWidth;

        setCanScrollLeft(scrollLeft > 0);
        setCanScrollRight(scrollLeft < maxScroll - 1);

        if (window.innerWidth < 768) {
          const visibleCards =
            Math.floor(container.clientWidth / cardWidth) || 1;
          setTotalDots(Math.max(1, items.length - visibleCards + 1));
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
  }, [items.length, shouldCenterItems]);

  const handleScroll = () => {
    if (!scrollRef.current || shouldCenterItems) return;

    const container = scrollRef.current;
    const scrollLeft = container.scrollLeft;
    const maxScroll = container.scrollWidth - container.clientWidth;

    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft < maxScroll - 1);

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

  // Render skeleton cards
  const renderSkeletonCards = () =>
    Array.from({ length: 6 }).map((_, i) => (
      <div
        key={i}
        className="rounded-lg overflow-hidden min-w-[280px] max-w-xs w-full flex-shrink-0"
        style={{
          backgroundColor: "var(--color-surface)",
          borderRadius: "var(--radius-lg)",
        }}
      >
        <Skeleton className="aspect-square w-full mb-2" />
        <div className="p-4">
          <Skeleton className="h-6 w-2/3 mb-1" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      </div>
    ));

  // Render portfolio cards
  const renderPortfolioCards = () =>
    items.map((item) => (
      <div
        key={item.id}
        className="relative group cursor-pointer overflow-hidden rounded-lg shadow-md min-w-[280px] max-w-xs w-full flex-shrink-0 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
        style={{
          backgroundColor: "var(--color-surface)",
          borderRadius: "var(--radius-lg)",
          boxShadow: "var(--shadow-md)",
        }}
        onClick={() => onCardClick(item)}
        tabIndex={0}
        aria-label={`View details for ${item.title}`}
      >
        <div className="aspect-square relative overflow-hidden">
          <Image
            src={item.images?.[0] || "/placeholder-image.jpg"}
            alt={item.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
        <div className="p-4">
          <h3
            className="text-lg font-semibold mb-1 truncate"
            style={{
              color: "var(--color-text-primary)",
              fontFamily: "var(--font-heading)",
            }}
          >
            {item.title}
          </h3>
          <p
            className="text-sm capitalize"
            style={{ color: "var(--color-text-secondary)" }}
          >
            {item.category}
          </p>
        </div>
      </div>
    ));

  return (
    <div className="relative">
      {/* Arrow left - only show when needed */}
      {showArrows && canScrollLeft && !shouldCenterItems && (
        <button
          type="button"
          aria-label="Scroll left"
          className="absolute left-2 top-1/2 -translate-y-1/2 z-10 rounded-full shadow-lg p-2 hidden md:flex items-center justify-center transition-opacity hover:opacity-80"
          style={{
            backgroundColor: "var(--color-surface)",
            color: "var(--color-text-primary)",
            border: "1px solid var(--color-accent)",
          }}
          onClick={() => handleArrow("left")}
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
      )}

      {/* Arrow right - only show when needed */}
      {showArrows && canScrollRight && !shouldCenterItems && (
        <button
          type="button"
          aria-label="Scroll right"
          className="absolute right-2 top-1/2 -translate-y-1/2 z-10 rounded-full shadow-lg p-2 hidden md:flex items-center justify-center transition-opacity hover:opacity-80"
          style={{
            backgroundColor: "var(--color-surface)",
            color: "var(--color-text-primary)",
            border: "1px solid var(--color-accent)",
          }}
          onClick={() => handleArrow("right")}
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      )}

      {/* Container - centered layout for few items, scrollable for many */}
      <div className={cn(shouldCenterItems ? "flex justify-center" : "w-full")}>
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className={cn(
            "gap-6 flex pb-2",
            shouldCenterItems
              ? "flex-wrap justify-center max-w-4xl" // Centered grid for few items
              : "overflow-x-auto scroll-smooth no-scrollbar" // Scrollable for many items
          )}
          style={{
            WebkitOverflowScrolling: "touch",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {loading ? renderSkeletonCards() : renderPortfolioCards()}
        </div>
      </div>

      {/* Empty state message */}
      {!loading && items.length === 0 && (
        <div className="text-center py-16">
          <div
            className="text-6xl mb-4 opacity-50"
            style={{ color: "var(--color-text-secondary)" }}
          >
            📁
          </div>
          <h3
            className="text-xl font-semibold mb-2"
            style={{
              color: "var(--color-text-primary)",
              fontFamily: "var(--font-heading)",
            }}
          >
            No Projects Found
          </h3>
          <p style={{ color: "var(--color-text-secondary)" }}>
            We haven't added any projects to this category yet.
          </p>
        </div>
      )}

      {/* Dot pagination - only show if multiple dots and not centered */}
      {totalDots > 1 && !shouldCenterItems && (
        <div className="flex justify-center mt-6">
          {Array.from({ length: totalDots }).map((_, idx) => (
            <button
              key={idx}
              className={cn("h-3 w-3 rounded-full mx-1 transition-all")}
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
              aria-label={`Go to portfolio card ${idx + 1}`}
              onClick={() => scrollToCard(idx)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
