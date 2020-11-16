import type { SearchClient } from 'algoliasearch/lite';

import algoliasearch from 'algoliasearch/lite';
import type { Hit } from '@algolia/client-search';
import {
  autocomplete,
  AutocompleteApi,
  highlightHit,
  snippetHit,
} from '@algolia/autocomplete-js';
import { getAlgoliaHits } from '@algolia/autocomplete-preset-algolia';

import type { Options } from './types/options';

import { templates } from './templates';
// import { addCss } from './addCss';
import type { AlgoliaRecord } from './types';

// @ts-ignore
import { version } from '../package.json';

class AutocompleteWrapper {
  // All fields are private because they're just here for debugging
  private options;
  private indexName;
  private client;
  private autocomplete: AutocompleteApi<AlgoliaRecord> | undefined;

  constructor(options: Options) {
    this.options = options;
    this.client = this.createClient();
    this.indexName = this.computeIndexName();
  }

  render() {
    const $input = document.querySelector(this.options.selector);
    if (!$input) {
      console.error('[algoliasearch netlify] no inputs found');
      return;
    }

    const instance = autocomplete<AlgoliaRecord>({
      container: $input as HTMLElement,
      autoFocus: false,
      placeholder: 'Search...',
      debug: this.options.debug,
      openOnFocus: true,
      classNames: {
        sourceFooter: 'aa-powered-by',
      },
      getSources: () => {
        return [
          {
            getItems: ({ query }) => {
              return getAlgoliaHits({
                searchClient: this.client,
                queries: [
                  {
                    indexName: this.indexName,
                    query,
                    params: {
                      analytics: this.options.analytics,
                      hitsPerPage: this.options.hitsPerPage,
                    },
                  },
                ],
              });
            },
            getItemUrl({ item }) {
              return item.url;
            },
            templates: {
              header() {
                return;
              },
              item({ item }: { item: Hit<AlgoliaRecord> }) {
                return templates.item(
                  item,
                  highlightHit({ hit: item, attribute: 'title' }),
                  getSuggestionSnippet(item)
                );
              },
              footer() {
                return templates.poweredBy(window.location.host);
              },
            },
          },
        ];
      },
    });

    this.autocomplete = instance;

    // addCss(templates.autocomplete.css(color));
  }

  private computeIndexName(): string {
    const { siteId, branch } = this.options;

    // Keep in sync with crawler code in /netlify/crawl
    const cleanBranch = branch
      .replace(/[^\p{L}\p{N}_.-]+/gu, '-')
      .replace(/-{2,}/g, '-');
    return `netlify_${siteId}_${cleanBranch}_all`;
  }

  private createClient(): SearchClient {
    const client = algoliasearch(this.options.appId, this.options.apiKey);
    client.addAlgoliaAgent(`Netlify integration ${version}`);
    return client;
  }
}

function getSuggestionSnippet(hit: Hit<AlgoliaRecord>): string | null {
  if (hit._snippetResult?.description) {
    return snippetHit({ hit, attribute: 'description' });
  }
  if (hit._snippetResult?.content) {
    return snippetHit({ hit, attribute: 'content' });
  }
  return null;
}
export { AutocompleteWrapper };
