"use client";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { categoriesOptions } from "@/lib/filter-options";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";

function FilterAccordions() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const categories = searchParams.getAll("category") ?? [];

  const genre = searchParams.get("genre") ?? "";
  const categoriesFiltered = categoriesOptions.filter((o) =>
    genre ? o.genre === genre : true
  );

  function handleCheckboxChange(subgenre: string, checked: boolean) {
    const params = new URLSearchParams(searchParams.toString());

    if (checked) {
      if (!categories.includes(subgenre)) {
        params.append("category", subgenre);
      }
    } else {
      const newCategories = categories.filter((c) => c !== subgenre);
      params.delete("category");
      newCategories.forEach((c) => params.append("category", c));
    }

    router.push(`?${params.toString()}`);
  }
  return (
    <Accordion type="multiple">
      {categoriesFiltered.map((genre) => (
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
                      checked={categories.includes(subgenre)}
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
