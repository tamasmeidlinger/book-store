"use client";
import { useEffect, useState } from "react";
import { ShoppingCart, Heart, CircleUser } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge"; // use the alias for clarity

function IconsBar() {
  const [basketCount, setBasketCount] = useState(0);
  const [favoritesCount, setFavoritesCount] = useState(0);

  useEffect(() => {
    const updateCounts = () => {
      const basket = JSON.parse(localStorage.getItem("basket") || "[]");
      const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
      setBasketCount(basket.length);
      setFavoritesCount(favorites.length);
    };

    updateCounts();

    window.addEventListener("basket-updated", updateCounts);
    window.addEventListener("favorites-updated", updateCounts);

    return () => {
      window.removeEventListener("basket-updated", updateCounts);
      window.removeEventListener("favorites-updated", updateCounts);
    };
  }, []);

  return (
    <div className="flex gap-5">
      {/* Favorites */}
      <Link href="/wishlist" className="relative">
        <Heart size={29} />
        {favoritesCount > 0 && (
          <Badge className="absolute -top-1 -right-2 h-5 min-w-5 rounded-full px-1 font-mono tabular-nums flex items-center justify-center">
            {favoritesCount}
          </Badge>
        )}
      </Link>

      {/* Basket */}
      <Link href="/basket" className="relative">
        <ShoppingCart size={29} />
        {basketCount > 0 && (
          <Badge className="absolute -top-1 -right-2 h-5 min-w-5 rounded-full px-1 font-mono tabular-nums flex items-center justify-center">
            {basketCount}
          </Badge>
        )}
      </Link>

      {/* User */}
      <CircleUser size={29} />
    </div>
  );
}

export default IconsBar;
