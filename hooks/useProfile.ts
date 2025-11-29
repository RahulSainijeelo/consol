import { useEffect, useState } from "react";

export function useProfile() {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const CACHE_DURATION = 43_200_000; // 12 hours
    const now = Date.now();
    const cachedProfile = sessionStorage.getItem("profileData");
    const cachedProfileAt = sessionStorage.getItem("profileDataAt");

    if (
      cachedProfile &&
      cachedProfileAt &&
      now - Number(cachedProfileAt) < CACHE_DURATION
    ) {
      setProfile(JSON.parse(cachedProfile));
      setLoading(false);
      return;
    }

    fetch("/api/profile")
      .then((res) => res.json())
      .then((data) => {
        setProfile(data);
        sessionStorage.setItem("profileData", JSON.stringify(data));
        sessionStorage.setItem("profileDataAt", now.toString());
      })
      .finally(() => setLoading(false));
  }, []);

  return { profile, loading };
}