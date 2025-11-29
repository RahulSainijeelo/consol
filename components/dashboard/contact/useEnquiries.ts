import { useEffect, useState } from "react";
import { toast } from "@/hooks/use-toast";

export function useEnquiries() {
  const [enquiries, setEnquiries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Add force param to bypass cache
  const fetchEnquiries = async (force = false) => {
    setLoading(true);
    const CACHE_DURATION = 120 * 1000;
    const cached = sessionStorage.getItem("enquiries");
    const cachedAt = sessionStorage.getItem("enquiriesAt");
    const now = Date.now();
    if (!force && cached && cachedAt && now - Number(cachedAt) < CACHE_DURATION) {
      setEnquiries(JSON.parse(cached));
      setLoading(false);
      return;
    }
    try {
      const res = await fetch("/api/contact", { next: { revalidate: 120 } });
      const data = await res.json();
      setEnquiries(data);
      sessionStorage.setItem("enquiries", JSON.stringify(data));
      sessionStorage.setItem("enquiriesAt", now.toString());
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to fetch enquiries.",
        variant: "destructive",
      });
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchEnquiries();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateStatus = async (id: string, newStatus: string) => {
    // Optionally, remove this optimistic update:
    // setEnquiries((prev) =>
    //   prev.map((enquiry) =>
    //     enquiry.id === id ? { ...enquiry, status: newStatus } : enquiry
    //   )
    // );
    try {
      const res = await fetch("/api/contact", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus }),
      });
      if (!res.ok) throw new Error("Failed to update status");
      toast({
        title: "Status updated",
        description: `Enquiry status changed to ${newStatus}`,
      });
      // Refetch and recache after successful update, bypassing cache
      await fetchEnquiries(true);
    } catch {
      toast({
        title: "Update failed",
        description: "Could not update status in the database.",
        variant: "destructive",
      });
    }
  };

  return { enquiries, setEnquiries, loading, updateStatus };
}