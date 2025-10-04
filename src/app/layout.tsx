import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "BloomWatch",
  description: "Aplicación de fenología",
};

export default function RootLayout({ 
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body 
      className="h-screen flex flex-col"
      >
        {/* Header */}
        <Header />
        
        {/* Contenido principal (Mapa y Sidebar) */}
        <main className="flex flex-1 overflow-hidden">
          {children}
        </main>
        
      </body>
    </html>
  );
}