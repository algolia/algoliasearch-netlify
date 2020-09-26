import fetch from 'node-fetch';

interface BuildParams {
  constants: {
    SITE_ID: string;
    IS_LOCAL: boolean;
  };
  utils: {
    status: {
      show(params: { title?: string; summary: string; text?: string }): void;
    };
    build: {
      failBuild(str: string): void;
      failPlugin(str: string): void;
    };
  };
}

export async function onSuccess(params: BuildParams): Promise<void> {
  console.log('Algolia Netlify plugin started');

  const { utils, constants } = params;

  const siteId = constants.SITE_ID;
  const isLocal = constants.IS_LOCAL;
  const isDev = Boolean(process.env.ALGOLIA_DEV_ENV);

  const branch = process.env.BRANCH;
  const siteName = process.env.SITE_NAME;
  const deployPrimeUrl = process.env.DEPLOY_PRIME_URL;

  // Debug
  // console.log(JSON.stringify(params, null, 2));
  // console.log(JSON.stringify(process.env, null, 2));

  const algoliaBaseUrl = process.env.ALGOLIA_BASE_URL;
  const algoliaApiKey = process.env.ALGOLIA_API_KEY;

  if (isLocal && !isDev) {
    return utils.build.failPlugin(
      'This plugin does not work locally, please deploy to a branch to test it.'
    );
  }

  // Check internal constants
  if (!siteName) {
    return utils.build.failBuild('Missing or invalid SITE_NAME');
  }
  if (!deployPrimeUrl) {
    return utils.build.failBuild('Missing DEPLOY_PRIME_URL');
  }

  // Check required env vars
  if (
    !algoliaApiKey ||
    algoliaApiKey === '' ||
    !algoliaBaseUrl ||
    algoliaBaseUrl === ''
  ) {
    return utils.build.failBuild(
      'Missing ALGOLIA_API_KEY or ALGOLIA_BASE_URL, please go to https://crawler.algolia.com/admin/netlify to complete installation.'
    );
  }

  const endpoint = `${algoliaBaseUrl}/api/1/netlify/crawl`;
  const creds = `${siteId}:${algoliaApiKey}`;

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${Buffer.from(creds).toString('base64')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ branch, siteName, deployPrimeUrl }),
    });

    if (!response.ok) {
      console.warn(response);
      throw new Error(
        `${response.statusText} ${JSON.stringify(response.json())}`
      );
    }

    utils.status.show({
      title: 'Crawling...',
      summary: `API answered: ${response.status}`,
      text: await response.text(),
    });
  } catch (error) {
    utils.build.failBuild(
      `Could not reach Algolia's Crawler, got: ${error.message}`
    );
  }
}
