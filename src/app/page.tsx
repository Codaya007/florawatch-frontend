"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stars, Html } from "@react-three/drei";
import React, { useRef, useState, useEffect } from "react";
import * as THREE from "three";

// Asegúrate de que esta imagen esté en public/
const earthTexture = new THREE.TextureLoader().load("/earth_atmos_2048.jpg");

function RotatingEarth() {
  const earthRef = useRef<THREE.Mesh>(null!);
  const [hovered, setHovered] = useState(false);

  // Animación de rotación continua de la Tierra
  useFrame(() => {
    earthRef.current.rotation.y += 0.002;
  });

  return (
    <mesh
      ref={earthRef}
      onPointerOver={(event) => setHovered(true)}
      onPointerOut={(event) => setHovered(false)}
      scale={hovered ? 1.05 : 1} 
    >
      <sphereGeometry args={[2, 64, 64]} />
      <meshStandardMaterial
        map={earthTexture}
        
        // AJUSTES DEL MATERIAL
        metalness={0.0}  // La Tierra no es metálica
        roughness={1.0}  // La Tierra no es brillante
        emissive={new THREE.Color(0x000000)} 
        emissiveIntensity={0.05} // Sutil brillo del lado oscuro
      />
    </mesh>
  );
}

export default function LandingPage() {
  return (
    <main className="relative w-full h-screen overflow-hidden text-white font-sans bg-[#000814]">
      {/* 🌍 Escena 3D */}
      <Canvas
        className="absolute inset-0 z-0"
        camera={{ position: [0, 0, 5], fov: 50 }}
      >
        {/* Luces ajustadas para brillo y color */}
        <ambientLight intensity={0.5} /> {/* Luz suave general */}
        <directionalLight 
          position={[5, 3, 5]} 
          intensity={3.5} // ¡Mucha más luz para simular el sol!
          color="#ffffff" 
        /> 
        <pointLight position={[-10, -5, -10]} intensity={1.5} color="#aaffaa" /> {/* Luz de relleno verde */}
        
        <Stars radius={100} depth={50} count={5000} fade speed={1.5} />

        <RotatingEarth />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate={true}
          autoRotateSpeed={0.3}
          maxPolarAngle={Math.PI / 2.2}
          minPolarAngle={Math.PI / 2.5}
          maxAzimuthAngle={Math.PI / 1.5}
          minAzimuthAngle={-Math.PI / 1.5}
        />
      </Canvas>

      {/* 🧭 Overlay contenido (No cambia) */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-6">
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-wide glow">
          Bloom<span className="text-green-400">Watch</span>
        </h1>
        <p className="mt-4 text-lg md:text-xl max-w-xl text-gray-200 leading-relaxed">
          Witness the pulse of life on Earth — discover, visualize, and predict
          global flowering events through NASA’s open data and AI-powered
          insights.
        </p>
        <div className="mt-8 flex space-x-4">
          <a
            href="/explore"
            className="px-6 py-3 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-400 transition-all"
          >
            Explore Map
          </a>
          <a
            href="/about"
            className="px-6 py-3 border border-green-400 text-green-400 rounded-lg font-semibold hover:bg-green-400 hover:text-white transition-all"
          >
            Learn More
          </a>
        </div>
      </div>

      <footer className="absolute bottom-4 w-full text-center text-sm text-gray-500 z-10">
        Powered by{" "}
        <span className="text-green-400 font-medium">NASA Earth Data</span>{" "}
        &amp; AI 🌿
      </footer>
    </main>
  );
}