"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Bookmark } from "lucide-react";
import type { BookInfo } from "@/lib/queries";

function FbButtons({ book }: { book: BookInfo }) {
  const [inBasket, setInBasket] = useState(false);
  const [inFavorites, setInFavorites] = useState(false);

  useEffect(() => {
    const checkLocalStorage = () => {
      const basket: Partial<BookInfo>[] = JSON.parse(
        localStorage.getItem("basket") || "[]"
      );
      const favorites: Partial<BookInfo>[] = JSON.parse(
        localStorage.getItem("favorites") || "[]"
      );

      setInBasket(basket.some((b) => String(b.id) === String(book.id)));
      setInFavorites(favorites.some((b) => String(b.id) === String(book.id)));
    };

    setTimeout(checkLocalStorage, 0);
  }, [book.id]);

  const toggleBasket = () => {
    const basket: Partial<BookInfo>[] = JSON.parse(
      localStorage.getItem("basket") || "[]"
    );

    const exists = basket.some((b) => String(b.id) === String(book.id));
    let updated: Partial<BookInfo>[];

    if (exists) {
      updated = basket.filter((b) => String(b.id) !== String(book.id));
      setInBasket(false);
    } else {
      const bookData = {
        id: book.id,
        title: book.title,
        price: book.price,
        image_src: book.image_src,
      };
      updated = [...basket, bookData];
      setInBasket(true);
    }

    localStorage.setItem("basket", JSON.stringify(updated));
    window.dispatchEvent(new Event("basket-updated"));
  };

  const toggleFavorites = () => {
    const favorites: Partial<BookInfo>[] = JSON.parse(
      localStorage.getItem("favorites") || "[]"
    );

    const exists = favorites.some((b) => String(b.id) === String(book.id));
    let updated: Partial<BookInfo>[];

    if (exists) {
      updated = favorites.filter((b) => String(b.id) !== String(book.id));
      setInFavorites(false);
    } else {
      const bookData = {
        id: book.id,
        title: book.title,
        price: book.price,
        image_src: book.image_src,
      };
      updated = [...favorites, bookData];
      setInFavorites(true);
    }

    localStorage.setItem("favorites", JSON.stringify(updated));
    window.dispatchEvent(new Event("favorites-updated"));
  };

  return (
    <>
      <Button onClick={toggleBasket} className="flex gap-2 text-md">
        <Plus className="w-5 h-5" />
        {inBasket ? "Remove from Basket" : "Add to Basket"}
      </Button>

      <Button onClick={toggleFavorites} className="flex gap-2 text-md">
        <Bookmark className="w-5 h-5" />
        {inFavorites ? "Remove from Wishlist" : "Add to Wishlist"}
      </Button>
    </>
  );
}

export default FbButtons;
