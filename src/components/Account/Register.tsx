"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AuroraBackground } from "./../ui/aurora-background";
import { Link } from "react-router-dom";

const steps = [
  { label: "Személyes információk" },
  { label: "Biztonsági adatok" },
];

export default function Register() {
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);
  const [form, setForm] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    password2: "",
  });
  const [error, setError] = useState("");

  const next = () => setStep((s) => Math.min(steps.length - 1, s + 1));
  const prev = () => setStep((s) => Math.max(0, s - 1));

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    if (form.password !== form.password2) {
      setError("A jelszók nem egyeznek!");
      return;
    }
    try {
      const resp = await fetch("http://localhost:8000/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          username: form.username,
          email: form.email,
          password: form.password,
          password_confirmation: form.password2,
        }),
      });
      if (!resp.ok) {
        const data = await resp.json();
        setError(data.message || "Hiba történt!");
        return;
      }
      setDone(true);
    } catch (err) {
      setError("Szerver hiba!");
    }
  };

  return (
    <AuroraBackground>
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
        <div className="bg-gradient-to-br from-[#191c26] via-[#11121b] to-[#23213a] rounded-2xl px-6 py-10 max-w-full lg:w-lg shadow-xl border border-white/10 backdrop-blur-xl flex flex-col items-center">
          <AnimatePresence mode="wait">
            {done ? (
              <motion.div
                key="done"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -24 }}
                className="flex flex-col items-center gap-4 py-12"
              >
                <svg
                  className="w-16 h-16 text-green-400 mb-2"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <h2 className="text-2xl font-bold text-white mb-2 text-center">
                  Sikeres regisztráció!
                </h2>
                <p className="text-neutral-300 text-center mb-6 text-base">
                  Most már bejelentkezhetsz a fiókodba.
                </p>
                <Link
                  to="/login"
                  className="w-full inline-block text-center rounded-xl px-6 py-3 bg-gradient-to-br from-pink-600 via-fuchsia-600 to-blue-600 text-white font-bold text-base transition hover:scale-105"
                >
                  Bejelentkezés
                </Link>
              </motion.div>
            ) : (
              <motion.form
                key={step}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col gap-1 w-full"
                autoComplete="off"
                spellCheck={false}
                onSubmit={handleSubmit}
              >
                {/* Stepper */}
                <div className="flex items-center justify-center gap-3 mb-8">
                  {steps.map((s, i) => (
                    <React.Fragment key={s.label}>
                      <div
                        className={`w-9 h-9 flex items-center justify-center rounded-full text-base font-bold border-2 transition-all
                        ${
                          i === step
                            ? "bg-gradient-to-br from-pink-600 to-blue-600 text-white border-pink-400 shadow-lg scale-110"
                            : "bg-black/60 text-neutral-400 border-neutral-700"
                        }`}
                      >
                        {i + 1}
                      </div>
                      {i < steps.length - 1 && (
                        <div className="w-8 h-1 rounded-full bg-gradient-to-r from-pink-600 via-fuchsia-600 to-blue-600 opacity-60" />
                      )}
                    </React.Fragment>
                  ))}
                </div>
                <h2 className="text-2xl font-black text-white mb-7 text-center tracking-wide drop-shadow-lg">
                  {steps[step].label}
                </h2>
                {error && (
                  <div className="text-red-400 mb-3 text-center">{error}</div>
                )}
                {/* STEP 1: Alapadatok */}
                {step === 0 && (
                  <div className="flex flex-col gap-5 px-2">
                    <div>
                      <label className="text-neutral-300 text-base mb-1 block font-semibold">
                        Név
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        className="w-full rounded-xl px-4 py-3 bg-white/10 text-white outline-none border-2 border-transparent focus:border-blue-500 font-medium text-base transition-all"
                        placeholder="Teljes név"
                        autoFocus
                        required
                      />
                    </div>
                    <div>
                      <label className="text-neutral-300 text-base mb-1 block font-semibold">
                        Felhasználónév
                      </label>
                      <input
                        type="text"
                        name="username"
                        value={form.username}
                        onChange={handleChange}
                        className="w-full rounded-xl px-4 py-3 bg-white/10 text-white outline-none border-2 border-transparent focus:border-blue-500 font-medium text-base transition-all"
                        placeholder="Pl: zozohelo"
                        required
                      />
                    </div>
                  </div>
                )}

                {/* STEP 2: Email, Jelszó */}
                {step === 1 && (
                  <div className="flex flex-col gap-5 px-2">
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
                        placeholder="valami@email.hu"
                        required
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
                        required
                      />
                    </div>
                    <div>
                      <label className="text-neutral-300 text-base mb-1 block font-semibold">
                        Jelszó újra
                      </label>
                      <input
                        type="password"
                        name="password2"
                        value={form.password2}
                        onChange={handleChange}
                        className="w-full rounded-xl px-4 py-3 bg-white/10 text-white outline-none border-2 border-transparent focus:border-blue-500 font-medium text-base transition-all"
                        placeholder="Jelszó újra"
                        required
                      />
                    </div>
                  </div>
                )}
                {/* LÉPTETŐ GOMBOK */}
                <div className="flex gap-4 mt-10 justify-between px-2">
                  {step > 0 && (
                    <button
                      type="button"
                      className="rounded-full px-5 py-2 bg-white/10 text-white font-bold border-2 border-white/15 hover:bg-white/20 hover:border-blue-600 text-base transition-all shadow"
                      onClick={prev}
                    >
                      Vissza
                    </button>
                  )}
                  {step < steps.length - 1 ? (
                    <button
                      type="button"
                      className="ml-auto rounded-full px-5 py-2 bg-gradient-to-br from-pink-600 via-fuchsia-600 to-blue-600 text-white font-extrabold text-base hover:scale-105 transition-all shadow"
                      onClick={next}
                    >
                      Tovább
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className="ml-auto rounded-full px-5 py-2 bg-gradient-to-br from-pink-600 via-fuchsia-600 to-blue-600 text-white font-extrabold text-base hover:scale-105 transition-all shadow"
                    >
                      Regisztráció
                    </button>
                  )}
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </AuroraBackground>
  );
}
