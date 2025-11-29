import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import logo from "@/public/images/logo.png";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white shadow-sm">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo - Visible on both Mobile and Desktop */}
        <Link href="/" className="flex items-center gap-2">
          <Image src={logo} alt="consol Logo" width={40} height={40} className="object-contain" />
          <span className="font-bold text-xl tracking-tight text-teal-600">ConSol</span>
        </Link>

        {/* Desktop Navigation - Hidden on mobile, visible on md and up */}
        <nav className="hidden md:flex items-center gap-8">
          <Link href="/past-trips" className="text-sm font-medium text-gray-700 hover:text-teal-600 transition-colors">
            Past Trips
          </Link>
          <Link href="/my-trips" className="text-sm font-medium text-gray-700 hover:text-teal-600 transition-colors">
            My Trips
          </Link>
          <Button className="bg-teal-600 hover:bg-teal-700 text-white">
            Login
          </Button>
        </nav>
      </div>
    </header>
  );
}