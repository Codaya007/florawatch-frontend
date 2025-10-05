"use client";

import React from "react";
import { useSettings } from "@/context/SettingsContext";

export default function Header() {
  const { role, setRole } = useSettings();

  return (
    <header className="flex justify-between items-center p-4 primary-bg border-b border-gray-700">
      {/* 🔸 Logo */}
      <div className="flex items-center space-x-2">
        <img src="/logo.svg" alt="Logo de BloomWatch" className="h-10" />
        <span className="text-2xl font-extrabold tracking-wider text-white">
          Bloom<span className="text-green-400">Watch</span>
        </span>
      </div>

      {/* Menú de navegación dinámico */}
      <nav className="flex items-center space-x-6 text-gray-300">
          <a
            key={"/explore"}
            href={"/explore"}
            className="hover:text-green-400 transition-colors"
          >Explore
          </a>
      </nav>

      {/* Selector de rol y utilidades */}
      <div className="flex items-center space-x-4">
        {/* Selector de rol */}
        <select
          value={role}
          onChange={(e) => setRole(e.target.value as any)}
          className="bg-gray-800 text-gray-200 px-3 py-1 rounded-md focus:outline-none focus:ring focus:ring-green-400 primary-bg cursor-pointer"
        >
          <option value="guest">Guest</option>
          <option value="researcher">Researcher</option>
          <option value="farmer">Farmer</option>
          <option value="health">Health</option>
        </select>

        {/* Iconos utilitarios */}
        {/* <img
          src="/gear-six.svg"
          alt="Configuraciones"
          className="w-6 h-6 hover:opacity-80 cursor-pointer"
        /> */}
        <img
          src="/user.svg"
          alt="Perfil"
          className="w-6 h-6 hover:opacity-80 cursor-pointer"
        />
      </div>
    </header>
  );
}
