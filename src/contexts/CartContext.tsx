import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { IDevice } from "../utils/util";

export interface CartItem extends IDevice {
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (device: IDevice) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
};

// Egyedi kulcs generálása user-hez kötve
function getCartKey() {
  try {
    const userStr = localStorage.getItem("user");
    if (userStr) {
      const user = JSON.parse(userStr);
      // Az ID legyen a preferált (biztosan egyedi), ha nincs, akkor email vagy guest
      if (user?.id) return `cart_${user.id}`;
      if (user?.email) return `cart_${user.email}`;
    }
  } catch (e) {}
  return "cart_guest";
}

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  // Mindig az aktuális user-hez tartozó kosarat olvassa be
  useEffect(() => {
    const loadCart = () => {
      const cartKey = getCartKey();
      const stored = localStorage.getItem(cartKey);
      setCart(stored ? JSON.parse(stored) : []);
    };

    loadCart();

    // Figyeljük a login/logout-ot (user váltás)
    window.addEventListener("storage", loadCart);

    // Figyeljük, ha a localStorage-ben a user változik (login/logout)
    const userCheck = setInterval(() => {
      loadCart();
    }, 1500);

    return () => {
      window.removeEventListener("storage", loadCart);
      clearInterval(userCheck);
    };
  }, []);

  // Ha változik a kosár, mindig az aktuális user kulcsához mentjük
  useEffect(() => {
    const cartKey = getCartKey();
    localStorage.setItem(cartKey, JSON.stringify(cart));
  }, [cart]);

  const addToCart = (device: IDevice) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === device.id);
      if (existing) {
        return prev.map((item) =>
          item.id === device.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prev, { ...device, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (id: number) => {
    setCart((prev) => prev.filter((item) => Number(item.id) !== id));
  };

  const updateQuantity = (id: number, quantity: number) => {
    setCart((prev) =>
      prev.map((item) =>
        Number(item.id) === id ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};
