import { useCart } from "../contexts/CartContext";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { toast } from "react-toastify";

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();
  const navigate = useNavigate();
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleOrder = async () => {
    const token = localStorage.getItem("auth_token");
    if (!token) {
      alert("Be kell jelentkezned rendeléshez!");
      navigate("/login");
      return;
    }
    try {
      const res = await fetch("http://localhost:8000/api/orders", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          items: cart,
          total,
        }),
      });
      if (!res.ok) {
        const t = await res.text();
        throw new Error("Hiba a rendelés leadásakor: " + t);
      }
      clearCart();
      toast.success("Köszönjük a rendelésed!");
      navigate("/orders"); // vagy ahova szeretnéd
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-800 via-gray-900 to-indigo-950 pt-20">
      <Navbar />

      <div className="max-w-4xl mx-auto py-12 px-3">
        <div className="flex items-center gap-3 mb-8">
          <Link
            to="/"
            className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-xl shadow transition"
          >
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
              <path
                d="M15 19l-7-7 7-7"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Vissza a főoldalra
          </Link>
          <h2 className="text-3xl text-white font-extrabold tracking-tight ml-2">
            Kosár
          </h2>
        </div>

        {cart.length === 0 ? (
          <div className="flex justify-center items-center min-h-[40vh]">
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-2xl p-10 text-center flex flex-col items-center w-full">
              <img
                className="h-30 w-30 rounded-2xl"
                src="/public/images/no-buying.gif"
                alt=""
              />
              <h2 className="text-2xl font-bold text-white mb-2 mt-2">
                A kosarad üres
              </h2>
              <p className="text-slate-400 mb-4">
                Nézz körül, és tegyél valamit a kosárba!
              </p>
              <Link
                to="/products"
                className="mt-2 inline-block bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-xl font-semibold shadow-md transition-all"
              >
                Böngészés a termékek között
              </Link>
            </div>
          </div>
        ) : (
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-2xl p-6 md:p-10">
            <div className="overflow-x-auto">
              <table className="w-full text-white">
                <thead>
                  <tr>
                    <th className="p-3 text-left font-semibold">Termék</th>
                    <th className="p-3 font-semibold text-center">Egységár</th>
                    <th className="p-3 font-semibold text-center">Mennyiség</th>
                    <th className="p-3 font-semibold text-center">Összesen</th>
                    <th className="p-3"></th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map((item) => (
                    <tr
                      key={item.id}
                      className="border-b border-gray-700 last:border-b-0 group hover:bg-gray-700/30 transition"
                    >
                      <td className="flex items-center gap-4 p-3 min-w-[180px]">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-14 h-14 object-contain rounded-xl ring-2 ring-indigo-400/40 shadow-md"
                        />
                        <span className="font-medium">{item.name}</span>
                      </td>
                      <td className="p-3 text-center">
                        {item.price.toLocaleString()} Ft
                      </td>
                      <td className="p-3 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            className="bg-gray-700 hover:bg-gray-600 text-white rounded-lg px-2 py-1 font-bold text-lg"
                            onClick={() =>
                              updateQuantity(
                                Number(item.id),
                                Math.max(1, item.quantity - 1)
                              )
                            }
                            aria-label="Mennyiség csökkentése"
                          >
                            –
                          </button>
                          <input
                            type="number"
                            min={1}
                            value={item.quantity}
                            onChange={(e) =>
                              updateQuantity(
                                Number(item.id),
                                Math.max(1, Number(e.target.value))
                              )
                            }
                            className="w-14 p-1 rounded bg-gray-700 text-white text-center border border-gray-600 focus:border-indigo-500 focus:outline-none"
                          />
                          <button
                            className="bg-gray-700 hover:bg-gray-600 text-white rounded-lg px-2 py-1 font-bold text-lg"
                            onClick={() =>
                              updateQuantity(Number(item.id), item.quantity + 1)
                            }
                            aria-label="Mennyiség növelése"
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td className="p-3 text-center">
                        {(item.price * item.quantity).toLocaleString()} Ft
                      </td>
                      <td className="p-3 text-center">
                        <button
                          className="bg-red-500 hover:bg-red-600 text-white rounded-xl px-4 py-2 shadow transition"
                          onClick={() => removeFromCart(Number(item.id))}
                        >
                          <span className="hidden md:inline">Törlés</span>
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                            className="inline-block md:ml-2"
                          >
                            <path
                              d="M6 6l8 8M6 14L14 6"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                            />
                          </svg>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* Végösszeg, gombok */}
            <div className="flex flex-col md:flex-row md:justify-between items-center mt-8 gap-4">
              <div className="text-2xl text-white font-bold">
                Végösszeg:{" "}
                <span className="text-indigo-400">
                  {total.toLocaleString()} Ft
                </span>
              </div>
              <div className="flex gap-3">
                <button
                  className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-2 rounded-xl shadow"
                  onClick={clearCart}
                >
                  Kosár ürítése
                </button>
                <button
                  onClick={handleOrder}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-2 rounded-xl font-bold shadow-lg"
                >
                  Megrendelés
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
