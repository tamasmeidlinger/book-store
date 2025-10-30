import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
  SheetTitle,
} from "../ui/sheet";
import { ListFilter } from "lucide-react";
import FilterAccordions from "./accordions";

function Filter() {
  return (
    <Sheet>
      <SheetTrigger>
        <div className="flex items-center gap-3">
          <h2 className="text-2xl ml-3 font-bold">Filters</h2>
          <ListFilter strokeWidth={3} />
        </div>
      </SheetTrigger>
      <SheetContent className="pt-1" side="left">
        <SheetHeader>
          <SheetTitle className="font-bold text-2xl">Filters</SheetTitle>
        </SheetHeader>
        <div>
          <FilterAccordions />
        </div>
      </SheetContent>
    </Sheet>
  );
}

export default Filter;
