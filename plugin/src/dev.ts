import path from 'path';

function forceEnvVar(env: Record<string, string>, key: string) {
  if (env[key] === undefined) {
    throw new Error(`Missing ${key} in .env`);
  }
  process.env[key] = env[key];
}

// In dev env, yarn netlify build inherits of the env vars set in Netlify's UI.
// We need to manually override them.
export function loadDevEnvVariables() {
  const dotenv = require('dotenv');

  const filePath = path.join(__dirname, '..', '..', '.env');
  const env = dotenv.config({ path: filePath }).parsed;

  forceEnvVar(env, 'ALGOLIA_API_KEY');
  forceEnvVar(env, 'ALGOLIA_BASE_URL');
}
