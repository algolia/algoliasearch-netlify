# algoliasearch-netlify-frontend

`algoliasearch-netlify-frontend` is the front-end bundle we recommend to use with our Netlify plugin.
It's designed to be compatible with the index structure extracted by the [plugin](../plugin).
It **creates a new search input** in your website with an autocomplete menu providing search as you type results.

## Usage

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@algolia/algoliasearch-netlify-frontend@1/dist/algoliasearchNetlify.css" />
<script type="text/javascript" src="https://cdn.jsdelivr.net/npm/@algolia/algoliasearch-netlify-frontend@1/dist/algoliasearchNetlify.js"></script>
<script type="text/javascript">
  algoliasearchNetlify({
    appId: '<YOUR_ALGOLIA_APP_ID>',
    apiKey: '<YOUR_ALGOLIA_API_KEY>',
    siteId: '<YOUR_NETLIFY_SITE_ID>',
    branch: '<YOUR_TARGET_GIT_BRANCH>',
    selector: 'div#search',
  });
</script>
```

<p align="center">
  <img src="/docs/screenshots/frontend/normal-theme.png?raw=true" alt="Frontend plugin light theme" width="600px">
</p>

## Available options

Here's the full list of options with their default value.

```js
algoliasearchNetlify({
  // Mandatory
  appId: '<YOUR_ALGOLIA_APP_ID>',                 // Application ID (Can be found in https://www.algolia.com/api-keys)
  apiKey: '<YOUR_ALGOLIA_API_KEY>',               // Search api key (Can be found in https://www.algolia.com/api-keys)
  siteId: '<YOUR_NETLIFY_SITE_ID>',               // Netlify Site ID (Can be found in https://crawler.algolia.com/admin/netlify)
  branch: '<YOUR_TARGET_GIT_BRANCH>',             // Target git branch, either a fixed one (e.g. 'master') or a dynamic one using `process.env.HEAD`. See "Using Multiple branches" in this doc.
  selector: 'div#search',                         // Where the autocomplete will be spawned (should not be an input)

  // Optional
  analytics: true,                                // Enable search analytics
  hitsPerPage: 5,                                 // Amount of results to display
  placeholder: 'Search...',                       // Input placeholder
  openOnFocus: true,                              // Open search panel with default search, when focusing input
  detached: { mediaQuery: '(max-width: 500px)' }, // Determine when the search popup should open in detached mode (full screen, modal experience). Can be set to `true` or `false` to always/never go in detached mode.

  // Theme
  theme: {
    mark: '#fff',                                 // Color of the matching content
    background: '#23263b',                        // Background Color of the input and the panel
    selected: '#111432',                          // Background Color of the selected item
    text: '#d6d6e7',                              // Color of the title of the items
    colorSourceIcon: '#d6d6e7'                    // Color of the icon on the left of results
  }
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

## Theme

You can theme the input and the autocomplete by using the `theme` property.

```js
// Example of dark theme:
{
  theme: {
    mark: '#fff',
    background: '#23263b',
    selected: '#111432',
    text: '#d6d6e7',
    colorSourceIcon: '#d6d6e7'
  }
}
```

<img src="/docs/screenshots/frontend/dark-theme.png?raw=true" alt="Dark theme" width="500px">

To go further you should take a look at the [autocomplete.js documentation](https://algolia-autocomplete.netlify.app/), or implement your own search with [InstantSearch.js](https://www.algolia.com/doc/guides/building-search-ui/what-is-instantsearch/js/).

## Development & Release

See [CONTRIBUTING.md](./CONTRIBUTING.md).
