import React, { useEffect, useState } from "react";
import Navbar from "../Navbar";
import { toast } from "react-toastify";
import { FaTrashAlt, FaShoppingBag } from "react-icons/fa";
import { Spiral } from "ldrs/react";

const Orders = () => {
  const token = localStorage.getItem("auth_token");
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Rendelések lekérése
  const fetchOrders = () => {
    setLoading(true);
    setError(null);
    fetch("http://localhost:8000/api/orders", {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    })
      .then(async (res) => {
        if (!res.ok) throw new Error("Hiba a rendelések lekérdezésekor!");
        const data = await res.json();
        setOrders(data);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    if (!token) return;
    fetchOrders();
    // eslint-disable-next-line
  }, [token]);

  // Rendelés törlése
  const handleDelete = async (orderId: number) => {
    if (!window.confirm("Biztosan törlöd ezt a rendelést?")) return;
    try {
      const res = await fetch(`http://localhost:8000/api/orders/${orderId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });
      toast.success("Rendelés sikeresen törölve!");
      if (!res.ok) {
        const t = await res.text();
        throw new Error(t || "Hiba a törlés során!");
      }
      setOrders(orders.filter((o) => o.id !== orderId));
    } catch (err: any) {
      alert("Hiba a törlés során: " + err.message);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-gray-800 via-gray-900 to-indigo-950 pt-20 px-2 pb-10">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-8 mt-8 flex items-center gap-3">
            <FaShoppingBag className="text-indigo-400" /> Rendeléseim
          </h2>
          {loading ? (
            <div className="absolute inset-0 flex justify-center items-center min-h-screen z-20">
              <Spiral size="64" speed="1" color="blue" />
            </div>
          ) : error ? (
            <div className="text-red-400">{error}</div>
          ) : orders.length === 0 ? (
            <div className=" flex flex-col absolute inset-0 justify-center items-center min-h-screen ">
              <img
                className="h-50 w-50"
                src="/public/images/no_order.png"
                alt=""
              />
              <h1 className="text-3xl font-bold text-center text-white">
                Sajnáljuk, de jelenleg még nincsen rendelésed!
              </h1>
            </div>
          ) : (
            <div className="grid gap-8">
              {orders.map((order) => (
                <div
                  key={order.id}
                  className="bg-gradient-to-br from-gray-900/90 via-gray-900/70 to-gray-800/70 border border-indigo-600/40 rounded-2xl shadow-xl p-0 overflow-hidden group transition-all"
                >
                  {/* Rendelés fejléce */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-7 py-5 border-b border-indigo-800/40 bg-gradient-to-r from-gray-950/80 to-indigo-900/60">
                    <div className="flex items-center gap-5">
                      <div className="font-bold text-indigo-400 text-lg">
                        #{order.id}
                      </div>
                      <span className="inline-block bg-indigo-700/80 text-white text-xs font-bold px-3 py-1 rounded-full">
                        {new Date(order.created_at).toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="text-white/80 font-bold text-lg">
                        Összesen:{" "}
                        <span className="text-indigo-300 text-xl font-extrabold">
                          {order.total_price.toLocaleString()} Ft
                        </span>
                      </div>
                      <button
                        className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white rounded-xl px-4 py-2 font-bold shadow transition-all text-sm"
                        onClick={() => handleDelete(order.id)}
                        title="Rendelés törlése"
                      >
                        <FaTrashAlt /> Törlés
                      </button>
                    </div>
                  </div>
                  {/* Termékek gridje */}
                  <div className="p-6 bg-gradient-to-br from-gray-800/70 via-gray-900/30 to-indigo-900/20">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      {order.items.map((item: any) => (
                        <div
                          key={item.id}
                          className="flex items-center gap-4 bg-gray-900/70 border border-gray-800 rounded-xl px-3 py-3 shadow hover:shadow-indigo-900/30 transition-all"
                        >
                          <img
                            src={item.image}
                            alt={item.product_name}
                            className="w-16 h-16 object-contain rounded-xl bg-gray-950 border-2 border-indigo-600/20 shadow"
                          />
                          <div className="flex-1">
                            <div className="font-medium text-white text-base">
                              {item.product_name}
                            </div>
                            <div className="text-white/60 text-sm">
                              Mennyiség:{" "}
                              <span className="font-bold text-indigo-300">
                                {item.quantity}
                              </span>
                            </div>
                            <div className="text-white/60 text-sm">
                              Egységár:{" "}
                              <span className="font-bold text-indigo-300">
                                {item.price.toLocaleString()} Ft
                              </span>
                            </div>
                            <div className="text-white/80 text-sm mt-1">
                              Összesen:{" "}
                              <span className="font-bold text-indigo-400">
                                {(item.price * item.quantity).toLocaleString()}{" "}
                                Ft
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Orders;
