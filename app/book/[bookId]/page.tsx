import { getBook } from "@/lib/queries";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Plus, Bookmark } from "lucide-react";

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
    <div className="flex justify-center px-4 py-22">
      <div className="grid grid-cols-1 sm:grid-cols-2 sm:grid-rows-2 max-w-5xl gap-6 w-full">
        {/* TITLE */}
        <div className="sm:order-2 flex flex-col justify-end">
          <div className=" text-center sm:text-left">
            <h1 className="font-bold text-xl">{book.title}</h1>
            <h2 className="text-lg mb-5">{`By ${book.author}`}</h2>
          </div>
        </div>
        {/* IMAGE */}
        <div className="sm:order-1 sm:row-span-2 flex justify-center">
          <div className="border-2 w-80 h-100 p-3 sm:w-full">
            <div className="relative w-full h-full">
              <Image
                src={book.image_src}
                alt="cover"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>
        {/* BUTTONS */}
        <div className="sm:order-3 flex justify-center sm:justify-start">
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
    </div>
  );
}

export default Book;
