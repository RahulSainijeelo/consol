import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Check, X, Star, Eye, Trash2 } from "lucide-react";
import { ExtendedReview } from "./useManageReviews";

interface ReviewTableProps {
  reviews: ExtendedReview[];
  loading: boolean;
  onView: (review: ExtendedReview) => void;
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
  onDelete: (review: ExtendedReview) => void;
}

export function ReviewTable({
  reviews,
  loading,
  onView,
  onApprove,
  onReject,
  onDelete,
}: ReviewTableProps) {
  const formatDate = (dateString: string) => {
    if (!dateString) return "—";
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "—";
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const getStatusColors = (status: string) => {
    switch (status) {
      case "approved":
        return {
          backgroundColor: "rgba(22, 163, 74, 0.2)",
          color: "#4ade80",
        };
      case "pending":
        return {
          backgroundColor: "rgba(217, 119, 6, 0.2)",
          color: "#fbbf24",
        };
      case "rejected":
        return {
          backgroundColor: "rgba(220, 38, 38, 0.2)",
          color: "#f87171",
        };
      default:
        return {
          backgroundColor: "rgba(107, 114, 128, 0.2)",
          color: "#9ca3af",
        };
    }
  };

  if (loading) {
    return (
      <div
        className="rounded-lg border overflow-hidden"
        style={{
          backgroundColor: "#000",
          borderColor: "#333",
        }}
      >
        <Table>
          <TableHeader>
            <TableRow style={{ backgroundColor: "#111", borderColor: "#333" }}>
              <TableHead style={{ color: "#9ca3af", fontWeight: "600" }}>
                View
              </TableHead>
              <TableHead style={{ color: "#9ca3af", fontWeight: "600" }}>
                Customer Name
              </TableHead>
              <TableHead style={{ color: "#9ca3af", fontWeight: "600" }}>
                Rating
              </TableHead>
              <TableHead style={{ color: "#9ca3af", fontWeight: "600" }}>
                Date
              </TableHead>
              <TableHead style={{ color: "#9ca3af", fontWeight: "600" }}>
                Status
              </TableHead>
              <TableHead
                className="text-right"
                style={{ color: "#9ca3af", fontWeight: "600" }}
              >
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: 5 }).map((_, i) => (
              <TableRow key={i} style={{ borderColor: "#333" }}>
                <TableCell>
                  <Skeleton className="h-8 w-8 rounded bg-gray-800" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-24 bg-gray-800" />
                </TableCell>
                <TableCell>
                  <div className="flex gap-1">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <Skeleton key={j} className="h-4 w-4 rounded bg-gray-800" />
                    ))}
                  </div>
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-20 bg-gray-800" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-6 w-16 rounded-full bg-gray-800" />
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Skeleton className="h-8 w-8 rounded bg-gray-800" />
                    <Skeleton className="h-8 w-8 rounded bg-gray-800" />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  }

  if (!reviews || reviews.length === 0) {
    return (
      <div
        className="rounded-lg border p-12 text-center"
        style={{
          backgroundColor: "#000",
          borderColor: "#333",
        }}
      >
        <div className="text-6xl mb-4 opacity-50">⭐</div>
        <h3 className="text-xl font-semibold mb-2" style={{ color: "#fff" }}>
          No Reviews Yet
        </h3>
        <p style={{ color: "#9ca3af" }}>
          Customer reviews will appear here once they're submitted.
        </p>
      </div>
    );
  }

  return (
    <div
      className="rounded-lg border overflow-hidden"
      style={{
        backgroundColor: "#000",
        borderColor: "#333",
      }}
    >
      <Table>
        <TableHeader>
          <TableRow
            style={{
              backgroundColor: "#111",
              borderColor: "#333",
            }}
          >
            <TableHead className="font-semibold" style={{ color: "#9ca3af" }}>
              View
            </TableHead>
            <TableHead className="font-semibold" style={{ color: "#9ca3af" }}>
              Customer Name
            </TableHead>
            <TableHead className="font-semibold" style={{ color: "#9ca3af" }}>
              Rating
            </TableHead>
            <TableHead className="font-semibold" style={{ color: "#9ca3af" }}>
              Date
            </TableHead>
            <TableHead className="font-semibold" style={{ color: "#9ca3af" }}>
              Status
            </TableHead>
            <TableHead
              className="text-right font-semibold"
              style={{ color: "#9ca3af" }}
            >
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {reviews.map((review, index) => {
            const statusColors = getStatusColors(review.status);

            return (
              <TableRow
                key={review.id}
                className="hover:bg-white/5 transition-colors"
                style={{
                  borderColor: "#333",
                  backgroundColor: index % 2 === 0 ? "#000" : "#0a0a0a",
                }}
              >
                <TableCell>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onView(review)}
                    aria-label="View details"
                    className="hover:bg-blue-500/10"
                    style={{
                      color: "#60a5fa",
                      borderRadius: "6px",
                    }}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                </TableCell>
                <TableCell
                  className="font-medium"
                  style={{
                    color: "#fff",
                    fontSize: "14px",
                  }}
                >
                  {review.userName}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4"
                        style={{
                          color: i < review.rating ? "#fbbf24" : "#4b5563",
                          fill: i < review.rating ? "#fbbf24" : "transparent",
                        }}
                      />
                    ))}
                    <span
                      className="ml-2 text-sm font-medium"
                      style={{ color: "#9ca3af" }}
                    >
                      {review.rating}/5
                    </span>
                  </div>
                </TableCell>
                <TableCell
                  style={{
                    color: "#9ca3af",
                    fontSize: "13px",
                  }}
                >
                  {formatDate(review.time)}
                </TableCell>
                <TableCell>
                  <Badge
                    className="font-medium text-xs px-3 py-1"
                    style={{
                      backgroundColor: statusColors.backgroundColor,
                      color: statusColors.color,
                      border: "none",
                      borderRadius: "20px",
                    }}
                  >
                    {review.status.charAt(0).toUpperCase() +
                      review.status.slice(1)}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end items-center gap-2">
                    {review.status === "pending" && (
                      <>
                        <Button
                          variant="outline"
                          size="sm"
                          className="hover:bg-green-500/10 border-green-500/30"
                          onClick={() => onApprove(review.id)}
                          style={{
                            color: "#4ade80",
                            borderColor: "rgba(74, 222, 128, 0.3)",
                            backgroundColor: "transparent",
                          }}
                        >
                          <Check className="h-4 w-4 mr-1" />
                          Approve
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="hover:bg-red-500/10 border-red-500/30"
                          onClick={() => onReject(review.id)}
                          style={{
                            color: "#f87171",
                            borderColor: "rgba(248, 113, 113, 0.3)",
                            backgroundColor: "transparent",
                          }}
                        >
                          <X className="h-4 w-4 mr-1" />
                          Reject
                        </Button>
                      </>
                    )}

                    {review.status !== "pending" && (
                      <div
                        className="text-xs px-2 py-1 rounded-md"
                        style={{
                          backgroundColor: "#1f2937",
                          color: "#9ca3af",
                        }}
                      >
                        {review.status === "approved"
                          ? "✓ Approved"
                          : "✗ Rejected"}
                      </div>
                    )}

                    <Button
                      variant="ghost"
                      size="sm"
                      className="hover:bg-red-500/10"
                      onClick={() => onDelete(review)}
                      style={{
                        color: "#f87171",
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
