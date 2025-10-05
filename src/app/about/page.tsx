'use client';

import React from 'react';

const About: React.FC = () => {
  return (
    // Uses the dark blue background for a minimalist, space-themed look (similar to 'primary-bg')
    <section className="w-full min-h-screen flex flex-col justify-center items-center bg-[#000814] px-4 py-24 sm:px-6 lg:px-8">
      
      {/* Central container, kept narrow for minimalism */}
      <div className="max-w-2xl text-center">
        
        {/* Subtitle: Uses the green highlight color from your logo */}
        <h2 className="text-sm uppercase tracking-widest text-green-400 font-semibold mb-4">
          OUR MISSION
        </h2>

        {/* Main Title: Light color and bold font */}
        <h3 className="text-4xl sm:text-5xl font-extrabold text-gray-100 mb-10">
          Geospatial Intelligence for the Planet
        </h3>

        {/* --- Paragraph Section (Minimalist and well-spaced) --- */}

        {/* Paragraph 1: Technology and Detection */}
        <p className="text-lg text-gray-300 mb-6 leading-relaxed border-b border-gray-700 pb-6">
          Our platform leverages <span className="text-green-400 font-bold">advanced Artificial Intelligence</span> to analyze the vastness of satellite imagery and detect <span className="text-green-400 font-bold">"bloom points"</span> in real-time. 
          Simply upload a satellite image, and our model automatically identifies the areas of interest and visualizes them on an interactive map.
        </p>

        {/* Paragraph 2: Access and User Roles */}
        <p className="text-lg text-gray-400 mb-6 leading-relaxed border-b border-gray-700 pb-6">
          To streamline access and functionality, we support multiple roles: 
          <span className="font-semibold text-white">Guest Users (No Auth)</span> can explore and navigate the map, gaining essential insights, 
          while <span className="font-semibold text-white">Administrator</span> access is reserved for future expansions.
        </p>

        {/* Paragraph 3: Goal and Philosophy */}
        <p className="text-xl text-gray-100 font-medium pt-4">
          Our goal is clear: to provide <span className="text-green-400 font-extrabold">actionable data</span> for environmental monitoring and research, all through a <span className="italic">clean and intuitive</span> interface.
        </p>

      </div>
    </section>
  );
};

export default About;