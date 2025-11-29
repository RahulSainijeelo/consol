import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";
import { ExtendedReview } from "./useManageReviews";

export function DeleteReviewDialog({
  review,
  open,
  onOpenChange,
  onDelete,
}: {
  review: ExtendedReview | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onDelete: () => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md responsive-portfolio-modal">
        <DialogHeader>
          <DialogTitle>Delete Review</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this review? This action cannot be
            undone.
          </DialogDescription>
        </DialogHeader>
        {review && (
          <div className="py-4 flex items-start space-x-2">
            <AlertCircle className="h-5 w-5 text-red-500 mt-0.5" />
            <div>
              <p>
                Review by <span className="font-medium">{review.name}</span>
              </p>
              <p className="text-sm text-gray-500">Rating: {review.rating}/5</p>
            </div>
          </div>
        )}
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={onDelete}>
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
