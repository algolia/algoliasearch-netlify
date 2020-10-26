// Small hack to remove verticalAlign on the input
// Makes IE11 fail though
import { isMsie } from 'autocomplete.js/src/common/utils';
if (!isMsie()) {
  const css = require('autocomplete.js/src/autocomplete/css.js');
  delete css.input.verticalAlign;
  delete css.inputWithNoHint.verticalAlign;
}

import type { SearchClient, SearchIndex } from 'algoliasearch/lite';
import type { RequestOptions } from '@algolia/transporter';
import type { Hit } from '@algolia/client-search';

import algoliasearch from 'algoliasearch/lite';
import autocomplete from 'autocomplete.js';

import type { Options } from './options';

import { templates } from './templates';
import { addCss } from './addCss';

// @ts-ignore
import { version } from '../package.json';
import { Data } from './data';

export type SizeModifier = null | 'xs' | 'sm';

type AutocompleteJs = any;

const XS_WIDTH = 400;
const SM_WIDTH = 600;

class AutocompleteWrapper {
  // All fields are private because they're just here for debugging
  private client: SearchClient;
  private index: SearchIndex;

  private $inputs: HTMLInputElement[] = [];
  private autocompletes: AutocompleteJs[] = [];

  constructor({ appId, apiKey, siteId, branch }: Options) {
    this.client = this.createClient(appId, apiKey);
    const indexName = this.computeIndexName(siteId, branch);
    this.index = this.client.initIndex(indexName);
  }

  render({
    analytics,
    autocomplete: { hitsPerPage, inputSelector },
    color,
    debug,
    silenceWarnings,
    poweredBy,
  }: Options) {
    addCss(templates.autocomplete.css(color));

    const $inputs = this.getInputs(inputSelector);

    if ($inputs.length === 0 && !silenceWarnings) {
      const inputSelectorText = JSON.stringify(inputSelector);
      console.warn(
        [
          `[Algolia] No input matched our default selector ${inputSelectorText}`,
          'The integration needs a search input to be active on your page. You can either:',
          '- add an input that matches the selector',
          '- or modify `autocomplete.inputSelector` to match your search input.',
        ].join('\n')
      );
    }

    const autocompletes = $inputs.map(($input) => {
      const inputWidth = $input.getBoundingClientRect().width;

      const sizeModifier = this.computeSizeModifier(inputWidth);
      const nbSnippetWords = this.computeNbSnippetWords(inputWidth);

      const autocompleteParams = {
        hint: false,
        debug,
        templates: this.getDropdownTemplates(poweredBy),
        appendTo: 'body',
      };

      const searchParams = {
        analytics,
        hitsPerPage,
        highlightPreTag: '<span class="aa-hit--highlight">',
        highlightPostTag: '</span>',
        attributesToSnippet: [
          `description:${nbSnippetWords}`,
          `content:${nbSnippetWords}`,
        ],
        snippetEllipsisText: '...',
      };

      const sources = [
        {
          name: 'hits',
          source: this.createSource(searchParams),
          templates: {
            suggestion: this.createRenderSuggestion(sizeModifier),
          },
        },
      ];

      const aa: AutocompleteJs = autocomplete(
        $input,
        autocompleteParams,
        sources
      );

      const handleSelected = this.createHandleSelected();
      aa.on('autocomplete:selected', handleSelected);

      return aa;
    });

    // Store debug variables
    this.$inputs = $inputs;
    this.autocompletes = autocompletes;
  }

  private computeIndexName(siteId: string, branch: string): string {
    // Keep in sync with crawler code in /netlify/crawl
    const cleanBranch = branch
      .replace(/[^\p{L}\p{N}_.-]+/gu, '-')
      .replace(/-{2,}/g, '-');
    return `netlify_${siteId}_${cleanBranch}_all`;
  }

  private createClient(appId: string, apiKey: string): SearchClient {
    const client = algoliasearch(appId, apiKey);
    client.addAlgoliaAgent(`Netlify integration ${version}`);
    return client;
  }

  private getInputs(inputSelector: string): HTMLInputElement[] {
    return Array.from(document.querySelectorAll(inputSelector));
  }

  private computeSizeModifier(inputWidth: number): SizeModifier | null {
    if (inputWidth < XS_WIDTH) return 'xs';
    if (inputWidth < SM_WIDTH) return 'sm';
    return null;
  }

  private computeNbSnippetWords(inputWidth: number): number {
    if (inputWidth < XS_WIDTH) return 0;
    if (inputWidth < SM_WIDTH) return 3 + Math.floor(inputWidth / 35);
    return Math.floor(inputWidth / 20);
  }

  private getDropdownTemplates(poweredBy: boolean): { footer?: string } {
    if (!poweredBy) return {};
    const { hostname } = window.location;
    const algoliaLogoHtml = templates.algolia(hostname);
    return {
      ...(poweredBy && {
        footer: templates.autocomplete.poweredBy(algoliaLogoHtml),
      }),
    };
  }

  private createSource(searchParams: RequestOptions) {
    return (query: string, callback: (hits: Array<Hit<Data>>) => void) => {
      this.index
        .search<Data>('', { ...searchParams, query })
        .then((content) => {
          callback(content.hits);
        });
    };
  }

  private createRenderSuggestion(sizeModifier: SizeModifier) {
    return (hit: Hit<Data>): string => {
      return templates.autocomplete.suggestion({
        ...hit,
        sizeModifier,
        snippet: this.getSuggestionSnippet(hit),
      });
    };
  }

  private getSuggestionSnippet(hit: Hit<Data>): string {
    const description = hit._snippetResult?.description!;
    const content = hit._snippetResult?.content!;
    if (!description || !content) {
      if (description) return description.value;
      if (content) return content.value;
      return '';
    }
    if (description.matchLevel === 'full') return description.value;
    if (content.matchLevel === 'full') return content.value;
    if (description.matchLevel === 'partial') return description.value;
    if (content.matchLevel === 'partial') return content.value;
    return description.value;
  }

  private createHandleSelected() {
    return (_event: any, suggestion: { url: string }) => {
      window.location.href = suggestion.url;
    };
  }
}

export { AutocompleteWrapper };
