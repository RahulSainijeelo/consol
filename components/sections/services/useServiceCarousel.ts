import { useEffect, useRef, useState } from "react";
import { services } from "@/lib/data";

export function useServiceCarousel(cardWidth = 304) { // Updated to match ServiceCard width
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollIndex, setScrollIndex] = useState(0);
  const [totalDots, setTotalDots] = useState(1);
  const [showArrows, setShowArrows] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  useEffect(() => {
    const updateScrollState = () => {
      if (!scrollRef.current) return;
      
      const container = scrollRef.current;
      const hasOverflow = container.scrollWidth > container.clientWidth;
      
      // Update arrow visibility
      setShowArrows(hasOverflow);
      
      if (hasOverflow) {
        const scrollLeft = container.scrollLeft;
        const maxScroll = container.scrollWidth - container.clientWidth;
        
        // Update individual arrow states
        setCanScrollLeft(scrollLeft > 0);
        setCanScrollRight(scrollLeft < maxScroll - 1); // -1 for floating point precision
        
        // Calculate dots
        const isMobile = window.innerWidth < 768;
        let dots;
        if (isMobile) {
          const visibleCards = Math.floor(container.clientWidth / cardWidth) || 1;
          dots = Math.max(1, services.length - visibleCards + 1);
        } else {
          dots = Math.max(1, Math.ceil(maxScroll / cardWidth) + 1);
        }
        setTotalDots(dots);
      } else {
        // No overflow - disable arrows
        setCanScrollLeft(false);
        setCanScrollRight(false);
        setTotalDots(1);
      }
    };

    updateScrollState();
    window.addEventListener("resize", updateScrollState);
    return () => window.removeEventListener("resize", updateScrollState);
  }, [cardWidth]);

  const handleScroll = () => {
    if (!scrollRef.current) return;
    
    const container = scrollRef.current;
    const scrollLeft = container.scrollLeft;
    const maxScroll = container.scrollWidth - container.clientWidth;
    
    // Update arrow states on scroll
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

  return {
    scrollRef,
    scrollIndex,
    totalDots,
    showArrows,
    canScrollLeft,
    canScrollRight,
    handleScroll,
    scrollToCard,
    handleArrow,
  };
}
