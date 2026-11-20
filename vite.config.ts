import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  // Populate process.env for local serverless SSR environment compatibility
  process.env.GROQ_API_KEY = env.GROQ_API_KEY || process.env.GROQ_API_KEY;
  process.env.VITE_SUPABASE_URL = env.VITE_SUPABASE_URL || process.env.VITE_SUPABASE_URL;
  process.env.VITE_SUPABASE_ANON_KEY = env.VITE_SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY;
  process.env.CLOUDFLARE_TURNSTILE_SECRET_KEY = env.CLOUDFLARE_TURNSTILE_SECRET_KEY || process.env.CLOUDFLARE_TURNSTILE_SECRET_KEY;

  return {
    plugins: [
      react(),
      tailwindcss(),
      {
        name: 'api-dev-middleware',
        configureServer(server) {
          server.middlewares.use(async (req, res, next) => {
            if (req.url?.startsWith('/api/chat')) {
              try {
                // Dynamically load the TypeScript backend module via SSR
                const mod = await server.ssrLoadModule('/api/chat.ts');
                const handler = mod.default;

                // Read req body for POST request
                let body = {};
                if (req.method === 'POST') {
                  body = await new Promise((resolve) => {
                    let data = '';
                    req.on('data', chunk => data += chunk);
                    req.on('end', () => {
                      try {
                        resolve(JSON.parse(data));
                      } catch {
                        resolve({});
                      }
                    });
                  });
                }

                // Mock VercelRequest and VercelResponse structure
                const vercelReq = Object.assign(req, { body });
                const vercelRes = Object.assign(res, {
                  status(code: number) {
                    res.statusCode = code;
                    return this;
                  },
                  json(data: unknown) {
                    res.setHeader('Content-Type', 'application/json');
                    res.end(JSON.stringify(data));
                    return this;
                  }
                });

                await handler(vercelReq, vercelRes);
              } catch (err: unknown) {
                console.error('Vite API Dev Middleware Error:', err);
                res.statusCode = 500;
                res.setHeader('Content-Type', 'application/json');
                const message = err instanceof Error ? err.message : 'API Handler Error';
                res.end(JSON.stringify({ error: message }));
              }
            } else {
              next();
            }
          });
        }
      }
    ],
    build: {
      chunkSizeWarningLimit: 1200,
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              if (id.includes('react') || id.includes('react-dom')) {
                return 'vendor-react';
              }
              if (id.includes('@supabase')) {
                return 'vendor-supabase';
              }
              if (id.includes('lucide-react')) {
                return 'vendor-lucide';
              }
              if (id.includes('react-markdown') || id.includes('remark-gfm')) {
                return 'vendor-markdown';
              }
            }
            if (id.includes('src/data.ts') || id.includes('src/data/')) {
              return 'catalog-data';
            }
          }
        }
      }
    }
  };
})
