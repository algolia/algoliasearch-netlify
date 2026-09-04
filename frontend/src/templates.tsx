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
          aria-label="Algolia"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="1.2em"
            viewBox="291 0 281 64"
            aria-hidden="true"
            focusable="false"
          >
            <path
              fill="#003DFF"
              d="M534.4 9.1H528a.8.8 0 0 1-.7-.7V1.8c0-.4.2-.7.6-.8l6.5-1c.4 0 .8.2.9.6v7.8c0 .4-.4.7-.8.7zM428 35.2V.8c0-.5-.3-.8-.7-.8h-.2l-6.4 1c-.4 0-.7.4-.7.8v35c0 1.6 0 11.8 12.3 12.2.5 0 .8-.4.8-.8V43c0-.4-.3-.7-.6-.8-4.5-.5-4.5-6-4.5-7zm106.5-21.8H528c-.4 0-.7.4-.7.8v34c0 .4.3.8.7.8h6.5c.4 0 .8-.4.8-.8v-34c0-.5-.4-.8-.8-.8zm-17.7 21.8V.8c0-.5-.3-.8-.8-.8l-6.5 1c-.4 0-.7.4-.7.8v35c0 1.6 0 11.8 12.3 12.2.4 0 .8-.4.8-.8V43c0-.4-.3-.7-.7-.8-4.4-.5-4.4-6-4.4-7zm-22.2-20.6a16.5 16.5 0 0 1 8.6 9.3c.8 2.2 1.3 4.8 1.3 7.5a19.4 19.4 0 0 1-4.6 12.6 14.8 14.8 0 0 1-5.2 3.6c-2 .9-5.2 1.4-6.8 1.4a21 21 0 0 1-6.7-1.4 15.4 15.4 0 0 1-8.6-9.3 21.3 21.3 0 0 1 0-14.4 15.2 15.2 0 0 1 8.6-9.3c2-.8 4.3-1.2 6.7-1.2s4.6.4 6.7 1.2zm-6.7 27.6c2.7 0 4.7-1 6.2-3s2.2-4.3 2.2-7.8-.7-6.3-2.2-8.3-3.5-3-6.2-3-4.7 1-6.1 3c-1.5 2-2.2 4.8-2.2 8.3s.7 5.8 2.2 7.8 3.5 3 6.2 3zm-88.8-28.8c-6.2 0-11.7 3.3-14.8 8.2a18.6 18.6 0 0 0 4.8 25.2c1.8 1.2 4 1.8 6.2 1.7s.1 0 .1 0h.9c4.2-.7 8-4 9.1-8.1v7.4c0 .4.3.7.8.7h6.4a.7.7 0 0 0 .7-.7V14.2c0-.5-.3-.8-.7-.8h-13.5zm6.3 26.5a9.8 9.8 0 0 1-5.7 2h-.5a10 10 0 0 1-9.2-14c1.4-3.7 5-6.3 9-6.3h6.4v18.3zm152.3-26.5h13.5c.5 0 .8.3.8.7v33.7c0 .4-.3.7-.8.7h-6.4a.7.7 0 0 1-.8-.7v-7.4c-1.2 4-4.8 7.4-9 8h-.1a4.2 4.2 0 0 1-.5.1h-.9a10.3 10.3 0 0 1-7-2.6c-4-3.3-6.5-8.4-6.5-14.2 0-3.7 1-7.2 3-10 3-5 8.5-8.3 14.7-8.3zm.6 28.4c2.2-.1 4.2-.6 5.7-2V21.7h-6.3a9.8 9.8 0 0 0-9 6.4 10.2 10.2 0 0 0 9.1 13.9h.5zM452.8 13.4c-6.2 0-11.7 3.3-14.8 8.2a18.5 18.5 0 0 0 3.6 24.3 10.4 10.4 0 0 0 13 .6c2.2-1.5 3.8-3.7 4.5-6.1v7.8c0 2.8-.8 5-2.2 6.3-1.5 1.5-4 2.2-7.5 2.2l-6-.3c-.3 0-.7.2-.8.5l-1.6 5.5c-.1.4.1.8.5 1h.1c2.8.4 5.5.6 7 .6 6.3 0 11-1.4 14-4.1 2.7-2.5 4.2-6.3 4.5-11.4V14.2c0-.5-.4-.8-.8-.8h-13.5zm6.3 8.2v18.3a9.6 9.6 0 0 1-5.6 2h-1a10.3 10.3 0 0 1-8.8-14c1.4-3.7 5-6.3 9-6.3h6.4zM291 31.5A32 32 0 0 1 322.8 0h30.8c.6 0 1.2.5 1.2 1.2v61.5c0 1.1-1.3 1.7-2.2 1l-19.2-17a18 18 0 0 1-11 3.4 18.1 18.1 0 1 1 18.2-14.8c-.1.4-.5.7-.9.6-.1 0-.3 0-.4-.2l-3.8-3.4c-.4-.3-.6-.8-.7-1.4a12 12 0 1 0-2.4 8.3c.4-.4 1-.5 1.6-.2l14.7 13.1v-46H323a26 26 0 1 0 10 49.7c.8-.4 1.6-.2 2.3.3l3 2.7c.3.2.3.7 0 1l-.2.2a32 32 0 0 1-47.2-28.6z"
            />
          </svg>
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
