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
  const isDev = process.env.ALGOLIA_DEV_ENV === 'true';

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
  const missingEnvMessage = (key: string) =>
    `Missing ${key}, please go to ${algoliaBaseUrl}/admin/netlify to complete your installation.`;
  if (!algoliaBaseUrl) {
    return utils.build.failBuild(missingEnvMessage('ALGOLIA_BASE_URL'));
  }
  if (!isDev && !algoliaApiKey) {
    return utils.build.failBuild(missingEnvMessage('ALGOLIA_API_KEY'));
  }

  const endpoint = `${algoliaBaseUrl}/api/1/netlify/crawl`;
  const apiKey =
    isDev && !algoliaApiKey ? 'not-necessary-in-dev' : algoliaApiKey;
  const creds = `${siteId}:${apiKey}`;

  try {
    console.log('Sending request to crawl', endpoint);

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
    const json: { crawlerId: string } = await response.json();

    console.log(
      'Crawler done got response',
      `API answered: ${response.status}`,
      JSON.stringify(json)
    );

    utils.status.show({
      title: 'Algolia Crawler',
      summary: `Your crawler is running at: ${algoliaBaseUrl}/admin/user_configs/${json.crawlerId}`,
    });
  } catch (error) {
    console.error('Could not reach algolia', error);
    utils.build.failBuild(
      `Could not reach Algolia's Crawler, got: ${error.message}`
    );
  }
}
