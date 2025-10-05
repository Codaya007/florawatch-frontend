'use client';

import React, { useEffect } from 'react';
import { MapContainer, TileLayer, GeoJSON, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'; 
import L from 'leaflet';
import { mockBloomData } from '@/data/mocks';

import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';

// Corrige el problema de los íconos de Leaflet en React (necesario)
L.Icon.Default.mergeOptions({
  iconRetinaUrl: iconRetinaUrl.src,
  iconUrl: iconUrl.src,
  shadowUrl: shadowUrl.src,
});

interface TargetLocation {
  lat: number;
  lng: number;
  zoom: number;
}

interface MapComponentProps {
  isGlobalView: boolean;
  targetLocation: TargetLocation | null; 
}

// Función para determinar el color del marcador basado en la intensidad de floración
const pointToLayer = (feature: any, latlng: L.LatLng) => {
    // Low (Verde), por defecto
    let color = '#1ff249'; 
    // High (Rojo)
    if (feature.properties.intensity === 'high') color = '#F56565'; 
    // Medium (Amarillo)
    else if (feature.properties.intensity === 'medium') color = '#F6E05E'; 
          
    return L.circleMarker(latlng, {
      radius: 5,
      fillColor: color,
      color: '#FFFFFF',
      weight: 1,
      opacity: 1,
      fillOpacity: 0.7
    });
};

const MapUpdater = ({ isGlobalView, targetLocation }: { isGlobalView: boolean, targetLocation: TargetLocation | null }) => {
  const map = useMap();
  
  const GLOBAL_VIEW: [number, number, number] = [30, 0, 1.5]; // Lat, Lon, Zoom
  const DEFAULT_LOCAL_VIEW: [number, number, number] = [36.7783, -119.4179, 7]; // California por defecto

  useEffect(() => {
    // Si hay una ubicación objetivo (busqueda), ir a ella
    if (targetLocation) {
      map.flyTo([targetLocation.lat, targetLocation.lng], targetLocation.zoom, { duration: 1.5 });
      return;
    }
    
    // Si no hay objetivo, usa el toggle Global/Local
    const [lat, lng, zoom] = isGlobalView ? GLOBAL_VIEW : DEFAULT_LOCAL_VIEW;
    map.flyTo([lat, lng], zoom, { duration: 1.5 });

  }, [isGlobalView, targetLocation, map]);
  
  return null;
};

export default function MapComponent({ isGlobalView, targetLocation }: MapComponentProps) {
  const defaultCenter: [number, number] = [30, 0];
  const defaultZoom = 1; // Nivel de zoom global

  return (
    <MapContainer 
      center={defaultCenter} 
      zoom={defaultZoom} 
      minZoom={1} // Evita que el usuario se aleje demasiado
      maxZoom={12} // Limita el zoom máximo
      style={{ height: '100%', width: '100%', backgroundColor: '#2D3748' }} 
      scrollWheelZoom={true} // para que se pueda hacer zoom
    >
      {/* Proveedor de Teselas Satelitales Open Source (Esri World Imagery) */}
      <TileLayer
        // url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
        url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
      />
      
      {/* Capa de Datos de Floración (GeoJSON) */}
      <GeoJSON 
        data={mockBloomData as any} 
        pointToLayer={pointToLayer}
        onEachFeature={(feature: any, layer: any) => {
          if (feature.properties && feature.properties.region) {
            layer.bindPopup(`Floración: ${feature.properties.region} | Intensidad: ${feature.properties.intensity.toUpperCase()}`);
          }
        }}
      />

      <MapUpdater isGlobalView={isGlobalView} targetLocation={targetLocation} /> 
    </MapContainer>
  );
}