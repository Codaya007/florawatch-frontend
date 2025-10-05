'use client';

import React, { useEffect } from 'react';
import { MapContainer, TileLayer, GeoJSON, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { mockBloomData } from '@/data/mocks';

// Corrige el problema de los íconos de Leaflet en React (necesario)
delete (L.Icon.Default.prototype as any)._get;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: '/leaflet/marker-icon-2x.png',
  iconUrl: '/leaflet/marker-icon.png',
  shadowUrl: '/leaflet/marker-shadow.png',
});

interface TargetLocation {
  lat: number;
  lng: number;
  zoom: number;
}

interface SatelliteMapProps {
  isGlobalView: boolean;
  targetLocation: TargetLocation | null;
  selectedDate: string; // formato YYYY-MM-DD
  layer?: string; // capa NASA GIBS
}

// --- Determinar color según intensidad ---
const pointToLayer = (feature: any, latlng: L.LatLng) => {
  let color = '#1ff249'; // Low (verde)
  if (feature.properties.intensity === 'high') color = '#F56565'; // rojo
  else if (feature.properties.intensity === 'medium') color = '#F6E05E'; // amarillo

  return L.circleMarker(latlng, {
    radius: 5,
    fillColor: color,
    color: '#FFFFFF',
    weight: 1,
    opacity: 1,
    fillOpacity: 0.7,
  });
};

// --- Control del mapa dinámico (global/local/flyTo) ---
const MapUpdater = ({
  isGlobalView,
  targetLocation,
}: {
  isGlobalView: boolean;
  targetLocation: TargetLocation | null;
}) => {
  const map = useMap();
  const GLOBAL_VIEW: [number, number, number] = [30, 0, 1.5];
  const DEFAULT_LOCAL_VIEW: [number, number, number] = [36.7783, -119.4179, 7]; // California por defecto

  useEffect(() => {
    if (targetLocation) {
      map.flyTo([targetLocation.lat, targetLocation.lng], targetLocation.zoom, { duration: 1.5 });
      return;
    }

    const [lat, lng, zoom] = isGlobalView ? GLOBAL_VIEW : DEFAULT_LOCAL_VIEW;
    map.flyTo([lat, lng], 7, { duration: 1.5 });
  }, [isGlobalView, targetLocation, map]);

  return null;
};

// --- Mapa satelital NASA con datos de floración ---
export default function SatelliteMap({
  isGlobalView,
  targetLocation,
  selectedDate,
  layer = 'MODIS_Terra_CorrectedReflectance_TrueColor',
}: SatelliteMapProps) {
  const defaultCenter: [number, number] = [30, 0];
  const defaultZoom = 1;

  // NASA GIBS endpoint dinámico
  const nasaUrl = `https://gibs.earthdata.nasa.gov/wmts/epsg3857/best/${layer}/default/${selectedDate}/GoogleMapsCompatible_Level9/{z}/{y}/{x}.jpg`;

  console.log({nasaUrl}); //DEBUG

  return (
    <MapContainer
      center={defaultCenter}
      zoom={defaultZoom}
      minZoom={1}
      maxZoom={8} // NASA GIBS llega hasta zoom 8
      style={{
        height: '100%',
        width: '100%',
        backgroundColor: '#0B1A3E',
        borderRadius: '12px',
      }}
      scrollWheelZoom={true}
    >
      {/* Capa base satelital NASA */}
      <TileLayer
        url={nasaUrl}
        attribution='Imagery © NASA GIBS / MODIS'
        maxNativeZoom={9}
      />
      {/* TODO: Capa de floración (GeoJSON simulada) */}
      <GeoJSON
        data={mockBloomData as any}
        pointToLayer={pointToLayer}
        onEachFeature={(feature: any, layer: any) => {
          if (feature.properties && feature.properties.region) {
            layer.bindPopup(
              `🌿 Floración: ${feature.properties.region}<br/>Intensidad: ${feature.properties.intensity.toUpperCase()}`
            );
          }
        }}
      />

      <MapUpdater isGlobalView={isGlobalView} targetLocation={targetLocation} />
    </MapContainer>
  );
}
