# netlify-plugin-crawler

This plugin links your Netlify site with Algolia's Crawler.  
It will trigger a crawl on each successful build.

## Available parameters

### Inputs

Plugin inputs can be set in `netlify.toml`. They're all optional.

- `branches` - _Default: `['main', 'master']`_ - List of branches the crawler should build.  
  Each of those will have a dedicated Algolia index.
- `disabled` - _Default: `false`_ - Use to disable the plugin without removing it.

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
