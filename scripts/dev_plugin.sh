#! /bin/bash

set -e

cd "$(dirname "${BASH_SOURCE[0]}")"
cd ..

[ -f .env ] || ( echo 'Missing .env' && exit 1 )
set -a
source .env
set +a

yarn build:plugin
yarn netlify build 
