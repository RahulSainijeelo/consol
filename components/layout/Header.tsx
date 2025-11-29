import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export default async function Header() {
  const session = await getServerSession(authOptions);
  const firstName = session?.user?.name?.split(" ")[0];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-black/95 backdrop-blur supports-[backdrop-filter]:bg-black/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo - Visible on both Mobile and Desktop */}
        <Link href="/" className="flex items-center gap-2">
          <span className="font-display font-bold text-xl tracking-tight text-gold">ConSol</span>
        </Link>

        {/* Desktop Navigation - Hidden on mobile, visible on md and up */}
        <nav className="hidden md:flex items-center gap-8">
          <Link href="/past-trips" className="text-sm font-medium text-gray-300 hover:text-gold transition-colors">
            Past Trips
          </Link>
          <Link href="/my-trips" className="text-sm font-medium text-gray-300 hover:text-gold transition-colors">
            My Trips
          </Link>
       
            <Link href="/auth/login">
              <Button className="bg-gold hover:bg-yellow-600 text-black font-semibold">
                Login
              </Button>
            </Link>

        </nav>
      </div>
    </header>
  );
}