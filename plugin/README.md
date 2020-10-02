# netlify-plugin-crawler

This plugin links your Netlify site with Algolia's Crawler.  
It will trigger a crawl on each successful build.

## Available parameters

### Inputs

Plugin inputs can be set in `netlify.toml`. They're all optional.

- `branches` - _Default: `['master']`_ - List of branches the crawler should build.  
  By default, we only build your main branch, but this can be used to build multiple branches.
  Each of those will have a dedicated Algolia index, named `netlify_<site-id>_<branch-name>_all`.
  To target the right branch, you will need to inject the `HEAD` environment variable in your front-end code.
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

- `ALGOLIA_BASE_URL`: URL to target, usually https://crawler.algolia.com/.  
  Can be modified locally to target a local instance of the crawler (only for Algolia employees).
- `ALGOLIA_API_KEY`: [Optional in dev] API Key to authenticate the call to the crawler.
- `ALGOLIA_DISABLED`: [Optional] Set to `true` to disable the plugin without removing it.

For a local run, those need to be set in `.env` using `cp .env.example .env` and modifying the values to fit your needs.

## Scripts

- `yarn dev`: run dev environment

## Development

### Pre-requisites

**Only accessible to Algolia employees.**

1. Access to the Algolia team on Netlify (only granted to Algolia employees).
2. Access to the test website in this org: https://app.netlify.com/sites/algoliasearch-netlify/
3. Clone the repo and link it to the test website on Netlify:
   ```sh
   git clone git@github.com:algolia/algoliasearch-netlify.git
   cd algoliasearch-netlify
   yarn
   yarn netlify link
   # Accept linking it with the current git remote, it'll detect the correct site automatically
   ```
4. Setup `.env` by copying the example file:
   ```sh
   cp .env.example .env
   ```
   Make sure the values in this file are good.

### Running the dev env

From this folder:

```sh
yarn dev
```

Or from the root of the repository:

```sh
yarn dev:plugin
```

It builds the site locally, running the local version of the plugin.

To change the crawler target from the prod one to a local instance, simply change in your `.env` `ALGOLIA_BASE_URL`.
