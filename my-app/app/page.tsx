"use client";

import { usePathname } from "next/navigation";
import { RefreshCw } from "lucide-react";
import { DrawerAlert } from "@/components/popup/DrawerAlert";
import { Filter } from "@/components/popup/Filter";

export default function Home() {
  const pageTitle: string = "Vue d'ensemble";

  return (
    <div className="px-8">
      <h2 className="text-3xl font-semibold mt-8">{pageTitle}</h2>
      <div className="flex justify-between items-center mt-4 mb-8 pb-6 border-b border-gray-200">
        <div className="flex items-center gap-4">
          <span className="text-gray-600">
            👋 Bienvenue sur votre tableau de bord !{" "}
          </span>
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
    </div>
  );
}
