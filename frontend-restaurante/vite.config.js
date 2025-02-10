import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';


export default defineConfig({
  plugins: [
    react(),  // Mantiene el soporte para React
    tailwindcss(), // Agrega el soporte para Tailwind CSS
  ],
});
