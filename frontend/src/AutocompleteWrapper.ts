import { autocomplete, getAlgoliaResults } from '@algolia/autocomplete-js';
import type {
  AutocompleteApi,
  AutocompleteSource,
  SourceTemplates,
} from '@algolia/autocomplete-js';
import type { HighlightedHit } from '@algolia/autocomplete-preset-algolia';
import algoliasearch from 'algoliasearch/lite';
import type { SearchClient } from 'algoliasearch/lite';

// @ts-expect-error
import { version } from '../package.json';

import { templates } from './templates';
import type { Options, AlgoliaRecord } from './types';

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

  render(): void {
    const $input = document.querySelector(this.options.selector) as HTMLElement;
    if (!$input) {
      console.error(
        `[algoliasearch-netlify] no element ${this.options.selector} found`
      );
      return;
    }

    let detachedMediaQuery = undefined;
    if (this.options.detached !== undefined) {
      if (this.options.detached === true) {
        detachedMediaQuery = '';
      } else if (this.options.detached === false) {
        detachedMediaQuery = 'none';
      } else {
        detachedMediaQuery = this.options.detached.mediaQuery;
      }
    }
    const instance = autocomplete<AlgoliaRecord>({
      container: $input,
      autoFocus: false,
      placeholder: this.options.placeholder,
      debug: this.options.debug,
      openOnFocus: this.options.openOnFocus,
      panelPlacement: 'input-wrapper-width',
      detachedMediaQuery,
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

  private getSources(): AutocompleteSource<HighlightedHit<AlgoliaRecord>> {
    const poweredBy = this.options.poweredBy;
    const tpls: SourceTemplates<HighlightedHit<AlgoliaRecord>> = {
      header() {
        return '';
      },
      item({ item, components }) {
        return templates.item(item, components);
      },
      footer() {
        if (poweredBy) {
          return templates.poweredBy({
            hostname: window.location.host,
          });
        }
        return '';
      },
    };
    const res: AutocompleteSource<HighlightedHit<AlgoliaRecord>> = {
      sourceId: 'algoliaHits',
      getItems: ({ query }) => {
        return getAlgoliaResults({
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
      templates: tpls,
    };
    return res;
  }

  private applyTheme(el: HTMLElement | null): void {
    if (!el || !this.options.theme) {
      return;
    }

    const theme = this.options.theme;
    this.$themeNode = addCss(
      `.aa-Autocomplete, .aa-Panel, .aa-DetachedContainer {
      ${theme.mark && `--color-mark: ${theme.mark};`}
      ${theme.mark && `--color-background: ${theme.background};`}
      ${theme.mark && `--color-selected: ${theme.selected};`}
      ${theme.mark && `--color-text: ${theme.text};`}
      ${theme.mark && `--color-source-icon: ${theme.colorSourceIcon};`}
    }`,
      this.$themeNode
    );
  }
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
