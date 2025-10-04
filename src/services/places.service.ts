import { PLACES_API_URL } from "@/constants";

// Función: Petición y búsqueda con la API de Photon (Open Source) de lugares por searchTerm
export const searchPlaces = async (query: string) => {
  if (query.length < 3) return [];
  
  // Endpoint público de Photon optimizado para autocompletado
  const url = `${PLACES_API_URL}/?q=${query}&limit=5&lang=en`; 
  
  try {
    const response = await fetch(url);
    const data = await response.json();

    // console.log({data, url}); // DEBUG
    
    const results = data.features.map((feature: any) => ({
      name: feature.properties.name + 
            (feature.properties.city ? `, ${feature.properties.city}` : '') +
            (feature.properties.country ? `, ${feature.properties.country}` : ''),
      lat: feature.geometry.coordinates[1],
      lon: feature.geometry.coordinates[0],
    }));

    return results;
  } catch (error) {
    console.error("Error fetching geocoding data:", error);
    return [];
  }
};