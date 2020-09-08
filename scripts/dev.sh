#! /bin/bash

set -e

cd "$(dirname "${BASH_SOURCE[0]}")"
cd ..

[ -f .env ] || ( echo 'Missing .env' && exit 1 )
set -a
source .env
set +a

restore_netlify_toml() {
  NODE_ENV=production ./scripts/generate_netlify_toml.sh
}

NODE_ENV=development ./scripts/generate_netlify_toml.sh
trap restore_netlify_toml EXIT

yarn build
yarn netlify build 
