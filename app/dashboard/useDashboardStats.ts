import { useEffect, useState } from "react";

export function useDashboardStats() {
  const [stats, setStats] = useState({
    totalNewEnquiries: 0,
    pendingEnquiries: 0,
    totalPortfolio: 0,
    portfolioThisMonth: 0,
    totalReviews: 0,
    pendingReviews: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const CACHE_DURATION = 360_000; // 6 minutes
    const cached = sessionStorage.getItem("dashboardStats");
    const cachedAt = sessionStorage.getItem("dashboardStatsAt");
    const now = Date.now();

    if (cached && cachedAt && now - Number(cachedAt) < CACHE_DURATION) {
      setStats(JSON.parse(cached));
      setLoading(false);
      return;
    }

    const fetchStats = async () => {
      setLoading(true);

      // Fetch Enquiries
      const enquiriesRes = await fetch("/api/contact", {
        next: { revalidate: 360 },
      });
      const enquiries = await enquiriesRes.json();
      const pendingEnquiries = enquiries.filter(
        (e: any) => e.status === "new"
      ).length;
      const contactedEnquiries = enquiries.filter(
        (e: any) => e.status === "contacted"
      ).length;
      const totalNewEnquiries = pendingEnquiries + contactedEnquiries;

      // Fetch Portfolio
      const portfolioRes = await fetch("/api/portfolio", {
        next: { revalidate: 360 },
      });
      const portfolio = await portfolioRes.json();
      const totalPortfolio = portfolio.length;
      const nowDate = new Date();
      const portfolioThisMonth = portfolio.filter((item: any) => {
        if (!item.time) return false;
        const created = new Date(item.time);
        return (
          created.getMonth() === nowDate.getMonth() &&
          created.getFullYear() === nowDate.getFullYear()
        );
      }).length;

      // Fetch Reviews
      const reviewsRes = await fetch("/api/reviews", {
        next: { revalidate: 360 },
      });
      const reviews = await reviewsRes.json();
      const pendingReviews = reviews.filter(
        (r: any) => r.status === "pending"
      ).length;
      const approvedReviews = reviews.filter(
        (r: any) => r.status === "approved"
      ).length;
      const totalReviews = pendingReviews + approvedReviews;

      const newStats = {
        totalNewEnquiries,
        pendingEnquiries,
        totalPortfolio,
        portfolioThisMonth,
        totalReviews,
        pendingReviews,
      };
      setStats(newStats);
      sessionStorage.setItem("dashboardStats", JSON.stringify(newStats));
      sessionStorage.setItem("dashboardStatsAt", now.toString());
      setLoading(false);
    };

    fetchStats();
  }, []);

  return { stats, loading };
}