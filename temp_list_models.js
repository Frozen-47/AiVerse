import Groq from 'groq-sdk';
import fs from 'fs';
import path from 'path';

let apiKey = process.env.GROQ_API_KEY;

if (!apiKey) {
  try {
    const envContent = fs.readFileSync(path.resolve(process.cwd(), '.env'), 'utf8');
    const lines = envContent.split('\n');
    for (const line of lines) {
      if (line.startsWith('GROQ_API_KEY=')) {
        apiKey = line.split('=')[1].trim();
        break;
      }
    }
  } catch (e) {
    // Ignore
  }
}

if (!apiKey) {
  console.error("GROQ_API_KEY is not defined in system environment or .env file.");
  process.exit(1);
}

const groq = new Groq({ apiKey });

async function main() {
  try {
    const list = await groq.models.list();
    console.log("=== Active Groq Models ===");
    list.data.forEach(model => {
      console.log(`- ID: ${model.id} (Owner: ${model.owned_by})`);
    });
  } catch (error) {
    console.error("Failed to fetch model list:", error.message);
  }
}

main();
