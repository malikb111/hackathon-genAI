"use client";

import * as React from "react";
import { Filter as FilterIcon, Check } from "lucide-react";

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

const mediaTypes = ["Twitter", "Facebook", "Instagram", "LinkedIn", "YouTube"];

const dateRanges = [
  { label: "Aujourd'hui", value: "today" },
  { label: "7 derniers jours", value: "last7days" },
  { label: "30 derniers jours", value: "last30days" },
  { label: "Mois dernier", value: "lastMonth" },
  { label: "Cette année", value: "thisYear" },
  { label: "Année dernière", value: "lastYear" },
];

export function Filter() {
  const [open, setOpen] = React.useState(false);
  const [selectedDate, setSelectedDate] = React.useState<string | null>(null);
  const [selectedMedia, setSelectedMedia] = React.useState<string[]>([]);

  const toggleMedia = (media: string) => {
    setSelectedMedia((current) =>
      current.includes(media)
        ? current.filter((m) => m !== media)
        : [...current, media]
    );
  };

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <FilterIcon className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="start"
        side="left"
        className="w-[220px] p-2 shadow-lg rounded-xl border border-gray-200"
      >
        <DropdownMenuLabel className="text-sm font-semibold text-gray-900 mb-1 px-2">
          Filtres
        </DropdownMenuLabel>
        <DropdownMenuGroup className="space-y-1">
          <DropdownMenuSub>
            <DropdownMenuSubTrigger className="flex items-center justify-between w-full px-2 py-1.5 text-sm rounded-md hover:bg-gray-100 transition-colors">
              <span className="text-gray-700">
                {selectedDate
                  ? dateRanges.find((d) => d.value === selectedDate)?.label
                  : "Période"}
              </span>
            </DropdownMenuSubTrigger>
            <DropdownMenuSubContent className="p-1 min-w-[180px] rounded-lg">
              {dateRanges.map((range) => (
                <DropdownMenuItem
                  key={range.value}
                  onClick={() => setSelectedDate(range.value)}
                  className="py-1.5 px-2 text-sm rounded-md hover:bg-gray-100 transition-colors cursor-pointer"
                >
                  {range.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuSubContent>
          </DropdownMenuSub>
          <DropdownMenuSeparator className="bg-gray-200 my-1" />
          <DropdownMenuSub>
            <DropdownMenuSubTrigger className="flex items-center justify-between w-full px-2 py-1.5 text-sm rounded-md hover:bg-gray-100 transition-colors">
              <span className="text-gray-700">
                Media {selectedMedia.length > 0 && `(${selectedMedia.length})`}
              </span>
            </DropdownMenuSubTrigger>
            <DropdownMenuSubContent className="p-1 min-w-[180px] rounded-lg">
              <Command className="rounded-lg border-none">
                <CommandInput
                  placeholder="Rechercher un média..."
                  className="h-8 border-b focus:ring-0 focus:border-gray-300 px-2"
                />
                <CommandList>
                  <CommandEmpty className="text-sm text-gray-500 py-1 px-2">
                    Aucun média trouvé.
                  </CommandEmpty>
                  <CommandGroup>
                    {mediaTypes.map((media) => (
                      <CommandItem
                        key={media}
                        value={media}
                        onSelect={() => toggleMedia(media)}
                        className="flex items-center py-1.5 px-2 rounded-md hover:bg-gray-100 transition-colors cursor-pointer"
                      >
                        <div className="flex items-center gap-2">
                          <div className="w-3.5 h-3.5 border rounded flex items-center justify-center border-gray-400">
                            {selectedMedia.includes(media) && (
                              <Check className="h-2.5 w-2.5 text-blue-600" />
                            )}
                          </div>
                          <span className="text-sm text-gray-700">{media}</span>
                        </div>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
