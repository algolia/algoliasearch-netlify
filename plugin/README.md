# netlify-plugin-crawler

This plugin links your Netlify site with Algolia's Crawler.  
It will trigger a crawl on each successful build.

## Install the plugin

Read our full documentation [here](../docs/install.md)

## Available parameters

### Inputs

Plugin inputs can be set in `netlify.toml`. They're all optional.

- `branches` - _Default: `['master']`_ - List of branches the crawler should build.  
  By default, we only build your main branch, but this can be used to build multiple branches.
  Each of those will have a dedicated Algolia index, named `netlify_<site-id>_<branch-name>_all`.
  You will need to [target the right branch](../frontend#using-multiple-branches) in your front-end code.
  Accepts star patterns too, like so:
  - `*`: matches all branches
  - `feat/*`: matches all branches starting with `feat/`
  - `*-bug`: matches all branches finishing with `-bug`
- `disabled` - _Default: `false`_ - Use to disable the plugin without removing it.

Example:

```toml
[[plugins]]
package = "@algolia/netlify-plugin-crawler"
  [plugins.inputs]
  branches = ['master', 'develop', 'feat/add-algolia']
```

### Environment variables

- `ALGOLIA_BASE_URL`: URL to target, usually <https://crawler.algolia.com/>.
  Can be modified locally to target a local instance of the crawler (only for Algolia employees).
- `ALGOLIA_API_KEY`: [Optional in dev] API Key to authenticate the call to the crawler.
- `ALGOLIA_DISABLED`: [Optional] Set to `true` to disable the plugin without removing it.

For a local run, those need to be set in `.env` using `cp .env.example .env` and modifying the values to fit your needs.
