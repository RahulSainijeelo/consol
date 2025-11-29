import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Lottie from "lottie-react";
import greenCheck from "@/public/lottie/green-check.json";

interface ContactConfirmationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  requestId: string | null;
}

export function ContactConfirmationDialog({
  open,
  onOpenChange,
  requestId,
}: ContactConfirmationDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle
            style={{
              color: "var(--color-text-primary)",
              fontFamily: "var(--font-heading)",
            }}
          >
            Enquiry Submitted!
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center py-4">
          <div className="w-24 h-24 mb-2">
            <Lottie animationData={greenCheck} loop={false} autoplay />
          </div>
          <p
            className="text-center"
            style={{ color: "var(--color-text-primary)" }}
          >
            Thank you for contacting us. Your request has been received.
            <br />
            <strong>Request ID:</strong>{" "}
            <span style={{ color: "var(--color-accent)" }}>
              {requestId || "-"}
            </span>
          </p>
          <p
            className="text-sm mt-2 text-center"
            style={{ color: "var(--color-text-secondary)" }}
          >
            Please save this Request ID for future reference.
          </p>
        </div>
        <DialogFooter>
          <Button onClick={() => onOpenChange(false)}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
