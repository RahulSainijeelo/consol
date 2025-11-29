import { cn } from "@/lib/utils";

export function Skeleton({ className = "" }: { className?: string }) {
  return (
    <div
      className={`animate-pulse bg-gray-200 rounded ${className}`}
      style={{ minHeight: 16, backgroundColor: "var(--color-surface-light)" }}
    />
  );
}
