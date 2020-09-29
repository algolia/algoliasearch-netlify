<p align="center">
  <a href="https://vuejs.org" target="_blank" rel="noopener noreferrer">
    <img width="200" src="/logo.png" alt="Vue logo">
  </a>
</p>
<p align="center">
  <a href="https://circleci.com/gh/algolia/algoliasearch-netlify/tree/master"><img src="https://img.shields.io/circleci/build/gh/algolia/algoliasearch-netlify/master" alt="Build Status"></a>
  <a href="https://www.npmjs.com/package/@algolia/netlify-plugin-crawler"><img src="https://img.shields.io/npm/v/algolia/netlify-plugin-crawler" alt="Version"></a>
</p>

<h2 align="center"> Algolia Netlify integration</h2>

Index your website automatically to Algolia when you deploy your project to Netlify, using our dedicated Crawler.

- [What is Algolia?](https://www.algolia.com/doc/guides/getting-started/what-is-algolia/)
- [What is Algolia's Crawler?](https://www.algolia.com/doc/tools/crawler/getting-started/overview/)

## Getting Started

On this getting started we will implement a frontend search using Netlify, Algolia, and this plugin.
To start right away you will only need a Netlify site.

### Link your site to Algolia

Go to <https://crawler.algolia.com/admin/netlify> and login to Algolia with Netlify.
We will automatically create a new Algolia account if you do not have one.
<img src="/docs/screenshots/screely-1601375945482.png?raw=true" alt="Sign in to Algolia with Netlify">

Authorize Algolia to access your Neltify account.
We will only change your plugin and environement variables settings.
<img src="/docs/screenshots/screely-1601375955283.png?raw=true" alt="Authorize Algolia's oauth">

Search your site and click "install".
On this step we will modify your Netlify site to add a couple of environment variables required to use the plugin.
We will also create one Algolia application with a dedicated [free plan](https://www.algolia.com/pricing/).

<img src="/docs/screenshots/screely-1601375970172.png?raw=true" alt="Search and install your site.">
<img src="/docs/screenshots/screely-1601375981021.png?raw=true" alt="Search and install your site.">

The plugin is now correctly installed and should already index your site at the next deploy.
<img src="/docs/screenshots/screely-1601375010606.png?raw=true" alt="View your site information.">

### Install the frontend bundle

> Note: we recommend using our bundle because it is compatible with the records we extract from your website.
> You are free to build the UI you want, with [InstantSearch.js](https://www.algolia.com/doc/guides/building-search-ui/what-is-instantsearch/js/) or any technology you want.

In the Crawler UI you will find an html snippet that you can copy into your code.
> Screenshot

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@algolia/algoliasearch-netlify-frontend/dist/algoliasearchNetlify.css" />
<script type="text/javascript" href="https://cdn.jsdelivr.net/npm/@algolia/algoliasearch-netlify-frontend/dist/algoliasearchNetlify.js"></script>
<script type="text/javascript">
  algoliasearchNetlify({
    appId: '<YOUR_ALGOLIA_APP_ID>',
    apiKey: '<YOUR_ALGOLIA_API_KEY>',
    indexName: 'netlify_<YOUR_NETLIFY_SITE_ID>_<YOUR_BRANCH>',
  });
</script>
```

This will automatically plug your newly created Algolia index in your website.
Please refer to the [full documentation](https://github.com/algolia/algoliasearch-netlify/tree/master/frontend) to configure this frontend plugin.

### Build your index

After you configured the plugin in our dedicated UI and created your frontend search. You can deploy your site to Netlify and wait for your index to be populated by the Crawler.

Wait for build
> Screenshot

Go to your website
> Screenshot

### Going further

- Learn more about [Algolia](https://www.algolia.com/doc/)
- Implement a dedicated UI with [InstantSearch.js](https://www.algolia.com/doc/guides/building-search-ui/what-is-instantsearch/js/)

## Troubleshoot

- Need help? We have you covered in our [Discourse](https://discourse.algolia.com/c/netlify/28)
- Found a bug in the plugin? Please post an issue in this repository and read our [Contributing guide](/CONTRIBUTING.md)
