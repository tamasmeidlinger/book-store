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
import Link from "next/link";

function AppSidebar() {
  return (
    <>
      <Sheet>
        <SheetTrigger>
          <Menu size={29} />
        </SheetTrigger>

        <SheetContent className="pt-1" side="left">
          <SheetHeader>
            <SheetTitle className="font-bold text-2xl">
              <Link href="/">
                <SheetClose>BookStore</SheetClose>
              </Link>
            </SheetTitle>
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
