import { useEffect, useState } from "react";
import { toast } from "@/hooks/use-toast";
export default function useProfileAndPortfolio() {
  const [profile, setProfile] = useState<any>(null);
  const [portfolio, setPortfolio] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const CACHE_DURATION = 43_200_000; // 12 hours in ms
    const now = Date.now();

    const cachedProfile = sessionStorage.getItem("profileData");
    const cachedProfileAt = sessionStorage.getItem("profileDataAt");
    const cachedPortfolio = sessionStorage.getItem("portfolioData");
    const cachedPortfolioAt = sessionStorage.getItem("portfolioDataAt");

    if (
      cachedProfile &&
      cachedProfileAt &&
      now - Number(cachedProfileAt) < CACHE_DURATION &&
      cachedPortfolio &&
      cachedPortfolioAt &&
      now - Number(cachedPortfolioAt) < CACHE_DURATION
    ) {
      setProfile(JSON.parse(cachedProfile));
      setPortfolio(JSON.parse(cachedPortfolio));
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        const [profileRes, portfolioRes] = await Promise.all([
          fetch("/api/profile"),
          fetch("/api/portfolio"),
        ]);
        const profileData = await profileRes.json();
        const portfolioData = await portfolioRes.json();
        setProfile(profileData);
        setPortfolio(portfolioData);
        sessionStorage.setItem("profileData", JSON.stringify(profileData));
        sessionStorage.setItem("profileDataAt", now.toString());
        sessionStorage.setItem("portfolioData", JSON.stringify(portfolioData));
        sessionStorage.setItem("portfolioDataAt", now.toString());
      } catch {
        toast({
          title: "Error",
          description: "Failed to load profile or portfolio.",
          variant: "destructive",
        });
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  return { profile, portfolio, loading };
}
