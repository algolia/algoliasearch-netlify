#! /bin/sh

set -e

cd "$(dirname "${BASH_SOURCE[0]}")"
cd ..

# Check if the git directory is clean
if [[ $(git diff --shortstat 2>/dev/null | tail -n1) != "" ]]; then
  echo "Your git directory is unclean"
  exit 1
fi

current=$(npx json -f package.json version)
read -p "New version number (current is ${current}): " version
export ALGOLIASEARCH_NETLIFY_VERSION=$version

# Ask for confirmation
echo
read -p "[All] We'll release \"v$ALGOLIASEARCH_NETLIFY_VERSION\". Continue (yn)? " -n 1 -r
echo
[[ $REPLY =~ ^[Yy]$ ]] || exit -1

# Preparing

## Building plugin
echo
echo 'Preparing plugin...'
cd plugin/
npm version -s --no-git-tag-version $ALGOLIASEARCH_NETLIFY_VERSION
yarn build
cd ..

## Building front-end
echo
echo 'Preparing frontend...'
cd frontend/
npm version -s --no-git-tag-version $ALGOLIASEARCH_NETLIFY_VERSION
yarn build
cd ..

## Git commit & tag
echo
echo 'Preparing changelog, creating commit & tag...'
### Initial (fake) commit & version tag
npm version -s --no-git-tag-version $ALGOLIASEARCH_NETLIFY_VERSION
git add package.json plugin/package.json frontend/package.json
git commit -m "chore(release): $ALGOLIASEARCH_NETLIFY_VERSION"
git tag -a "v$ALGOLIASEARCH_NETLIFY_VERSION" -m "$ALGOLIASEARCH_NETLIFY_VERSION"
### Changelog generation (we need the tag to exist)
yarn changelog:generate
git add CHANGELOG.md
git commit --amend -m "chore(release): $ALGOLIASEARCH_NETLIFY_VERSION"
git tag -a "v$ALGOLIASEARCH_NETLIFY_VERSION" -m "$ALGOLIASEARCH_NETLIFY_VERSION" -f

# Releasing

echo
echo 'Everything built, ready for release.'

## 2FA is mandatory on npm for all Algolia employees
echo
echo "[npm] One time password: "
read OTP
[[ $OTP =~ [0-9]{6} ]] || exit -1

## Release plugin
echo
echo "Publishing plugin on npm..."
cd plugin/
npm publish --otp $OTP
cd ..

echo
echo "Publishing frontend on npm..."
## Release frontend
cd frontend/
npm publish --otp $OTP
cd ..

## Release git
echo
echo "Pushing on git remote..."
git push
git push --tags
