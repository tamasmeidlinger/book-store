"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Trash2 } from "lucide-react";

type Favorite = {
  id: string;
  title: string;
  price: number;
  image_src: string;
};

function Basket() {
  const [basket, setBasket] = useState<Favorite[]>([]);

  // Load favorites on mount
  useEffect(() => {
    const stored = localStorage.getItem("basket");
    if (stored) {
      queueMicrotask(() => {
        setBasket(JSON.parse(stored));
      });
    }
  }, []);

  // Delete item and re-render
  const handleDelete = (id: string) => {
    const newBasket = basket.filter((b) => b.id !== id);
    localStorage.setItem("basket", JSON.stringify(newBasket));
    setBasket(newBasket);
    window.dispatchEvent(new Event("basket-updated"));
  };

  if (basket.length === 0) {
    return (
      <div className="py-22">
        <p className="text-gray-600 text-center">Your basket is empty.</p>
      </div>
    );
  }

  const totalPrice = basket.reduce((total, currentPrice) => {
    return Number(total) + Number(currentPrice.price);
  }, 0);
  return (
    <div className="py-20 px-5 flex flex-col justify-center md:items-start">
      <div className="max-w-5xl sm:min-w-lg md:min-w-lg">
        {basket.map((i) => (
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
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mb-3 shadow-lg py-3 px-3">
        <h2 className="font-bold text-xl">Basket:</h2>
        <p className="font-bold">
          Items: <span className="font-normal">{basket.length}</span>
        </p>
        <p className="font-bold">
          Total: <span className="font-normal">{`$${totalPrice / 100}`}</span>
        </p>
      </div>
    </div>
  );
}

export default Basket;
