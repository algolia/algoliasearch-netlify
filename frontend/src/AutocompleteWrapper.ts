import type { SearchClient } from 'algoliasearch/lite';

import algoliasearch from 'algoliasearch/lite';
import type { Hit } from '@algolia/client-search';
import {
  autocomplete,
  AutocompleteApi,
  highlightHit,
  snippetHit,
  AutocompleteSource,
} from '@algolia/autocomplete-js';
import { getAlgoliaHits } from '@algolia/autocomplete-preset-algolia';

import type { Options, AlgoliaRecord } from './types';

import { templates } from './templates';

// @ts-ignore
import { version } from '../package.json';

class AutocompleteWrapper {
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
    const $input = document.querySelector(this.options.selector) as HTMLElement;
    if (!$input) {
      console.error(
        `[algoliasearch-netlify] no element ${this.options.selector} found`
      );
      return;
    }

    const instance = autocomplete<AlgoliaRecord>({
      container: $input,
      autoFocus: false,
      placeholder: this.options.placeholder,
      debug: this.options.debug,
      openOnFocus: this.options.openOnFocus,
      panelPlacement: 'input-wrapper-width',
      getSources: () => {
        return [this.getSources()];
      },
    });
    this.applyTheme($input.firstElementChild as HTMLElement);

    this.autocomplete = instance;
  }

  private computeIndexName(): string {
    const { siteId, branch } = this.options;

    // Keep in sync with crawler code in /netlify/crawl
    const cleanBranch = branch
      .trim()
      .replace(/[^\p{L}\p{N}_.-]+/gu, '-')
      .replace(/-{2,}/g, '-')
      .toLocaleLowerCase();
    return `netlify_${siteId}_${cleanBranch}_all`;
  }

  private createClient(): SearchClient {
    const client = algoliasearch(this.options.appId, this.options.apiKey);
    client.addAlgoliaAgent(`Netlify integration ${version}`);
    return client;
  }

  private getSources(): AutocompleteSource<AlgoliaRecord> {
    const poweredBy = this.options.poweredBy;
    return {
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
                highlightPreTag: '<span class="aa-hit--highlight">',
                highlightPostTag: '</span>',
                attributesToSnippet: [`description:20`, `content:20`],
                snippetEllipsisText: '...',
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
          if (poweredBy) {
            return templates.poweredBy(window.location.host);
          }
        },
      },
    };
  }

  private applyTheme(el: HTMLElement | null) {
    if (!el || !this.options.theme) {
      return;
    }

    const theme = this.options.theme;
    if (theme.mark) {
      el.style.setProperty('--color-mark', theme.mark);
    }
    if (theme.background) {
      el.style.setProperty('--color-background', theme.background);
    }
    if (theme.text) {
      el.style.setProperty('--color-text', theme.text);
    }
    if (theme.selected) {
      el.style.setProperty('--color-selected', theme.selected);
    }
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
