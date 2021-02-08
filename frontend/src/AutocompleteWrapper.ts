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
import type { VNode } from '@algolia/autocomplete-js';
import { getAlgoliaHits } from '@algolia/autocomplete-preset-algolia';

import type { Options, AlgoliaRecord, HighlightedHierarchy } from './types';

import { templates } from './templates';

// @ts-ignore
import { version } from '../package.json';

class AutocompleteWrapper {
  private options;
  private indexName;
  private client;
  private $themeNode: HTMLStyleElement | null = null;
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
          return '';
        },
        item({ item, createElement, Fragment }) {
          return templates.item(
            item,
            createElement,
            Fragment,
            highlightHit({ hit: item, attribute: 'title' }),
            getSuggestionSnippet(item),
            getHighlightedHierarchy(item)
          );
        },
        footer() {
          if (poweredBy) {
            return templates.poweredBy(window.location.host);
          }
          return '';
        },
      },
    };
  }

  private applyTheme(el: HTMLElement | null) {
    if (!el || !this.options.theme) {
      return;
    }

    const theme = this.options.theme;
    this.$themeNode = addCss(
      `:root {
      ${theme.mark && `--aa-background-color: ${theme.background};`}
      ${theme.mark && `--aa-selected-color: ${theme.selected};`}
      ${theme.mark && `--aa-text-color: ${theme.text};`}
      ${theme.mark && `--aa-icon-color: ${theme.colorSourceIcon};`}
      ${theme.mark && `--color-mark: ${theme.mark};`}
    }
    .aa-Autocomplete, .aa-Panel {
      ${theme.mark && `--color-source-icon: ${theme.colorSourceIcon};`}
    }`,
      this.$themeNode
    );
  }
}

function getSuggestionSnippet(hit: Hit<AlgoliaRecord>): Array<string | VNode> {
  // If they are defined as `searchableAttributes`, 'description' and 'content' are always
  // present in the `_snippetResult`, even if they don't match.
  // So we need to have 1 check on the presence and 1 check on the match
  const description = hit._snippetResult?.description;
  const content = hit._snippetResult?.content;

  // Take in priority props that matches the search
  if (description && description.matchLevel === 'full') {
    return snippetHit({ hit, attribute: 'description' });
  }
  if (content && content.matchLevel === 'full') {
    return snippetHit({ hit, attribute: 'content' });
  }

  // Otherwise take the prop that was at least correctly returned
  if (description && !content) {
    return snippetHit({ hit, attribute: 'description' });
  } else if (content) {
    return snippetHit({ hit, attribute: 'content' });
  }

  // Otherwise raw value or empty
  const res = hit.description || hit.content || '';
  return [res];
}

function getHighlightedHierarchy(
  hit: Hit<AlgoliaRecord>
): HighlightedHierarchy | null {
  if (!hit.hierarchy) {
    return null;
  }
  const highlightedHierarchy: HighlightedHierarchy = {};
  for (let i = 0; i <= 6; ++i) {
    if (!hit.hierarchy[`lvl${i}`]) {
      continue;
    }
    highlightedHierarchy[`lvl${i}`] = highlightHit({
      hit,
      attribute: ['hierarchy', `lvl${i}`],
    });
  }
  return highlightedHierarchy;
}

function addCss(
  css: string,
  $mainStyle: HTMLElement | null = null
): HTMLStyleElement {
  const $usedSibling =
    $mainStyle ??
    document.querySelector(
      'link[rel=stylesheet][href*="algoliasearchNetlify"]'
    ) ??
    document.getElementsByTagName('head')[0].lastChild!;
  const $styleTag = document.createElement('style');
  $styleTag.setAttribute('type', 'text/css');
  $styleTag.appendChild(document.createTextNode(css));
  return $usedSibling.parentNode!.insertBefore(
    $styleTag,
    $usedSibling.nextSibling
  );
}

export { AutocompleteWrapper };
