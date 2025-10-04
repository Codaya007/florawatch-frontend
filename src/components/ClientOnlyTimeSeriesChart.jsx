'use client';

import dynamic from 'next/dynamic';

const DynamicTimeSeriesChart = dynamic(() => import('./TimeSeriesChart'), { 
  ssr: false,
  loading: () => <div className="text-gray-400">Cargando gráfico...</div>
});

export default DynamicTimeSeriesChart;