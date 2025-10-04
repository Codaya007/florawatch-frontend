import React from 'react';

interface InfoCardProps {
  title: string;
  children: React.ReactNode;
}

/**
 * Componente reutilizable para las tarjetas del panel lateral (Sidebar).
 * Colores para estilo minimalista oscuro:
 * - Fondo: #2D3748
 * - Borde: #2D3748 #4A5568
 * - Título: Color de letra #d3d8e0 (Teal/Cyan)
 * - Título: Color de acento #38B2AC (Teal/Cyan)
 */
const InfoCard: React.FC<InfoCardProps> = ({ title, children }) => {
  return (
    // Estilos de la tarjeta: fondo, bordes redondeados y sombra sutil
    <div className="bg-[#2D3748] p-3 rounded-xl shadow-lg border border-[#2D3748] mb-6">
      
      {/* Estilos del Título: color de acento y separador */}
      <h3 className="text-xl font-bold mb-3 text-[#d3d8e0] border-b border-[#2D3748] pb-2">
        {title}
      </h3>
      
      {/* Contenido de la tarjeta */}
      {children}
    </div>
  );
};

export default InfoCard;