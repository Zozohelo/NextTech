import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { IoIosCart } from "react-icons/io";
import { FaArrowLeft } from "react-icons/fa";
import { toast } from "react-toastify";
import { useCart } from "../../contexts/CartContext";
import Navbar from "../Navbar";

type DeviceDetail = {
  id: number;
  name: string;
  images: string[];
  price: number;
  brand?: string;
  category?: string;
  description?: string;
  specs?: Record<string, string>;
  [key: string]: any;
};

const Product = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [device, setDevice] = useState<DeviceDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImg, setSelectedImg] = useState(0);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    fetch(`http://localhost:8000/api/devices/${id}`)
      .then(async (res) => {
        if (!res.ok) throw new Error("Nem található a készülék.");
        return res.json();
      })
      .then((data) => {
        if (typeof data.images === "string") data.images = [data.images];
        if (!data.images && data.image) data.images = [data.image];
        setDevice(data);
        setSelectedImg(0);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        setDevice(null);
      });
  }, [id]);

  const handleAddToCart = () => {
    if (device) {
      addToCart({
        id: device.id.toString(),
        name: device.name,
        brand: device.brand ?? "Ismeretlen",
        image: (device.images && device.images[0]) || "",
        price: device.price,
        category: device.category ?? "",
        description: device.description ?? "",
      });
      toast.success("Sikeresen hozzáadva a kosárhoz!");
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center bg-white">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-gray-400"></div>
        </div>
      </>
    );
  }

  if (!device) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex flex-col items-center justify-center bg-white">
          <div className="text-3xl font-bold text-gray-800 mb-4">
            Eszköz nem található
          </div>
          <button
            onClick={() => navigate(-1)}
            className="mt-2 flex items-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-700 px-5 py-2 rounded-xl shadow"
          >
            <FaArrowLeft /> Vissza
          </button>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-950 to-indigo-950 pt-8 pb-16 px-2 flex justify-center relative">
        {/* Vissza gomb - desktop bal felső sarokban, mobilon a tartalom felett középen */}
        <div
          className="
            absolute md:fixed left-0 right-0 md:left-5 md:right-auto top-24 md:top-24 z-30 flex
            md:justify-start justify-center
            mt-4 md:mt-0
            pointer-events-none
          "
        >
          <button
            onClick={() => navigate("/")}
            className="
              flex items-center gap-2 bg-indigo-700 hover:bg-indigo-800 text-white rounded-full px-6 py-2 shadow-lg font-semibold text-base transition border-2 border-indigo-900
              pointer-events-auto
            "
            style={{ minWidth: 120 }}
          >
            <FaArrowLeft className="text-lg" />
            Vissza a főoldalra
          </button>
        </div>

        <div className="w-full max-w-6xl flex flex-col md:flex-row gap-14 mt-40 md:mt-20 relative z-10">
          {/* Galéria */}
          <div className="md:w-2/5 bg-gradient-to-br from-gray-900 via-indigo-950/80 to-gray-900 rounded-3xl p-6 md:p-10 flex flex-col items-center shadow-xl border border-indigo-900/30">
            {/* Nagy kép */}
            <div className="aspect-square w-full max-w-xs mx-auto flex items-center justify-center bg-gray-950 rounded-2xl border-2 border-indigo-900/40 shadow-md">
              <img
                src={device.images[selectedImg]}
                alt={device.name}
                className="object-contain w-full h-full transition-all duration-300 rounded-xl"
                loading="lazy"
              />
            </div>
            {/* Kis előnézetek */}
            {device.images.length > 1 && (
              <div className="flex gap-3 sm:gap-4 mt-6 justify-center flex-wrap">
                {device.images.map((img, i) => (
                  <button
                    key={img + i}
                    className={`w-14 h-14 sm:w-16 sm:h-16 rounded-xl border-2 transition-all ${
                      selectedImg === i
                        ? "border-indigo-500 shadow-xl scale-110"
                        : "border-gray-300 opacity-70 hover:border-indigo-400"
                    }`}
                    onClick={() => setSelectedImg(i)}
                  >
                    <img
                      src={img}
                      alt={`Előnézet ${i + 1}`}
                      className="object-contain w-full h-full rounded-xl"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Részletek */}
          <div className="flex-1 flex flex-col justify-between min-h-[420px] mt-6 md:mt-0">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-100 mb-1 leading-tight drop-shadow-xl">
                {device.name}
              </h1>
              {device.brand && (
                <div className="text-lg font-bold text-indigo-400 mb-1 tracking-wide">
                  {device.brand}
                </div>
              )}
              {device.category && (
                <div className="text-gray-400 font-medium mb-4 uppercase tracking-wider">
                  {device.category}
                </div>
              )}
              <div className="text-2xl sm:text-3xl font-extrabold text-indigo-400 mb-7 drop-shadow">
                {device.price?.toLocaleString()} Ft
              </div>
              {device.description && (
                <div className="mb-7 text-gray-200 text-base sm:text-lg leading-relaxed whitespace-pre-line bg-gray-950/60 rounded-xl px-4 py-3 sm:px-5 sm:py-4 shadow-inner">
                  {device.description}
                </div>
              )}
              {device.specs && (
                <div className="mb-8">
                  <div className="text-lg sm:text-xl font-semibold text-indigo-300 mb-3 sm:mb-4">
                    Technikai adatok
                  </div>
                  <table className="w-full text-gray-200 text-sm sm:text-base border-separate border-spacing-y-2">
                    <tbody>
                      {Object.entries(device.specs).map(([key, value]) => (
                        <tr key={key}>
                          <td className="pr-4 sm:pr-8 font-medium text-gray-400 py-1">
                            {key}
                          </td>
                          <td className="font-semibold">{value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <button
                onClick={handleAddToCart}
                className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-8 py-3 rounded-xl shadow-lg text-lg transition"
              >
                <IoIosCart className="text-2xl" /> Kosárba
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Product;
