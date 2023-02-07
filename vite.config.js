import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/auth/login": "http://localhost:3000",
      "/auth/register": "http://localhost:3000",
      "/auth/isLoggedIn": "http://localhost:3000",
      "/movies/read-all": "http://localhost:3000",
    },
  },
  plugins: [react()],  //need this for some rzn
});
