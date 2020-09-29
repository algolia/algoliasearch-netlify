<p align="center">
  <a href="https://crawler.algolia.com/admin/netlify" target="_blank" rel="noopener noreferrer">
    <img width="400" src="/logo.png" alt="Algolia + Netlify logo">
  </a>
</p>
<p align="center">
  <a href="https://circleci.com/gh/algolia/algoliasearch-netlify/tree/master"><img src="https://img.shields.io/circleci/build/gh/algolia/algoliasearch-netlify/master" alt="Build Status"></a>
  <a href="https://www.npmjs.com/package/@algolia/netlify-plugin-crawler"><img src="https://img.shields.io/npm/v/algolia/netlify-plugin-crawler" alt="Version"></a>
</p>

<h2 align="center">Algolia Netlify integration</h2>

Index your website automatically to Algolia when you deploy your project to Netlify, using our dedicated Crawler.

- [What is Algolia?](https://www.algolia.com/doc/guides/getting-started/what-is-algolia/)
- [What is Algolia's Crawler?](https://www.algolia.com/doc/tools/crawler/getting-started/overview/)

## Getting Started

On this getting started we will implement a frontend search using Netlify, Algolia, and this plugin.
To start right away **you only need a Netlify site**.

### Link your site to Algolia

**Go to <https://crawler.algolia.com/admin/netlify>**

Click "Sign-in to Algolia with Netlify".
We will automatically create a new Algolia account if you do not have one.
<img src="/docs/screenshots/screely-1601375945482.png?raw=true" alt="Sign in to Algolia with Netlify">

Authorize Algolia to access your Neltify account.
The plugin will only update your plugin settings and add two environement variables.
NB: Algolia **only stores your encrypted Netlify access token**, and no other information.
<img src="/docs/screenshots/screely-1601375955283.png?raw=true" alt="Authorize Algolia's oauth">

Search your site and click "install".
On this step we will automatically update your Netlify site to add a couple of environment variables required to use the plugin.
We will also create one Algolia application with a dedicated [free plan](https://www.algolia.com/pricing/).

<img src="/docs/screenshots/screely-1601375970172.png?raw=true" alt="Search and install your site.">
<img src="/docs/screenshots/screely-1601375981021.png?raw=true" alt="Search and install your site.">

The plugin is now correctly installed and should already index your site at the next deploy.
<img src="/docs/screenshots/screely-1601375010606.png?raw=true" alt="View your site information.">

### Build your index

You can deploy your site to Netlify and wait for your index to be populated by the Crawler.
If you want, in the meantime, you can also use our own [Frontend Bundle](#install-the-frontend-bundle) to power your search out of the box

Once we receive a build hooks, the Crawler will process your website asynchronously. Indeed the Crawler requires your site to be online to be able to crawl it. In other words, there will be a small delay between deploying and having your Algolia index populated.
In Netlify deploy logs you will find the information about your current Crawler.
We will create **one Crawler and one Algolia index per branch name**, so you can have a production index and develop index for example.
<img src="/docs/screenshots/screely-1601381176485.png?raw=true" alt="Netlify deploy logs.">

You can click on the URL to go the current Crawlergo to our UI to follow the progress of the crawl.
<img src="/docs/screenshots/screely-1601381447204.png?raw=true" alt="Your Crawler running.">

After the crawl is done you can go take a look in your Algolia index to see the records we extracted automatically.
We apply a default relevance by default, but you can fine tune it

### Install the frontend bundle

> Note: we recommend using our bundle because it is compatible with the records we extract from your website.
> You are free to build the UI you want, with [InstantSearch.js](https://www.algolia.com/doc/guides/building-search-ui/what-is-instantsearch/js/) or any other frontend technology.

In the Crawler UI you will find an html snippet that you can copy into your code.
Replace the variables with the one given in the UI:

- `YOUR_ALGOLIA_APP_ID`: the unique identifier of your Algolia Application
- `YOUR_ALGOLIA_API_KEY`: the Algolia Search-Only api key (you can found it here <https://www.algolia.com/api-keys>)
- `YOUR_BRANCH` with your branch name (any branch name where the plugin is allowed to run)

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

> Screenshot

### Going further

- Learn more about [Algolia](https://www.algolia.com/doc/)
- Implement a dedicated UI with [InstantSearch.js](https://www.algolia.com/doc/guides/building-search-ui/what-is-instantsearch/js/)
- Fine tune your search relevancy [Relevance Guide](https://www.algolia.com/doc/guides/managing-results/relevance-overview/)

## Limitation / Known Issues / FAQ

### My website requires Javascript to run

The crawler does support this but the option is not yet exposed in the plugin.
Please contact us to enable it.

### I want to extract more information from my webpages

While the Crawler is extremely customisable, the plugin is currently restricted to a default extraction strategy.
If you believe we have missed something or you would want to have more control, please reach out

### Can I build my own UI

Yes !

### Can I receive a notification when my crawl is done

Yes, you can configure notification in the Crawler UI here: <https://crawler.algolia.com/admin/user/settings/>

## Troubleshoot

- Need help? We have you covered in our [Discourse](https://discourse.algolia.com/c/netlify/28)
- Found a bug in the plugin? Please post an issue in this repository and read our [Contributing guide](/CONTRIBUTING.md)
- Did not find any answer? Please reach out to `support+crawler@algolia.com`
