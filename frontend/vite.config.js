import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { screenGraphPlugin } from "@animaapp/vite-plugin-screen-graph";
import tailwind from "tailwindcss";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  publicDir: "./static",
  base: "./",
  css: {
    postcss: {
      plugins: [tailwind()],
    },
  },
})
