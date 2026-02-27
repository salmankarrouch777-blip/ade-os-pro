import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from '@clerk/nextjs';
import "./globals.css";

// Cargamos la tipografía limpia y moderna
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ADE OS PRO | B2B Solutions",
  description: "Enterprise Decision Intelligence & OSINT",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // 🔥 LA MAGIA ESTÁ AQUÍ: Envolvemos TODA LA APP con ClerkProvider
    // Y le pasamos los colores de tu nuevo diseño isométrico
    <ClerkProvider 
      appearance={{ 
        variables: { 
          colorPrimary: '#00E5FF', 
          colorBackground: '#0D1D3A', 
          colorText: '#ffffff',
          colorInputBackground: '#030C1E',
          colorInputText: '#ffffff'
        } 
      }}
    >
      <html lang="es" className="scroll-smooth">
        <body className={`${inter.className} min-h-screen bg-[#030C1E] text-slate-200 antialiased`}>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}