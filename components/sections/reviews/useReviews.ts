import { useEffect, useState } from "react";

export function useReviews() {
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      setLoading(true);
      const cached = sessionStorage.getItem("acceptedReviews");
      const cachedAt = sessionStorage.getItem("acceptedReviewsAt");
      const now = Date.now();
      if (cached && cachedAt && now - Number(cachedAt) < 120 * 1000) {
        setReviews(JSON.parse(cached));
        setLoading(false);
        return;
      }
      try {
        const res = await fetch("/api/reviews", { next: { revalidate: 120 } });
        const data = await res.json();
        const accepted = data.filter((r: any) => r.status === "approved");
        setReviews(accepted);
        sessionStorage.setItem("acceptedReviews", JSON.stringify(accepted));
        sessionStorage.setItem("acceptedReviewsAt", now.toString());
      } catch {
        setReviews([]);
      }
      setLoading(false);
    };
    fetchReviews();
  }, []);

  return { reviews, loading };
}