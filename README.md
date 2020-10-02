<p align="center">
  <a href="https://crawler.algolia.com/admin/netlify" target="_blank" rel="noopener noreferrer">
    <img width="400" src="/logo.png" alt="Algolia + Netlify logo">
  </a>
</p>
<p align="center">
  <a href="https://circleci.com/gh/algolia/algoliasearch-netlify/tree/master"><img src="https://img.shields.io/circleci/build/gh/algolia/algoliasearch-netlify/master" alt="Build Status"></a>
  <a href="https://algoliasearch-netlify.netlify.app/"><img src="https://img.shields.io/netlify/9209706f-d5b7-46e2-bb88-5d6bedd2823f" alt="Netlify build status" /></a>
  <a href="https://www.npmjs.com/package/@algolia/netlify-plugin-crawler"><img src="https://img.shields.io/npm/v/@algolia/netlify-plugin-crawler" alt="Version"></a>
</p>

<h2 align="center">Algolia Netlify plugin</h2>

Automatically index your website to Algolia when deploying your project to Netlify with the Algolia Crawler.

- [What is Algolia?](https://www.algolia.com/doc/guides/getting-started/what-is-algolia/)
- [What is Algolia's Crawler?](https://www.algolia.com/doc/tools/crawler/getting-started/overview/)

## Table of contents<!-- omit in toc -->

- [Getting started](#getting-started)
  - [Link your site to Algolia](#link-your-site-to-algolia)
  - [Indexing](#indexing)
  - [Installing the front-end bundle](#installing-the-front-end-bundle)
  - [Going further](#going-further)
- [Uninstalling the plugin](#uninstalling-the-plugin)
  - [Disable](#disable)
  - [Uninstall](#uninstall)
- [Limitations, known issues, and FAQ](#limitations-known-issues-and-faq)
  - [My website requires JavaScript to render](#my-website-requires-javascript-to-render)
  - [I want to extract more information from my pages](#i-want-to-extract-more-information-from-my-pages)
  - [Can I build my own UI?](#can-i-build-my-own-ui)
  - [Can I receive a notification when my crawl is done?](#can-i-receive-a-notification-when-my-crawl-is-done)
- [Troubleshooting](#troubleshooting)

## Getting started

Here's how you can implement an instant search on your site using Netlify, Algolia, and this plugin. **All you need is an existing Netlify site.**

### Link your site to Algolia

First, go to the [Algolia Crawler for Netlify](https://crawler.algolia.com/admin/netlify) and click **Sign in to Algolia with Netlify**. We automatically create a new Algolia account if you don't have one.

<img src="/docs/screenshots/signin.png?raw=true" alt="Sign in to Algolia with Netlify">

Then, authorize Algolia to access your Netlify account. The plugin only updates your plugin settings and adds necessary environment variables.

<img src="/docs/screenshots/authorize.png?raw=true" alt="Authorize Algolia's OAuth">

In the [Crawler Admin Console](https://crawler.algolia.com/admin/netlify), search for your site, then click **Install**. We automatically update your Netlify site to add the environment variables (prefixed by `ALGOLIA_`) that you need to use the plugin.

We also create an Algolia application with a dedicated [Free plan](https://www.algolia.com/pricing/).

<img src="/docs/screenshots/search-site.png?raw=true" alt="Search for your site">

<img src="/docs/screenshots/accept-install.png?raw=true" alt="Install in your site">

The plugin is now correctly installed and ready to index your site.

<img src="/docs/screenshots/installed.png?raw=true" alt="View your site information.">

### Indexing

Once you've installed the plugin, your next Netlify deploy will trigger a crawl and populate an Algolia index. You can manually trigger a new deploy in Netlify by clicking **Retry deploy > Deploy site** on any deploy.

When it receives a build hook, the Algolia Crawler processes your website asynchronously. This operation takes some time, resulting in a short delay between the first deploy and the associated crawl. Your site and your Algolia index will be out of sync during that delay.

You can find information about your current crawler in the [Netlify deploy logs](https://docs.netlify.com/monitor-sites/logs/#deploy-log).

> Note: by default, we only build the `master` branch. We can however create one crawler (targeting one Algolia index) per Git branch, so that you can have, for example, a production index on `master` and development index on `develop`. You need to configure the [`branches` plugin input](./plugin#available-parameters) to enable this feature.
> If you're using our front-end library, you'll also need to [pass the correct branch](./frontend#using-multiple-branches) to the library parameters.

<img src="/docs/screenshots/deploy-logs.png?raw=true" alt="Netlify deploy logs.">

You can click on the crawler URL to follow the progress of your crawl.

<img src="/docs/screenshots/crawler-overview.png?raw=true" alt="Your Crawler running.">

Once the crawl is done, you can check your Algolia index, which contains the extracted records. We apply a standard relevance configuration by default, but you can fine-tune it as you want in the index settings.

> Find out [what's inside your records](/docs/schema.md).

<img src="/docs/screenshots/algolia-index.png?raw=true" alt="Your Algolia Index.">

### Installing the front-end bundle

> We recommend using our bundle as it's compatible out of the box with the records we extract from your site.
> You can still [build your custom UI](#can-i-build-my-own-ui) if you want to.

You can find an HTML code snippet in the [Crawler Admin Console](https://crawler.algolia.com/admin/netlify) that you can use in your code. Make sure to replace the variables with the provided ones:

- `YOUR_ALGOLIA_APP_ID`: the unique identifier of your Algolia application
- `YOUR_ALGOLIA_API_KEY`: your Algolia search-only API key (you can find it on your [Algolia dashboard](https://www.algolia.com/api-keys))
- `YOUR_NETLIFY_SITE_ID`: the unique identifier of your Netlify site (we prefill this for you in the snippet from the [Crawler Admin Console](https://crawler.algolia.com/admin/netlify))
- `YOUR_TARGET_GIT_BRANCH`: Target git branch, either a fixed one (e.g. `'master'`) or a dynamic one using `process.env.HEAD`. See ["Using Multiple branches"](./frontend#using-multiple-branches) of the frontend doc.

```html
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/@algolia/algoliasearch-netlify-frontend@0/dist/algoliasearchNetlify.css"
/>
<script src="https://cdn.jsdelivr.net/npm/@algolia/algoliasearch-netlify-frontend@0/dist/algoliasearchNetlify.js"></script>
<script>
  algoliasearchNetlify({
    appId: '<YOUR_ALGOLIA_APP_ID>',
    apiKey: '<YOUR_ALGOLIA_API_KEY>',
    siteId: '<YOUR_NETLIFY_SITE_ID>',
    branch: '<YOUR_TARGET_GIT_BRANCH>',
  });
</script>
```

This code automatically adds a search autocomplete widget on your website, using your newly created Algolia index. Please refer to the [full documentation](https://github.com/algolia/algoliasearch-netlify/tree/master/frontend) to configure this front-end plugin.

<img src="/docs/screenshots/frontend.png?raw=true" alt="Autocomplete preview">

### Going further

- Understand the extracted [record schema](/docs/schema.md)
- Learn more about [Algolia](https://www.algolia.com/doc/)
- Implement a custom UI with [InstantSearch](https://www.algolia.com/doc/guides/building-search-ui/what-is-instantsearch/js/)
- Fine tune your [search relevance](https://www.algolia.com/doc/guides/managing-results/relevance-overview/)

## Uninstalling the plugin

### Disable

You can temporarily disable the plugin by adding the following environment variable in Netlify (**Deploy > Settings > Build & Deploy > Environment**).

```yaml
ALGOLIA_DISABLED=true
```

### Uninstall

To uninstall the plugin, go to your [Crawler Admin Console](https://crawler.algolia.com/admin/netlify) and click **Uninstall**. It automatically cleans up the environment variables and deletes associated data from Algolia.

You can also go to your [Netlify plugins](https://app.netlify.com/plugins) and click **Options > Uninstall plugin**. Note that this won't clean your data on our end.

## Limitations, known issues, and FAQ

### My website requires JavaScript to render

The Algolia Crawler supports JavaScript-rendered websites, but we don't yet expose this option in the plugin. Please [contact us](mailto:support@algolia.com) to enable it.

### I want to extract more information from my pages

While the Algolia Crawler offers extended record customization, the plugin currently provides a single, default extraction strategy.

If you believe we've missed something, or you'd like to have more control, please share your feedback in our [Discourse forum](https://discourse.algolia.com/c/netlify/28).

### Can I build my own UI?

Of course!

We recommend using InstantSearch, our open-source, production-ready UI libraries that let you quickly build a search interface in your front-end application. InstantSearch is available for [vanilla JS](https://www.algolia.com/doc/guides/building-search-ui/what-is-instantsearch/js/), [React](https://www.algolia.com/doc/guides/building-search-ui/what-is-instantsearch/react/), [Vue](https://www.algolia.com/doc/guides/building-search-ui/what-is-instantsearch/vue/) and [Angular](https://www.algolia.com/doc/guides/building-search-ui/what-is-instantsearch/angular/).

### Can I receive a notification when my crawl is done?

You can configure notifications in the [account settings](https://crawler.algolia.com/admin/user/settings/) of your Crawler Admin Console.

## Troubleshooting

- Need help? We have you covered in our [Discourse forum](https://discourse.algolia.com/c/netlify/28)
- Found a bug in the plugin? Please read our [contributing guide](/CONTRIBUTING.md) and either open an [issue](https://github.com/algolia/algoliasearch-netlify/issues) or a [pull request](https://github.com/algolia/algoliasearch-netlify/pulls)
- Can't find the answer to your issue? Please reach out to [support@algolia.com](support@algolia.com)

## Architecture

- [`frontend/`](./frontend/): Front-end library
- [`plugin/`](./plugin/): Netlify plugin sources
- [`public/`](./public/): Test website

This repository is itself a netlify site, which allows us to test the whole setup.

## Development & Release

See [CONTRIBUTING.md](./CONTRIBUTING.md).
