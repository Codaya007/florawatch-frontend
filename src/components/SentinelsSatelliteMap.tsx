"use client";

import L from "leaflet";
import React, { useEffect } from "react";
import "leaflet/dist/leaflet.css";
import { MapContainer, GeoJSON, useMap } from "react-leaflet";
import { WMSTileLayer } from "react-leaflet";
import { mockBloomData } from "@/data/mocks";
import { SENTINEL_INSTANCE_ID } from "@/constants";

delete (L.Icon.Default.prototype as any)._get;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "/leaflet/marker-icon-2x.png",
  iconUrl: "/leaflet/marker-icon.png",
  shadowUrl: "/leaflet/marker-shadow.png",
});

interface TargetLocation {
  lat: number;
  lng: number;
  zoom: number;
}

interface SatelliteMapProps {
  isGlobalView: boolean;
  targetLocation: TargetLocation | null;
  // selectedDate ahora puede ser una fecha simple (YYYY-MM-DD) o un rango (YYYY-MM-DD/YYYY-MM-DD)
  selectedDate: string;
}

// Determinamos color según intensidad
const pointToLayer = (feature: any, latlng: L.LatLng) => {
  let color = "#1ff249";
  if (feature.properties.intensity === "high") color = "#F56565";
  else if (feature.properties.intensity === "medium") color = "#F6E05E";

  return L.circleMarker(latlng, {
    radius: 5,
    fillColor: color,
    color: "#FFFFFF",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.7,
  });
};

// Para controlar el mapa (global/local/flyTo)
const MapUpdater = ({
  isGlobalView,
  targetLocation,
}: {
  isGlobalView: boolean;
  targetLocation: TargetLocation | null;
}) => {
  const map = useMap();
  const GLOBAL_VIEW: [number, number, number] = [30, 0, 1.5];
  const DEFAULT_LOCAL_VIEW: [number, number, number] = [36.7783, -119.4179, 7];

  useEffect(() => {
    if (targetLocation) {
      map.flyTo([targetLocation.lat, targetLocation.lng], targetLocation.zoom, {
        duration: 1.5,
      });
      return;
    }

    const [lat, lng, zoom] = isGlobalView ? GLOBAL_VIEW : DEFAULT_LOCAL_VIEW;
    map.flyTo([lat, lng], zoom, { duration: 1.5 });
  }, [isGlobalView, targetLocation, map]);

  return null;
};

// Mapa Satelital Sentinel-2 L2A
export default function SentinelsSatelliteMap({
  isGlobalView,
  targetLocation,
  selectedDate, // 'YYYY-MM-DD' o 'YYYY-MM-DD/YYYY-MM-DD'
}: SatelliteMapProps) {
//   const SENTINEL_LAYER_ID = "FALSE-COLOR";
  const SENTINEL_LAYER_ID = "NATURAL-COLOR";

  const defaultCenter: [number, number] = [30, 0];
  const defaultZoom = 1; // Un zoom inicial más global

  // Construcción de la URL de WMS de Sentinel Hub.
  // MOSAICKINGORDER=leastCC para obtener la mejor imagen (menor nubosidad)
  const sentinelUrl = `https://services.sentinel-hub.com/ogc/wms/${SENTINEL_INSTANCE_ID}`;

  console.log({selectedDate});

  // Parámetros de la solicitud WMS/WMTS
  const wmsParams = {
    layers: SENTINEL_LAYER_ID, 
    format: "image/jpeg",
    transparent: true,
    // Parámetros específicos de Sentinel Hub
    // 1. RANGO DE TIEMPO: Le dice a Sentinel Hub qué imágenes buscar.
    time: selectedDate, // Ejemplo: '2024-09-01/2024-09-30' o '2024-09-15'

    // 2. FILTRADO: Seleccionar la imagen con menos nubes
    // con 'leastCC' (least Cloud Coverage)
    // La cobertura máxima (maxcc) se puede añadir, pero por defecto 100%
    // maxcc: 20, // Solo usar tiles con 20% o menos de nubes
    maxcc: 100,

    // 3. Orden de mosaico: 'leastCC' toma el pixel del tile con la menor cobertura de nubes.
    // Si se usa un rango de fechas, esto busca la mejor imagen en ese rango.
    // Si se usa una sola fecha, simplemente usa la mejor adquisición disponible ese día.
    custom: `MOSAICKINGORDER=leastCC`,

    service: "WMS",
    request: "GetMap",
    version: "1.3.0",
  };

  return (
    <MapContainer
      crs={L.CRS.EPSG3857}
      center={defaultCenter}
      zoom={defaultZoom}
      minZoom={1}
      maxZoom={18} // Sentinel-2 tiene mucho más zoom (hasta 10m de resolución)
      style={{
        height: "100%",
        width: "100%",
        backgroundColor: "#0B1A3E",
        borderRadius: "12px",
      }}
      scrollWheelZoom={true}
    >
        <WMSTileLayer
        url={sentinelUrl} // Usamos solo la URL base
        attribution='&copy; <a href="http://www.sentinel-hub.com/" target="_blank">Sentinel Hub</a> | Contains modified Copernicus Sentinel data'
        params={wmsParams} // Pasamos todos los parámetros WMS/Sentinel Hub aquí
        maxZoom={18}
        />

      {/* TODO: Capa de floración (GeoJSON simulada) */}
      <GeoJSON
        data={mockBloomData as any}
        pointToLayer={pointToLayer}
        onEachFeature={(feature: any, layer: any) => {
          if (feature.properties && feature.properties.region) {
            layer.bindPopup(
              `🌿 Floración: ${
                feature.properties.region
              }<br/>Intensidad: ${feature.properties.intensity.toUpperCase()}`
            );
          }
        }}
      />

      <MapUpdater isGlobalView={isGlobalView} targetLocation={targetLocation} />
    </MapContainer>
  );
}
