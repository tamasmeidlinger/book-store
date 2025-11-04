import { getBook } from "@/lib/queries";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Plus, Bookmark } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

type BookPageProps = {
  params: Promise<{ bookId: string }>;
};

async function Book({ params }: BookPageProps) {
  const { bookId } = await params;
  const book = await getBook(bookId);
  if (!book) {
    return <h1>Failed to query database</h1>;
  }
  return (
    <div className="flex flex-col items-center px-4 py-22">
      <div className="grid grid-cols-1 sm:grid-cols-2 sm:grid-rows-2 max-w-4xl gap-6 w-full mb-4">
        {/* TITLE */}
        <div className="sm:order-2 flex flex-col justify-end">
          <div className=" text-center sm:text-left">
            <h1 className="font-bold text-xl">{book.title}</h1>
            <h2 className="text-lg mb-5">{`By ${book.author}`}</h2>
          </div>
        </div>
        {/* IMAGE */}
        <div className="sm:order-1 sm:row-span-2 flex flex-col justify-center items-center">
          <div className="border-2 w-80 h-100 p-3 mb-3 sm:w-full sm:max-w-sm">
            <div className="relative w-full h-full">
              <Image
                src={book.image_src}
                alt="cover"
                fill
                className="object-contain"
              />
            </div>
          </div>
          {/* PRICE */}
          <div className="w-80 sm:w-full sm:max-w-sm flex justify-between px-2">
            <p className="text-xl font-bold">{`$${book.price / 100}`}</p>
            <p className="text-xl font-bold">{book.format}</p>
          </div>
        </div>
        {/* BUTTONS */}
        <div className="sm:order-3 order-4 flex justify-center sm:justify-start">
          <div className="flex flex-col gap-2 w-80 sm:w-full max-w-100">
            <Button className="flex gap-2 text-md">
              <Plus className="w-5! h-5!" />
              Add To Basket
            </Button>
            <Button className="flex gap-2 text-md">
              <Bookmark className="w-5! h-5!" />
              Save For Later
            </Button>
          </div>
        </div>
      </div>
      {/* DETAILS */}
      <div className="w-full max-w-4xl">
        <Accordion type="multiple" defaultValue={["description"]}>
          <AccordionItem value="description">
            <AccordionTrigger className="px-4 hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50 text-lg">
              Description
            </AccordionTrigger>
            <AccordionContent>
              <p className="text-lg px-4 py-1 whitespace-pre-line">
                {book.description}
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="details">
            <AccordionTrigger className="px-4 hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50 text-lg">
              Details
            </AccordionTrigger>
            <AccordionContent>
              <div className="px-4 py-1 flex flex-col gap-5">
                <div>
                  <p className="text-lg mb-0.5">Binding</p>
                  <p>{book.format}</p>
                </div>
                <div>
                  <p className="text-lg mb-0.5">Publication Date</p>
                  <p>
                    {new Date(book.publication_date).toLocaleDateString(
                      "en-US",
                      {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      }
                    )}
                  </p>
                </div>
                <div>
                  <p className="text-lg mb-0.5">Publisher</p>
                  <p>{book.publisher}</p>
                </div>
                <div>
                  <p className="text-lg mb-0.5">Pages</p>
                  <p>{book.pages}</p>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}

export default Book;
