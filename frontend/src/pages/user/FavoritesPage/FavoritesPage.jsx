
import { useState } from "react";
import { Heart, ShoppingCart } from "lucide-react";
import ProductCard from "@/components/utility/ProductCard";
import { Button } from "@nextui-org/button";

// Mock data for favorite products
const initialFavorites = [
  { id: 1, name: "Wireless Earbuds", price: 79.99, image: "/placeholder.svg", rating: 4.5 },
  { id: 2, name: "Smart Watch", price: 199.99, image: "/placeholder.svg", rating: 4.8 },
  { id: 3, name: "Portable Charger", price: 49.99, image: "/placeholder.svg", rating: 4.3 },
  { id: 4, name: "Bluetooth Speaker", price: 89.99, image: "/placeholder.svg", rating: 4.6 },
];

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState(initialFavorites);
  const [cart, setCart] = useState([]);

  const removeFromFavorites = (id) => {
    setFavorites(favorites.filter((item) => item.id !== id));
  };

  const addToCart = (id) => {
    if (!cart.includes(id)) {
      setCart([...cart, id]);
    }
  };

  return (
    <div className="px-24 py-8">
      <h1 className="text-3xl font-bold mb-8 flex items-center">
        <Heart className="mr-2 text-red-500" /> My Favorites
      </h1>

      {favorites.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-xl text-gray-600">You haven't added any favorites yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {favorites.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={() => addToCart(product.id)}
              onRemoveFromFavorites={() => removeFromFavorites(product.id)}
              inCart={cart.includes(product.id)}
            />
          ))}
        </div>
      )}

      {favorites.length > 0 && (
        <div className="mt-8 text-center">
          <Button variant="outline" className="mr-4">
            Continue Shopping
          </Button>
          <Button>
            <ShoppingCart className="mr-2 h-4 w-4" />
            View Cart ({cart.length})
          </Button>
        </div>
      )}
    </div>
  );
}
