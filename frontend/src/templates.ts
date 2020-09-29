import type { Hit } from '@algolia/client-search';

import { SizeModifier } from './AutocompleteWrapper';
import { Data } from './data';
import { escapeHTML } from './escapeHTML';

export interface Templates {
  algolia: (hostname: string) => string;
  autocomplete: {
    css: (color: string) => string;
    poweredBy: (algoliaLogoHtml: string) => string;
    suggestion: (
      hit: Hit<Data> & { sizeModifier: SizeModifier; snippet: string }
    ) => string;
  };
}

export const templates: Templates = {
  algolia: (hostname) => {
    const escapedHostname = escapeHTML(hostname);
    return `
      <a
        href="https://www.algolia.com/?utm_source=netlify&utm_medium=link&utm_campaign=autocomplete-${escapedHostname}"
        class="aa-powered-by-link"
      >
        Algolia
      </a>
    `;
  },
  autocomplete: {
    css: (color) => `
      .aa-hit--highlight {
        color: ${color};
      }

      .aa-hit--title .aa-hit--highlight::before {
        background-color: ${color};
      }
    `,
    poweredBy: (algoliaLogoHtml) => `
      <div class="aa-powered-by">
        Search by ${algoliaLogoHtml}
      </div>`,
    suggestion: (hit) => `
      <div class="aa-hit aa-hit__${hit.sizeModifier}">
        <div class="aa-hit--title">${hit._highlightResult!.title.value}</div>
        <div class="aa-hit--description">${hit.snippet}</div>
      </div>
    `,
  },
};
