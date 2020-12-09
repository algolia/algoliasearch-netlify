# Install Algolia plugin for Netlify

- [Install Algolia plugin for Netlify](#install-algolia-plugin-for-netlify)
  - [Getting started](#getting-started)
    - [Link your site to Algolia](#link-your-site-to-algolia)
    - [Indexing](#indexing)
    - [Installing the front-end bundle](#installing-the-front-end-bundle)
    - [Going further](#going-further)

<p align="center">
  <a href="https://crawler.algolia.com/admin/netlify"><img width="223" alt="Sign in to Algolia with Netlify" src="https://user-images.githubusercontent.com/1637651/95232629-0ebc1d00-0805-11eb-9b77-f116a3ed1a2b.png">
</a>

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

> Note: by default, we only build the `master` branch. We can however create one crawler (targeting one Algolia index) per Git branch, so that you can have, for example, a production index on `master` and development index on `develop`. You need to configure the [`branches` plugin input](../plugin#available-parameters) to enable this feature.
> If you're using our front-end library, you'll also need to [pass the correct branch](../frontend#using-multiple-branches) to the library parameters.

<img src="/docs/screenshots/deploy-logs.png?raw=true" alt="Netlify deploy logs.">

You can click on the crawler URL to follow the progress of your crawl.

<img src="/docs/screenshots/crawler-overview.png?raw=true" alt="Your Crawler running.">

Once the crawl is done, you can check your Algolia index, which contains the extracted records. We apply a standard relevance configuration by default, but you can fine-tune it as you want in the index settings.

> Find out [what's inside your records](Extraction.md).

<img src="/docs/screenshots/algolia-index.png?raw=true" alt="Your Algolia Index.">

### Installing the front-end bundle

> We recommend using our bundle as it's compatible out of the box with the records we extract from your site.
> You can still [build your custom UI](FAQ.md#can-i-build-my-own-ui) if you want to.

You can find an HTML code snippet in the [Crawler Admin Console](https://crawler.algolia.com/admin/netlify) that you can use in your code. Make sure to replace the variables with the provided ones:

- `YOUR_ALGOLIA_APP_ID`: the unique identifier of your Algolia application
- `YOUR_ALGOLIA_API_KEY`: your Algolia search-only API key (you can find it on your [Algolia dashboard](https://www.algolia.com/api-keys))
- `YOUR_NETLIFY_SITE_ID`: the unique identifier of your Netlify site (we prefill this for you in the snippet from the [Crawler Admin Console](https://crawler.algolia.com/admin/netlify))
- `YOUR_TARGET_GIT_BRANCH`: Target git branch, either a fixed one (e.g. `'master'`) or a dynamic one using `process.env.HEAD`. See ["Using Multiple branches"](../frontend#using-multiple-branches) of the frontend doc.

```html
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/@algolia/algoliasearch-netlify-frontend@1/dist/algoliasearchNetlify.css"
/>
<script src="https://cdn.jsdelivr.net/npm/@algolia/algoliasearch-netlify-frontend@1/dist/algoliasearchNetlify.js"></script>
<script>
  algoliasearchNetlify({
    appId: '<YOUR_ALGOLIA_APP_ID>',
    apiKey: '<YOUR_ALGOLIA_API_KEY>',
    siteId: '<YOUR_NETLIFY_SITE_ID>',
    branch: '<YOUR_TARGET_GIT_BRANCH>',
    selector: 'div#search',
  });
</script>
```

This code automatically creates a new input in the specified `selector` with a ready to use autocomplete, using your newly created Algolia index.
Please refer to the [full documentation](https://github.com/algolia/algoliasearch-netlify/tree/master/frontend) to configure this front-end plugin.

<img src="/docs/screenshots/frontend.png?raw=true" alt="Autocomplete preview">

### Going further

- Understand the extracted [record schema](Extraction.md)
- Learn more about [Algolia](https://www.algolia.com/doc/)
- Implement a custom UI with [InstantSearch](https://www.algolia.com/doc/guides/building-search-ui/what-is-instantsearch/js/)
- Fine tune your [search relevance](https://www.algolia.com/doc/guides/managing-results/relevance-overview/)
