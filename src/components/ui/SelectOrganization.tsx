"use client";

import * as React from "react";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";

import { cn } from "~/utils/utils";
import Button from "~/components/ui/Button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "~/components/ui/Command";
import { Popover, PopoverContent, PopoverTrigger } from "./Popover";
import { api } from "~/utils/api";
import { Spinner } from "../ui/LoadingSkeleton";
import { ControllerRenderProps } from "react-hook-form";
import { IOrganizationSchema } from "~/pages/messages";

interface Props {
  field: ControllerRenderProps<IOrganizationSchema, "alphanumeric">;
}

export default function OrganizationSelector({ field }: Props) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  const { data, isLoading } = api.organization.all.useQuery();

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className=" justify-between"
        >
          {value
            ? data?.find(
                (organization) =>
                  organization.alphaNumerics.toLowerCase() ===
                  value.toLowerCase(),
              )?.name
            : "Select Organization..."}

          <CaretSortIcon className=" h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className=" p-0">
        <Command>
          <CommandInput placeholder="Select Alphanumeric..." className="h-9" />
          {isLoading && <Spinner />}
          <CommandEmpty>No Organization Found</CommandEmpty>
          <CommandGroup>
            {data?.map((organization) => (
              <CommandItem
                // key={organization.id}
                // value={organization.alphaNumerics}
                className="cursor-pointer"
                // onSelect={(currentValue) => {
                //   setValue(currentValue === value ? "" : currentValue);
                //   field.onChange(organization.id);
                //   setOpen(false);
                // }}
              >
                {/* {organization.alphaNumerics} */}

                <CheckIcon
                  className={cn(
                    "ml-auto h-4 w-4",
                    value === organization.alphaNumerics
                      ? "opacity-100"
                      : "opacity-0",
                  )}
                />
              </CommandItem>
            ))}

            {data?.length === 0 && <p>Hello World</p>}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
