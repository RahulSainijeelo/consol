import { useEffect, useState } from "react";

export function usePortfolioItems() {
  const [portfolioItems, setPortfolioItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const CACHE_DURATION = 3_600_000; // 1 hour in ms
    const now = Date.now();
    const cached = sessionStorage.getItem("portfolioItems");
    const cachedAt = sessionStorage.getItem("portfolioItemsAt");

    if (cached && cachedAt && now - Number(cachedAt) < CACHE_DURATION) {
      setPortfolioItems(JSON.parse(cached));
      setLoading(false);
      return;
    }

    fetch("/api/portfolio")
      .then((res) => res.json())
      .then((data) => {
        setPortfolioItems(data);
        sessionStorage.setItem("portfolioItems", JSON.stringify(data));
        sessionStorage.setItem("portfolioItemsAt", now.toString());
      })
      .finally(() => setLoading(false));
  }, []);

  // Get unique categories
  const categories = [
    "all",
    ...Array.from(
      new Set(
        portfolioItems
          .map((item) => item.category?.toLowerCase())
          .filter(Boolean)
      )
    ),
  ];

  return { portfolioItems, loading, categories };
}