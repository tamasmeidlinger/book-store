"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { menuSections } from "@/lib/placeholder-data";

export default function MenuSections() {
  return (
    <Accordion type="multiple">
      {menuSections.map((section) => (
        <AccordionItem value={section.section} key={section.section}>
          <AccordionTrigger className="px-4 hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50">
            {section.section}
          </AccordionTrigger>
          <AccordionContent>
            {section.subsections.map((subs) => (
              <div key={subs.subsection}>{subs.subsection}</div>
            ))}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
