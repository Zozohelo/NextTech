import { useState } from "react";

const DUMMY_PRODUCTS = [
  {
    id: 1,
    name: "iPhone 15 Pro",
    price: 499990,
    image: "/images/iphon15pro.png",
    category: "Telefon",
    badge: "Új",
  },
  {
    id: 2,
    name: "Samsung Galaxy S24 Ultra",
    price: 429990,
    image: "/images/samsungs24.png",
    category: "Telefon",
    badge: "",
  },
  {
    id: 3,
    name: "iPad Air 5",
    price: 299990,
    image: "/images/ipad.png",
    category: "Tablet",
    badge: "Akció",
  },
  {
    id: 4,
    name: "Samsung Galaxy Tab S9",
    price: 249990,
    image: "/images/samsungtab.png",
    category: "Tablet",
    badge: "",
  },
  {
    id: 5,
    name: "MacBook Air M3",
    price: 649990,
    image: "/images/macbook.png",
    category: "Számítógép",
    badge: "Top",
  },
  {
    id: 6,
    name: "Iphone 16",
    price: 499990,
    image: "/images/iphone16.png",
    category: "Telefon",
    badge: "",
  },
];

const CATEGORIES = ["Mind", "Telefon", "Tablet", "Számítógép"];

type Product = (typeof DUMMY_PRODUCTS)[number];

const Products = () => {
  const [selectedCategory, setSelectedCategory] = useState("Mind");
  const [cart, setCart] = useState<Product[]>([]);

  const filteredProducts =
    selectedCategory === "Mind"
      ? DUMMY_PRODUCTS
      : DUMMY_PRODUCTS.filter((p) => p.category === selectedCategory);

  const handleAddToCart = (product: Product) => {
    setCart([...cart, product]);
  };

  return (
    <section className="w-full mx-auto p-10 bg-gray-950" id="products">
      <h2 className="text-4xl font-extrabold mb-8 text-center text-white drop-shadow-lg">
        Termékek
      </h2>

      {/* Szűrők */}
      <div className="flex flex-wrap justify-center gap-4 mb-10">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            className={`px-5 py-2 rounded-full font-semibold transition-all border-2
              ${
                selectedCategory === cat
                  ? "bg-blue-600 text-white border-blue-600 scale-110 shadow-lg"
                  : "bg-gray-900 text-gray-200 border-gray-600 hover:bg-blue-900 hover:text-white"
              }`}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Termék kártyák */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="bg-gray-900 rounded-2xl shadow-xl p-6 flex flex-col items-center transition-transform hover:scale-105 hover:shadow-blue-600/40 relative"
          >
            {product.badge && (
              <span className="absolute top-4 left-4 bg-red-700 text-xs font-bold text-white px-3 py-1 rounded-full shadow-md animate-pulse uppercase">
                {product.badge}
              </span>
            )}
            <img
              src={product.image}
              alt={product.name}
              className="w-32 h-32 object-contain mb-4 rounded-xl"
            />
            <h3 className="text-xl text-white font-bold mb-2 text-center">
              {product.name}
            </h3>
            <div className="text-slate-400 font-bold text-lg mb-3">
              {product.price.toLocaleString()} Ft
            </div>
            <div className="text-gray-400 text-sm mb-4">{product.category}</div>
            <button
              className="mt-auto bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-2 rounded-xl transition-all shadow-lg hover:shadow-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onClick={() => handleAddToCart(product)}
            >
              Részletek
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Products;
