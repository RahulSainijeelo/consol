import { z } from "zod";

export const bookingSchema = z.object({
    tripId: z.string().min(1, "Trip ID is required"),
    fullName: z.string().min(2, "Full name must be at least 2 characters"),
    aadhaarNo: z.string().regex(/^\d{12}$/, "Invalid Aadhaar Number (must be 12 digits)"),
    mobileNo: z.string().regex(/^\d{10}$/, "Invalid Mobile Number (must be 10 digits)"),
    email: z.string().email("Invalid email address"),
    aadhaarImage: z.string().url("Aadhaar image is required"),
    paymentScreenshot: z.string().url("Payment screenshot is required"),
    userId: z.string().optional(), // Will be populated from session
    status: z.enum(["pending", "confirmed", "rejected"]).default("pending"),
    amount: z.number().positive(),
    paymentrefno: z.string().min(1, "Payment Reference Number is required"),
    bookingDate: z.string().optional(), // ISO string
});

export type BookingInput = z.infer<typeof bookingSchema>;
