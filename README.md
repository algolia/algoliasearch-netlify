<p align="center">
  <a href="https://crawler.algolia.com/admin/netlify" target="_blank" rel="noopener noreferrer">
    <img width="400" src="/logo.png" alt="Algolia + Netlify logo">
  </a>
</p>
<p align="center">
  <a href="https://circleci.com/gh/algolia/algoliasearch-netlify/tree/master"><img src="https://img.shields.io/circleci/build/gh/algolia/algoliasearch-netlify/master" alt="Build Status"></a>
  <a href="https://www.npmjs.com/package/@algolia/netlify-plugin-crawler"><img src="https://img.shields.io/npm/v/@algolia/netlify-plugin-crawler" alt="Version"></a>
</p>

<h2 align="center">Algolia Netlify integration</h2>

Index your website automatically to Algolia when you deploy your project to Netlify, using our dedicated Crawler.

- [What is Algolia?](https://www.algolia.com/doc/guides/getting-started/what-is-algolia/)
- [What is Algolia's Crawler?](https://www.algolia.com/doc/tools/crawler/getting-started/overview/)

## Table of contents<!-- omit in toc -->

- [Getting Started](#getting-started)
  - [Link your site to Algolia](#link-your-site-to-algolia)
  - [Indexing](#indexing)
  - [Install the frontend bundle](#install-the-frontend-bundle)
  - [Going further](#going-further)
- [Disable](#disable)
- [Uninstall](#uninstall)
- [Limitations / Known Issues / FAQ](#limitations--known-issues--faq)
  - [My website requires JavaScript to run](#my-website-requires-javascript-to-run)
  - [I want to extract more information from my webpages](#i-want-to-extract-more-information-from-my-webpages)
  - [Can I build my own UI?](#can-i-build-my-own-ui)
  - [Can I receive a notification when my crawl is done?](#can-i-receive-a-notification-when-my-crawl-is-done)
- [Troubleshooting](#troubleshooting)

## Getting Started

In this getting started we will implement an instant search using Netlify, Algolia, and this plugin.
To start right away **you only need a Netlify site**.

### Link your site to Algolia

**Go to <https://crawler.algolia.com/admin/netlify>**

Click "Sign-in to Algolia with Netlify".
We will automatically create a new Algolia account if you do not have one.
<img src="/docs/screenshots/signin.png?raw=true" alt="Sign in to Algolia with Netlify">

Authorize Algolia to access your Neltify account.
The plugin will only update your plugin settings and add necessary environment variables, prefixed by `ALGOLIA_`.
<img src="/docs/screenshots/authorize.png?raw=true" alt="Authorize Algolia's OAuth">

Search for your site name and click "Install".
On this step we will automatically update your Netlify site to add a couple of environment variables required to use the plugin (prefixed by `ALGOLIA_`).
We will also create an Algolia application with a dedicated [free plan](https://www.algolia.com/pricing/).

<img src="/docs/screenshots/search-site.png?raw=true" alt="Search for your site">
<img src="/docs/screenshots/accept-install.png?raw=true" alt="Install in your site">

The plugin is now correctly installed and ready to index your site.
<img src="/docs/screenshots/installed.png?raw=true" alt="View your site information.">

### Indexing

Now that you've installed our plugin, your next deploy to Netlify will launch a crawl that will populate an Algolia index.
You can manually launch a new deploy by opening your latest deploy in Netlify and clicking on "Retry deploy" > "Deploy site".

Once we receive a build hook, our Crawler will process your website asynchronously, and this operation takes some time.
In other words, there will be a delay between the first deploy on a branch and the Algolia index being ready for usage.
You will find the information about your current Crawler in the Netlify deploy logs.
We will create **one Crawler targeting one Algolia index per git branch**, so you can have a production index on `master` and development index on `develop` for example.
<img src="/docs/screenshots/deploy-logs.png?raw=true" alt="Netlify deploy logs.">

You can click on the URL to open the current Crawler dashboard to follow the progress of the crawl.
<img src="/docs/screenshots/crawler-overview.png?raw=true" alt="Your Crawler running.">

After the crawl is done you can go take a look at your Algolia index to see the records we extracted automatically.
We apply a default relevance configuration by default, but you can fine tune it as you want in the index settings.
Find out [what is inside your records](/docs/schema.md).
<img src="/docs/screenshots/algolia-index.png?raw=true" alt="Your Algolia Index.">

### Install the frontend bundle

> Note: we recommend using our bundle because it is compatible with the records we extract from your website.
> You are free to build the UI you want, with [InstantSearch.js](https://www.algolia.com/doc/guides/building-search-ui/what-is-instantsearch/js/) or any other frontend technology.

In the Crawler UI you will find an html snippet that you can copy into your code.
Replace the variables with the one given in the UI:

- `YOUR_ALGOLIA_APP_ID`: the unique identifier of your Algolia Application
- `YOUR_ALGOLIA_API_KEY`: the Algolia Search-Only api key (you can found it here <https://www.algolia.com/api-keys>)
- `YOUR_BRANCH` with your branch name (any branch name where the plugin is allowed to run)

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

This will automatically add an instant search autocomplete to your website using your newly created Algolia index.
Please refer to the [full documentation](https://github.com/algolia/algoliasearch-netlify/tree/master/frontend) to configure this frontend plugin.

<img src="/docs/screenshots/frontend.png?raw=true" alt="Autocomplete preview">

### Going further

- Understand the extracted [record schema](/docs/schema.md)
- Learn more about [Algolia](https://www.algolia.com/doc/)
- Implement a dedicated UI with [InstantSearch.js](https://www.algolia.com/doc/guides/building-search-ui/what-is-instantsearch/js/)
- Fine tune your search relevancy [Relevance Guide](https://www.algolia.com/doc/guides/managing-results/relevance-overview/)

## Disable

You can temporarly disable the plugin by adding this to your environment variables (Deploy > Settings > Build & Deploy > Environment)

```yaml
ALGOLIA_DISABLED=true
```

## Uninstall

You can uninstall the plugin by either:

- Go to your Crawler UI and click "uninstall"
  **This is the recommended way**.
  We will also clean the environment variables and delete associated data from Algolia.
- Go to your Netlify plugin and click "uninstall"
  This will not clean your data.

## Limitations / Known Issues / FAQ

### My website requires JavaScript to run

The crawler does support this but the option is not yet exposed in the plugin.
Please contact us to enable it.

### I want to extract more information from my webpages

While the Crawler is extremely customisable, the plugin is currently restricted to a default extraction strategy.
If you believe we have missed something or you would want to have more control, please share your feedback in our [Discourse forum](https://discourse.algolia.com/c/netlify/28).

### Can I build my own UI?

Yes!

### Can I receive a notification when my crawl is done?

Yes, you can configure notification in the Crawler UI here: <https://crawler.algolia.com/admin/user/settings/>

## Troubleshooting

- Need help? We have you covered in our [Discourse forum](https://discourse.algolia.com/c/netlify/28)
- Found a bug in the plugin? Please read our [Contributing guide](/CONTRIBUTING.md) and post an issue in this repository
- Did not find any answer? Please reach out to `support@algolia.com`
