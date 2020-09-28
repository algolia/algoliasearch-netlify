> ⚠️ **This project is an alpha, not usable without dedicated access.**

# Algolia's Netlify integration

This integration links your Netlify site with Algolia.

## Architecture

- [`frontend/`](./frontend/): Front-end library
- [`plugin/`](./plugin/): Netlify plugin sources
- [`public/`](./public/): Test website

The plugin links your Netlify site to Algolia's Crawler.
It triggers a crawl on each successful build.

This repository is itself a netlify site, which allows us to test the whole setup.

## Development

```sh
yarn dev
```

Launches all 3 dev tools: plugin, front-end library and test website.

See each project's respective README.

# Releasing

```sh
yarn release
```

This releases both `plugin` & `frontend` to be sure our versions are aligned even if there was changes in only one of both projects.
