"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { MapPin, Check, ChevronsUpDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface MultiSelectProps {
  options: string[];
  selected: string[];
  onChange: (value: string) => void;
  placeholder?: string;
}

export function MultiSelect({ options, selected, onChange, placeholder = "Select options..." }: MultiSelectProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="space-y-2">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" role="combobox" className="w-full justify-between bg-transparent">
            {selected.length === 0 ? placeholder : `${selected.length} selected`}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0 bg-gray-900/95 border-white/10">
          <div className="max-h-[200px] overflow-auto custom-scrollbar">
            {options.map((option) => (
              <div
                key={option}
                className={`
                  relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none
                  ${selected.includes(option) ? "bg-blue-500/20 text-white" : "text-gray-200 hover:bg-blue-500/10"}
                `}
                onClick={() => onChange(option)}
              >
                <div className="flex items-center gap-2 min-w-0">
                  <div className="flex h-4 w-4 items-center justify-center rounded border border-white/20">
                    {selected.includes(option) && <Check className="h-3 w-3" />}
                  </div>
                  <MapPin className="h-3 w-3" />
                  <span>{option}</span>
                </div>
              </div>
            ))}
          </div>
        </PopoverContent>
      </Popover>

      {selected.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {selected.map((item) => (
            <Badge key={item} variant="secondary" className="bg-blue-500/20 text-white">
              {item}
              <button onClick={() => onChange(item)} className="ml-1 hover:text-red-300">
                ×
              </button>
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
}
