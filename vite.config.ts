import { defineConfig } from 'vite'
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

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    injectSeoContent(),
  ],
})