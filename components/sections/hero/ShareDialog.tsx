// ShareDialog.tsx
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Copy, Mail, Share2, Link } from "lucide-react";

interface ShareDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  profile: any;
  copyToClipboard: () => void;
}

export default function ShareDialog({
  open,
  onOpenChange,
  profile,
  copyToClipboard,
}: ShareDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="sm:max-w-md"
        style={{
          background: "var(--color-surface)",
          border: "1px solid var(--color-accent)",
          borderRadius: "var(--radius-xl)",
          color: "var(--color-text-primary)",
        }}
      >
        <DialogHeader>
          <DialogTitle
            style={{
              color: "var(--color-text-primary)",
              fontFamily: "var(--font-heading)",
            }}
          >
            Share Our Services
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col space-y-3 mt-4">
          <Button
            onClick={copyToClipboard}
            variant="outline"
            className="justify-start gap-2"
            style={{
              background: "rgba(255, 255, 255, 0.1)",
              border: "1px solid var(--color-accent)",
              color: "var(--color-text-primary)",
              borderRadius: "var(--radius-md)",
            }}
          >
            <Copy className="h-4 w-4" />
            Copy link to clipboard
          </Button>

          <Button
            asChild
            variant="outline"
            className="justify-start gap-2"
            style={{
              background: "rgba(255, 255, 255, 0.1)",
              border: "1px solid var(--color-accent)",
              color: "var(--color-text-primary)",
              borderRadius: "var(--radius-md)",
            }}
          >
            <a
              href={
                typeof window !== "undefined"
                  ? `mailto:?subject=${encodeURIComponent(
                      `Check out ${
                        profile?.name || "Tech Solutions Team"
                      } - Premium Freelance Services`
                    )}&body=I found this amazing freelance team that offers blockchain, web development, mobile apps, and AI solutions:%0A${encodeURIComponent(
                      window.location.href
                    )}`
                  : "#"
              }
              target="_blank"
              rel="noopener noreferrer"
            >
              <Mail className="h-4 w-4" />
              Share via Email
            </a>
          </Button>

          <Button
            asChild
            variant="outline"
            className="justify-start gap-2"
            style={{
              background: "rgba(255, 255, 255, 0.1)",
              border: "1px solid var(--color-accent)",
              color: "var(--color-text-primary)",
              borderRadius: "var(--radius-md)",
            }}
          >
            <a
              href={
                typeof window !== "undefined"
                  ? `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
                      window.location.href
                    )}`
                  : "#"
              }
              target="_blank"
              rel="noopener noreferrer"
            >
              <Share2 className="h-4 w-4" />
              Share on LinkedIn
            </a>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
