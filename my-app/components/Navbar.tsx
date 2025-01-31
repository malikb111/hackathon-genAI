"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export function Navbar() {
  const pathname = usePathname();

  return (
    <div className="sticky top-0 z-50 bg-white" id="header">
      <div className="mx-auto mt-4 flex max-w-2xl items-center justify-between rounded-full border border-gray-200 bg-white/95 px-6 py-2 shadow-sm backdrop-blur-sm">
        <nav className="flex items-center space-x-8 pl-4">
          <Link
            href="/"
            className={`cursor-pointer text-sm transition-all hover:text-gray-900 ${
              pathname === "/" ? "text-gray-900 font-medium" : "text-gray-600"
            }`}
          >
            Vue d'ensemble
          </Link>
          <Link
            href="/analyse"
            className={`cursor-pointer text-sm transition-all hover:text-gray-900 ${
              pathname === "/analyse"
                ? "text-gray-900 font-medium"
                : "text-gray-600"
            }`}
          >
            Analyse
          </Link>
        </nav>

        <div className="relative w-[130px] h-[38px] pb-12">
          <Image
            src="/images/enedis-logo.png"
            alt="Enedis Logo"
            fill
            priority
            className="object-contain"
          />
        </div>
      </div>
    </div>
  );
}
