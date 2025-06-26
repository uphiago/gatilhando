import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { VitePluginRadar } from 'vite-plugin-radar';

export default defineConfig({
  plugins: [
    react(),
    VitePluginRadar({
      enableDev: true,
      
      gtm: [
        {
          id: process.env.VITE_GTM_ID,
        }
      ],
      analytics: [
        {
          id: process.env.VITE_G_ID,
        }
      ],
    })
  ],
});