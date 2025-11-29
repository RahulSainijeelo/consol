import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import { ExtendedReview } from "./useManageReviews";

export function ReviewDetailsDialog({
  review,
  open,
  onOpenChange,
  onApprove,
  onReject,
}: {
  review: ExtendedReview | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
}) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  if (!review) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md responsive-portfolio-modal">
        <DialogHeader>
          <DialogTitle>Review Details</DialogTitle>
          <DialogDescription>
            Submitted on {formatDate(review.time)}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 mt-4">
          <div>
            <h3 className="font-semibold">Customer</h3>
            <p className="mt-1">{review.name}</p>
          </div>
          <div>
            <h3 className="font-semibold">Rating</h3>
            <div className="flex mt-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-5 w-5 ${
                    i < review.rating
                      ? "text-yellow-400 fill-yellow-400"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>
          <div>
            <h3 className="font-semibold">Review</h3>
            <p className="mt-1 text-gray-700">{review.comment}</p>
          </div>
          <div>
            <h3 className="font-semibold">Status</h3>
            {review.status === "approved" && (
              <Badge className="mt-1 bg-green-500 hover:bg-green-600">
                Approved
              </Badge>
            )}
            {review.status === "pending" && (
              <Badge className="mt-1 bg-blue-500 hover:bg-blue-600">
                Pending
              </Badge>
            )}
            {review.status === "rejected" && (
              <Badge className="mt-1 bg-red-500 hover:bg-red-600">
                Rejected
              </Badge>
            )}
          </div>
        </div>
        <DialogFooter className="flex justify-between">
          {review.status === "pending" && (
            <div className="flex space-x-2">
              <Button
                onClick={() => {
                  onApprove(review.id);
                  onOpenChange(false);
                }}
                className="bg-green-500 hover:bg-green-600"
              >
                Approve
              </Button>
              <Button
                onClick={() => {
                  onReject(review.id);
                  onOpenChange(false);
                }}
                variant="outline"
                className="border-red-500 text-red-500 hover:bg-red-50"
              >
                Reject
              </Button>
            </div>
          )}
          <Button variant="ghost" onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
