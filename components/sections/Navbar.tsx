"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { AddDataModal } from "@/components/popup/AddDataModal";
import { DrawerAlert } from "../popup/DrawerAlert";

export function Navbar() {
  const pathname = usePathname();

  return (
    <div className="top-0 z-50 bg-white" id="header">
      <div className="mx-auto mt-4 flex max-w-2xl items-center justify-between rounded-full border border-gray-200 bg-white/95 px-3 sm:px-6 py-2 shadow-sm backdrop-blur-sm">
        <div className="flex items-center space-x-4 sm:space-x-8">
          <div className="relative w-[100px] sm:w-[130px] h-[30px] sm:h-[38px]">
            <Image
              src="/images/enedis-logo.png"
              alt="Enedis Logo"
              fill
              priority
              className="object-contain"
            />
          </div>

          <nav className="flex items-center space-x-3 sm:space-x-6">
            <Link
              href="/"
              className={`cursor-pointer text-xs sm:text-sm transition-all hover:text-gray-900 ${
                pathname === "/" ? "text-gray-900 font-medium" : "text-gray-600"
              }`}
            >
              Vue d'ensemble
            </Link>
            <Link
              href="/analyse"
              className={`cursor-pointer text-xs sm:text-sm transition-all hover:text-gray-900 ${
                pathname === "/analyse"
                  ? "text-gray-900 font-medium"
                  : "text-gray-600"
              }`}
            >
              Analyse
            </Link>
          </nav>
        </div>
        <AddDataModal />
      </div>
    </div>
  );
}
