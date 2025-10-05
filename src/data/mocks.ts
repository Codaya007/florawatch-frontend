// Este código asume que está en un archivo JavaScript o TypeScript de módulo (por ejemplo, mocks.ts)

const mockInsights = [
 { id: 1, text: "ALERT: Almond bloomed 2 weeks early in California due to anomalous temperatures." },
 { id: 2, text: "ALERT: Moderate post-bloom pest risk in Central Europe. Monitor closely." },
 { id: 3, text: "ALERT: High pollen forecast in Northeast Asia for the coming week." },
];

const mockBloomData = { // Se quitó 'export' de aquí para evitar la duplicidad
 type: 'FeatureCollection',
 features: [
  // ==============================================
  // 1. CLUSTER: SUDÁFRICA (Western Cape) - Primavera, Fynbos (ALTA) - 15 puntos
  // ==============================================
  { type: 'Feature', geometry: { type: 'Point', coordinates: [18.52, -33.92] }, properties: { intensity: 'high', region: 'South Africa Fynbos Peak' } },
  { type: 'Feature', geometry: { type: 'Point', coordinates: [18.50, -33.88] }, properties: { intensity: 'high', region: 'South Africa Fynbos Peak' } },
  { type: 'Feature', geometry: { type: 'Point', coordinates: [18.55, -34.01] }, properties: { intensity: 'medium', region: 'Cape Floral Blooms' } },
  { type: 'Feature', geometry: { type: 'Point', coordinates: [18.51, -34.05] }, properties: { intensity: 'high', region: 'Cape Floral Blooms' } },
  { type: 'Feature', geometry: { type: 'Point', coordinates: [18.60, -33.95] }, properties: { intensity: 'high', region: 'Fynbos Reserve Active' } },
  { type: 'Feature', geometry: { type: 'Point', coordinates: [18.48, -34.00] }, properties: { intensity: 'medium', region: 'Cape Floral Blooms' } },
  { type: 'Feature', geometry: { type: 'Point', coordinates: [18.45, -33.90] }, properties: { intensity: 'high', region: 'South Africa Fynbos Peak' } },
  { type: 'Feature', geometry: { type: 'Point', coordinates: [18.43, -34.03] }, properties: { intensity: 'medium', region: 'Cape Floral Blooms' } },
  { type: 'Feature', geometry: { type: 'Point', coordinates: [18.65, -34.10] }, properties: { intensity: 'high', region: 'Fynbos Reserve Active' } },
  { type: 'Feature', geometry: { type: 'Point', coordinates: [18.40, -33.97] }, properties: { intensity: 'medium', region: 'Cape Floral Blooms' } },
  { type: 'Feature', geometry: { type: 'Point', coordinates: [18.70, -34.08] }, properties: { intensity: 'high', region: 'South Africa Fynbos Peak' } },
  { type: 'Feature', geometry: { type: 'Point', coordinates: [18.58, -33.99] }, properties: { intensity: 'low', region: 'Fynbos Reserve Active' } },
  { type: 'Feature', geometry: { type: 'Point', coordinates: [18.72, -33.95] }, properties: { intensity: 'medium', region: 'Cape Floral Blooms' } },
  { type: 'Feature', geometry: { type: 'Point', coordinates: [18.49, -34.08] }, properties: { intensity: 'high', region: 'South Africa Fynbos Peak' } },
  { type: 'Feature', geometry: { type: 'Point', coordinates: [18.57, -33.89] }, properties: { intensity: 'high', region: 'Cape Floral Blooms' } },


  // ==============================================
  // 2. CLUSTER: AUSTRALIA (Western Wildflowers) - 10 puntos
  // ==============================================
  { type: 'Feature', geometry: { type: 'Point', coordinates: [115.89, -31.90] }, properties: { intensity: 'high', region: 'WA Wildflower Superbloom' } },
  { type: 'Feature', geometry: { type: 'Point', coordinates: [115.82, -32.05] }, properties: { intensity: 'medium', region: 'Australian Sandplain Flora' } },
  { type: 'Feature', geometry: { type: 'Point', coordinates: [115.75, -31.85] }, properties: { intensity: 'high', region: 'WA Wildflower Superbloom' } },
  { type: 'Feature', geometry: { type: 'Point', coordinates: [115.95, -31.99] }, properties: { intensity: 'medium', region: 'Australian Sandplain Flora' } },
  { type: 'Feature', geometry: { type: 'Point', coordinates: [116.05, -32.10] }, properties: { intensity: 'high', region: 'WA Wildflower Superbloom' } },
  { type: 'Feature', geometry: { type: 'Point', coordinates: [115.91, -32.15] }, properties: { intensity: 'medium', region: 'Australian Sandplain Flora' } },
  { type: 'Feature', geometry: { type: 'Point', coordinates: [115.65, -31.75] }, properties: { intensity: 'low', region: 'WA Wildflower Coastal' } },
  { type: 'Feature', geometry: { type: 'Point', coordinates: [116.15, -32.08] }, properties: { intensity: 'medium', region: 'Australian Sandplain Flora' } },
  { type: 'Feature', geometry: { type: 'Point', coordinates: [116.20, -32.12] }, properties: { intensity: 'high', region: 'WA Wildflower Superbloom' } },
  { type: 'Feature', geometry: { type: 'Point', coordinates: [115.88, -31.82] }, properties: { intensity: 'medium', region: 'WA Wildflower Coastal' } },

  // ==============================================
  // 3. CLUSTER: CHILE (Valles Centrales) - 10 puntos
  // ==============================================
  { type: 'Feature', geometry: { type: 'Point', coordinates: [-70.80, -33.40] }, properties: { intensity: 'high', region: 'Chile Central Cherry Bloom' } },
  { type: 'Feature', geometry: { type: 'Point', coordinates: [-70.95, -33.55] }, properties: { intensity: 'high', region: 'Chile Central Fruit Orchards' } },
  { type: 'Feature', geometry: { type: 'Point', coordinates: [-70.70, -33.30] }, properties: { intensity: 'medium', region: 'Chile Central Vines' } },
  { type: 'Feature', geometry: { type: 'Point', coordinates: [-71.05, -33.65] }, properties: { intensity: 'high', region: 'Chile Central Cherry Bloom' } },
  { type: 'Feature', geometry: { type: 'Point', coordinates: [-71.15, -33.70] }, properties: { intensity: 'medium', region: 'Chile Central Fruit Orchards' } },
  { type: 'Feature', geometry: { type: 'Point', coordinates: [-70.90, -33.25] }, properties: { intensity: 'high', region: 'Chile Central Vines' } },
  { type: 'Feature', geometry: { type: 'Point', coordinates: [-70.60, -33.45] }, properties: { intensity: 'medium', region: 'Chile Central Cherry Bloom' } },
  { type: 'Feature', geometry: { type: 'Point', coordinates: [-71.25, -33.80] }, properties: { intensity: 'high', region: 'Chile Central Fruit Orchards' } },
  { type: 'Feature', geometry: { type: 'Point', coordinates: [-70.50, -33.35] }, properties: { intensity: 'medium', region: 'Chile Central Vines' } },
  { type: 'Feature', geometry: { type: 'Point', coordinates: [-70.75, -33.50] }, properties: { intensity: 'high', region: 'Chile Central Cherry Bloom' } },

  // ==============================================
  // 4. AMÉRICA DEL NORTE (Otoño Tardío) - 5 puntos
  // ==============================================
  { type: 'Feature', geometry: { type: 'Point', coordinates: [-119.30, 36.65] }, properties: { intensity: 'medium', region: 'California (Late Alfalfa)' } },
  { type: 'Feature', geometry: { type: 'Point', coordinates: [-119.55, 36.88] }, properties: { intensity: 'low', region: 'California (Autumn Foliage)' } },
  { type: 'Feature', geometry: { type: 'Point', coordinates: [-119.20, 36.70] }, properties: { intensity: 'medium', region: 'California (Late Alfalfa)' } },
  { type: 'Feature', geometry: { type: 'Point', coordinates: [-118.80, 34.05] }, properties: { intensity: 'low', region: 'LA Urban Wildflowers' } },
  { type: 'Feature', geometry: { type: 'Point', coordinates: [-95.71, 37.09] }, properties: { intensity: 'low', region: 'Kansas (Fall Cover Crops)' } },

  // ==============================================
  // 5. EUROPA DEL ESTE (Cosecha/Post-Temporada) - 5 puntos
  // ==============================================
  { type: 'Feature', geometry: { type: 'Point', coordinates: [30.50, 50.40] }, properties: { intensity: 'medium', region: 'Kyiv Sunflowers (Seed Set)' } },
  { type: 'Feature', geometry: { type: 'Point', coordinates: [30.60, 50.55] }, properties: { intensity: 'low', region: 'Kyiv (Late Forage)' } },
  { type: 'Feature', geometry: { type: 'Point', coordinates: [30.45, 50.35] }, properties: { intensity: 'medium', region: 'Kyiv Sunflowers (Seed Set)' } },
  { type: 'Feature', geometry: { type: 'Point', coordinates: [28.70, 42.15] }, properties: { intensity: 'low', region: 'Bulgaria (Late Herbs)' } },
  { type: 'Feature', geometry: { type: 'Point', coordinates: [23.73, 37.98] }, properties: { intensity: 'medium', region: 'Greece (Olive Bloom Prep)' } },

  // ==============================================
  // 6. OTROS PUNTOS GLOBALES (Variedad) - 5 puntos
  // ==============================================
  { type: 'Feature', geometry: { type: 'Point', coordinates: [139.69, 35.69] }, properties: { intensity: 'low', region: 'Tokyo Urban Parks' } },
  { type: 'Feature', geometry: { type: 'Point', coordinates: [-47.92, -15.78] }, properties: { intensity: 'medium', region: 'Brasilia (Late Spring)' } },
  { type: 'Feature', geometry: { type: 'Point', coordinates: [77.20, 28.61] }, properties: { intensity: 'low', region: 'New Delhi (Post-Monsoon)' } },
  { type: 'Feature', geometry: { type: 'Point', coordinates: [151.20, -33.86] }, properties: { intensity: 'medium', region: 'Sydney Urban Blooms' } },
  { type: 'Feature', geometry: { type: 'Point', coordinates: [13.40, 52.52] }, properties: { intensity: 'low', region: 'Berlin Urban Parks' } },
  
  // ==============================================
  // 7. CLUSTER: LOJA, ECUADOR (Octubre) - 10 puntos
  // ==============================================
  // Loja Ciudad (Arbolado urbano/jardines)
  { type: 'Feature', geometry: { type: 'Point', coordinates: [-79.208, -3.998] }, properties: { intensity: 'low', region: 'Loja City Urban Flora' } },
  
  // Cerca de Vilcabamba (Valle de la longevidad, subtropical)
  { type: 'Feature', geometry: { type: 'Point', coordinates: [-79.230, -4.260] }, properties: { intensity: 'medium', region: 'Vilcabamba Subtropical Blooms' } },
  
  // Sector Catamayo (Zonas más bajas y cálidas - inicio de siembra)
  { type: 'Feature', geometry: { type: 'Point', coordinates: [-79.350, -3.990] }, properties: { intensity: 'low', region: 'Catamayo Agricultural Areas' } },

  // Bosque Seco (Puntos dispersos del Guayacán)
  { type: 'Feature', geometry: { type: 'Point', coordinates: [-79.800, -3.700] }, properties: { intensity: 'medium', region: 'Loja Dry Forest (Guayacán)' } },
  { type: 'Feature', geometry: { type: 'Point', coordinates: [-79.820, -3.750] }, properties: { intensity: 'medium', region: 'Loja Dry Forest (Guayacán)' } },
  
  // Zonas de altura / Páramo andino
  { type: 'Feature', geometry: { type: 'Point', coordinates: [-79.150, -3.850] }, properties: { intensity: 'low', region: 'Andean High-Altitude Flora' } },
  
  // Cercano a Zamora Chinchipe (Oriente, más húmedo)
  { type: 'Feature', geometry: { type: 'Point', coordinates: [-78.850, -4.050] }, properties: { intensity: 'medium', region: 'Podocarpus National Park Edge' } },
  
  // Más al sur, límite con Perú (Guayacanes y bosque seco tropical)
  { type: 'Feature', geometry: { type: 'Point', coordinates: [-79.950, -4.400] }, properties: { intensity: 'high', region: 'Southern Dry Forest (Tropical)' } },
  
  // Área de producción de café/caña
  { type: 'Feature', geometry: { type: 'Point', coordinates: [-79.450, -4.150] }, properties: { intensity: 'low', region: 'Coffee Farm Cover Blooms' } },
  
  // Punto adicional en la Sierra
  { type: 'Feature', geometry: { type: 'Point', coordinates: [-79.100, -4.080] }, properties: { intensity: 'medium', region: 'Loja Southern Highlands' } },
 ],
};

const mockIntensityData = [
 { year: 2019, intensity: 220 },
 { year: 2020, intensity: 180 },
 { year: 2021, intensity: 250 },
 { year: 2022, intensity: 190 },
 { year: 2023, intensity: 310 }, // Pico de floración
 { year: 2024, intensity: 280 },
];

export { mockInsights, mockBloomData, mockIntensityData };