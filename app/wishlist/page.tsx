"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Trash2, ShoppingCart } from "lucide-react";

type Favorite = {
  id: string;
  title: string;
  price: number;
  image_src: string;
};

function Wishlist() {
  const [favorites, setFavorites] = useState<Favorite[]>([]);

  // Load favorites on mount
  useEffect(() => {
    const stored = localStorage.getItem("favorites");
    if (stored) {
      queueMicrotask(() => {
        setFavorites(JSON.parse(stored));
      });
    }
  }, []);

  // Delete item and re-render
  const handleDelete = (id: string) => {
    const newFavorites = favorites.filter((b) => b.id !== id);
    localStorage.setItem("favorites", JSON.stringify(newFavorites));
    setFavorites(newFavorites);
    window.dispatchEvent(new Event("favorites-updated"));
  };

  const handleBasket = (id: string) => {
    const basket: Favorite[] = JSON.parse(
      localStorage.getItem("basket") || "[]"
    );
    const currentIds = basket.map((b) => b.id);

    if (currentIds.includes(id)) {
      console.log("Item already added to basket");
      return;
    } else {
      const item = favorites.find((b) => b.id === id);
      if (!item) return;
      basket.push(item);
      localStorage.setItem("basket", JSON.stringify(basket));
      window.dispatchEvent(new Event("basket-updated"));
    }
  };

  if (favorites.length === 0) {
    return (
      <div className="py-22">
        <p className="text-gray-600 text-center">Your wishlist is empty.</p>
      </div>
    );
  }
  return (
    <div className="py-20 px-5 flex justify-center md:justify-start">
      <div className="max-w-5xl sm:min-w-lg md:min-w-lg">
        {favorites.map((i) => (
          <div key={i.id} className="mb-3 flex shadow-lg py-3 pl-1 pr-3">
            <div className="relative w-32 h-32 mr-2">
              <Image
                src={i.image_src}
                alt="product-image"
                fill
                className="object-contain"
              />
            </div>
            <div className="flex flex-col">
              <p className="font-bold text-lg">{i.title}</p>
              <p className="font-medium text-lg">${Number(i.price) / 100}</p>
              <div className="flex gap-3 items-end h-full">
                <button onClick={() => handleDelete(i.id)}>
                  <Trash2 />
                </button>
                <button onClick={() => handleBasket(i.id)}>
                  <ShoppingCart />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Wishlist;
