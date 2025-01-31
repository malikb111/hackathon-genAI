"use client";

import { Menubar, MenubarMenu, MenubarTrigger } from "@/components/ui/menubar";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AnalyseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const pageTitle = pathname.startsWith("/analyse")
    ? "Analyse"
    : "Vue d'ensemble";

  return (
    <div className="px-8">
      <h2 className="text-3xl font-semibold mt-8">{pageTitle}</h2>
      <Menubar className="mt-4 mb-8 inline-flex w-auto">
        <MenubarMenu>
          <Link href="/analyse" className="cursor-pointer">
            <MenubarTrigger
              className={`cursor-pointer text-sm ${
                pathname === "/analyse"
                  ? "bg-gray-100 text-gray-900 font-medium"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Perception
            </MenubarTrigger>
          </Link>
        </MenubarMenu>

        <MenubarMenu>
          <Link href="/analyse/contenus" className="cursor-pointer">
            <MenubarTrigger
              className={`cursor-pointer text-sm ${
                pathname === "/analyse/contenus"
                  ? "bg-gray-100 text-gray-900 font-medium"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Contenus
            </MenubarTrigger>
          </Link>
        </MenubarMenu>

        <MenubarMenu>
          <Link href="/analyse/temporalite" className="cursor-pointer">
            <MenubarTrigger
              className={`cursor-pointer text-sm ${
                pathname === "/analyse/temporalite"
                  ? "bg-gray-100 text-gray-900 font-medium"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Temporalité
            </MenubarTrigger>
          </Link>
        </MenubarMenu>
      </Menubar>

      <div className="px-1">{children}</div>
    </div>
  );
}
