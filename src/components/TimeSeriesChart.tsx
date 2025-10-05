import { BLUE_YONDER, DEEP_BLUE,  WHITE } from '@/constants';
import { mockIntensityData } from '@/data/mocks';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function TimeSeriesChart() {
  const chartStrokeColor = BLUE_YONDER;
  const gridAndAxisColor = '#243b71'; // Un azul oscuro intermedio para contraste de la cuadrícula
  const axisTextColor = WHITE;

  return (
    <ResponsiveContainer width="100%" height="80%">
      <AreaChart data={mockIntensityData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
        <defs>
          <linearGradient id="colorIntensity" x1="0" y1="0" x2="0" y2="1">
            {/* Degradado: Usa ELECTRIC_BLUE al 80% y 10% de opacidad */}
            <stop offset="5%" stopColor={chartStrokeColor} stopOpacity={0.8}/> 
            <stop offset="95%" stopColor={chartStrokeColor} stopOpacity={0.1}/>
          </linearGradient>
        </defs>
        
        <CartesianGrid strokeDasharray="3 3" stroke={gridAndAxisColor} strokeOpacity={0.6} /> 
        
        <XAxis 
          dataKey="year" 
          stroke={axisTextColor} 
          tickLine={false} 
          axisLine={{ stroke: gridAndAxisColor }}  
        />
        <YAxis 
          stroke={axisTextColor} 
          tickLine={false} 
          axisLine={{ stroke: gridAndAxisColor }} 
        />
        
        <Tooltip contentStyle={{ 
            backgroundColor: DEEP_BLUE, 
            border: `1px solid ${gridAndAxisColor}`,
            borderRadius: '4px',
            color: WHITE  
        }} />
        
        <Area 
          type="monotone" 
          dataKey="intensity" 
          stroke={chartStrokeColor} 
          fillOpacity={1} 
          fill="url(#colorIntensity)" 
          strokeWidth={2} 
        />
        
      </AreaChart>
    </ResponsiveContainer>
  );
}