# crawler-netlify-plugin

!> This is an alpha and not usable without an access to crawler.algolia.com

## Install on your own repo

- Add the plugin in your netlify.toml

```yaml
# netlify.toml

[[plugins]]
package = "@algolia/crawler-netlify-plugin"
```

- Add those env in your Netlify's Environment variables
  `CRAWLER_API_KEY` `CRAWLER_ID` `CRAWLER_USER_ID`

- Done

## Install

```bash
yarn

yarn build

yarn netlify build --dry
```

## Publish to npm

> yes commit `/dist` because Netlify does not support Typescript

```bash
yarn build

yarn publish
```
