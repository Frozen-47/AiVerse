import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { entries, typeFilters, taskFilters } from './src/data'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    {
      name: 'local-api',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          if (req.url === '/api/entries') {
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ entries, typeFilters, taskFilters }));
            return;
          }
          next();
        });
      }
    }
  ],
})