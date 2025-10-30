"use client";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { categories } from "@/lib/filter-options";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";

function FilterAccordions() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const activeCategory = searchParams.get("category") ?? "";

  function handleCheckboxChange(subgenre: string, checked: boolean) {
    const params = new URLSearchParams(searchParams.toString());

    if (checked) {
      params.set("category", subgenre); // only one allowed
    } else {
      params.delete("category"); // unselect all
    }

    router.push(`?${params.toString()}`);
  }
  return (
    <Accordion type="multiple">
      {categories.map((genre) => (
        <AccordionItem value={genre.genre} key={genre.genre}>
          <AccordionTrigger className="px-4 hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50 text-lg mb-2">
            {genre.genre}
          </AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-col">
              {genre.subgenres.map((subgenre) => (
                <Label
                  key={subgenre}
                  className="hover:cursor-pointer hover:bg-accent"
                >
                  <div className="w-full flex gap-3 items-center text-xl px-6 py-1">
                    <Checkbox
                      id={`toggle${subgenre}`}
                      checked={activeCategory === subgenre}
                      onCheckedChange={(checked) =>
                        handleCheckboxChange(subgenre, checked === true)
                      }
                    />
                    {subgenre}
                  </div>
                </Label>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

export default FilterAccordions;
