import { mockIntensityData } from '@/data/mocks';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function TimeSeriesChart() {
  return (
    <ResponsiveContainer width="100%" height="80%">
      <AreaChart data={mockIntensityData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
        <defs>
          <linearGradient id="colorIntensity" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#38B2AC" stopOpacity={0.8}/> 
            <stop offset="95%" stopColor="#38B2AC" stopOpacity={0.1}/>
          </linearGradient>
        </defs>
        
        <CartesianGrid strokeDasharray="3 3" stroke="#4A5568" strokeOpacity={0.5} /> 
        
        <XAxis dataKey="year" stroke="#D1D5DB" tickLine={false} axisLine={{ stroke: "#4A5568" }} />
        <YAxis stroke="#D1D5DB" tickLine={false} axisLine={{ stroke: "#4A5568" }} />
        
        <Tooltip contentStyle={{ 
            backgroundColor: '#2D3748', 
            border: '1px solid #4A5568', 
            borderRadius: '4px',
            color: '#D1D5DB' 
        }} />
        
        <Area type="monotone" dataKey="intensity" stroke="#38B2AC" fillOpacity={1} fill="url(#colorIntensity)" strokeWidth={2} />
        
      </AreaChart>
    </ResponsiveContainer>
  );
}