"use client";

import { useState } from "react";
import { useManageReviews, ExtendedReview } from "./useManageReviews";
import { ReviewTable } from "./ReviewTable";
import { ReviewDetailsDialog } from "./ReviewDetailsDialog";
import { DeleteReviewDialog } from "./DeleteReviewDialog";
import { Badge } from "@/components/ui/badge";
import { Star, Clock, CheckCircle, XCircle } from "lucide-react";

export function ManageReviews() {
  const {
    reviews,
    loading,
    handleApprove,
    handleReject,
    handleDelete,
    setReviews,
  } = useManageReviews();

  const [selectedReview, setSelectedReview] = useState<ExtendedReview | null>(
    null
  );
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  // Filter reviews by status
  const pendingCount = reviews.filter((r) => r.status === "pending").length;
  const approvedCount = reviews.filter((r) => r.status === "approved").length;
  const rejectedCount = reviews.filter((r) => r.status === "rejected").length;

  return (
    <div
      className="space-y-6"
      style={{
        backgroundColor: "#ffffff",
        color: "#000000",
        fontFamily: "var(--font-primary)",
      }}
    >
      {/* Header Section */}
      <div
        className="flex items-center justify-between p-6 rounded-lg border"
        style={{
          backgroundColor: "#f8fafc",
          borderColor: "#e2e8f0",
          borderWidth: "1px",
        }}
      >
        <div>
          <h2
            className="text-2xl font-semibold mb-1"
            style={{
              color: "#000000",
              fontFamily: "var(--font-heading)",
            }}
          >
            Review Management
          </h2>
          <p className="text-base" style={{ color: "#64748b" }}>
            Moderate and manage customer feedback
          </p>
        </div>

        {/* Status Badges */}
        <div className="flex items-center gap-3">
          <div
            className="flex items-center gap-2 px-4 py-2 rounded-lg"
            style={{ backgroundColor: "#fef3c7" }}
          >
            <Clock className="h-4 w-4" style={{ color: "#d97706" }} />
            <div className="text-center">
              <div
                className="text-lg font-semibold"
                style={{ color: "#d97706" }}
              >
                {pendingCount}
              </div>
              <div className="text-xs" style={{ color: "#64748b" }}>
                Pending
              </div>
            </div>
          </div>

          <div
            className="flex items-center gap-2 px-4 py-2 rounded-lg"
            style={{ backgroundColor: "#dcfce7" }}
          >
            <CheckCircle className="h-4 w-4" style={{ color: "#16a34a" }} />
            <div className="text-center">
              <div
                className="text-lg font-semibold"
                style={{ color: "#16a34a" }}
              >
                {approvedCount}
              </div>
              <div className="text-xs" style={{ color: "#64748b" }}>
                Approved
              </div>
            </div>
          </div>

          <div
            className="flex items-center gap-2 px-4 py-2 rounded-lg"
            style={{ backgroundColor: "#fee2e2" }}
          >
            <XCircle className="h-4 w-4" style={{ color: "#dc2626" }} />
            <div className="text-center">
              <div
                className="text-lg font-semibold"
                style={{ color: "#dc2626" }}
              >
                {rejectedCount}
              </div>
              <div className="text-xs" style={{ color: "#64748b" }}>
                Rejected
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div
        className="rounded-lg border"
        style={{
          backgroundColor: "#ffffff",
          borderColor: "#e5e7eb",
          borderWidth: "1px",
        }}
      >
        <div className="p-6 border-b" style={{ borderColor: "#f3f4f6" }}>
          <div className="flex items-center justify-between">
            <div>
              <h3
                className="text-lg font-medium mb-2"
                style={{
                  color: "#000000",
                  fontFamily: "var(--font-heading)",
                }}
              >
                Customer Reviews
              </h3>

              {/* Action Legend */}
              <div className="flex items-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: "#dcfce7" }}
                  >
                    <CheckCircle
                      className="h-4 w-4"
                      style={{ color: "#16a34a" }}
                    />
                  </div>
                  <span style={{ color: "#64748b" }}>Approve</span>
                </div>
                <div className="flex items-center gap-2">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: "#fee2e2" }}
                  >
                    <XCircle className="h-4 w-4" style={{ color: "#dc2626" }} />
                  </div>
                  <span style={{ color: "#64748b" }}>Reject</span>
                </div>
                <div className="flex items-center gap-2">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: "#fef3c7" }}
                  >
                    <Star className="h-4 w-4" style={{ color: "#d97706" }} />
                  </div>
                  <span style={{ color: "#64748b" }}>View Details</span>
                </div>
              </div>
            </div>

            {/* Summary Stats */}
            <div
              className="text-right p-4 rounded-lg"
              style={{ backgroundColor: "#f1f5f9" }}
            >
              <div className="text-2xl font-bold" style={{ color: "#000000" }}>
                {reviews.length}
              </div>
              <div className="text-sm" style={{ color: "#64748b" }}>
                Total Reviews
              </div>
            </div>
          </div>
        </div>

        <div className="p-6">
          <ReviewTable
            reviews={reviews}
            loading={loading}
            onView={(review) => {
              setSelectedReview(review);
              setIsViewOpen(true);
            }}
            onApprove={handleApprove}
            onReject={handleReject}
            onDelete={(review) => {
              setSelectedReview(review);
              setIsDeleteOpen(true);
            }}
          />
        </div>
      </div>

      {/* Review Details Dialog */}
      <ReviewDetailsDialog
        review={selectedReview}
        open={isViewOpen}
        onOpenChange={setIsViewOpen}
        onApprove={handleApprove}
        onReject={handleReject}
      />

      {/* Delete Confirmation Dialog */}
      <DeleteReviewDialog
        review={selectedReview}
        open={isDeleteOpen}
        onOpenChange={setIsDeleteOpen}
        onDelete={() => {
          if (selectedReview) {
            handleDelete(selectedReview.id);
            setIsDeleteOpen(false);
            setSelectedReview(null);
          }
        }}
      />
    </div>
  );
}
