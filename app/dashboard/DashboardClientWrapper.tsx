"use client";
import { SignedIn, SignedOut, useUser } from "@clerk/nextjs";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";
import { DashboardHeader } from "@/components/dashboard/header/dashboard-header";
import CustomSignInForm from "@/components/auth/CustomSignInForm";

export function DashboardClientWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isLoaded, isSignedIn, user } = useUser();
  const router = useRouter();

  useEffect(() => {
    // If Clerk is loaded and user is signed in but user object is missing (rare error)
    if (isLoaded && isSignedIn && !user) {
      toast({
        title: "Authentication Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
      router.replace("/");
    }
    // If Clerk is loaded and user is signed out, optionally redirect to "/" here if you want
    // But usually <SignedOut> with redirectUrl on <SignIn /> is enough
  }, [isLoaded, isSignedIn, user, router]);

  return (
    <>
      <SignedIn>
        <div className="min-h-screen bg-gray-100">
          <DashboardHeader />
          {children}
        </div>
      </SignedIn>
      <SignedOut>
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
          <CustomSignInForm />
        </div>
      </SignedOut>
    </>
  );
}
