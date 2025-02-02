import { Loader2 } from "lucide-react";

export const Loader = () => {
  return (
    <div className="h-[80vh] w-full flex items-center justify-center bg-white/80">
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="h-12 w-12 animate-spin text-blue-600" />
        <p className="text-xl font-medium text-gray-700 animate-pulse">
          Chargement en cours...
        </p>
      </div>
    </div>
  );
};
