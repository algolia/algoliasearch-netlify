# FAQ

## My website requires JavaScript to render<!-- omit in toc -->

The Algolia Crawler supports JavaScript-rendered websites, but we don't yet expose this option in the plugin. Please [contact us](mailto:support@algolia.com) to enable it.

## My website is password protected<!-- omit in toc -->

If you have configured the password protection through your Netlify site's settings, the Crawler will automatically use this password to crawl your website.

## I want to extract more information from my pages<!-- omit in toc -->

While the Algolia Crawler offers extended record customization, the plugin currently provides a single, default extraction strategy.

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

- Allowing our user-agent in [your robots.txt]([<!-- omit in toc -->](https://www.algolia.com/doc/tools/crawler/troubleshooting/faq/#what-ip-address-can-i-use-for-ip-whitelisting))
- Specifying relative URLs in your links and canonical instead of absolute URLs that could conflict with the domain you may use.

## Do I need to display the Algolia logo?

Yes, but only if you are on a free plan.
Please see our official answer [here](https://www.algolia.com/doc/faq/accounts-billing/do-i-need-to-display-the-algolia-logo-when-i-am-on-the-free-plan/).
