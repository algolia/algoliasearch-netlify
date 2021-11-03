import type { AutocompleteComponents, VNode } from '@algolia/autocomplete-js';
import type { Hit } from '@algolia/client-search';

import type { AlgoliaRecord } from './types';

export const templates = {
  poweredBy: ({ hostname }: { hostname: string }): VNode => {
    const escapedHostname = encodeURIComponent(hostname);
    return (
      <div className="aa-powered-by">
        Search by
        <a
          href={`https://www.algolia.com/?utm_source=netlify&utm_medium=link&utm_campaign=autocomplete-${escapedHostname}`}
          className="aa-powered-by-link"
        >
          Algolia
        </a>
      </div>
    );
  },

  item: (
    hit: AlgoliaRecord,
    components: AutocompleteComponents
  ): JSX.Element => {
    return (
      <a href={hit.url}>
        <div className="aa-ItemContent">
          <div className="aa-ItemIcon">
            <svg width="20" height="20" viewBox="0 0 20 20">
              <path
                d="M17 6v12c0 .52-.2 1-1 1H4c-.7 0-1-.33-1-1V2c0-.55.42-1 1-1h8l5 5zM14 8h-3.13c-.51 0-.87-.34-.87-.87V4"
                stroke="currentColor"
                fill="none"
                fillRule="evenodd"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div>
            <div className="aa-ItemTitle">
              {hit.hierarchy?.lvl0 ?? (
                <components.Highlight hit={hit} attribute="title" />
              )}
            </div>
            {hit.hierarchy && (
              <div className="aa-ItemHierarchy">
                {hierarchyToBreadcrumbs(hit, components)}
              </div>
            )}
            <div className="aa-ItemDescription">
              {getSuggestionSnippet(hit, components)}
            </div>
          </div>
        </div>
      </a>
    );
  },
};

/**
 * Transform a highlighted hierarchy object into an array of Highlighted elements.
 * 3 levels max are returned.
 *
 * @param hit - A record with a hierarchy field ( { lvl0: string, lvl1: string, lvl2: string, ... } ).
 * @param components - Autocomplete components.
 * @returns An array of JSX.Elements | string, representing of the highlighted hierarchy starting from lvl1.
 *          Between each element, we insert a ' > ' character to render them as breadcrumbs eventually.
 */
function hierarchyToBreadcrumbs(
  hit: Hit<AlgoliaRecord>,
  components: AutocompleteComponents
): Array<JSX.Element | string> {
  const breadcrumbArray: Array<JSX.Element | string> = [];
  let addedLevels = 0;
  if (!hit.hierarchy) {
    return breadcrumbArray;
  }
  for (let i = 1; i < 7 && addedLevels < 3; ++i) {
    const lvl = `lvl${i}`;
    if (hit.hierarchy[lvl] && hit.hierarchy[lvl].length > 0) {
      if (addedLevels > 0) {
        breadcrumbArray.push(' > ');
      }
      breadcrumbArray.push(
        <components.Highlight hit={hit.hierarchy} attribute={lvl} />
      );
      ++addedLevels;
    }
  }
  return breadcrumbArray;
}

function getSuggestionSnippet(
  hit: Hit<AlgoliaRecord>,
  components: AutocompleteComponents
): JSX.Element | string {
  // If they are defined as `searchableAttributes`, 'description' and 'content' are always
  // present in the `_snippetResult`, even if they don't match.
  // So we need to have 1 check on the presence and 1 check on the match
  const description = hit._snippetResult?.description;
  const content = hit._snippetResult?.content;

  // Take in priority props that matches the search
  if (description && description.matchLevel === 'full') {
    return <components.Snippet hit={hit} attribute="description" />;
  }
  if (content && content.matchLevel === 'full') {
    return <components.Snippet hit={hit} attribute="content" />;
  }

  // Otherwise take the prop that was at least correctly returned
  if (description && !content) {
    return <components.Snippet hit={hit} attribute="description" />;
  }
  if (content) {
    return <components.Snippet hit={hit} attribute="content" />;
  }

  // Otherwise raw value or empty
  return hit.description || hit.content || '';
}
