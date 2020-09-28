// Small hack to remove verticalAlign on the input
// Makes IE11 fail though
import { isMsie } from 'autocomplete.js/src/common/utils';
if (!isMsie()) {
  const css = require('autocomplete.js/src/autocomplete/css.js');
  delete css.input.verticalAlign;
  delete css.inputWithNoHint.verticalAlign;
}

import algoliasearch, { SearchClient, SearchIndex } from 'algoliasearch';
import { RequestOptions } from '@algolia/transporter';
import autocomplete from 'autocomplete.js';

import type { Options } from './options';

import { templates } from './templates';
import { addCss } from './addCss';

// @ts-ignore
import { version } from '../package.json';

export type SizeModifier = null | 'xs' | 'sm';

type AutocompleteJs = any;

const XS_WIDTH = 400;
const SM_WIDTH = 600;

class AutocompleteWrapper {
  // All fields are private because they're just here for debugging
  private client: SearchClient;
  private indexName: string;
  private index: SearchIndex;

  private $inputs: HTMLInputElement[] = [];
  private autocompletes: AutocompleteJs[] = [];

  constructor({ appId, apiKey, indexName }: Options) {
    this.client = this.createClient(appId, apiKey);
    this.indexName = indexName;
    this.index = this.client.initIndex(indexName);
  }

  render({
    analytics,
    autocomplete: { hitsPerPage, inputSelector },
    color,
    debug,
    poweredBy,
  }: Options) {
    addCss(templates.autocomplete.css(color));

    const $inputs = this.getInputs(inputSelector);

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
        attributesToSnippet: [`description:${nbSnippetWords}`],
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

  private getDropdownTemplates(poweredBy: boolean) {
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
    return (query: string, callback: (hits: any[]) => void) => {
      this.index.search('', { ...searchParams, query }).then((content) => {
        callback(content.hits);
      });
    };
  }

  private createRenderSuggestion(sizeModifier: SizeModifier) {
    return (hit: any): string => {
      // eslint-disable-next-line no-param-reassign
      hit.sizeModifier = sizeModifier;
      return templates.autocomplete.suggestion(hit);
    };
  }

  private createHandleSelected() {
    return (_event: any, suggestion: { url: string }) => {
      window.location.href = suggestion.url;
    };
  }
}

export { AutocompleteWrapper };
