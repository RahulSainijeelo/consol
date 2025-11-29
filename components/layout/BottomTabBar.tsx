"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, MapPin, Briefcase, User } from "lucide-react";
import { cn } from "@/lib/utils";

const tabs = [
    { name: "Home", href: "/", icon: Home },
    { name: "Past Trips", href: "/past-trips", icon: MapPin },
    { name: "My Trips", href: "/my-trips", icon: Briefcase },
    { name: "Profile", href: "/profile", icon: User },
];

export default function BottomTabBar() {
    const pathname = usePathname();

    return (
        <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 md:hidden">
            <div className="grid grid-cols-4 h-16">
                {tabs.map((tab) => {
                    const isActive = pathname === tab.href;
                    const Icon = tab.icon;

                    return (
                        <Link
                            key={tab.name}
                            href={tab.href}
                            className={cn(
                                "flex flex-col items-center justify-center gap-1 transition-colors",
                                isActive
                                    ? "text-teal-600"
                                    : "text-gray-600 hover:text-teal-500"
                            )}
                        >
                            <Icon className="h-5 w-5" />
                            <span className="text-xs font-medium">{tab.name}</span>
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
}
