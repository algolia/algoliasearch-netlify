# FAQ

This is a general purpose FAQ. If you are looking for more technical answers, go to our [Technical documentation](Extraction.md).

## I want to extract more information from my pages<!-- omit in toc -->

While the Algolia Crawler offers extended record customization, the plugin currently provides a single, default [extraction strategy](Extraction.md).

If you believe we've missed something, or you'd like to have more control, please share your feedback in our [Discourse forum](https://discourse.algolia.com/c/netlify/28).

## Can I build my own UI?<!-- omit in toc -->

Of course!

We recommend using InstantSearch, our open-source, production-ready UI libraries that let you quickly build a search interface in your front-end application. InstantSearch is available for [vanilla JS](https://www.algolia.com/doc/guides/building-search-ui/what-is-instantsearch/js/), [React](https://www.algolia.com/doc/guides/building-search-ui/what-is-instantsearch/react/), [Vue](https://www.algolia.com/doc/guides/building-search-ui/what-is-instantsearch/vue/) and [Angular](https://www.algolia.com/doc/guides/building-search-ui/what-is-instantsearch/angular/).

## Can I receive a notification when my crawl is done?<!-- omit in toc -->

You can configure notifications in the [account settings](https://crawler.algolia.com/admin/user/settings/) of your Crawler Admin Console.

## My website is not crawled<!-- omit in toc -->

The monitoring tab in the Crawler UI will provide information to help you improve the crawler behavior.
By default we respect most of the standard web rules: robots.txt, password protection, canonical, redirection, etc...

You can help the crawler by:

- Allowing our user-agent in [your robots.txt](https://www.algolia.com/doc/tools/crawler/troubleshooting/faq/#what-is-the-user-agent-of-the-crawler-useful-for-whitelisting)
- Specifying relative URLs in your links and canonical instead of absolute URLs that could conflict with the domain you may use.

## I have a custom domain<!-- omit in toc -->

The plugin can automatically alias your custom domain:

- we automatically alias custom domains that are configured in Netlify (**Settings > Domain management > Custom domains**).
- if not possible to configure that in Netlify, an option `customDomain` is available in your [netlify.toml](/plugin/README.md#inputs)

## My website is not at the root level<!-- omit in toc -->

The plugin can automatically alias path (aka removing path prefix), by setting the option `pathPrefix` in your [netlify.toml](/plugin/README.md#inputs)

## Do I need to display the Algolia logo?

Yes, but only if you are on a free plan.
Please see our official answer [here](https://www.algolia.com/doc/faq/accounts-billing/do-i-need-to-display-the-algolia-logo-when-i-am-on-the-free-plan/).

## I am an Algolia paying customer, can I use my own Application?

Yes, but it currently requires a manual intervention.
Please [contact us](mailto:support@algolia.com) to operate the change.
