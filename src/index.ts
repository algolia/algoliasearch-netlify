import fetch from 'node-fetch';

export async function onPreBuild() {
  console.log('Algolia Crawler Netlify plugin started');

  const crawlerID = process.env.CRAWLER_ID;
  const crawlerUserID = process.env.CRAWLER_USER_ID;
  const crawlerApiKey = process.env.CRAWLER_API_KEY;

  if (!crawlerID || !crawlerUserID || !crawlerApiKey) {
    throw new Error('Missing required Crawler credentials');
  }

  const results = await fetch(
    `https://crawler.algolia.com/api/1/crawlers/${crawlerID}/reindex`,
    {
      headers: {
        Authorization: `Basic ${Buffer.from(
          `${crawlerUserID}:${crawlerApiKey}`
        ).toString('base64')}`,
        'Content-Type': 'application/json',
      },
      method: 'POST',
    }
  );

  console.log(results);
}

export function onEnd(params: any) {
  console.log(JSON.stringify(params));
}
