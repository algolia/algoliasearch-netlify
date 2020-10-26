# algoliasearch-netlify-frontend

`algoliasearch-netlify-frontend` is the front-end bundle we recommend to use with our Netlify plugin.
It's designed to be compatible with the index structure extracted by the [plugin](../plugin).
It enhances existing search inputs in your website with an autocomplete menu providing search as you type results.

## Usage

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@algolia/algoliasearch-netlify-frontend@0/dist/algoliasearchNetlify.css" />
<script type="text/javascript" src="https://cdn.jsdelivr.net/npm/@algolia/algoliasearch-netlify-frontend@0/dist/algoliasearchNetlify.js"></script>
<script type="text/javascript">
  algoliasearchNetlify({
    appId: '<YOUR_ALGOLIA_APP_ID>',
    apiKey: '<YOUR_ALGOLIA_API_KEY>',
    siteId: '<YOUR_NETLIFY_SITE_ID>',
    branch: '<YOUR_TARGET_GIT_BRANCH>'
  });
</script>
```

## Available options

Here's the full list of options with their default value.

```js
algoliasearchNetlify({
  // Mandatory
  appId: '<YOUR_ALGOLIA_APP_ID>',               // Application ID (Can be found in https://www.algolia.com/api-keys)
  apiKey: '<YOUR_ALGOLIA_API_KEY>',             // Search api key (Can be found in https://www.algolia.com/api-keys)
  siteId: '<YOUR_NETLIFY_SITE_ID>',             // Netlify Site ID (Can be found in https://crawler.algolia.com/admin/netlify)
  branch: '<YOUR_TARGET_GIT_BRANCH>',           // Target git branch, either a fixed one (e.g. 'master') or a dynamic one using `process.env.HEAD`. See "Using Multiple branches" in this doc.

  // Optional
  analytics: true,                              // Enable search analytics
  autocomplete: {
    hitsPerPage: 5,                             // Amount of results to display
    inputSelector: 'input[type=search]',        // CSS selector of your search input(s)
  },
  color: '#3c4fe0',                             // Main color
  debug: false,                                 // Debug mode (keeps the autocomplete open)
  silenceWarnings: false,                       // Disable warnings (e.g. no search input found)
  poweredBy: true,                              // Controls displaying the logo (mandatory with our FREE plan)
});
```

## Using multiple branches

If you've setup the plugin to index multiple branches using the `branches` plugin input, each configured branch has a dedicated index.
You'll also need to pass the information of which index you want to search in using the `branch` parameter of the integration.

To get access to the currently building branch, you can configure your build tool to forward the `HEAD` environment variable.
For instance, with [`webpack`'s environment plugin](https://webpack.js.org/plugins/environment-plugin/) configured to forward `HEAD`, you would pass `branch: process.env.HEAD`.

If you've configured your plugin to index only specific branches, you'll need to duplicate the logic here so that it picks the correct branch only when appropriate.
For instance, with `branches = ['main', 'develop', 'feat/*']`, and using webpack's environment plugin to inject `HEAD`, here's how the snippet could look like:

```js
const currentBranch = process.env.HEAD; // Injected by your build tool
let targetBranch = 'main';
if (currentBranch === 'develop' || currentBranch.startsWith('feat/')) {
  targetBranch = currentBranch;
}
algoliasearchNetlify({
  // ...
  branch: targetBranch,
});
```

## Scripts

- `yarn dev`: run dev environment
- `yarn release`: build & publish the library

## Development

From this folder:

```sh
yarn dev
```

Or from the root of the repository:

```sh
yarn dev:frontend
```

This runs a `webpack-dev-server` on port 9100.
Meant to be used in conjunction with the [test website](../public/).
