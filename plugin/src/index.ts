import type { NetlifyPluginOptions, NetlifyPluginUtils } from '@netlify/build';
import type { Response } from 'node-fetch';
import fetch from 'node-fetch';

// @ts-expect-error
import { version } from '../package.json';

import { loadDevEnvVariables } from './dev';
import { starMatch } from './starMatch';
import type { PluginInputs } from './types';

function createSummaryLogger(
  show: NetlifyPluginUtils['status']['show']
): (message: string) => void {
  return (message): void => {
    show({ title: 'Algolia Crawler', summary: message });
    console.log(message);
  };
}

export async function onSuccess(
  params: NetlifyPluginOptions<PluginInputs>
): Promise<void> {
  console.log('Algolia Netlify plugin started');

  // Debug
  // console.log(JSON.stringify(params, null, 2));
  // console.log(JSON.stringify(process.env, null, 2));

  const { utils, inputs, constants } = params;

  const isDev = process.env.ALGOLIA_DEV_ENV === 'true';
  const isDebugMode = process.env.NETLIFY_BUILD_DEBUG === 'true';

  if (isDev) loadDevEnvVariables();

  const summary = createSummaryLogger(utils.status.show);

  const siteId = constants.SITE_ID;
  const isLocal = constants.IS_LOCAL;

  // HEAD is incorrect locally if you try to run `yarn netlify build`
  // before having pushed your first commit on this branch, it says `master`
  const branch = process.env.HEAD!;
  const siteName = process.env.SITE_NAME;
  const deployPrimeUrl = process.env.DEPLOY_PRIME_URL;

  const isEnvDisabled = process.env.ALGOLIA_DISABLED === 'true';
  const isInputDisabled = inputs.disabled;

  const algoliaBaseUrl =
    process.env.ALGOLIA_BASE_URL || 'https://crawler.algolia.com';
  const algoliaApiKey = process.env.ALGOLIA_API_KEY;

  const branches = inputs.branches;
  const mainBranch = inputs.mainBranch;
  const pathPrefix = inputs.pathPrefix;
  const customDomain = inputs.customDomain;
  const renderJavaScript = inputs.renderJavaScript;
  const template = inputs.template;

  if (isEnvDisabled) {
    summary(`Disabled by the "ALGOLIA_DISABLED" environment variable`);
    return;
  }

  if (isInputDisabled) {
    summary(`Disabled by the "disabled" input in "netlify.toml"`);
    return;
  }

  if (isLocal && !isDev) {
    return utils.build.failPlugin(
      'This plugin does not work locally, please deploy to a branch to test it.'
    );
  }

  // Check internal constants
  if (!siteName) {
    return utils.build.failPlugin('Missing or invalid SITE_NAME');
  }
  if (!deployPrimeUrl) {
    return utils.build.failPlugin('Missing DEPLOY_PRIME_URL');
  }

  // Check required env vars
  const missingEnvMessage = (key: string): string =>
    `Missing ${key}, please go to ${algoliaBaseUrl}/admin/netlify to complete your installation.`;
  if (!algoliaBaseUrl) {
    return utils.build.failPlugin(missingEnvMessage('ALGOLIA_BASE_URL'));
  }
  if (!isDev && !algoliaApiKey) {
    return utils.build.failPlugin(missingEnvMessage('ALGOLIA_API_KEY'));
  }

  // Check branch is whitelisted
  if (!branches.some((pattern) => starMatch(pattern, branch))) {
    summary(`"${branch}" is not part of configuration's "branches", skipping`);
    return;
  }

  const endpoint = `${algoliaBaseUrl}/api/1/netlify/crawl`;
  const apiKey =
    isDev && !algoliaApiKey ? 'not-necessary-in-dev' : algoliaApiKey;
  const creds = `${siteId}:${apiKey}`;

  let response: Response;
  try {
    const body = JSON.stringify({
      branch,
      mainBranch,
      siteName,
      deployPrimeUrl,
      version,
      pathPrefix,
      customDomain,
      renderJavaScript,
      template,
    });
    console.log('Sending request to crawl', endpoint);
    if (isDebugMode) {
      console.log(body);
    }

    response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${Buffer.from(creds).toString('base64')}`,
        'Content-Type': 'application/json',
      },
      body,
    });

    if (!response.ok) {
      console.warn(response);
      throw new Error(
        `${response.statusText} ${JSON.stringify(response.json())}`
      );
    }
  } catch (error) {
    console.error('Could not reach algolia', error);
    utils.build.failPlugin(
      `Could not reach Algolia's Crawler, got: ${(error as Error).message}`
    );
    return;
  }
  const json = (await response.json()) as { crawlerId: string };

  console.log(`API answered: ${response.status}`);

  const crawlerUrl = `${algoliaBaseUrl}/admin/user_configs/${json.crawlerId}`;
  summary(`Your crawler is running at: ${crawlerUrl}`);
  console.log('Done.');
}
