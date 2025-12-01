"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { Loader2, Upload, X, QrCode, Copy } from "lucide-react";
import { uploadImageToImgBB } from "@/lib/imgbb";
import Image from "next/image";

interface JoinTripFormProps {
    tripId: string;
    tripTitle: string;
    tripPrice: number;
    userEmail?: string;
    userPhone?: string; // If available from profile
}

export default function JoinTripForm({
    tripId,
    tripTitle,
    tripPrice,
    userEmail = "",
}: JoinTripFormProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [uploadingAadhaar, setUploadingAadhaar] = useState(false);
    const [uploadingPayment, setUploadingPayment] = useState(false);

    const [formData, setFormData] = useState({
        fullName: "",
        aadhaarNo: "",
        mobileNo: "",
        email: userEmail,
        aadhaarImage: "",
        paymentrefno: "",
        paymentScreenshot: "",
    });

    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: "" }));
        }
    };

    const validateForm = (): boolean => {
        const newErrors: Record<string, string> = {};

        // Full Name validation
        if (!formData.fullName.trim()) {
            newErrors.fullName = "Full name is required";
        } else if (formData.fullName.trim().length < 3) {
            newErrors.fullName = "Name must be at least 3 characters";
        }

        // Email validation
        if (!formData.email.trim()) {
            newErrors.email = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = "Invalid email format";
        }

        // Mobile number validation
        if (!formData.mobileNo.trim()) {
            newErrors.mobileNo = "Mobile number is required";
        } else if (!/^\d{10}$/.test(formData.mobileNo)) {
            newErrors.mobileNo = "Mobile number must be exactly 10 digits";
        }

        // Aadhaar number validation
        if (!formData.aadhaarNo.trim()) {
            newErrors.aadhaarNo = "Aadhaar number is required";
        } else if (!/^\d{12}$/.test(formData.aadhaarNo)) {
            newErrors.aadhaarNo = "Aadhaar number must be exactly 12 digits";
        }

        // Payment Reference Number validation
        if (!formData.paymentrefno.trim()) {
            newErrors.paymentrefno = "Payment reference number is required";
        } else if (formData.paymentrefno.trim().length < 5) {
            newErrors.paymentrefno = "Reference number must be at least 5 characters";
        }

        // Image uploads validation
        if (!formData.aadhaarImage) {
            newErrors.aadhaarImage = "Please upload Aadhaar card image";
        }

        if (!formData.paymentScreenshot) {
            newErrors.paymentScreenshot = "Please upload payment screenshot";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleImageUpload = async (
        e: React.ChangeEvent<HTMLInputElement>,
        field: "aadhaarImage" | "paymentScreenshot",
        setUploading: (val: boolean) => void
    ) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading(true);
        try {
            const result = await uploadImageToImgBB(file);
            setFormData((prev) => ({ ...prev, [field]: result.url }));
            // Clear error for this field
            if (errors[field]) {
                setErrors((prev) => ({ ...prev, [field]: "" }));
            }
            toast({
                title: "Image Uploaded",
                description: "Image uploaded successfully",
            });
        } catch (error) {
            toast({
                title: "Upload Failed",
                description: "Failed to upload image. Please try again.",
                variant: "destructive",
            });
        } finally {
            setUploading(false);
        }
    };

    const removeImage = (field: "aadhaarImage" | "paymentScreenshot") => {
        setFormData((prev) => ({ ...prev, [field]: "" }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validate form
        if (!validateForm()) {
            toast({
                title: "Validation Failed",
                description: "Please fix the errors in the form",
                variant: "destructive",
            });
            return;
        }

        setLoading(true);

        try {
            const res = await fetch("/api/bookings", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    tripId,
                    ...formData,
                    amount: tripPrice,
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || "Failed to submit booking");
            }

            toast({
                title: "Booking Submitted!",
                description: "Your booking request has been received. We will confirm shortly.",
            });

            router.push("/my-trips"); // Redirect to my trips
        } catch (error) {
            toast({
                title: "Booking Failed",
                description: error instanceof Error ? error.message : "Something went wrong",
                variant: "destructive",
            });
        } finally {
            setLoading(false);
        }
    };

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        toast({ title: "Copied to clipboard" });
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Form Section */}
            <div className="space-y-6">
                <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                    <CardHeader>
                        <CardTitle className="text-gold">Personal Details</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <Label htmlFor="fullName" className="text-gray-300">Full Name</Label>
                            <Input
                                id="fullName"
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleInputChange}
                                className={`bg-black/50 border-white/10 text-white mt-1 ${errors.fullName ? 'border-red-500' : ''}`}
                                placeholder="As per Aadhaar"
                                required
                            />
                            {errors.fullName && (
                                <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>
                            )}
                        </div>

                        <div>
                            <Label htmlFor="email" className="text-gray-300">Email</Label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                className={`bg-black/50 border-white/10 text-white mt-1 ${errors.email ? 'border-red-500' : ''}`}
                                required
                            />
                            {errors.email && (
                                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                            )}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="mobileNo" className="text-gray-300">Mobile Number</Label>
                                <Input
                                    id="mobileNo"
                                    name="mobileNo"
                                    value={formData.mobileNo}
                                    onChange={handleInputChange}
                                    className={`bg-black/50 border-white/10 text-white mt-1 ${errors.mobileNo ? 'border-red-500' : ''}`}
                                    placeholder="10 digits"
                                    pattern="\d{10}"
                                    required
                                />
                                {errors.mobileNo && (
                                    <p className="text-red-500 text-sm mt-1">{errors.mobileNo}</p>
                                )}
                            </div>
                            <div>
                                <Label htmlFor="aadhaarNo" className="text-gray-300">Aadhaar Number</Label>
                                <Input
                                    id="aadhaarNo"
                                    name="aadhaarNo"
                                    value={formData.aadhaarNo}
                                    onChange={handleInputChange}
                                    className={`bg-black/50 border-white/10 text-white mt-1 ${errors.aadhaarNo ? 'border-red-500' : ''}`}
                                    placeholder="12 digits"
                                    pattern="\d{12}"
                                    required
                                />
                                {errors.aadhaarNo && (
                                    <p className="text-red-500 text-sm mt-1">{errors.aadhaarNo}</p>
                                )}
                            </div>
                        </div>

                        <div>
                            <Label htmlFor="paymentrefno" className="text-gray-300">Payment Reference Number</Label>
                            <Input
                                id="paymentrefno"
                                name="paymentrefno"
                                type="text"
                                value={formData.paymentrefno}
                                onChange={handleInputChange}
                                className={`bg-black/50 border-white/10 text-white mt-1 ${errors.paymentrefno ? 'border-red-500' : ''}`}
                                required
                            />
                            {errors.paymentrefno && (
                                <p className="text-red-500 text-sm mt-1">{errors.paymentrefno}</p>
                            )}
                        </div>

                        <div>
                            <Label className="text-gray-300">Upload Aadhaar Card</Label>
                            {errors.aadhaarImage && (
                                <p className="text-red-500 text-sm mt-1">{errors.aadhaarImage}</p>
                            )}
                            <div className="mt-2">
                                {formData.aadhaarImage ? (
                                    <div className="relative group w-full h-48 bg-black/50 rounded-lg border border-white/10 overflow-hidden">
                                        <img
                                            src={formData.aadhaarImage}
                                            alt="Aadhaar"
                                            className="w-full h-full object-contain"
                                        />
                                        <Button
                                            type="button"
                                            variant="destructive"
                                            size="sm"
                                            onClick={() => removeImage("aadhaarImage")}
                                            className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                                        >
                                            <X className="h-4 w-4" />
                                        </Button>
                                    </div>
                                ) : (
                                    <div className="relative">
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) => handleImageUpload(e, "aadhaarImage", setUploadingAadhaar)}
                                            disabled={uploadingAadhaar}
                                            className="hidden"
                                            id="aadhaar-upload"
                                        />
                                        <label
                                            htmlFor="aadhaar-upload"
                                            className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-white/20 rounded-lg cursor-pointer hover:border-gold transition-colors ${uploadingAadhaar ? 'opacity-50' : ''}`}
                                        >
                                            {uploadingAadhaar ? (
                                                <Loader2 className="h-8 w-8 text-gold animate-spin" />
                                            ) : (
                                                <>
                                                    <Upload className="h-8 w-8 text-gray-400 mb-2" />
                                                    <span className="text-sm text-gray-400">Click to upload Aadhaar</span>
                                                </>
                                            )}
                                        </label>
                                    </div>
                                )}
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Payment Section */}
            <div className="space-y-6">
                <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                    <CardHeader>
                        <CardTitle className="text-gold">Payment Details</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="bg-black/50 p-6 rounded-lg border border-white/10 text-center">
                            <p className="text-gray-400 mb-2">Total Amount to Pay</p>
                            <p className="text-4xl font-bold text-gold">₹{tripPrice.toLocaleString()}</p>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-3 bg-black/30 rounded border border-white/5">
                                <div>
                                    <p className="text-xs text-gray-400">UPI ID</p>
                                    <p ref={(node) => {
                                        if (node) {
                                            node.style.setProperty("font-family", "monospace", "important");
                                        }
                                    }} className="text-white">pay.kurukshetra@upi</p>
                                </div>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => copyToClipboard("pay.kurukshetra@upi")}
                                    className="text-gold hover:text-white"
                                >
                                    <Copy className="h-4 w-4" />
                                </Button>
                            </div>

                            <div className="flex items-center justify-between p-3 bg-black/30 rounded border border-white/5">
                                <div >
                                    <p className="text-xs text-gray-400">Bank Account</p>
                                    <p ref={(node) => {
                                        if (node) {
                                            node.style.setProperty("font-family", "monospace", "important");
                                        }
                                    }} className="text-white">987654321012</p>
                                    <p ref={(node) => {
                                        if (node) {
                                            node.style.setProperty("font-family", "monospace", "important");
                                        }
                                    }} className="text-xs text-gray-500">IFSC: KURU0001234</p>
                                </div>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => copyToClipboard("987654321012")}
                                    className="text-gold hover:text-white"
                                >
                                    <Copy className="h-4 w-4" />
                                </Button>
                            </div>

                            <div className="flex justify-center py-4">
                                <div className="bg-white p-4 rounded-lg">
                                    <QrCode className="h-32 w-32 text-black" />
                                </div>
                            </div>
                            <p className="text-center text-xs text-gray-500">Scan to pay via any UPI app</p>
                        </div>

                        <div>
                            <Label className="text-gray-300">Upload Payment Screenshot</Label>
                            {errors.paymentScreenshot && (
                                <p className="text-red-500 text-sm mt-1">{errors.paymentScreenshot}</p>
                            )}
                            <div className="mt-2">
                                {formData.paymentScreenshot ? (
                                    <div className="relative group w-full h-48 bg-black/50 rounded-lg border border-white/10 overflow-hidden">
                                        <img
                                            src={formData.paymentScreenshot}
                                            alt="Payment"
                                            className="w-full h-full object-contain"
                                        />
                                        <Button
                                            type="button"
                                            variant="destructive"
                                            size="sm"
                                            onClick={() => removeImage("paymentScreenshot")}
                                            className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                                        >
                                            <X className="h-4 w-4" />
                                        </Button>
                                    </div>
                                ) : (
                                    <div className="relative">
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) => handleImageUpload(e, "paymentScreenshot", setUploadingPayment)}
                                            disabled={uploadingPayment}
                                            className="hidden"
                                            id="payment-upload"
                                        />
                                        <label
                                            htmlFor="payment-upload"
                                            className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-white/20 rounded-lg cursor-pointer hover:border-gold transition-colors ${uploadingPayment ? 'opacity-50' : ''}`}
                                        >
                                            {uploadingPayment ? (
                                                <Loader2 className="h-8 w-8 text-gold animate-spin" />
                                            ) : (
                                                <>
                                                    <Upload className="h-8 w-8 text-gray-400 mb-2" />
                                                    <span className="text-sm text-gray-400">Click to upload screenshot</span>
                                                </>
                                            )}
                                        </label>
                                    </div>
                                )}
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Submit Button */}
            <div className="lg:col-span-2 flex justify-end">
                <Button
                    onClick={handleSubmit}
                    disabled={loading || uploadingAadhaar || uploadingPayment}
                    className="bg-gold hover:bg-yellow-600 text-black font-bold text-lg px-8 py-6 w-full md:w-auto"
                >
                    {loading ? (
                        <>
                            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                            Submitting...
                        </>
                    ) : (
                        "Confirm Booking"
                    )}
                </Button>
            </div>
        </div>
    );
}
