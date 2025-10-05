"use client";
import React, { useState } from "react";
import InfoCard from "./InfoCard";
import { ToggleSwitch } from "./ToggleSwitch";
import { mockInsights } from "@/data/mocks";
import SearchAndFilterSection from "./SearchAndFilterSection";
import { DateRange } from "@/app/explore/page";

interface SidebarProps {
  dateRange: DateRange;
  setDateRange: (range: DateRange) => void;
  isGlobalView: boolean;
  setIsGlobalView: (isGlobal: boolean) => void;
  onPlaceSelect: (lat: number, lng: number) => void;
  layer?: string;
  setLayer?: (layer: string) => void;
  role: "guest" | "researcher" | "farmer" | "health";
}

// GUEST Content: Simple and educational
const GuestSidebarContent = () => (
  <>
    <InfoCard title="Global Bloom Status (Landsat Data)">
      <p className="text-sm text-gray-400 mb-3">
        Current global bloom intensity is **Medium-High**. Data is mocked for a
        simple overview, referencing accessible satellite data like Landsat.
      </p>
      <div className="flex justify-between text-xs text-gray-500 mt-2">
        <span>Last Update: Mocked 2024-05-15</span>
        <span>Source: NASA (Mock)</span>
      </div>
      {/* Simple visual indicator */}
      <div className="h-6 mt-3 rounded-lg bg-green-500 w-3/4"></div>
    </InfoCard>
  </>
);

// FARMER Content: Localized and agricultural focus - UPDATED TO READ GPS
const FarmerSidebarContent = ({ onPlaceSelect }: SidebarProps) => {
  const [isLocating, setIsLocating] = useState(false);

  // Function to get GPS location and update map
  const handleLocateMe = () => {
    // Check if Geolocation is supported
    if (!navigator.geolocation) {
      alert(
        "Geolocation is not supported by your browser. Falling back to default location."
      );
      // Fallback to a default agricultural zone
      onPlaceSelect(36.7783, -119.4179);
      return;
    }

    setIsLocating(true);

    // Get current position
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;

        // Pass the real GPS coordinates to the map
        onPlaceSelect(latitude, longitude);
        setIsLocating(false);
      },
      (error) => {
        console.error("Geolocation error:", error);
        // Fallback to a default agricultural zone if geolocation fails or is denied
        onPlaceSelect(36.7783, -119.4179);
        setIsLocating(false);
        alert(
          "Could not get your location. Falling back to Central Valley, CA."
        );
      }
    );
  };

  return (
    <>
      <InfoCard title="My Zone Status">
        <p className="text-sm text-gray-400 mb-2">
          Start tracking your zone by using your current GPS location.
        </p>
        <button
          onClick={handleLocateMe}
          className="w-full primary-bg p-2 rounded-lg text-white font-semibold hover:bg-deep-blue transition-colors disabled:bg-gray-600"
          disabled={isLocating}
        >
          {isLocating ? "Locating..." : "Locate My Zone (GPS)"}
        </button>
      </InfoCard>

      <InfoCard title="Zone Bloom Alerts">
        <ul className="space-y-3">
          <li className="text-sm p-2 rounded-lg bg-gray-800 border-l-4 border-red-500 hover:bg-gray-700 transition-colors">
            <span className="font-semibold text-red-300 mr-1">ALERT:</span>{" "}
            Almond Bloom Peak reached 3 days earlier than 5-year average.
          </li>
        </ul>
      </InfoCard>

      <InfoCard title="Identified Crops in Area">
        <div className="flex items-center space-x-4">
          <img
            src="/almond-image.png"
            alt="Almond Bloom"
            className="w-20 h-20 object-cover rounded-lg border border-gray-600"
          />
          <div>
            <p className="text-sm text-gray-400">Satellite Identified:</p>
            <p className="text-lg font-semibold text-white">
              Prunus dulcis (Almond)
            </p>
            <p className="text-sm text-green-400">Confidence: 98%</p>
          </div>
        </div>
      </InfoCard>
    </>
  );
};

// HEALTH Content: Pollen and health focus
const HealthSidebarContent = () => (
  <>
    <InfoCard title="Health & Pollen Alerts">
      <ul className="space-y-3">
        <li className="text-sm p-2 rounded-lg bg-gray-800 border-l-4 border-yellow-500 hover:bg-gray-700 transition-colors">
          <span className="font-semibold text-yellow-300 mr-1">WARNING:</span>{" "}
          High Pollen Risk in Southern California due to recent 'Superbloom'
          activity.
        </li>
      </ul>
    </InfoCard>

    <InfoCard title="Pollen Risk Index (Mock)">
      <p className="text-4xl font-bold text-red-500 mb-2">8/10</p>
      <p className="text-sm text-gray-400">Region: Central Valley, CA</p>
      <p className="text-xs text-gray-500 mt-2">
        Based on satellite-derived bloom intensity correlation with known
        allergenic species.
      </p>
    </InfoCard>
  </>
);

// RESEARCHER Content: Original advanced sidebar
const ResearcherSidebarContent = ({
  isPredictiveModelActive,
  setIsPredictiveModelActive,
}: {
  isPredictiveModelActive: boolean;
  setIsPredictiveModelActive: (value: boolean) => void;
}) => (
  <>
    {/* 3. INSIGHTS */}
    <InfoCard title="Bloom Insights (Actionable)">
      <ul className="space-y-3">
        {mockInsights.map((insight) => (
          <li
            key={insight.id}
            className="text-sm p-2 rounded-lg bg-gray-800 border-l-4 border-yellow-500 hover:bg-gray-700 transition-colors"
          >
            <span className="font-semibold text-yellow-300 mr-1">ALERT:</span>{" "}
            {insight.text}
          </li>
        ))}
      </ul>
    </InfoCard>

    {/* 4. ESPECIES IDENTIFICADAS */}
    <InfoCard title="Species Identification">
      <div className="flex items-center space-x-4">
        <img
          src="/almond-image.png"
          alt="Almond Bloom"
          className="w-20 h-20 object-cover rounded-lg border border-gray-600"
        />
        <div>
          <p className="text-sm text-gray-400">Satellite Point (ML):</p>
          <p className="text-lg font-semibold text-white">
            Prunus dulcis (Almond)
          </p>
          <p className="text-sm text-green-400">Confidence: 92%</p>
        </div>
      </div>
      {/* Nota: Necesitarías añadir una imagen de stock en la carpeta public/ */}
    </InfoCard>

    {/* 5. MODELO PREDICTIVO */}
    <InfoCard title="Predictive Model">
      <ToggleSwitch
        isActive={isPredictiveModelActive}
        onChange={() => setIsPredictiveModelActive(!isPredictiveModelActive)}
        label="Activate Bloom Prediction"
      />

      <div className="mt-4 h-24 p-2 bg-gray-700 rounded-lg">
        <h4 className="text-sm mb-1 text-gray-300">Next 7 Days Forecast</h4>
        {/* Mini gráfico de barras de predicción (simulado) */}
        <div className="h-16 flex items-end space-x-1">
          <div className="w-1/7 bg-blue-500" style={{ height: "30%" }}></div>
          <div className="w-1/7 bg-blue-500" style={{ height: "70%" }}></div>
          <div className="w-1/7 bg-blue-500" style={{ height: "70%" }}></div>
          <div className="w-1/7 bg-blue-500" style={{ height: "10%" }}></div>
          <div className="w-1/7 bg-blue-500" style={{ height: "50%" }}></div>
          <div className="w-1/7 bg-blue-400" style={{ height: "20%" }}></div>
          <div className="w-1/7 bg-blue-400" style={{ height: "10%" }}></div>
        </div>
      </div>
    </InfoCard>
  </>
);

export default function Sidebar({
  isGlobalView,
  setIsGlobalView,
  onPlaceSelect,
  dateRange,
  setDateRange,
  layer,
  setLayer,
  role,
}: SidebarProps) {
  const [isPredictiveModelActive, setIsPredictiveModelActive] = useState(false);

  const renderRoleContent = () => {
    switch (role) {
      case "guest":
        return <GuestSidebarContent />;
      case "researcher":
        return (
          <ResearcherSidebarContent
            isPredictiveModelActive={isPredictiveModelActive}
            setIsPredictiveModelActive={setIsPredictiveModelActive}
          />
        );
      case "farmer":
        // Note: The Farmer content only needs 'onPlaceSelect' for GPS
        return (
          <FarmerSidebarContent
            role={role}
            dateRange={dateRange}
            setDateRange={setDateRange}
            isGlobalView={isGlobalView}
            setIsGlobalView={setIsGlobalView}
            onPlaceSelect={onPlaceSelect}
          />
        );
      case "health":
        return <HealthSidebarContent />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6 secondary-bg">
      {/* 1. Switch de Vista Global/Local */}
      <InfoCard title="Map View">
        <ToggleSwitch
          isActive={isGlobalView}
          onChange={() => setIsGlobalView(!isGlobalView)}
          label="Global View"
        />
      </InfoCard>

      {/* 2. FILTROS Y BÚSQUEDA */}
      <SearchAndFilterSection
        isGlobalView={isGlobalView}
        onPlaceSelect={onPlaceSelect}
        dateRange={dateRange}
        setDateRange={setDateRange}
        layer={layer}
        setLayer={setLayer}
      />

      {/* 3. Conditional Content based on Role */}
      {renderRoleContent()}
    </div>
  );
}
