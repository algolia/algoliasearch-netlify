# Contributing

## Scripts

- `yarn dev`: run dev environment

## Development

### Pre-requisites

**Only accessible to Algolia employees.**

1. Access to the Algolia team on Netlify (only granted to Algolia employees).
2. Access to the test website in this org: <https://app.netlify.com/sites/algoliasearch-netlify/>
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
