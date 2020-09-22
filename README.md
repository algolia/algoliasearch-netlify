> ⚠️ **This project is an alpha, not usable without dedicated access.**

# Algolia's Netlify integration

This integration links your Netlify site with Algolia.

## Architecture

- [`app/`](./app/): Front-end library
- [`plugin/`](./plugin/): Netlify plugin sources
- [`public/`](./public/): Test website

The plugin links your Netlify site to Algolia's Crawler.
It triggers a crawl on each successful build.

This repository is itself a netlify site, which allows us to test the whole setup.

## Development

See each project's respective README.
