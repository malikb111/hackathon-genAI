"use client";

import * as React from "react";
import { Filter as FilterIcon, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { useFetchMediaTypes } from "@/hooks/use-fetch-media-types";
import { useFilter } from "@/contexts/filter-context";
import { normalizeString } from "@/utils/normalize-data";

const dateRanges = [
  {
    label: "Périodes glissantes",
    options: [
      { label: "30 derniers jours", value: "last30" },
      { label: "60 derniers jours", value: "last60" },
      { label: "90 derniers jours", value: "last90" },
      { label: "180 derniers jours", value: "last180" },
    ],
  },
  {
    label: "Trimestres",
    options: [
      { label: "T1 2024 (Jan-Mars)", value: "2024Q1" },
      { label: "T4 2023 (Oct-Déc)", value: "2023Q4" },
      { label: "T3 2023 (Juil-Sept)", value: "2023Q3" },
      { label: "T2 2023 (Avr-Juin)", value: "2023Q2" },
    ],
  },
  {
    label: "Années",
    options: [
      { label: "2024", value: "2024" },
      { label: "2023", value: "2023" },
    ],
  },
];

export function Filter() {
  const [open, setOpen] = React.useState(false);
  const { selectedDate, setSelectedDate, selectedMedia, setSelectedMedia } =
    useFilter();
  const [searchQuery, setSearchQuery] = React.useState("");
  const { mediaTypes, isLoading, error } = useFetchMediaTypes();

  const toggleMedia = (media: string) => {
    const normalizedMedia = normalizeString(media);
    setSelectedMedia((prev: string[]) =>
      prev.includes(normalizedMedia)
        ? prev.filter((m) => m !== normalizedMedia)
        : [...prev, normalizedMedia]
    );
  };

  const filteredMedia = React.useMemo(() => {
    const query = searchQuery.toLowerCase();
    const filtered: { [key: string]: string[] } = {};

    Object.entries(mediaTypes).forEach(([category, medias]) => {
      const filteredMedias = medias.filter((media) =>
        media.toLowerCase().includes(query)
      );
      if (filteredMedias.length > 0) {
        filtered[category] = filteredMedias;
      }
    });

    return filtered;
  }, [searchQuery, mediaTypes]);

  const resetFilters = () => {
    setSelectedDate(null);
    setSelectedMedia([]);
    setSearchQuery("");
  };

  if (error) {
    console.error("Erreur de chargement des médias:", error);
  }

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <FilterIcon className="h-5 w-5" />
          {selectedMedia.length > 0 && (
            <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-blue-500 text-[10px] text-white flex items-center justify-center">
              {selectedMedia.length}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="start"
        side="left"
        className="w-[240px] p-2 shadow-lg rounded-xl border border-gray-200"
      >
        <div className="flex items-center justify-between mb-1 px-2">
          <DropdownMenuLabel className="text-sm font-semibold text-gray-900">
            Filtres
          </DropdownMenuLabel>
          {(selectedDate || selectedMedia.length > 0) && (
            <Button
              variant="ghost"
              size="sm"
              className="h-6 px-2 text-xs text-gray-500 hover:text-gray-700"
              onClick={resetFilters}
            >
              Réinitialiser
            </Button>
          )}
        </div>
        <DropdownMenuGroup className="space-y-1">
          <DropdownMenuSub>
            <DropdownMenuSubTrigger className="flex items-center justify-between w-full px-2 py-1.5 text-sm rounded-md hover:bg-gray-100 transition-colors">
              <span className="text-gray-700">
                {selectedDate
                  ? dateRanges.find((d) =>
                      d.options.some((o) => o.value === selectedDate)
                    )?.label
                  : "Période"}
              </span>
            </DropdownMenuSubTrigger>
            <DropdownMenuSubContent className="p-1 min-w-[200px] rounded-lg">
              {dateRanges.map((group) => (
                <React.Fragment key={group.label}>
                  <div className="px-2 py-1.5 text-xs font-semibold text-gray-500">
                    {group.label}
                  </div>
                  {group.options.map((range) => (
                    <DropdownMenuItem
                      key={range.value}
                      onClick={() => {
                        setSelectedDate(range.value);
                      }}
                      className="py-1.5 px-2 text-sm rounded-md hover:bg-gray-100 transition-colors cursor-pointer"
                    >
                      <div className="flex items-center gap-2">
                        <div className="w-3.5 h-3.5 border rounded flex items-center justify-center border-gray-400">
                          {selectedDate === range.value && (
                            <Check className="h-2.5 w-2.5 text-blue-600" />
                          )}
                        </div>
                        {range.label}
                      </div>
                    </DropdownMenuItem>
                  ))}
                  {group !== dateRanges[dateRanges.length - 1] && (
                    <DropdownMenuSeparator className="bg-gray-200 my-1" />
                  )}
                </React.Fragment>
              ))}
            </DropdownMenuSubContent>
          </DropdownMenuSub>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger className="flex items-center justify-between w-full px-2 py-1.5 text-sm rounded-md hover:bg-gray-100 transition-colors">
              <span className="text-gray-700">
                Media {selectedMedia.length > 0 && `(${selectedMedia.length})`}
              </span>
            </DropdownMenuSubTrigger>
            <DropdownMenuSubContent className="p-1 min-w-[300px] rounded-lg">
              <Command className="rounded-lg border-none">
                <CommandInput
                  placeholder="Rechercher un média..."
                  className="h-8 border-b focus:ring-0 focus:border-gray-300 px-2"
                  value={searchQuery}
                  onValueChange={setSearchQuery}
                />
                <CommandList className="max-h-[300px] overflow-auto">
                  {isLoading ? (
                    <div className="text-sm text-gray-500 py-1 px-2">
                      Chargement des médias...
                    </div>
                  ) : error ? (
                    <div className="text-sm text-red-500 py-1 px-2">
                      Erreur de chargement des médias
                    </div>
                  ) : (
                    <>
                      <CommandEmpty className="text-sm text-gray-500 py-1 px-2">
                        Aucun média trouvé.
                      </CommandEmpty>
                      {Object.entries(filteredMedia).map(
                        ([category, medias]) => (
                          <CommandGroup key={category} heading={category}>
                            {medias.map((media) => (
                              <CommandItem
                                key={media}
                                value={media}
                                onSelect={() => toggleMedia(media)}
                                className="flex items-center py-1.5 px-2 rounded-md hover:bg-gray-100 transition-colors cursor-pointer"
                              >
                                <div className="flex items-center gap-2">
                                  <div className="w-3.5 h-3.5 border rounded flex items-center justify-center border-gray-400">
                                    {selectedMedia.includes(
                                      normalizeString(media)
                                    ) && (
                                      <Check className="h-2.5 w-2.5 text-blue-600" />
                                    )}
                                  </div>
                                  <span className="text-sm text-gray-700">
                                    {media}
                                  </span>
                                </div>
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        )
                      )}
                    </>
                  )}
                </CommandList>
              </Command>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
