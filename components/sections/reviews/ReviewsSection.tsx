"use client";

import { useState } from "react";
import { useReviews } from "./useReviews";
import { ReviewsCarousel } from "./ReviewsCarousel";
import { ReviewFormDialog } from "./ReviewFormDialog";
import { ReviewConfirmationDialog } from "./ReviewConfirmationDialog";
import { Button } from "@/components/ui/button";

interface ReviewsSectionProps {
  profile: any;
  loading: boolean;
}

export function ReviewsSection({ profile, loading }: ReviewsSectionProps) {
  const { reviews } = useReviews();
  const [isReviewDialogOpen, setIsReviewDialogOpen] = useState(false);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);

  return (
    <section
      id="reviews"
      className="py-20"
      style={{
        backgroundColor: "var(--color-background-secondary)",
        fontFamily: "var(--font-primary)",
      }}
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2
            className="text-3xl md:text-4xl font-bold mb-3"
            style={{
              color: "var(--color-text-primary)",
              fontFamily: "var(--font-heading)",
            }}
          >
            Customer Reviews
          </h2>
          <p
            className="text-lg max-w-2xl mx-auto"
            style={{ color: "var(--color-text-secondary)" }}
          >
            Read what our clients have to say about our work and services.
          </p>
        </div>
        <ReviewsCarousel reviews={reviews} loading={loading} />
        <div className="mt-12 text-center">
          <Button
            onClick={() => setIsReviewDialogOpen(true)}
            style={{
              background: "var(--gradient-accent)",
              color: "var(--color-text-primary)",
              border: "none",
              borderRadius: "var(--radius-lg)",
              padding: "0.75rem 2rem",
              fontSize: "1rem",
              fontWeight: "600",
              transition: "var(--transition-normal)",
            }}
          >
            Write a Review
          </Button>
        </div>
      </div>
      <ReviewFormDialog
        open={isReviewDialogOpen}
        onOpenChange={setIsReviewDialogOpen}
        onSuccess={() => setIsConfirmationOpen(true)}
      />
      <ReviewConfirmationDialog
        open={isConfirmationOpen}
        onOpenChange={setIsConfirmationOpen}
      />
    </section>
  );
}
