"use client";
import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { toast } from "@/hooks/use-toast";
import CustomSignInForm from "@/components/auth/CustomSignInForm";

export default function SignInPage() {
  const router = useRouter();
  const { isSignedIn, isLoaded } = useUser();

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      router.replace("/dashboard");
    }
  }, [isLoaded, isSignedIn, router]);

  // Show loading state while checking auth
  if (!isLoaded) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{
          backgroundColor: "#f8fafc",
          fontFamily: "var(--font-primary)",
        }}
      >
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4" />
          <p style={{ color: "#64748b" }}>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{
        backgroundColor: "#ffffff",
        fontFamily: "var(--font-primary)",
        backgroundImage: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)",
      }}
    >
      {/* Background Pattern */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* Main Content Container */}
      <div
        className="relative z-10 w-full max-w-md mx-4 p-8 rounded-2xl"
        style={{
          backgroundColor: "#ffffff",
          border: "1px solid #e5e7eb",
          boxShadow:
            "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
        }}
      >
        <CustomSignInForm />
      </div>

      {/* Bottom Branding */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center">
        <p className="text-sm" style={{ color: "#9ca3af" }}>
          © 2025 Kurukshetra . All rights reserved.
        </p>
      </div>
    </div>
  );
}
