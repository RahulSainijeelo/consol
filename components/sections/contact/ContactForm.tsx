import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  mobile: z.string().min(10, { message: "Please enter a valid mobile number" }),
  serviceType: z.string({ required_error: "Please select a service type" }),
  message: z
    .string()
    .min(10, { message: "Message must be at least 10 characters" }),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

interface ContactFormProps {
  onSuccess: (requestId: string) => void;
}

export function ContactForm({ onSuccess }: ContactFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      mobile: "",
      serviceType: "",
      message: "",
    },
  });

  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const err = await res.json();
        toast({
          title: "Submission failed",
          description:
            err.error && typeof err.error === "string"
              ? err.error
              : "Please check your input.",
          variant: "destructive",
        });
        setIsSubmitting(false);
        return;
      }

      const result = await res.json();
      onSuccess(result.requestNumber);
      form.reset();
    } catch (err) {
      toast({
        title: "Submission failed",
        description: "Something went wrong.",
        variant: "destructive",
      });
    }
    setIsSubmitting(false);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel style={{ color: "var(--color-text-primary)" }}>
                Full Name
              </FormLabel>
              <FormControl>
                <Input placeholder="Your name" {...field} />
              </FormControl>
              <FormMessage style={{ color: "var(--color-accent)" }} />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="mobile"
          render={({ field }) => (
            <FormItem>
              <FormLabel style={{ color: "var(--color-text-primary)" }}>
                Mobile Number
              </FormLabel>
              <FormControl>
                <Input placeholder="Your mobile number" {...field} />
              </FormControl>
              <FormMessage style={{ color: "var(--color-accent)" }} />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="serviceType"
          render={({ field }) => (
            <FormItem>
              <FormLabel style={{ color: "var(--color-text-primary)" }}>
                Service Required
              </FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a service" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="blockchain">
                    Blockchain Projects
                  </SelectItem>
                  <SelectItem value="webapp">Web & App Development</SelectItem>
                  <SelectItem value="graphicdesign">Graphic Design</SelectItem>
                  <SelectItem value="chatbots">Chatbots & AI</SelectItem>
                  <SelectItem value="custom">Custom Software</SelectItem>
                  <SelectItem value="other">Other Services</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage style={{ color: "var(--color-accent)" }} />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel style={{ color: "var(--color-text-primary)" }}>
                Your Message
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Describe your project requirements..."
                  className="min-h-[120px]"
                  {...field}
                />
              </FormControl>
              <FormMessage style={{ color: "var(--color-accent)" }} />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Sending..." : "Send Enquiry"}
        </Button>
      </form>
    </Form>
  );
}
