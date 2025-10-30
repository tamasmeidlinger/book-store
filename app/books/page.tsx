import Filter from "@/components/all-products/filter";
import Image from "next/image";
import Link from "next/link";
import { filterBooks } from "@/lib/queries";

async function Products({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string }>;
}) {
  const params = await searchParams;
  const category = params.category ?? "";
  const books = await filterBooks(category);
  if (!books) {
    return <p>No books</p>;
  }
  return (
    <div className="py-25">
      <h1 className="text-3xl font-bold ml-3 mb-5">All books</h1>
      <Filter />
      <div className="grid grid-cols-1 place-items-center">
        {books.map((book, index) => (
          <div
            className="flex flex-col shrink-0 w-full h-100 relative p-3 max-w-md"
            key={`${index}${book.title}`}
          >
            <div className="shadow-lg w-full h-[80%] self-center mb-3 relative px-2 py-6 dark:border dark:border-secondary">
              <div className="relative w-full h-full">
                <Link href={`/book/${book.id}`}>
                  <Image
                    src={book.image_src}
                    alt="cover"
                    fill
                    className="object-contain"
                  />
                </Link>
              </div>
            </div>
            <div className="w-[80%]">
              <h3 className="font-bold text-primary leading-tight mb-2">
                {book.title}
              </h3>
              <p className="text-secondary tracking-tight">{`Author: ${book.author}`}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Products;
