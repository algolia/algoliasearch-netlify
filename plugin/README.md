# crawler-netlify-plugin

This plugin links your Netlify site with Algolia's Crawler.  
It will trigger a crawl on each successful build.

## Environment variables

- `ALGOLIA_API_KEY` [Optional in dev] API Key to authenticate the call to the crawler.
- `ALGOLIA_BASE_URL` [Optional] Defaults to `https://crawler.algolia.com/`.

For a local run, those need to be set in `.env` using `cp .env.example .env` and modifying the values to fit your needs.

## Scripts

- `yarn dev`: run dev environment
- `yarn release`: build & publish the library

## Development

### Pre-requisites

**Only accessible to Algolia employees.**

1. Access to the Algolia team on Netlify (only granted to Algolia employees).
2. Access to the test website in this org: https://app.netlify.com/sites/crawler-netlify-plugin/
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

```sh
yarn dev
```

This script creates a temporary `netlify.toml` which references a plugin located at `dist/index.js`.
It then builds the site locally, running the local version of the plugin.

To change the crawler target from the prod one to a locally running on, simply change in your `.env` `ALGOLIA_BASE_URL` to target your local instance.
