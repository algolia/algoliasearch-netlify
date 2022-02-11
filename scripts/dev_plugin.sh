#! /bin/bash

set -e

cd "$(dirname "${BASH_SOURCE[0]}")"
cd ..

[ -f .env ] || (echo 'Missing .env' && exit 1)
set -a
source .env
set +a

restore_netlify_toml() {
  ./scripts/generate_netlify_toml.sh
}

ALGOLIA_DEV_ENV=true ./scripts/generate_netlify_toml.sh
trap restore_netlify_toml EXIT

ALGOLIA_DEV_ENV=true yarn netlify build
