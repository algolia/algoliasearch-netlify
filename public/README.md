# algoliasearch-netlify test website

This website is a testing website.
It holds some crawlable content and has a testing page for our frontend library.
It is run by running `yarn dev` or more specifically `yarn dev:website` at the root of the project.

`public/frontend/` is a built copy of `@algolia/algoliasearch-netlify-frontend`.
Netlify deploy previews load that bundle so reviewers see this branch's widget
instead of the published jsDelivr package. Refresh it with `yarn copy:frontend`.
