# BloomWatch: Global Flowering Phenology Tracker


## Introduction

BloomWatch is an **interactive web application** designed to visualize, in real-time (using simulated and semi-real data), the flowering **phenology** and its intensity across multiple regions of the world.

This project's main objective is to offer a dynamic tool for monitoring flowering events (such as **superblooms** or key crop flowering) and to provide **actionable insights** for agricultural management, conservation, and climate study.


## Key Features

  - **Dynamic Geospatial Visualization**: Displays flowering intensity using **GeoJSON** data on an interactive map.

  - **Clustering**: Nearby points are automatically grouped, showing the concentration of blooms in specific regions (example: dense clusters in the **South African Fynbos**, the **Central Valley of Chile**, and **Loja, Ecuador**).

  - **Alerts and Insights**: Provides a critical alerts (*insights*) panel related to late or early flowering, pests, or pollen forecasts.

  - **Data Scalability**: Structured to process and visualize large collections of type **FeatureCollection**.


## Technologies Used

This project is a **Frontend** application built with the following tools:

  - **Framework**: Next.js.
  - **Map Visualization**: Leaflet and Sentinel satellite imagery.
  - **State Management**: Context API
  - **Charts**: Chart.js
  - **Animations**: Three.js
  - **Language**: TypeScript


## Installation and Execution

Follow these steps to run the project in your local environment:

**Clone the repository:**

```
git clone [REPO-URL] florawatch-frontend
cd florawatch-frontend

```

**Install dependencies:**

```
npm install
```

**Run the application in development mode:**

```
npm start
```

The application should open automatically in your browser at `http://localhost:3000`.

-----

## Data Context and Sources (EO Data)

Although the application uses mock data for demonstration (`mockBloomData`), its design is optimized to integrate real **Earth Observation (EO)** data.

The coordinates and information structure are inspired by the potential of high-resolution satellite programs, such as:

- **NASA Earth Observations**: Used for tracking vegetation phenology.

- **RADARSAT Constellation Mission (RCM)**: The potential of **SAR** (Synthetic Aperture Radar) data from satellites like **RADARSAT-1** and **RCM** to monitor ecosystems (forests, crops) in any weather condition is key to detecting changes in the land cover related to flowering.