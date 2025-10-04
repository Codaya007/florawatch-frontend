"use client"
import React, { useState } from 'react';
import InfoCard from './InfoCard';
import { ToggleSwitch } from './ToggleSwitch';
import { mockInsights } from '@/data/mocks';
import SearchAndFilterSection from './SearchAndFilterSection';

interface SidebarProps {
  isGlobalView: boolean;
  setIsGlobalView: (isGlobal: boolean) => void;
  onPlaceSelect: (lat: number, lng: number) => void; 
}

export default function Sidebar({ isGlobalView, setIsGlobalView, onPlaceSelect }: SidebarProps) {
  const [isPredictiveModelActive, setIsPredictiveModelActive] = useState(false);

  return (
    <div className="space-y-6">
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
      />

      {/* 3. INSIGHTS */}
      <InfoCard title="Bloom Insights (Actionable)">
        <ul className="space-y-3">
          {mockInsights.map((insight) => (
            <li key={insight.id} className="text-sm p-2 rounded-lg bg-gray-800 border-l-4 border-yellow-500 hover:bg-gray-700 transition-colors">
              <span className="font-semibold text-yellow-300 mr-1">ALERT:</span> {insight.text}
            </li>
          ))}
        </ul>
      </InfoCard>
      
      {/* 4. ESPECIES IDENTIFICADAS */}
      <InfoCard title="Identificación de Especies">
        <div className="flex items-center space-x-4">
          <img src="/almond-image.png" alt="Almond Bloom" className="w-20 h-20 object-cover rounded-lg border border-gray-600" />
          <div>
            <p className="text-sm text-gray-400">Punto Satelital (ML):</p>
            <p className="text-lg font-semibold text-white">Prunus dulcis (Almendra)</p>
            <p className="text-sm text-green-400">Confianza: 92%</p>
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
            <div className="w-1/7 bg-blue-500" style={{ height: '30%' }}></div>
            <div className="w-1/7 bg-blue-500" style={{ height: '70%' }}></div>
            <div className="w-1/7 bg-blue-500" style={{ height: '70%' }}></div>
            <div className="w-1/7 bg-blue-500" style={{ height: '10%' }}></div>
            <div className="w-1/7 bg-blue-500" style={{ height: '50%' }}></div>
            <div className="w-1/7 bg-blue-400" style={{ height: '20%' }}></div>
            <div className="w-1/7 bg-blue-400" style={{ height: '10%' }}></div>
          </div>
        </div>
      </InfoCard>
    </div>
  );
}