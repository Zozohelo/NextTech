import { useEffect, useState } from "react";

const NAV_LINKS = [
  { label: "Termékek", href: "#products" },
  { label: "Akciók", href: "#sales" },
  { label: "Rólunk", href: "#about" },
  { label: "Kapcsolat", href: "#contact" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent body scroll when mobile menu open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [mobileOpen]);

  return (
    <nav
      className={`z-50 fixed top-0 left-0 w-full transition-all duration-300
        ${
          scrolled
            ? "bg-gradient-to-r from-gray-950 via-gray-900 to-slate-800 shadow-xl rounded-b-2xl py-2 backdrop-blur-xl scale-[.97]"
            : "bg-gradient-to-r from-gray-950 via-gray-900 to-slate-800 py-5"
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
        <div className="hidden md:flex items-center space-x-2">
          {NAV_LINKS.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              className="px-4 py-2 rounded-xl text-white font-medium transition-all duration-200 hover:bg-gray-800/40 hover:text-blue-300 focus:outline-none focus:ring-2 focus:ring-pink-800/50"
            >
              {label}
            </a>
          ))}
          {/* Kosár ikon */}
          <a
            href="#cart"
            className="relative px-4 py-2 rounded-xl text-white font-medium flex items-center hover:bg-gray-800/40 hover:text-blue-300 transition-all duration-200"
          >
            <svg
              className="w-6 h-6 mr-1"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <circle cx="9" cy="21" r="1"></circle>
              <circle cx="20" cy="21" r="1"></circle>
              <path
                d="M1 1h4l2.68 13.39a2 2 0 002 1.61h7.72a2 2 0 002-1.61L21 6H6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Kosár
          </a>
          {/* Fiók ikon */}
          <a
            href="#account"
            className="ml-2 px-3 py-2 rounded-xl text-white hover:bg-gray-800/40 hover:text-blue-300 transition-all duration-200 flex items-center"
          >
            <svg
              className="w-6 h-6 mr-1"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <circle cx="12" cy="8" r="4"></circle>
              <path
                d="M2 20c0-4 4-7 10-7s10 3 10 7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Fiók
          </a>
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

          {/* EXTRA HELY a logó és a linkek között */}
          <div className="h-4"></div>
          {NAV_LINKS.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              className="block w-full text-center px-4 py-3 rounded-xl text-white font-bold text-lg transition-all duration-200 hover:bg-gray-800/60 hover:text-blue-300"
              onClick={() => setMobileOpen(false)}
            >
              {label}
            </a>
          ))}
          {/* Kosár ikon */}
          <a
            href="#cart"
            className="relative w-full flex items-center justify-center px-4 py-3 rounded-xl text-white font-bold text-lg hover:bg-gray-800/60 hover:text-blue-300 transition-all duration-200"
            onClick={() => setMobileOpen(false)}
          >
            <svg
              className="w-6 h-6 mr-2"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <circle cx="9" cy="21" r="1"></circle>
              <circle cx="20" cy="21" r="1"></circle>
              <path
                d="M1 1h4l2.68 13.39a2 2 0 002 1.61h7.72a2 2 0 002-1.61L21 6H6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Kosár
          </a>
          {/* Fiók ikon */}
          <a
            href="#account"
            className="w-full flex items-center justify-center px-4 py-3 rounded-xl text-white font-bold text-lg hover:bg-gray-800/60 hover:text-blue-300 transition-all duration-200"
            onClick={() => setMobileOpen(false)}
          >
            <svg
              className="w-6 h-6 mr-2"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <circle cx="12" cy="8" r="4"></circle>
              <path
                d="M2 20c0-4 4-7 10-7s10 3 10 7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Fiók
          </a>
          {/* Menüzáró gomb külön mobilon (X) */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
