const mockInsights = [
  { id: 1, text: "ALERT: Almond bloomed 2 weeks early in California due to anomalous temperatures." },
  { id: 2, text: "ALERT: Moderate post-bloom pest risk in Central Europe. Monitor closely." },
  { id: 3, text: "ALERT: High pollen forecast in Northeast Asia for the coming week." },
];

const mockBloomData = {
  type: 'FeatureCollection',
  features: [
    { type: 'Feature', geometry: { type: 'Point', coordinates: [-119.4179, 36.7783] }, properties: { intensity: 'high', region: 'California Almonds' } },
    { type: 'Feature', geometry: { type: 'Point', coordinates: [30.5234, 50.4501] }, properties: { intensity: 'medium', region: 'Kyiv Sunflowers' } },
    { type: 'Feature', geometry: { type: 'Point', coordinates: [-74.0060, 40.7128] }, properties: { intensity: 'low', region: 'NYC Central Park' } },
  ],
};

const  mockIntensityData = [
  { year: 2019, intensity: 220 },
  { year: 2020, intensity: 180 },
  { year: 2021, intensity: 250 },
  { year: 2022, intensity: 190 },
  { year: 2023, intensity: 310 }, // Pico de floración
  { year: 2024, intensity: 280 },
];

export { mockInsights, mockBloomData, mockIntensityData };