"use client";

import L from "leaflet";
import React, { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";
import { MapContainer, GeoJSON, useMap } from "react-leaflet";
import { WMSTileLayer } from "react-leaflet";
import { mockBloomData } from "@/data/mocks";
import {
  SENTINEL_INSTANCE_ID,
  SENTINEL_CLIENT_ID,
  SENTINEL_CLIENT_SECRET,
} from "@/constants";

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
  selectedDate: string;
}

// Hook personalizado para obtener el token OAuth
const useSentinelAuth = () => {
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchToken = async () => {
      try {
        setIsLoading(true);

        const body = new URLSearchParams({
          client_id: SENTINEL_CLIENT_ID,
          client_secret: SENTINEL_CLIENT_SECRET,
          grant_type: "client_credentials",
        });

        const response = await fetch(
          "https://services.sentinel-hub.com/auth/realms/main/protocol/openid-connect/token",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
            },
            body: body.toString(),
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setToken(data.access_token);
        setError(null);
        console.log("✅ Token obtenido exitosamente");
      } catch (err) {
        console.error("Error fetching Sentinel Hub token:", err);
        setError("Failed to authenticate with Sentinel Hub");
      } finally {
        setIsLoading(false);
      }
    };

    fetchToken();

    // Renovar token cada 50 minutos (los tokens duran 1 hora)
    const interval = setInterval(fetchToken, 50 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  return { token, isLoading, error };
};

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

export default function SentinelsSatelliteMap({
  isGlobalView,
  targetLocation,
  selectedDate,
}: SatelliteMapProps) {
  const { token, isLoading, error } = useSentinelAuth();
  const SENTINEL_LAYER_ID = "NATURAL-COLOR";
  const defaultCenter: [number, number] = [30, 0];
  const defaultZoom = 1;

  // Construcción de la URL de WMS con el token
  const sentinelUrl = token
    ? `https://services.sentinel-hub.com/ogc/wms/${SENTINEL_INSTANCE_ID}?access_token=${token}`
    : `https://services.sentinel-hub.com/ogc/wms/${SENTINEL_INSTANCE_ID}`;

  console.log({ selectedDate, hasToken: !!token });

  const wmsParams = {
    layers: SENTINEL_LAYER_ID,
    format: "image/jpeg",
    transparent: true,
    time: selectedDate,
    maxcc: 100,
    custom: `MOSAICKINGORDER=leastCC`,
    service: "WMS",
    request: "GetMap",
    version: "1.3.0",
  };

  if (isLoading) {
    return (
      <div
        style={{
          height: "100%",
          width: "100%",
          backgroundColor: "#0B1A3E",
          borderRadius: "12px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          fontSize: "16px",
        }}
      >
        🛰️ Autenticando con Sentinel Hub...
      </div>
    );
  }

  if (error) {
    return (
      <div
        style={{
          height: "100%",
          width: "100%",
          backgroundColor: "#0B1A3E",
          borderRadius: "12px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#F56565",
          padding: "20px",
          textAlign: "center",
        }}
      >
        <div>
          <div style={{ fontSize: "18px", marginBottom: "10px" }}>
            ⚠️ Error de autenticación
          </div>
          <div style={{ fontSize: "14px" }}>{error}</div>
          <div
            style={{ fontSize: "12px", marginTop: "10px", color: "#A0AEC0" }}
          >
            Verifica tus credenciales de Sentinel Hub
          </div>
        </div>
      </div>
    );
  }

  return (
    <MapContainer
      crs={L.CRS.EPSG3857}
      center={defaultCenter}
      zoom={defaultZoom}
      minZoom={1}
      maxZoom={18}
      style={{
        height: "100%",
        width: "100%",
        backgroundColor: "#0B1A3E",
        borderRadius: "12px",
      }}
      scrollWheelZoom={true}
    >
      <WMSTileLayer
        url={sentinelUrl}
        attribution='&copy; <a href="http://www.sentinel-hub.com/" target="_blank">Sentinel Hub</a> | Contains modified Copernicus Sentinel data'
        params={wmsParams}
        maxZoom={18}
      />

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
