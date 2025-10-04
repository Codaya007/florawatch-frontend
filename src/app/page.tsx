'use client'; 

import { useState } from 'react';
import dynamic from 'next/dynamic';
import Sidebar from '@/components/Sidebar';

const MapComponent = dynamic(() => import('@/components/MapComponent'), { ssr: false });
const ClientOnlyTimeSeriesChart = dynamic(() => import('@/components/ClientOnlyTimeSeriesChart'), { ssr: false });

export default function HomePage() {
  const [isGlobalView, setIsGlobalView] = useState(true); 
  const [targetLocation, setTargetLocation] = useState<{ lat: number; lng: number; zoom: number } | null>(null);

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

  return (
    <div className="flex flex-1 overflow-hidden">

      {/* Área Central: Mapa y Gráfico de Intensidad */}
      <div className="flex flex-col flex-grow p-4 space-y-4 overflow-hidden">
        
        {/* Mapa Global: Pasamos el estado */}
        <div className="flex-1 min-h-0 rounded-xl shadow-2xl overflow-hidden border border-[#4A5568]">
          <MapComponent 
            targetLocation={targetLocation} 
            isGlobalView={isGlobalView} 
          /> 
        </div>
        
        {/* Gráfico de Series Temporales */}
        <div className="h-48 p-4 rounded-xl shadow-2xl bg-[#2D3748] border border-[#4A5568]">
          <h3 className="text-lg font-semibold mb-2 text-gray-200">Bloom Intensity Trend (2019 - 2024)</h3>
          <ClientOnlyTimeSeriesChart /> 
        </div>
      </div>
      
      {/* Barra Lateral (Sidebar) */}
      <div className="w-96 bg-[#1A202C] border-l border-[#4A5568] shadow-2xl p-6 overflow-y-auto scrollbar-hidden h-full">
        <Sidebar 
          isGlobalView={isGlobalView} 
          setIsGlobalView={handleSetIsGlobalView}
          onPlaceSelect={handlePlaceSelect}
        />
      </div>
    </div>
  );
}