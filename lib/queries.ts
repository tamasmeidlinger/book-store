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
    >`SELECT title.book_title AS title,
sales.n_sales, image.src AS image_src, author.name AS author, book.id
FROM sales
JOIN book
ON book.id = sales.book_id
JOIN title
ON title.id = book.title_id
JOIN image
ON image.id = book.image_id
JOIN author
ON author.id = book.author_id
ORDER BY n_sales DESC
LIMIT 5`;
    return bestSellers;
  } catch (err) {
    console.error(err);
    return null;
  }
}

export interface BookInfo {
  id: string;
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
    const book = await sql<BookInfo[]>`SELECT
    book.id,
   title.book_title AS title,
author.name AS author,
image.src AS image_src,
descriptions.description AS description,
book.price AS price,
format.name AS format,
publisher.name AS publisher,
book.publication_date,
book.pages
FROM book
INNER JOIN title
ON title.id = book.title_id
INNER JOIN author
ON author.id = book.author_id
INNER JOIN image
ON image.id = book.image_id
INNER JOIN descriptions
ON descriptions.id = book.description_id
INNER JOIN format
ON format.id = book.format_id
INNER JOIN publisher
ON publisher.id = book.publisher_id
WHERE book.id = ${bookid};
`;
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

export async function filterBooks(
  categories: string[] | null,
  genre: string | string[]
) {
  const genreId = genre.includes("Fiction") ? 1 : 2;
  // ✅ If no category filter -> return all books
  if ((!categories || categories.length === 0) && genre.length === 0) {
    return sql<FilteredBooks[]>`
      SELECT title.book_title AS title,
             author.name AS author,
             image.src AS image_src,
             book.id
      FROM book
      JOIN title ON title.id = book.title_id
      JOIN author ON author.id = book.author_id
      JOIN image ON image.id = book.image_id
      
      
    `;
  } else if (genre && categories?.length === 0) {
    return sql<FilteredBooks[]>`
      SELECT title.book_title AS title,
             author.name AS author,
             image.src AS image_src,
             book.id
      FROM book
      JOIN title ON title.id = book.title_id
      JOIN author ON author.id = book.author_id
      JOIN image ON image.id = book.image_id
      WHERE book.genre_id = ${genreId}
      
    `;
  } else if (categories && genre.length === 0) {
    return sql<FilteredBooks[]>`
    SELECT title.book_title AS title,
           author.name AS author,
           image.src AS image_src,
           book.id
    FROM book
    JOIN title ON title.id = book.title_id
    JOIN author ON author.id = book.author_id
    JOIN image ON image.id = book.image_id
    JOIN book_subgenre ON book_subgenre.book_id = book.id
    JOIN subgenre ON subgenre.id = book_subgenre.subgenre_id
    WHERE subgenre.name = ANY(${categories})
      
    `;
  }

  // ✅ If some categories selected -> filter by them
  return sql<FilteredBooks[]>`
    SELECT title.book_title AS title,
           author.name AS author,
           image.src AS image_src,
           book.id
    FROM book
    JOIN title ON title.id = book.title_id
    JOIN author ON author.id = book.author_id
    JOIN image ON image.id = book.image_id
    JOIN book_subgenre ON book_subgenre.book_id = book.id
    JOIN subgenre ON subgenre.id = book_subgenre.subgenre_id
    WHERE subgenre.name = ANY(${categories})
    AND book.genre_id = ${genreId}
  `;
}

export { getBestSellers, getBook };
