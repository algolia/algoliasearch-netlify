# netlify-plugin-crawler

This plugin links your Netlify site with Algolia's Crawler.  
It will trigger a crawl on each successful build.

## Install the plugin

Read our full documentation [here](https://www.algolia.com/doc/tools/crawler/netlify-plugin/quick-start/)

## Available parameters

### Inputs

Plugin inputs can be set in `netlify.toml`. They're all optional.

- `branches` - _Default: `['master', 'main']`_ - List of branches the crawler should build.  
  By default, we only build your main branch, but this can be used to build multiple branches.
  Each of those will have a dedicated Algolia index, named `netlify_<site-id>_<branch-name>_all`.
  You will need to [target the right branch](../frontend#using-multiple-branches) in your front-end code.
  Accepts star patterns too, like so:
  - `*`: matches all branches
  - `feat/*`: matches all branches starting with `feat/`
  - `*-bug`: matches all branches finishing with `-bug`
- `disabled` - _Default: `false`_ - Use to disable the plugin without removing it.
- `mainBranch` - The main project's branch. If set, it will be used to propagate your [Algolia index settings](https://www.algolia.com/doc/guides/managing-results/relevance-overview/#index-setting-and-query-parameters) modifications to other branches:
  Settings of the Algolia index of your main branch will be used to create the new index when the plugin runs for the first time on a new branch.
- `pathPrefix` - The prefix of your website if it's not at the root level.
  Putting "pathPrefix: /blog" will alias `/blog` to `/`
- `customDomain` - The custom domain that you use, if it's not possible to define it on your Netlify's settings.
  Putting "customDomain: example.com" will alias `example.com` to `<your-site-url>.netlify.app`
- `renderJavaScript` - _Default: `false`_ If true, we will use JavaScript to render your website. Useful for Single Page Applications.
  See the [documentation](https://www.algolia.com/doc/api-reference/crawler/configuration/render-java-script/) to understand the implication of this option.
- `template` - Used to modify the way we extract records and their schema. Supported templates: `'hierarchical'`.
  More information on how the extraction works in the [dedicated extraction documentation](https://www.algolia.com/doc/tools/crawler/netlify-plugin/extraction-strategy/).

Example:

```toml
[[plugins]]
package = "@algolia/netlify-plugin-crawler"
  [plugins.inputs]
  branches = ['master', 'develop', 'feat/add-algolia']
  disabled = true
  pathPrefix = "/blog"
  customDomain = "example.com"
  renderJavaScript = true
```

### Environment variables

- `ALGOLIA_BASE_URL`: URL to target, usually <https://crawler.algolia.com/>.
  Can be modified locally to target a local instance of the crawler (only for Algolia employees).
- `ALGOLIA_API_KEY`: [Optional in dev] API Key to authenticate the call to the crawler.
- `ALGOLIA_DISABLED`: [Optional] Set to `true` to disable the plugin without removing it.

For a local run, those need to be set in `.env` using `cp .env.example .env` and modifying the values to fit your needs.
