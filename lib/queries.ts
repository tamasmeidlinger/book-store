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
}

async function getBook(bookid: string) {
  try {
    const book = await sql<
      BookInfo[]
    >`SELECT title, author, image_src, description FROM books WHERE id = ${bookid}`;
    return book[0];
  } catch (err) {
    console.error(err);
    return null;
  }
}

export { getBestSellers, getBook };
