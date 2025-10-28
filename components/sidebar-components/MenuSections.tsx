"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { menuSections } from "@/lib/placeholder-data";
import { Button } from "../ui/button";

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
                <Button
                  className="justify-start pl-8"
                  variant="ghost"
                  key={subs.subsection}
                >
                  {subs.subsection}
                </Button>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
