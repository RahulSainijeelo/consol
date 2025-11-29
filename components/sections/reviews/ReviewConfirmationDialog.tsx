import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Lottie from "lottie-react";
import greenCheck from "@/public/lottie/green-check.json";

interface ReviewConfirmationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ReviewConfirmationDialog({
  open,
  onOpenChange,
}: ReviewConfirmationDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-xs">
        <div className="flex flex-col items-center py-4">
          <div className="w-24 h-24 mb-2">
            <Lottie animationData={greenCheck} loop={false} autoplay />
          </div>
          <h3
            className="text-lg font-semibold mb-2"
            style={{
              color: "var(--color-text-primary)",
              fontFamily: "var(--font-heading)",
            }}
          >
            Review Submitted!
          </h3>
          <p
            className="text-center"
            style={{ color: "var(--color-text-secondary)" }}
          >
            Thank you for your feedback. Your review will be visible after
            moderation.
          </p>
          <Button
            className="mt-4"
            onClick={() => onOpenChange(false)}
            style={{
              background: "var(--gradient-accent)",
              color: "var(--color-text-primary)",
              border: "none",
              borderRadius: "var(--radius-lg)",
              fontWeight: "600",
            }}
          >
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
