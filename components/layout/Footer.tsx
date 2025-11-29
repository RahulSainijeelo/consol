import Link from "next/link";
import { Instagram, Twitter, Facebook, Youtube } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
    { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
    { icon: Facebook, href: "https://facebook.com", label: "Facebook" },
    { icon: Youtube, href: "https://youtube.com", label: "YouTube" },
  ];

  return (
    <footer className="bg-white text-gray-900">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="flex items-center justify-center">
          <h2 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter">
            CONSOL
          </h2>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-200">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Copyright */}
            <p className="text-sm text-gray-600">
              © {currentYear} Consol. All rights reserved.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <Link
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-teal-600 transition-colors"
                    aria-label={social.label}
                  >
                    <Icon className="h-5 w-5" />
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}