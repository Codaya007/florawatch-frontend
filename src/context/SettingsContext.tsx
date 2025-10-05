"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

type RoleType = "guest" | "researcher" | "farmer" | "health" | "admin";

interface SettingsContextType {
  role: RoleType;
  setRole: (role: RoleType) => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const SettingsProvider = ({ children }: { children: ReactNode }) => {
  const [role, setRole] = useState<RoleType>("guest");

  return (
    <SettingsContext.Provider value={{ role, setRole }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error("useSettings must be used within a SettingsProvider");
  }
  return context;
};
