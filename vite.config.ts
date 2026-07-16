import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { entries } from './src/data'

function injectSeoContent() {
  return {
    name: 'inject-seo-content',
    transformIndexHtml(html: string) {
      const seoContent = entries.map(e => `
        <article>
          <h2>${e.name} (${e.type})</h2>
          <p><strong>Summary:</strong> ${e.summary}</p>
          <p><strong>Organization:</strong> ${e.org} | <strong>Year:</strong> ${e.year} | <strong>Task:</strong> ${e.task}</p>
          <p><strong>License:</strong> ${e.license} | <strong>Size:</strong> ${e.size}</p>
          <p><strong>Architecture:</strong> ${e.architecture}</p>
          <p><strong>Benchmarks:</strong> ${e.benchmarks}</p>
          <p><strong>Limitations:</strong> ${e.limitations}</p>
          ${e.url ? `<p><strong>URL:</strong> <a href="${e.url}">${e.url}</a></p>` : ''}
          ${e.usage ? `<div><strong>Usage:</strong><pre>${e.usage}</pre></div>` : ''}
          ${e.citations && e.citations.length > 0 ? `<div><strong>Citations:</strong><ul>${e.citations.map(c => `<li><a href="${c.url}">${c.text}</a></li>`).join('')}</ul></div>` : ''}
        </article>
      `).join('\n');
      
      const hiddenContent = `<div id="crawler-content" style="display:none; visibility:hidden;">
        <h1>AiVerse - AI Knowledge Encyclopedia</h1>
        <p>A comprehensive database of Artificial Intelligence models, frameworks, datasets, and platforms.</p>
        ${seoContent}
      </div>`;
      
      return html.replace('<div id="root"></div>', `<div id="root">${hiddenContent}</div>`);
    }
  }
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  // Populate process.env for local serverless SSR environment compatibility
  process.env.GROQ_API_KEY = env.GROQ_API_KEY || process.env.GROQ_API_KEY;
  process.env.VITE_SUPABASE_URL = env.VITE_SUPABASE_URL || process.env.VITE_SUPABASE_URL;
  process.env.VITE_SUPABASE_ANON_KEY = env.VITE_SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY;

  return {
    plugins: [
      react(),
      tailwindcss(),
      injectSeoContent(),
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
                  json(data: any) {
                    res.setHeader('Content-Type', 'application/json');
                    res.end(JSON.stringify(data));
                    return this;
                  }
                });

                await handler(vercelReq, vercelRes);
              } catch (err: any) {
                console.error('Vite API Dev Middleware Error:', err);
                res.statusCode = 500;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ error: err.message || 'API Handler Error' }));
              }
            } else {
              next();
            }
          });
        }
      }
    ],
  };
})