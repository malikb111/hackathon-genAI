"use client";

import { Menubar, MenubarMenu, MenubarTrigger } from "@/components/ui/menubar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { RefreshCw } from "lucide-react";
import { DrawerAlert } from "@/components/popup/DrawerAlert";
import { Filter } from "@/components/popup/Filter";
export default function AnalyseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const pageTitle = "Analyse";

  return (
    <div className="px-8">
      <h2 className="text-3xl font-semibold mt-8">{pageTitle}</h2>
      <div className="flex justify-between items-center mt-4 mb-8 pb-6 border-b border-gray-200">
        <div className="flex items-center gap-4">
          <Menubar className="inline-flex w-auto">
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
        </div>
        <div className="flex items-center gap-4">
          <DrawerAlert />
          <Filter />
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center gap-2">
            Rafraîchir
            <RefreshCw size={16} />
          </button>
        </div>
      </div>
      <div className="px-1">{children}</div>
    </div>
  );
}
