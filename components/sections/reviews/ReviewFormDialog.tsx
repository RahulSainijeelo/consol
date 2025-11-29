import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { StarRating } from "@/components/ui/star-rating";
import { toast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { useState } from "react";

const reviewSchema = z.object({
  enquiryId: z.string().min(7, { message: "Enquiry ID is required" }).max(7, {
    message: "Enquiry ID must be 7 digits",
  }),
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  rating: z.number().min(1, { message: "Please select a rating" }).max(5),
  comment: z
    .string()
    .min(10, { message: "Review must be at least 10 characters" }),
});

type ReviewFormValues = z.infer<typeof reviewSchema>;

interface ReviewFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

export function ReviewFormDialog({
  open,
  onOpenChange,
  onSuccess,
}: ReviewFormDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ReviewFormValues>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      enquiryId: "",
      name: "",
      email: "",
      rating: 5,
      comment: "",
    },
  });

  const onSubmit = async (data: ReviewFormValues) => {
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const err = await res.json();
        toast({
          title: "Submission failed",
          description: err
            ? typeof err.message === "string"
              ? err.message
              : "Please check your input."
            : "Something went wrong.",
          variant: "destructive",
        });
        return;
      }

      onOpenChange(false);
      onSuccess();
      form.reset();
    } catch (err) {
      toast({
        title: "Submission failed",
        description: "Something went wrong.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="sm:max-w-md w-[95vw] max-h-[90vh] flex flex-col p-0"
        style={{
          backgroundColor: "var(--color-surface)",
          border: "1px solid var(--color-accent)",
          borderRadius: "var(--radius-xl)",
        }}
      >
        {/* Fixed Header */}
        <DialogHeader
          className="px-6 pt-6 pb-4 border-b border-opacity-20"
          style={{ borderColor: "var(--color-accent)" }}
        >
          <DialogTitle
            style={{
              color: "var(--color-text-primary)",
              fontFamily: "var(--font-heading)",
            }}
          >
            Write a Review
          </DialogTitle>
          <DialogDescription style={{ color: "var(--color-text-secondary)" }}>
            Share your experience with us.
          </DialogDescription>
        </DialogHeader>

        {/* Scrollable Form Content */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="enquiryId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel style={{ color: "var(--color-text-primary)" }}>
                      ENQUIRY ID
                    </FormLabel>
                    <div className="flex items-center space-x-2">
                      <div style={{ color: "var(--color-text-secondary)" }}>
                        ENQ-
                      </div>
                      <FormControl className="flex-1">
                        <Input
                          placeholder="1234567"
                          {...field}
                          disabled={isSubmitting}
                        />
                      </FormControl>
                    </div>
                    <FormDescription
                      style={{ color: "var(--color-text-secondary)" }}
                    >
                      Please enter Enquiry ID
                    </FormDescription>
                    <FormMessage style={{ color: "var(--color-accent)" }} />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel style={{ color: "var(--color-text-primary)" }}>
                      Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Your name"
                        {...field}
                        disabled={isSubmitting}
                      />
                    </FormControl>
                    <FormMessage style={{ color: "var(--color-accent)" }} />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel style={{ color: "var(--color-text-primary)" }}>
                      Email
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Your email address"
                        {...field}
                        disabled={isSubmitting}
                      />
                    </FormControl>
                    <FormDescription
                      style={{ color: "var(--color-text-secondary)" }}
                    >
                      Your email won't be displayed publicly.
                    </FormDescription>
                    <FormMessage style={{ color: "var(--color-accent)" }} />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="rating"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel style={{ color: "var(--color-text-primary)" }}>
                      Rating
                    </FormLabel>
                    <FormControl>
                      <StarRating
                        rating={field.value}
                        onRatingChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage style={{ color: "var(--color-accent)" }} />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="comment"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel style={{ color: "var(--color-text-primary)" }}>
                      Your Review
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Share your experience with our services..."
                        className="min-h-[120px] resize-none"
                        {...field}
                        disabled={isSubmitting}
                      />
                    </FormControl>
                    <FormMessage style={{ color: "var(--color-accent)" }} />
                  </FormItem>
                )}
              />

              {/* Fixed Footer */}
              <div
                className="sticky bottom-0 bg-inherit pt-4 pb-2 border-t border-opacity-20"
                style={{ borderColor: "var(--color-accent)" }}
              >
                <Button
                  type="submit"
                  className="w-full"
                  disabled={isSubmitting}
                  style={{
                    background: "var(--gradient-accent)",
                    color: "var(--color-text-primary)",
                    border: "none",
                    borderRadius: "var(--radius-lg)",
                    fontWeight: "600",
                    padding: "0.75rem",
                    opacity: isSubmitting ? 0.7 : 1,
                    cursor: isSubmitting ? "not-allowed" : "pointer",
                  }}
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Submitting...
                    </div>
                  ) : (
                    "Submit Review"
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
