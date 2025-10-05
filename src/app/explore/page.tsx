"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import Sidebar from "@/components/Sidebar";
import dayjs from "dayjs";
import SentinelsSatelliteMap from '@/components/SentinelsSatelliteMap';
import SatelliteMap from "@/components/SatelliteMap";
import { useSettings } from "@/context/SettingsContext";

// const MapComponent = dynamic(() => import('@/components/MapComponent'), { ssr: false });
const ClientOnlyTimeSeriesChart = dynamic(
  () => import("@/components/ClientOnlyTimeSeriesChart"),
  { ssr: false }
);

// 1. Importación dinámica del componente del mapa. Asegura que SentinelsSatelliteMap solo se cargue en el navegador
const DynamicSentinelsSatelliteMap = dynamic(
 () => import('../../components/SentinelsSatelliteMap'), // Asegúrate que la ruta sea correcta
 {
  ssr: false, // ¡Esta es la clave para solucionar el error!
  loading: () => <p>Cargando Mapa...</p>, // Opcional: Un indicador de carga
 }
);

export interface DateRange {
  start: string | null;
  end: string | null;
}

export default function HomePage() {
  const [isGlobalView, setIsGlobalView] = useState(true);
  const [dateRange, setDateRange] = useState<DateRange>({
    start: dayjs().format("YYYY-MM-DD"),
    end: null,
  });
  const [targetLocation, setTargetLocation] = useState<{
    lat: number;
    lng: number;
    zoom: number;
  } | null>(null);
  const [layer, setLayer] = useState<string | undefined>();
  const { role } = useSettings(); // Get the current user role

  // Función para manejar la selección de un lugar del buscador
  const handlePlaceSelect = (lat: number, lng: number) => {
    // Establecemos el nuevo objetivo, zoom a nivel de ciudad/región
    setTargetLocation({ lat, lng, zoom: 9 });

    // Desactivamos vista global
    setIsGlobalView(false);
  };

  const handleSetIsGlobalView = (value: boolean) => {
    setIsGlobalView(value);
    // Si volvemos a la vista global, eliminamos el objetivo
    if (value) setTargetLocation(null);
  };

  const getSentinelDateString = (dateRange: DateRange) => {
    // Si no hay fecha de inicio, usamos el día actual por defecto.
    const dateStr = dateRange.start || dayjs().format("YYYY-MM-DD");

    // Si existe una fecha de fin, formamos el rango 'start/end'.
    if (dateRange.end) {
      return `${dateStr}/${dateRange.end}`;
    }

    // Si solo hay una fecha de inicio (o solo el día actual), la usamos sola.
    return dateStr;
  };

  return (
    <div className="flex flex-1 overflow-hidden">
      {/* Área Central: Mapa y Gráfico de Intensidad */}
      <div className="secondary-bg flex flex-col flex-grow p-4 space-y-4 overflow-hidden">
        {/* Mapa Global: Pasamos el estado */}
        {/* <div className={`flex-1 min-h-0 rounded-xl overflow-hidden border border-white`}>
     <MapComponent 
      targetLocation={targetLocation} 
      isGlobalView={isGlobalView} 
     /> 
    </div> */}

        {/* MAPA SATELITAL */}
        {/* <div
          className={`flex-1 min-h-0 rounded-xl overflow-hidden border border-white`}
        >
          <SatelliteMap
            targetLocation={targetLocation}
            isGlobalView={isGlobalView}
            layer={layer}
            selectedDate={dateRange.start || dayjs().format("YYYY-MM-DD")}
          />
        </div> */}

        {/* MAPA SATELITAL CON CAPA DE SENTINELS */}
        <div style={{ height: '80vh', width: '100%' }}>
          <DynamicSentinelsSatelliteMap 
            targetLocation={targetLocation} 
            isGlobalView={isGlobalView} 
            selectedDate={getSentinelDateString(dateRange)}
          />
        </div>

        {/* Gráfico de Series Temporales */}
        <div
          className={`h-48 p-4 rounded-xl primary-bg border border-deep-blue`}
        >
          <h3 className="text-lg font-semibold mb-2 text-gray-200">
            {/* Conditional Title based on role */}
            {role === "guest"
              ? "Global Bloom Status Overview (Simple)"
              : "Bloom Intensity Trend (2019 - 2024)"}
          </h3>
          {/* Conditional Chart Component based on role */}
          <ClientOnlyTimeSeriesChart />
        </div>
      </div>

      {/* Barra Lateral (Sidebar) */}
      <div
        className={`w-96 secondary-bg p-6 overflow-y-auto scrollbar-hidden h-full`}
      >
        <Sidebar
          dateRange={dateRange}
          setDateRange={setDateRange}
          isGlobalView={isGlobalView}
          setIsGlobalView={handleSetIsGlobalView}
          onPlaceSelect={handlePlaceSelect}
          layer={layer}
          setLayer={setLayer}
          role={role} // Passing the role to the Sidebar
        />
      </div>
    </div>
  );
}
