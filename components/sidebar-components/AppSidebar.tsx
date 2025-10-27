import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetHeader,
  SheetClose,
  SheetFooter,
} from "../ui/sheet";
import { Menu } from "lucide-react";

import MenuSections from "./MenuSections";
import { ModeToggle } from "../theme-swticher";

function AppSidebar() {
  return (
    <>
      <Sheet>
        <SheetTrigger>
          <Menu />
        </SheetTrigger>

        <SheetContent side="left">
          <SheetHeader>
            <SheetTitle className="font-bold">BookStore</SheetTitle>
            <SheetClose />
          </SheetHeader>
          <MenuSections />
          <SheetFooter>
            <ModeToggle />
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </>
  );
}

export default AppSidebar;
