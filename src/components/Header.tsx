import React from 'react'
import { LeafIcon } from './icons/LeafIcon'
import { UserIcon } from './icons/UserIcon'
import { SettingsIcon } from './icons/SettingsIcon'

export default function Header() {
  return (
    <header className="flex justify-between items-center p-4 bg-gray-800 border-b border-gray-700 shadow-md">
      
      {/* Logo  */}
      <div className="flex items-center space-x-2">
        <LeafIcon className="w-6 h-6 text-green-400" /> 
        <span className="text-2xl font-extrabold tracking-wider text-white">
          Bloom<span className="text-green-400">Watch</span>
        </span>
      </div>
      
      {/* Navegación/Utilidades*/}
      <div className="flex items-center space-x-4 text-gray-400">
        {/* Settings */}
        <SettingsIcon className="w-6 h-6 hover:text-white cursor-pointer" />
        
        {/* Profile */}
        <UserIcon className="w-6 h-6 hover:text-white cursor-pointer" />
      </div>
    </header>
  )
}