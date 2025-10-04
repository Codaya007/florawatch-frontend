import React from 'react';

// Icono principal (Hoja/Brotes - reemplazo limpio para el emoji 🌱)
export const LeafIcon = (props: any) => (
  <svg 
    {...props} // Permite pasar className, onClick, etc.
    fill="none" 
    stroke="currentColor" 
    viewBox="0 0 24 24" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      strokeWidth="2" 
      d="M12 18V6M6 12h12M9 9a3 3 0 016 0V12a3 3 0 01-6 0V9z"
    />
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      strokeWidth="2" 
      d="M16 8a4 4 0 11-8 0 4 4 0 018 0z" 
    />
  </svg>
);