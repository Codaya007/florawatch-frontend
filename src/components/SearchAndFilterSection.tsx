"use client"
import React, { useEffect, useState, useRef } from 'react';
import InfoCard from './InfoCard';
import { searchPlaces } from '@/services/places.service'; 
import { ToggleSwitch } from './ToggleSwitch';
import { DateRange } from '@/app/explore/page';

interface SearchAndFilterProps {
  isGlobalView: boolean;
  onPlaceSelect: (lat: number, lng: number) => void;
  dateRange: DateRange;
  setDateRange: (range: DateRange) => void;
  layer?: string;
  setLayer?: (layer: string) => void;
}



export default function SearchAndFilterSection({ isGlobalView, onPlaceSelect, dateRange, setDateRange, layer, setLayer = () => {} }: SearchAndFilterProps) {
  
  const [searchTerm, setSearchTerm] = useState('');
  const [activeRange, setActiveRange] = useState(false);
  const [suggestions, setSuggestions] = useState<any[]>([]);
  
  // BUG FIX: Flag para evitar que la actualización por clic dispare una nueva búsqueda
  const skipSearchRef = useRef(false);

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>, type: "start" | "end") => {
    const { value } = e.target;
    // @ts-ignore
    setDateRange((prev: DateRange) => ({ ...prev, [type]: value }));
  };

  const handleSuggestionClick = (suggestion: any) => {
    // Establecemos el flag ANTES de actualizar searchTerm
    skipSearchRef.current = true; 
    
    // Actualiza el input y limpiamos las sugerencias
    setSearchTerm(suggestion.name); 
    setSuggestions([]); 
    
    // Lo llevamos a esa ubicación en el mapa
    onPlaceSelect(suggestion.lat, suggestion.lon);
  };

  // LÓGICA DE BÚSQUEDA (con check del bug fix)
  useEffect(() => {
    // flag activo = es un clic, lo desactivamos y salimos para no buscar sugerencias nuevamente
    if (skipSearchRef.current) {
        skipSearchRef.current = false; 
        return; 
    }
    
    // Lógica normal de debounce
    if (searchTerm.length > 2) {
      const timeoutId = setTimeout(() => {
        searchPlaces(searchTerm).then(setSuggestions);
      }, 300);

      return () => clearTimeout(timeoutId);
    } else {
      setSuggestions([]);
    }
  }, [searchTerm]);

  return (
    <InfoCard title="Filters and Search">
      {/* Buscador de lugares (SOLO si no es global) */}
      {!isGlobalView && (
        <div className="relative"> 
          <input 
            type="text" 
            placeholder="Japan, Ecuador, National Park..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && suggestions.length > 0) {
                handleSuggestionClick(suggestions[0]);
              }
            }}
            className="w-full p-2 rounded-lg bg-[#2D3748] border border-[#4A5568] text-gray-100 placeholder-gray-400 focus:ring-[#38B2AC] focus:border-[#38B2AC]"
          />
          
          {/* LISTA DE SUGERENCIAS */}
          {suggestions.length > 0 && (
            <ul className="absolute z-20 w-full bg-[#2D3748] border border-[#4A5568] rounded-lg mt-1 max-h-60 overflow-y-auto shadow-xl">
              {suggestions.map((suggestion) => (
                <li 
                  key={`${suggestion.lat}-${suggestion.lon}`}
                  className="p-2 text-sm text-gray-200 hover:bg-[#38B2AC] hover:text-white cursor-pointer transition-colors"
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  {suggestion.name}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
      
      {/* Toggle de Rango de Fecha */}
      <div className={!isGlobalView ? "mt-4" : ""}>
        <ToggleSwitch 
          isActive={activeRange}
          onChange={() => setActiveRange(!activeRange)}
          label="Date Range"
        />
      </div>

      <div className="flex flex-wrap mt-3 -mx-1"> 
        
        {/* Campo de Fecha de Inicio */}
        <div className={`flex-1 px-1 ${activeRange ? 'min-w-[48%]' : 'min-w-full'}`}> 
          <label className="text-xs text-gray-400 block mb-1">
            {activeRange ? 'Start' : 'Single'} Date
          </label>
          <input 
            type="date" 
            value={dateRange.start || ""} 
            className="w-full p-2 rounded-lg bg-[#2D3748] border border-[#4A5568] text-gray-100 focus:ring-[#38B2AC] focus:border-[#38B2AC]"
            onChange={(e) => handleDateChange(e, "start")}
          />
        </div>
        
        {/* Campo de Fecha de Fin */}
        {activeRange && (
          <div className="flex-1 px-1 min-w-[48%] mt-4 sm:mt-0"> 
            <label className="text-xs text-gray-400 block mb-1">
              End Date
            </label>
            <input 
              type="date" 
              value={dateRange.end || ""} 
              className="w-full p-2 rounded-lg bg-[#2D3748] border border-[#4A5568] text-gray-100 focus:ring-[#38B2AC] focus:border-[#38B2AC]"
              onChange={(e) => handleDateChange(e, "end")}
            />
          </div>
        )}
      </div>

      <select
        onChange={(e) => setLayer(e.target.value)}
        className="bg-[#0B1A3E] text-white p-2 rounded-md w-full mt-2"
        defaultValue={layer}
      >
        <option value="MODIS_Terra_CorrectedReflectance_TrueColor">True Color</option>
        <option value="MODIS_Terra_CorrectedReflectance_Bands721">Vegetation</option>
        <option value="MODIS_Aqua_Chlorophyll_A">Chlorophyll</option>
        <option value="MODIS_Terra_Land_Surface_Temp_Day">Surface Temperature</option>
      </select>

    </InfoCard>
  );
}