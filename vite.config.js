import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/auth/register": "http://localhost:3000",
      "/auth/login": "http://localhost:3000",
      "/auth/logout": "http://localhost:3000",
      "/auth/isLoggedIn": "http://localhost:3000",
      "/auth/update-number": "http://localhost:3000",

      "/movies/read-all": "http://localhost:3000",
      "/movies/add-favorite": "http://localhost:3000",
      "/movies/remove-favorite": "http://localhost:3000",
      "/movies/add-rating": "http://localhost:3000",
      "/movies/edit-rating": "http://localhost:3000",
      "/movies/remove-rating": "http://localhost:3000",
      "/movies/add-watchlist": "http://localhost:3000",
      "/movies/remove-watchlist": "http://localhost:3000",
      "/movies/now-playing": "http://localhost:3000",
      "/movies/discover-stats": "http://localhost:3000",
      "/movies/add-reminder": "http://localhost:3000",
      "/movies/remove-reminder": "http://localhost:3000",
    },
  },
  plugins: [react()],  //need this for some rzn
});
