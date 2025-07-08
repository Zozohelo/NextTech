import React, { useContext, useState } from "react";
import { DeviceContext } from "../../contexts/DeviceContext";
import Device from "../Device";
import Navbar from "../Navbar";
import { Spiral } from "ldrs/react";
import "ldrs/react/Spiral.css";
import { FaFilter, FaTimes } from "react-icons/fa";

const mockFilters = {
  brand: ["Apple", "Samsung", "Xiaomi", "OnePlus", "Huawei", "Google"],
  category: ["Telefon", "Tablet", "Laptop", "Okosóra", "Fülhallgató"],
  price: [
    { label: "0 - 50 000 Ft", min: 0, max: 50000 },
    { label: "50 001 - 150 000 Ft", min: 50001, max: 150000 },
    { label: "150 001 - 350 000 Ft", min: 150001, max: 350000 },
    { label: "350 000 Ft felett", min: 350001, max: Infinity },
  ],
};

const AllProduct = () => {
  const { devices, loading } = useContext(DeviceContext);

  type PriceFilter = { label: string; min: number; max: number };

  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedPrice, setSelectedPrice] = useState<PriceFilter | null>(null);
  const [search, setSearch] = useState<string>("");
  const [sort, setSort] = useState<string>("relevance");

  // Mobil szűrő panel állapota
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const filteredDevices = devices
    .filter((d) =>
      selectedBrands.length ? selectedBrands.includes(d.brand) : true
    )
    .filter((d) =>
      selectedCategories.length ? selectedCategories.includes(d.category) : true
    )
    .filter((d) =>
      selectedPrice
        ? d.price >= selectedPrice.min && d.price <= selectedPrice.max
        : true
    )
    .filter((d) =>
      search
        ? d.name.toLowerCase().includes(search.toLowerCase()) ||
          (d.name && d.name.toLowerCase().includes(search.toLowerCase()))
        : true
    )
    .sort((a, b) => {
      if (sort === "price_asc") return a.price - b.price;
      if (sort === "price_desc") return b.price - a.price;
      if (sort === "name_asc")
        return a.brand.localeCompare(b.brand, "hu", { sensitivity: "base" });
      if (sort === "name_desc")
        return b.brand.localeCompare(a.brand, "hu", { sensitivity: "base" });
      return 0;
    });

  const toggleBrand = (brand: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };
  const toggleCategory = (cat: string) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };
  const selectPrice = (p: PriceFilter) => {
    setSelectedPrice((cur) => (cur?.label === p.label ? null : p));
  };

  const clearAll = () => {
    setSelectedBrands([]);
    setSelectedCategories([]);
    setSelectedPrice(null);
    setSearch("");
    setSort("relevance");
  };

  // FILTER ASIDE - külön komponensként, hogy mobilon is újrahasznosítható legyen
  const FilterAside = ({ onClose }: { onClose?: () => void }) => (
    <aside
      className={`
        w-full md:w-80
        md:bg-black/60 bg-black/80
        border border-gray-800 rounded-2xl md:rounded-2xl
        p-4 md:p-6 flex-shrink-0 shadow-2xl
        md:h-fit
        md:sticky md:top-24 md:self-start z-30
        mb-6 md:mb-0
        ${onClose ? "relative" : ""}
      `}
      style={{
        maxWidth: "100vw",
      }}
    >
      {/* Mobilon bezárás gomb */}
      {onClose && (
        <button
          className="absolute top-2 right-2 text-xl text-white bg-gray-800 rounded-full p-2 hover:bg-gray-700 transition z-40"
          onClick={onClose}
        >
          <FaTimes />
        </button>
      )}
      <div className="flex items-center justify-between mb-5 pr-5">
        <h3 className="text-xl font-bold text-white tracking-wide">Szűrők</h3>
        <button
          className="text-xs text-red-400 hover:underline"
          onClick={clearAll}
        >
          Mindet töröl
        </button>
      </div>

      {/* Kereső */}
      <div className="mb-7">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Keresés név vagy márka szerint..."
          className="w-full bg-white/10 text-white rounded-lg px-4 py-2 outline-none border border-transparent focus:border-pink-500 transition"
        />
      </div>

      {/* Márka */}
      <div className="mb-6">
        <div className="font-semibold text-neutral-300 mb-2">Márka</div>
        <div className="flex flex-wrap gap-2">
          {mockFilters.brand.map((brand) => (
            <button
              type="button"
              key={brand}
              className={`px-3 py-1 rounded-full text-sm font-semibold border transition
                ${
                  selectedBrands.includes(brand)
                    ? "bg-gradient-to-br from-pink-600 to-blue-600 border-pink-400 text-white shadow"
                    : "bg-gray-800 border-gray-700 text-blue-200 hover:bg-gray-700"
                }`}
              onClick={() => toggleBrand(brand)}
            >
              {brand}
            </button>
          ))}
        </div>
      </div>

      {/* Kategória */}
      <div className="mb-6">
        <div className="font-semibold text-neutral-300 mb-2">Kategória</div>
        <div className="flex flex-wrap gap-2">
          {mockFilters.category.map((cat) => (
            <button
              type="button"
              key={cat}
              className={`px-3 py-1 rounded-full text-sm font-semibold border transition
                ${
                  selectedCategories.includes(cat)
                    ? "bg-gradient-to-br from-pink-600 to-blue-600 border-pink-400 text-white shadow"
                    : "bg-gray-800 border-gray-700 text-blue-200 hover:bg-gray-700"
                }`}
              onClick={() => toggleCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Ár */}
      <div className="mb-6">
        <div className="font-semibold text-neutral-300 mb-2">Ár</div>
        <div className="flex flex-col gap-2">
          {mockFilters.price.map((p) => (
            <button
              type="button"
              key={p.label}
              className={`px-3 py-1 rounded-full text-sm font-semibold border transition
                ${
                  selectedPrice?.label === p.label
                    ? "bg-gradient-to-br from-pink-600 to-blue-600 border-pink-400 text-white shadow"
                    : "bg-gray-800 border-gray-700 text-blue-200 hover:bg-gray-700"
                }`}
              onClick={() => selectPrice(p)}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* Rendezés */}
      <div className="mb-2">
        <div className="font-semibold text-neutral-300 mb-2">Rendezés</div>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="w-full bg-gray-800 text-white rounded-lg px-3 py-2 border border-gray-700 focus:border-pink-500"
        >
          <option value="relevance">Alapértelmezett</option>
          <option value="price_asc">Ár szerint növekvő</option>
          <option value="price_desc">Ár szerint csökkenő</option>
          <option value="name_asc">Név szerint A-Z</option>
          <option value="name_desc">Név szerint Z-A</option>
        </select>
      </div>
    </aside>
  );

  return (
    <>
      <Navbar />

      <section className="min-h-screen pt-30 w-full bg-gradient-to-br from-gray-950 via-gray-900 to-slate-900 pb-20 px-2 md:px-8">
        <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row gap-8">
          {/* FILTER - mobilon lezárható panel, asztalon oldalt */}
          {/* Mobilon szűrő gomb */}
          <div className="block md:hidden sticky top-16 z-40 mb-3">
            <button
              className="flex items-center gap-2 bg-indigo-700 hover:bg-indigo-800 text-white px-5 py-2 rounded-xl font-bold shadow transition"
              onClick={() => setShowMobileFilters(true)}
            >
              <FaFilter className="text-lg" /> Szűrők megnyitása
            </button>
          </div>

          {/* Mobil szűrő panel overlay */}
          {showMobileFilters && (
            <div className="fixed inset-0 z-50 bg-black/70 flex items-start justify-center md:hidden">
              <div className="w-full max-w-[400px] mx-auto mt-10">
                <FilterAside onClose={() => setShowMobileFilters(false)} />
              </div>
            </div>
          )}

          {/* Asztali szűrő bal oldalon */}
          <div className="hidden md:block">
            <FilterAside />
          </div>

          {/* PRODUCT GRID */}
          <section className="relative min-h-screen w-full pb-20 px-2 md:px-8">
            {loading && (
              <div className="absolute inset-0 flex justify-center items-center min-h-screen z-20">
                <Spiral size="64" speed="1" color="gray" />
              </div>
            )}

            <div
              className={`max-w-[1440px] mx-auto flex flex-col md:flex-row gap-8 ${
                loading ? "pointer-events-none blur-sm select-none" : ""
              }`}
            >
              <main className="flex-1">
                {!loading && filteredDevices.length === 0 ? (
                  <div className="text-center text-white/70 text-xl py-32">
                    Nincs találat ezekre a szűrőkre!
                  </div>
                ) : !loading ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {filteredDevices.map((r, i) => (
                      <Device key={`devices-${i}`} devices={r} />
                    ))}
                  </div>
                ) : null}
              </main>
            </div>
          </section>
        </div>
      </section>
    </>
  );
};

export default AllProduct;
