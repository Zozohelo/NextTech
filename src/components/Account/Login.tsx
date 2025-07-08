import { AuroraBackground } from "../ui/aurora-background";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("http://localhost:8000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Hibás email vagy jelszó!");
      }

      localStorage.setItem("auth_token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      navigate("/"); // vagy amit szeretnél
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Ismeretlen hiba történt!");
      }
    }
  };

  return (
    <AuroraBackground>
      {/* Vissza a főoldalra gomb jobb felső sarokban */}
      <div className="fixed top-6 right-8 z-50">
        <Link
          to="/"
          className="flex items-center gap-2 px-5 py-2 rounded-full bg-black/80 hover:bg-black/90 text-white text-base font-semibold shadow-lg transition-all border border-white/10"
        >
          <svg
            className="w-5 h-5 mr-1"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Vissza a főoldalra
        </Link>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex min-h-[90vh] items-center justify-center"
      >
        <form
          onSubmit={handleSubmit}
          className="
            bg-gradient-to-br from-[#191c26] via-[#11121b] to-[#23213a]
            rounded-2xl px-7 py-12 max-w-full lg:w-lg shadow-xl border border-white/10
            backdrop-blur-xl flex flex-col items-center
          "
          autoComplete="off"
        >
          <h1 className="text-3xl font-bold text-white mb-7 text-center tracking-wide drop-shadow-lg">
            Bejelentkezés
          </h1>
          <div className="flex flex-col gap-6 w-full px-2">
            <div>
              <label className="text-neutral-300 text-base mb-1 block font-semibold">
                E-mail
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="w-full rounded-xl px-4 py-3 bg-white/10 text-white outline-none border-2 border-transparent focus:border-blue-500 font-medium text-base transition-all"
                placeholder="E-mail"
                autoFocus
              />
            </div>
            <div>
              <label className="text-neutral-300 text-base mb-1 block font-semibold">
                Jelszó
              </label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                className="w-full rounded-xl px-4 py-3 bg-white/10 text-white outline-none border-2 border-transparent focus:border-blue-500 font-medium text-base transition-all"
                placeholder="Jelszó"
              />
            </div>
          </div>
          {error && (
            <p className="text-red-400 mt-4 font-medium text-sm">{error}</p>
          )}
          <button
            type="submit"
            className="
              mt-10 w-full rounded-full px-6 py-3 
              bg-gradient-to-br from-pink-600 via-fuchsia-600 to-blue-600 
              text-white font-extrabold text-lg shadow
              hover:scale-105 transition-all
            "
          >
            Bejelentkezés
          </button>
        </form>
      </motion.div>
    </AuroraBackground>
  );
};

export default Login;
