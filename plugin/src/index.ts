import fetch from 'node-fetch';

process.env.NODE_ENV ??= 'production';

interface BuildParams {
  constants: {
    SITE_ID: string;
  };
}

function throwExceptInDev(message: string) {
  if (process.env.NODE_ENV === 'development') {
    console.warn(`WARN: ${message}`);
  } else {
    throw new Error(message);
  }
}

export async function onSuccess(params: BuildParams) {
  console.log('Algolia Netlify plugin started');

  // Debug
  console.log(JSON.stringify(params, null, 2));
  console.log(JSON.stringify(process.env, null, 2));

  const siteId = params.constants.SITE_ID;
  const branch = process.env.BRANCH || 'master';
  const algoliaBaseUrl =
    process.env.ALGOLIA_BASE_URL || 'https://crawler.algolia.com';
  const algoliaApiKey = process.env.ALGOLIA_API_KEY;
  const siteName =
    process.env.NODE_ENV === 'development'
      ? 'crawler-netlify-plugin'
      : process.env.SITE_NAME;
  const deployPrimeUrl =
    process.env.NODE_ENV === 'development'
      ? 'https://master--crawler-netlify-plugin.netlify.app'
      : process.env.DEPLOY_PRIME_URL;

  if (!siteId) throw new Error('Missing SITE_ID');
  if (!branch) throw new Error('Missing BRANCH');
  if (!algoliaApiKey) throwExceptInDev('Missing ALGOLIA_API_KEY');
  if (!siteName) throw new Error('Missing or invalid SITE_NAME');
  if (!deployPrimeUrl) throw new Error('Missing DEPLOY_PRIME_URL');

  const endpoint = `${algoliaBaseUrl}/api/1/netlify/crawl`;
  const creds = `${siteId}:${algoliaApiKey || 'unused'}`;
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${Buffer.from(creds).toString('base64')}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ branch, siteName, deployPrimeUrl }),
  });

  console.log({
    status: response.status,
    text: await response.text(),
  });
}
