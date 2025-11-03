"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { menuSections } from "@/lib/placeholder-data";
import { Button } from "../ui/button";
import Link from "next/link";
import { SheetClose } from "../ui/sheet";

export default function MenuSections() {
  return (
    <Accordion type="multiple">
      {menuSections.map((section) => (
        <AccordionItem value={section.section} key={section.section}>
          <AccordionTrigger className="px-4 hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50 text-lg">
            {section.section}
          </AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-col">
              {section.subsections.map((subs) => (
                <SheetClose className="w-full" asChild key={subs.subsection}>
                  <Link className="w-full" href={subs.subsectionUrl}>
                    <Button
                      className="justify-start pl-8 w-full"
                      variant="ghost"
                    >
                      {subs.subsection}
                    </Button>
                  </Link>
                </SheetClose>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
