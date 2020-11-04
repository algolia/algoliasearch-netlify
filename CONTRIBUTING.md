# Contributing

## Development

```sh
yarn dev
```

Launches all 3 dev tools:

- [plugin](./plugin)
- [frontend library](./frontend)
- and [test website](./public)

See each tool's respective README.

## Releasing

```sh
yarn release
```

This releases both `plugin` & `frontend` to be sure our versions are aligned even if there was changes in only one of both projects.
Push to your website

## Architecture

- [`frontend/`](./frontend/): Front-end library
- [`plugin/`](./plugin/): Netlify plugin sources
- [`public/`](./public/): Test website

This repository is itself a netlify site, which allows us to test the whole setup.
