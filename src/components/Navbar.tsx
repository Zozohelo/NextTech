import { useEffect, useRef, useState } from "react";
import {
  FaUser,
  FaShoppingCart,
  FaSignOutAlt,
  FaBoxOpen,
  FaCog,
} from "react-icons/fa";
import { useCart } from "../contexts/CartContext";

const NAV_LINKS = [
  { label: "Kezdőlap", href: "/" },
  { label: "Termékek", href: "/products" },
  { label: "Üzleteink", href: "" },
  { label: "Szolgáltatások", href: "" },
  { label: "GYIK", href: "" },
];
const API_URL = "http://localhost:8000/api/user";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [accountDropdownOpen, setAccountDropdownOpen] = useState(false);
  type User = { name: string; [key: string]: any };
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    if (!token) {
      setUser(null);
      return;
    }
    fetch(API_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    })
      .then(async (res) => {
        if (!res.ok) throw new Error("Hibás token vagy nincs bejelentkezve.");
        return res.json();
      })
      .then((data) => setUser(data))
      .catch(() => setUser(null));
  }, []);

  const accountBtnRef = useRef<HTMLButtonElement | null>(null);
  const accountDropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [mobileOpen]);

  useEffect(() => {
    if (!accountDropdownOpen) return;
    function handler(e: MouseEvent) {
      if (
        accountDropdownRef.current &&
        !accountDropdownRef.current.contains(e.target as Node) &&
        accountBtnRef.current &&
        !accountBtnRef.current.contains(e.target as Node)
      ) {
        setAccountDropdownOpen(false);
      }
    }
    function escHandler(e: KeyboardEvent) {
      if (e.key === "Escape") setAccountDropdownOpen(false);
    }
    document.addEventListener("mousedown", handler);
    document.addEventListener("keydown", escHandler);
    return () => {
      document.removeEventListener("mousedown", handler);
      document.removeEventListener("keydown", escHandler);
    };
  }, [accountDropdownOpen]);
  const { cart } = useCart();
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav
      className={`z-50 fixed top-0 left-0 w-full transition-all duration-300
        ${
          scrolled
            ? "bg-gradient-to-r from-gray-950 via-gray-900 to-slate-800 shadow-xl rounded-t-none rounded-b-2xl py-2 backdrop-blur-xl"
            : "bg-gradient-to-r from-gray-950 via-gray-900 to-slate-800 rounded-t-none rounded-b-2xl py-5"
        }`}
      style={{
        WebkitBackdropFilter: "blur(8px)",
        backdropFilter: "blur(8px)",
      }}
    >
      <div className="max-w-screen-xl flex items-center justify-between mx-auto px-4 transition-all duration-300">
        {/* LOGO */}
        <a href="/" className="flex items-center gap-2 group z-50 md:z-auto">
          <img
            className="h-10 w-10"
            src="/images/logo.png"
            alt="NextTech logó"
          />
          <span className="font-extrabold text-2xl text-white tracking-wider drop-shadow-md group-hover:text-red-700 transition-all duration-300">
            NextTech
          </span>
        </a>
        {/* NAV LINKS (desktop) */}
        <div className="hidden md:flex items-center justify-between w-full px-6">
          {/* Logó (balra) */}
          <div className="flex-shrink-0"></div>

          {/* Középen a menüpontok */}
          <div className="flex space-x-4">
            {NAV_LINKS.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                className="px-4 py-2 rounded-xl text-white font-medium transition-all duration-200 hover:bg-gray-800/40 hover:text-blue-300 focus:outline-none "
              >
                {label}
              </a>
            ))}
          </div>

          {/* Jobbra ikonok: kosár + fiók */}
          <div className="flex items-center space-x-4 relative">
            {/* Kosár ikon */}
            <a
              href="/cart"
              className="relative text-white hover:text-blue-300 transition-all duration-200"
              aria-label="Kosár"
            >
              <FaShoppingCart size={22} />
              {cartCount > 0 && (
                <span
                  className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full px-1.5 py-0.5 border-2 border-gray-900 animate-bounce"
                  style={{ minWidth: 20, textAlign: "center" }}
                >
                  {cartCount}
                </span>
              )}
            </a>

            {/* Fiók ikon + dropdown */}
            <div className="relative">
              <button
                ref={accountBtnRef}
                type="button"
                className="text-white hover:text-blue-300 transition-all duration-200"
                onClick={() => setAccountDropdownOpen((v) => !v)}
                aria-haspopup="true"
                aria-expanded={accountDropdownOpen}
                aria-label="Fiók"
              >
                <FaUser size={22} />
              </button>

              {/* Dropdown tartalom */}
              {accountDropdownOpen && (
                <div
                  ref={accountDropdownRef}
                  className="absolute right-0 mt-4 min-w-[220px] bg-gradient-to-br from-gray-900/95 to-gray-800/95 border border-gray-700 rounded-2xl shadow-2xl p-0.5 flex flex-col z-50 animate-fade-in backdrop-blur-lg"
                  style={{
                    boxShadow:
                      "0 8px 32px 0 rgba(0,0,0,0.4), 0 2px 6px 0 rgba(80,80,150,0.15)",
                  }}
                >
                  {user ? (
                    <>
                      <div className="flex items-center gap-3 px-5 py-3 border-b border-gray-800">
                        <div className="bg-indigo-600 rounded-full w-9 h-9 flex items-center justify-center font-bold text-lg text-white shadow">
                          {user.name?.[0]?.toUpperCase() || "U"}
                        </div>
                        <div>
                          <div className="font-bold text-white">
                            {user.username}
                          </div>
                        </div>
                      </div>
                      <a
                        href="/orders"
                        className="flex items-center gap-3 px-5 py-3 text-white hover:bg-indigo-800/60 transition rounded-xl m-1 font-medium"
                        onClick={() => setAccountDropdownOpen(false)}
                      >
                        <FaBoxOpen /> Megrendeléseim
                      </a>
                      <a
                        href="/profile"
                        className="flex items-center gap-3 px-5 py-3 text-white hover:bg-indigo-800/60 transition rounded-xl m-1 font-medium"
                        onClick={() => setAccountDropdownOpen(false)}
                      >
                        <FaCog /> Profil beállítások
                      </a>
                      <button
                        onClick={() => {
                          localStorage.removeItem("user");
                          localStorage.removeItem("token");
                          setUser(null);
                          setAccountDropdownOpen(false);
                          window.location.href = "/";
                        }}
                        className="flex items-center gap-3 px-5 py-3 text-white rounded-xl m-1 font-medium bg-gradient-to-r from-pink-600 to-red-500 hover:from-red-500 hover:to-pink-600 transition shadow"
                      >
                        <FaSignOutAlt /> Kijelentkezés
                      </button>
                    </>
                  ) : (
                    <>
                      <a
                        href="/login"
                        className="block w-full text-left px-5 py-3 rounded-xl text-white font-medium hover:bg-indigo-800/60 transition m-1"
                        onClick={() => setAccountDropdownOpen(false)}
                      >
                        Bejelentkezés
                      </a>
                      <a
                        href="/register"
                        className="block w-full text-left px-5 py-3 rounded-xl text-white font-medium hover:bg-indigo-800/60 transition m-1"
                        onClick={() => setAccountDropdownOpen(false)}
                      >
                        Regisztráció
                      </a>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
        {/* Hamburger menu mobile */}
        <button
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-white rounded-lg md:hidden hover:bg-gray-800/40 focus:outline-none focus:ring-2 focus:ring-pink-800/50 transition-all duration-200 z-50"
          aria-controls="navbar-mobile"
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((v) => !v)}
        >
          <span className="sr-only">
            {mobileOpen ? "Zárás" : "Menü nyitása"}
          </span>
          {/* Hamburger / X icon animáció */}
          <div className="relative w-7 h-7 flex flex-col justify-center items-center">
            <span
              className={`absolute w-7 h-1 bg-white rounded transition-all duration-300 ${
                mobileOpen ? "rotate-45 translate-y-2" : "-translate-y-2"
              }`}
            />
            <span
              className={`absolute w-7 h-1 bg-white rounded transition-all duration-300 ${
                mobileOpen ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`absolute w-7 h-1 bg-white rounded transition-all duration-300 ${
                mobileOpen ? "-rotate-45 -translate-y-2" : "translate-y-2"
              }`}
            />
          </div>
        </button>
      </div>

      {/* Mobile menu overlay + animáció */}
      <div
        className={`
          fixed inset-0 z-40 md:hidden transition-all duration-500
          ${mobileOpen ? "visible" : "invisible pointer-events-none"}
        `}
      >
        {/* Sötét háttér blurrel */}
        <div
          className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-400 ${
            mobileOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setMobileOpen(false)}
        />

        {/* Menü panel */}
        <div
          className={`
            absolute top-0 left-0 w-full rounded-b-2xl bg-gradient-to-br from-gray-950 via-gray-900 to-slate-800 shadow-2xl
            transition-transform duration-500 ease-in-out
            ${
              mobileOpen
                ? "translate-y-0 opacity-100"
                : "-translate-y-full opacity-0 pointer-events-none"
            }
            p-8 pt-8 flex flex-col items-center space-y-5
          `}
        >
          {/* Logo mobil nézetben is felül */}
          <div className="h-4"></div>
          {/* NAV */}
          <div className="grid grid-cols-2 gap-3 w-full mb-4">
            {NAV_LINKS.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                className="flex items-center justify-center text-center px-4 py-3 rounded-xl text-white font-bold text-base shadow hover:bg-indigo-800/70 hover:text-indigo-300 transition-all duration-200 bg-gray-800/60"
                onClick={() => setMobileOpen(false)}
              >
                {label}
              </a>
            ))}
            <a
              href="/cart"
              className="relative flex items-center justify-center text-center px-4 py-3 rounded-xl text-white font-bold text-base shadow hover:bg-indigo-800/70 hover:text-indigo-300 transition-all duration-200 bg-gray-800/60"
              onClick={() => setMobileOpen(false)}
            >
              <FaShoppingCart className="w-5 h-5 mr-2" />
              Kosár
              {cartCount > 0 && (
                <span
                  className="absolute top-1 right-4 bg-red-600 text-white text-xs font-bold rounded-full px-1.5 py-0.5 border-2 border-gray-900"
                  style={{ minWidth: 20, textAlign: "center" }}
                >
                  {cartCount}
                </span>
              )}
            </a>
          </div>
          {/* Felhasználói fiók blokk mobilon gridben */}
          <div className="grid grid-cols-2 gap-3 w-full">
            {user ? (
              <>
                <a
                  href="/orders"
                  className="flex flex-col items-center justify-center px-4 py-3 rounded-xl text-white font-bold text-base shadow hover:bg-indigo-800/70 hover:text-indigo-300 transition-all duration-200 bg-gray-800/60"
                  onClick={() => setMobileOpen(false)}
                >
                  <FaBoxOpen className="mb-1" /> Megrendeléseim
                </a>
                <a
                  href="/profile"
                  className="flex flex-col items-center justify-center px-4 py-3 rounded-xl text-white font-bold text-base shadow hover:bg-indigo-800/70 hover:text-indigo-300 transition-all duration-200 bg-gray-800/60"
                  onClick={() => setMobileOpen(false)}
                >
                  <FaCog className="mb-1" /> Profil
                </a>
                <button
                  onClick={() => {
                    localStorage.removeItem("user");
                    localStorage.removeItem("token");
                    setUser(null);
                    setMobileOpen(false);
                    window.location.href = "/";
                  }}
                  className="flex flex-col items-center justify-center px-4 py-3 rounded-xl text-white font-bold text-base shadow bg-gradient-to-r from-pink-600 to-red-500 hover:from-red-500 hover:to-pink-600 hover:scale-105 transition-all col-span-2"
                >
                  <FaSignOutAlt className="mb-1" /> Kijelentkezés
                </button>
              </>
            ) : (
              <>
                <a
                  href="/login"
                  className="flex flex-col items-center justify-center px-4 py-3 rounded-xl text-white font-bold text-base shadow bg-gradient-to-r from-blue-700 via-fuchsia-700 to-pink-700 hover:bg-opacity-80 hover:scale-105 transition-all"
                  onClick={() => setMobileOpen(false)}
                >
                  <FaUser className="mb-1" /> Bejelentkezés
                </a>
                <a
                  href="/register"
                  className="flex flex-col items-center justify-center px-4 py-3 rounded-xl text-white font-bold text-base shadow bg-gradient-to-r from-pink-700 via-fuchsia-700 to-blue-700 hover:bg-opacity-80 hover:scale-105 transition-all"
                  onClick={() => setMobileOpen(false)}
                >
                  <FaUser className="mb-1" /> Regisztráció
                </a>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
