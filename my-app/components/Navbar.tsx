"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();

  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <div className="mr-6 relative w-[100px] h-[32px]">
          <Image
            src="/images/enedis-logo.png"
            alt="Enedis Logo"
            fill
            priority
            className="object-contain"
          />
        </div>
        <nav className="flex items-center space-x-6 text-sm font-medium">
          <Link
            href="/"
            className={cn(
              "transition-colors hover:text-foreground/80",
              pathname === "/" ? "text-foreground" : "text-foreground/60"
            )}
          >
            Overview
          </Link>
          <Link
            href="/analytics"
            className={cn(
              "transition-colors hover:text-foreground/80",
              pathname === "/analytics"
                ? "text-foreground"
                : "text-foreground/60"
            )}
          >
            Analytics
          </Link>
        </nav>
      </div>
    </div>
  );
}
