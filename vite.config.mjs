
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// BASE_PATH lets the same build run at the domain root (Vercel) or in a
// sub-folder such as GitHub Pages (/valiente-couture/).
export default defineConfig({
  base: process.env.BASE_PATH || "/",
  plugins: [
    react(),
    tailwindcss(),
  ],
});
