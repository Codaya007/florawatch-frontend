// Componente de botón de activación (Toggle Switch) simple para sidebar
export const ToggleSwitch = ({ isActive, onChange, label }: { isActive: boolean, onChange: () => void, label: string }) => (
<div className="flex justify-between items-center my-2">
    <span className="text-gray-200">{label}</span>
    <div 
    onClick={onChange} 
    className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 ${isActive ? 'bg-green-500' : 'bg-gray-600'}`}
    >
    <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${isActive ? 'translate-x-6' : 'translate-x-0'}`}></div>
    </div>
</div>
);