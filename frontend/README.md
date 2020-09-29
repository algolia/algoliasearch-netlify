# algoliasearch-netlify-frontend

`algoliasearch-netlify-frontend` is the front-end bundle we recommend to use with our Netlify plugin.
It's designed to be compatible with the index structure extracted by the [plugin](../plugin).

## Usage

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@algolia/algoliasearch-netlify-frontend@0/dist/algoliasearchNetlify.css" />
<script type="text/javascript" href="https://cdn.jsdelivr.net/npm/@algolia/algoliasearch-netlify-frontend@0/dist/algoliasearchNetlify.js"></script>
<script type="text/javascript">
  algoliasearchNetlify({
    appId: '<YOUR_ALGOLIA_APP_ID>',
    apiKey: '<YOUR_ALGOLIA_API_KEY>',
    indexName: 'netlify_<YOUR_NETLIFY_SITE_ID>_<YOUR_BRANCH>',
  });
</script>
```

## Scripts

- `yarn dev`: run dev environment
- `yarn release`: build & publish the library

## Available options

Here's the full list of options with their default value.

```js
algoliasearchNetlify({
  // Mandatory
  appId: '<YOUR_ALGOLIA_APP_ID>',                             // Application ID (Can be found in https://www.algolia.com/api-keys)
  apiKey: '<YOUR_ALGOLIA_API_KEY>',                           // Search api key (Can be found in https://www.algolia.com/api-keys)
  indexName: 'netlify_<YOUR_NETLIFY_SITE_ID>_<YOUR_BRANCH>',  // Index name (Can be found in https://www.algolia.com/indexes)

  // Optional
  analytics: true,                                            // Enable search analytics
  autocomplete: {
    hitsPerPage: 5,                                           // Amount of results to display
    inputSelector: 'input[type=search]',                      // CSS selector of your search input(s)
  },
  color: '#3c4fe0',                                           // Main color
  debug: false,                                               // Debug mode (keeps the autocomplete open)
  poweredBy: true,                                            // Controls displaying the logo (mandatory with our FREE plan)
});
```

## Development

```sh
yarn dev
```

This runs a `webpack-dev-server` on port 9100.
Meant to be used in conjunction with the [test website](../public/).
