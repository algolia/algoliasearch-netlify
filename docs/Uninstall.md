
# Uninstalling Algolia plugin for Netlify

## Disable<!-- omit in toc -->

You can temporarily disable the plugin by adding the following environment variable in Netlify (**Deploy > Settings > Build & Deploy > Environment**).

```yaml
ALGOLIA_DISABLED=true
```

## Uninstall<!-- omit in toc -->

To uninstall the plugin, go to your [Crawler Admin Console](https://crawler.algolia.com/admin/netlify) and click **Uninstall**. It automatically cleans up the environment variables and deletes associated data from Algolia.

You can also go to your [Netlify plugins](https://app.netlify.com/plugins) and click **Options > Uninstall plugin**. Note that this won't clean your data on our end.
