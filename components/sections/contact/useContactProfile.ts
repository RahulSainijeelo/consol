import { useEffect, useState } from "react";

export function useContactProfile() {
  const [profile, setProfile] = useState<any>(null);
  const [profileLoading, setProfileLoading] = useState(true);

  useEffect(() => {
    const CACHE_DURATION = 43_200_000; // 12 hours in ms
    const now = Date.now();
    const cachedProfile = sessionStorage.getItem("profileData");
    const cachedProfileAt = sessionStorage.getItem("profileDataAt");

    if (
      cachedProfile &&
      cachedProfileAt &&
      now - Number(cachedProfileAt) < CACHE_DURATION
    ) {
      setProfile(JSON.parse(cachedProfile));
      setProfileLoading(false);
      return;
    }

    fetch("/api/profile")
      .then((res) => res.json())
      .then((data) => {
        setProfile(data);
        sessionStorage.setItem("profileData", JSON.stringify(data));
        sessionStorage.setItem("profileDataAt", now.toString());
      })
      .finally(() => setProfileLoading(false));
  }, []);

  return { profile, profileLoading };
}