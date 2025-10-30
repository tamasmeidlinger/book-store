import { getBestSellers } from "@/lib/queries";
import Image from "next/image";
import Link from "next/link";

async function BestSellers(): Promise<React.ReactElement | null> {
  const bestSellers = await getBestSellers();

  if (!bestSellers) {
    return <p>Something went wrong</p>;
  }
  return (
    <div className="w-full flex flex-col">
      <h2 className="ml-3 text-3xl font-bold">Best Sellers</h2>
      <div className="flex gap-2 h-100 w-full overflow-x-auto flex-nowrap p-3 scroll-smooth scrollbar [scrollbar-width:none] ">
        {bestSellers.map((book, index) => (
          <div
            className="flex flex-col shrink-0 w-70 h-full relative p-3"
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

export default BestSellers;
