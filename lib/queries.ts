import "server-only";
import postgres from "postgres";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: false });

interface BestSellerBooks {
  title: string;
  author: string;
  image_src: string;
  id: number;
}

async function getBestSellers(): Promise<BestSellerBooks[] | null> {
  try {
    const bestSellers = await sql<
      BestSellerBooks[]
    >`SELECT title, author, image_src, id FROM books ORDER BY n_sales DESC LIMIT 10`;
    return bestSellers;
  } catch (err) {
    console.error(err);
    return null;
  }
}

interface BookInfo {
  title: string;
  author: string;
  image_src: string;
  description: string;
  price: number;
  format: string;
  publisher: string;
  publication_date: string;
  pages: number;
}

async function getBook(bookid: string) {
  try {
    const book = await sql<
      BookInfo[]
    >`SELECT title, author, image_src, description, price, format, publisher, publication_date, pages FROM books WHERE id = ${bookid}`;
    return book[0];
  } catch (err) {
    console.error(err);
    return null;
  }
}

interface FilteredBooks {
  title: string;
  author: string;
  image_src: string;
  id: string;
}

export async function filterBooks(category: string) {
  try {
    const filteredBooks = sql<
      FilteredBooks[]
    >`SELECT title, author, image_src, id FROM books WHERE genre =${category}`;
    return filteredBooks;
  } catch {
    return null;
  }
}

export { getBestSellers, getBook };
