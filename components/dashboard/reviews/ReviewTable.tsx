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
          backgroundColor: "#10b981",
          color: "#ffffff",
        };
      case "pending":
        return {
          backgroundColor: "#f59e0b",
          color: "#ffffff",
        };
      case "rejected":
        return {
          backgroundColor: "#ef4444",
          color: "#ffffff",
        };
      default:
        return {
          backgroundColor: "#6b7280",
          color: "#ffffff",
        };
    }
  };

  if (loading) {
    return (
      <div
        className="rounded-lg border overflow-hidden"
        style={{
          backgroundColor: "#ffffff",
          borderColor: "#e5e7eb",
        }}
      >
        <Table>
          <TableHeader>
            <TableRow style={{ backgroundColor: "#f8fafc" }}>
              <TableHead style={{ color: "#374151", fontWeight: "600" }}>
                View
              </TableHead>
              <TableHead style={{ color: "#374151", fontWeight: "600" }}>
                Customer Name
              </TableHead>
              <TableHead style={{ color: "#374151", fontWeight: "600" }}>
                Rating
              </TableHead>
              <TableHead style={{ color: "#374151", fontWeight: "600" }}>
                Date
              </TableHead>
              <TableHead style={{ color: "#374151", fontWeight: "600" }}>
                Status
              </TableHead>
              <TableHead
                className="text-right"
                style={{ color: "#374151", fontWeight: "600" }}
              >
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: 5 }).map((_, i) => (
              <TableRow key={i} style={{ borderColor: "#f3f4f6" }}>
                <TableCell>
                  <Skeleton className="h-8 w-8 rounded" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-24" />
                </TableCell>
                <TableCell>
                  <div className="flex gap-1">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <Skeleton key={j} className="h-4 w-4 rounded" />
                    ))}
                  </div>
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-20" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-6 w-16 rounded-full" />
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Skeleton className="h-8 w-8 rounded" />
                    <Skeleton className="h-8 w-8 rounded" />
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
          backgroundColor: "#ffffff",
          borderColor: "#e5e7eb",
        }}
      >
        <div className="text-6xl mb-4 opacity-50">⭐</div>
        <h3 className="text-xl font-semibold mb-2" style={{ color: "#000000" }}>
          No Reviews Yet
        </h3>
        <p style={{ color: "#6b7280" }}>
          Customer reviews will appear here once they're submitted.
        </p>
      </div>
    );
  }

  return (
    <div
      className="rounded-lg border overflow-hidden"
      style={{
        backgroundColor: "#ffffff",
        borderColor: "#e5e7eb",
      }}
    >
      <Table>
        <TableHeader>
          <TableRow
            style={{
              backgroundColor: "#f8fafc",
              borderColor: "#e5e7eb",
            }}
          >
            <TableHead className="font-semibold" style={{ color: "#374151" }}>
              View
            </TableHead>
            <TableHead className="font-semibold" style={{ color: "#374151" }}>
              Customer Name
            </TableHead>
            <TableHead className="font-semibold" style={{ color: "#374151" }}>
              Rating
            </TableHead>
            <TableHead className="font-semibold" style={{ color: "#374151" }}>
              Date
            </TableHead>
            <TableHead className="font-semibold" style={{ color: "#374151" }}>
              Status
            </TableHead>
            <TableHead
              className="text-right font-semibold"
              style={{ color: "#374151" }}
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
                className="hover:bg-gray-50 transition-colors"
                style={{
                  borderColor: "#f3f4f6",
                  backgroundColor: index % 2 === 0 ? "#ffffff" : "#fafafa",
                }}
              >
                <TableCell>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onView(review)}
                    aria-label="View details"
                    className="hover:bg-blue-50"
                    style={{
                      color: "#3b82f6",
                      borderRadius: "6px",
                    }}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                </TableCell>
                <TableCell
                  className="font-medium"
                  style={{
                    color: "#000000",
                    fontSize: "14px",
                  }}
                >
                  {review.name}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4"
                        style={{
                          color: i < review.rating ? "#fbbf24" : "#d1d5db",
                          fill: i < review.rating ? "#fbbf24" : "transparent",
                        }}
                      />
                    ))}
                    <span
                      className="ml-2 text-sm font-medium"
                      style={{ color: "#374151" }}
                    >
                      {review.rating}/5
                    </span>
                  </div>
                </TableCell>
                <TableCell
                  style={{
                    color: "#6b7280",
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
                          className="hover:bg-green-50 border-green-200"
                          onClick={() => onApprove(review.id)}
                          style={{
                            color: "#16a34a",
                            borderColor: "#bbf7d0",
                            backgroundColor: "#ffffff",
                          }}
                        >
                          <Check className="h-4 w-4 mr-1" />
                          Approve
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="hover:bg-red-50 border-red-200"
                          onClick={() => onReject(review.id)}
                          style={{
                            color: "#dc2626",
                            borderColor: "#fecaca",
                            backgroundColor: "#ffffff",
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
                          backgroundColor: "#f3f4f6",
                          color: "#6b7280",
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
                      className="hover:bg-red-50"
                      onClick={() => onDelete(review)}
                      style={{
                        color: "#dc2626",
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
