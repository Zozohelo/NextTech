import type { IDevice } from "../utils/util";
import { useCart } from "../contexts/CartContext";
import { toast } from "react-toastify";
import { IoIosCart } from "react-icons/io";
import { Link } from "react-router-dom";

const Device = (props: { devices: IDevice }) => {
  const device = props.devices;
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(device);
    toast.success("Sikeresen hozzáadva a kosárhoz!");
  };

  return (
    <div className="bg-gray-800 rounded-2xl shadow-xl p-6 flex flex-col items-center  relative">
      <img
        src={device.image}
        className="w-32 h-32 object-contain mb-4 rounded-xl"
      />
      <h3 className="text-xl text-white font-bold mb-2 text-center">
        {device.name}
      </h3>
      <div className="text-slate-400 font-bold text-lg mb-3">
        {device.price.toLocaleString()} Ft
      </div>
      <div className="text-gray-400 text-sm mb-4">{device.category}</div>
      <div className="flex justify-between items-center gap-5">
        <button className="mt-auto bg-indigo-600 hover:bg-indigo-700 text-white font-semibold p-2 rounded-xl transition-all shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
          <Link to={`/device/${device.id}`}>Részletek</Link>
        </button>
        <button
          className="flex justify-center items-center gap-1 mt-auto bg-gray-950 hover:bg-slate-950 text-white font-semibold p-2 rounded-xl transition-all shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          onClick={handleAddToCart}
        >
          <IoIosCart />
          Kosárba
        </button>
      </div>
    </div>
  );
};

export default Device;
