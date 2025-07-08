import React, { useState, useEffect } from "react";
import {
  FaUser,
  FaBell,
  FaHome,
  FaChevronRight,
  FaBoxOpen,
} from "react-icons/fa";
import Navbar from "../Navbar";
import { Spiral } from "ldrs/react";

const API_URL = "http://localhost:8000/api/user";

const sidebarLinks = [
  { label: "Profil", icon: <FaUser />, key: "profile" },
  { label: "Értesítések", icon: <FaBell />, key: "notifications" },
  { label: "Szállítási címek", icon: <FaHome />, key: "addresses" },
  { label: "Korábbi rendelések", icon: <FaBoxOpen />, key: "orders" },
];

const ProfileSettings = () => {
  const [active, setActive] = useState("profile");
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [updateError, setUpdateError] = useState<string | null>(null);
  const [updateSuccess, setUpdateSuccess] = useState<boolean>(false);

  // Felhasználó adatok state
  const [user, setUser] = useState<any>(null);

  // Szerkeszthető mezők state-jei
  const [editName, setEditName] = useState("");
  const [editUsername, setEditUsername] = useState("");
  const [editEmail, setEditEmail] = useState("");

  // Egyéb state-ek
  const [avatar, setAvatar] = useState<string | null>(null);

  // Token a localStorage-ből
  const token = localStorage.getItem("auth_token");
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    if (!token) return;
    fetch("http://localhost:8000/api/orders", {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    })
      .then(async (res) => {
        if (!res.ok) return;
        const data = await res.json();
        setOrders(data);
      })
      .catch(() => {});
  }, [token]);

  // Lekérés a backendről
  useEffect(() => {
    if (!token) {
      setFetchError("Nem vagy bejelentkezve.");
      setLoading(false);
      return;
    }
    setLoading(true);
    fetch(API_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    })
      .then(async (res) => {
        if (!res.ok) {
          const t = await res.text();
          console.log(Error);
          throw new Error(`API hiba (${res.status}): ${t}`);
        }
        return res.json();
      })
      .then((data) => {
        setUser(data);
        setEditName(data.name || "");
        setEditUsername(data.username || "");
        setEditEmail(data.email || "");

        setLoading(false);
      })
      .catch((err) => {
        setFetchError(err.message);
        setLoading(false);
      });
  }, [token]);

  // Mentés profil módosítás esetén
  // ... a többi import és state változatlan ...

  // Mentés profil módosítás esetén
  const handleProfileSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setUpdateError(null);
    setUpdateSuccess(false);

    // Csak a tényleg módosított mezőket küldjük el!
    const payload: any = {};
    if (editName !== user.name) payload.name = editName;
    if (editUsername !== user.username) payload.username = editUsername;
    if (editEmail !== user.email) payload.email = editEmail;

    // Ha nem történt változás, ne küldjünk semmit
    if (Object.keys(payload).length === 0) {
      setUpdateError("Nincs módosított adat.");
      return;
    }

    try {
      const res = await fetch(API_URL, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const t = await res.text();
        throw new Error(`Mentési hiba (${res.status}): ${t}`);
      }
      const updated = await res.json();
      setUser(updated);
      setUpdateSuccess(true);
      // Frissítsd az edit state-eket is!
      setEditName(updated.name || "");
      setEditUsername(updated.username || "");
      setEditEmail(updated.email || "");
    } catch (err: any) {
      setUpdateError(err.message);
    }
  };

  // Profilkép feltöltés (helyi state csak demo)
  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      setAvatar(ev.target?.result as string);
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  // Új cím hozzáadása (csak kliens oldali demo)

  // CONTENT-ek
  const renderContent = () => {
    if (loading) {
      return (
        <div className="absolute inset-0 flex justify-center items-center min-h-screen z-20">
          <Spiral size="64" speed="1" color="gray" />
        </div>
      );
    }
    if (fetchError) {
      return (
        <div className="text-red-400 bg-gray-800/60 rounded-xl p-6 text-center font-bold">
          {fetchError}
        </div>
      );
    }
    if (!user) return null;

    switch (active) {
      case "profile":
        return (
          <div>
            <h2 className="text-2xl font-bold mb-6 text-white">
              Profil adatok
            </h2>
            <form className="space-y-5 max-w-xl" onSubmit={handleProfileSave}>
              <div>
                <label className="block text-white/80 mb-1">Név</label>
                <input
                  className="w-full bg-gray-900/60 border border-gray-700 rounded-lg py-2 px-4 text-white"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block text-white/80 mb-1">
                  Felhasználónév
                </label>
                <input
                  className="w-full bg-gray-900/60 border border-gray-700 rounded-lg py-2 px-4 text-white"
                  value={editUsername}
                  onChange={(e) => setEditUsername(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block text-white/80 mb-1">Email</label>
                <input
                  className="w-full bg-gray-900/60 border border-gray-700 rounded-lg py-2 px-4 text-white"
                  type="email"
                  value={editEmail}
                  onChange={(e) => setEditEmail(e.target.value)}
                  required
                />
              </div>
              {updateError && (
                <div className="text-red-400 bg-gray-800/60 rounded-xl p-2 text-center font-bold">
                  {updateError}
                </div>
              )}
              {updateSuccess && (
                <div className="text-green-400 bg-gray-800/60 rounded-xl p-2 text-center font-bold">
                  Sikeres mentés!
                </div>
              )}
              <button
                type="submit"
                className="w-full py-2 mt-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-base shadow"
              >
                Mentés
              </button>
            </form>
          </div>
        );
      // ... a többi case marad változatlanul!
      // (avatar, addresses, stb.)
      case "avatar":
        // --- változatlan ---
        // ...
        return (
          <div>
            <h2 className="text-2xl font-bold mb-6 text-white">
              Profilkép beállítása
            </h2>
            <div className="flex flex-col items-center gap-5">
              <div className="w-32 h-32 rounded-full bg-gray-800 border-4 border-indigo-600 flex items-center justify-center overflow-hidden shadow-lg">
                {avatar ? (
                  <img
                    src={avatar}
                    alt="Profilkép"
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <FaUser className="text-white text-6xl" />
                )}
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                className="block w-full text-sm text-gray-400 file:bg-indigo-600 file:hover:bg-indigo-700 file:text-white file:rounded-full file:py-2 file:px-4 file:font-bold file:shadow"
              />
              <button
                type="button"
                className="w-full py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-base shadow"
                disabled
              >
                Mentés (demo)
              </button>
            </div>
          </div>
        );
      // a többi case is maradhat ugyanígy!
      // ...
      case "notifications":
      case "addresses":
      case "orders":
        return (
          <div>
            <h2 className="text-2xl font-bold mb-6 text-white">
              Korábbi megrendelések
            </h2>
            {orders.length === 0 ? (
              <div className="text-white/70">Nincs még rendelésed.</div>
            ) : (
              <div className="space-y-6">
                {orders.map((order) => (
                  <div
                    key={order.id}
                    className="bg-gray-900/60 border border-gray-700 rounded-lg p-4"
                  >
                    <div className="text-white font-bold mb-2">
                      Rendelés #{order.id} |{" "}
                      {new Date(order.created_at).toLocaleString()}
                    </div>
                    <div className="text-white/80 mb-2">
                      Összeg:{" "}
                      <span className="font-bold text-indigo-400">
                        {order.total_price.toLocaleString()} Ft
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-4">
                      {order.items.map((item: any) => (
                        <div
                          key={item.id}
                          className="flex items-center gap-2 bg-gray-800 rounded-lg px-3 py-2 shadow"
                        >
                          <img
                            src={item.image}
                            alt=""
                            className="w-10 h-10 object-contain rounded"
                          />
                          <div>
                            <div className="text-white">
                              {item.product_name}
                            </div>
                            <div className="text-white/70 text-sm">
                              {item.quantity} × {item.price.toLocaleString()} Ft
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      case "password":
      default:
        // ...eredeti switch tartalom...
        return null;
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-indigo-950 px-2 md:px-8 pt-24 pb-12 flex justify-center">
        <div className="w-full max-w-5xl flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <aside className="md:w-64 w-full bg-gray-900/80 border border-gray-800 rounded-2xl shadow-xl p-0 md:p-4 flex md:flex-col flex-row md:gap-1 gap-2 md:mb-0 mb-4 overflow-x-auto">
            {sidebarLinks.map((item) => (
              <button
                key={item.key}
                className={`flex items-center md:justify-start justify-center gap-3 w-full md:w-auto px-4 py-3 md:rounded-xl rounded-lg font-semibold text-lg transition-all
                  ${
                    active === item.key
                      ? "bg-indigo-600 text-white shadow"
                      : "bg-gray-800 text-indigo-200 hover:bg-gray-800/70"
                  }
                `}
                onClick={() => setActive(item.key)}
              >
                <span className="text-xl">{item.icon}</span>
                <span className="hidden md:inline">{item.label}</span>
                <FaChevronRight
                  className={`md:hidden ml-2 text-xs ${
                    active === item.key ? "opacity-100" : "opacity-0"
                  }`}
                />
              </button>
            ))}
          </aside>

          {/* Main content */}
          <main className="flex-1 bg-gradient-to-br from-gray-900/60 via-gray-800/60 to-indigo-900/60 border border-gray-800 rounded-2xl shadow-2xl p-6 md:p-10">
            {renderContent()}
          </main>
        </div>
      </div>
    </>
  );
};

export default ProfileSettings;
