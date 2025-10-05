import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    // Advertencia: esto deshabilitará la verificación de lint durante el build de producción.
    // Útil para despliegues temporales o hasta que puedas solucionar todos los problemas.
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
