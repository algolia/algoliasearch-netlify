import { AlgoliaRecord, Hierarchy } from './types';

export const templates = {
  poweredBy: (hostname: string) => {
    const escapedHostname = encodeURIComponent(hostname);
    return `
      <div class="aa-powered-by">
        Search by
        <a
          href="https://www.algolia.com/?utm_source=netlify&utm_medium=link&utm_campaign=autocomplete-${escapedHostname}"
          class="aa-powered-by-link"
        >
          Algolia
        </a>
      </div>
    `;
  },

  item: (
    record: AlgoliaRecord,
    title: string,
    description: string | null,
    hierarchy: Hierarchy | null
  ) => {
    console.log(hierarchy);
    return `
        <a href="${record.url}">
          <div class="aa-ItemContent">
            <div class="aa-ItemSourceIcon"><svg width="20" height="20" viewBox="0 0 20 20">
              <path d="M17 6v12c0 .52-.2 1-1 1H4c-.7 0-1-.33-1-1V2c0-.55.42-1 1-1h8l5 5zM14 8h-3.13c-.51 0-.87-.34-.87-.87V4" stroke="currentColor" fill="none" fill-rule="evenodd" stroke-linejoin="round"></path></svg>
            </div>
            <div>
              <div class="aa-ItemTitle">
                ${hierarchy?.lvl0 ?? title}
              </div>
              ${
                hierarchy
                  ? `<div class="aa-ItemHierarchy">${hierarchyToBreadcrumbString(
                      hierarchy
                    )}</div>`
                  : ''
              }
              ${
                description
                  ? `<div class="aa-ItemDescription">${description}</div>`
                  : ''
              }
            </div>
          </div>
        </a>
      </li>
    `;
  },
};

/**
 * Transform a hierarchy object into a displayable string
 *
 * @param {Hierarchy} hierarchy A record's hierarchy under the form { lvl0: '', lvl1: '', lvl2: '', ... }
 * @returns {string} A string representation of the hierarchy starting from lvl1,
 *                   i.e. values from lvl1 to lvl6 joined by a '>' character (max 3 levels displayed)
 */
function hierarchyToBreadcrumbString(hierarchy: Hierarchy): string {
  const breadcrumbArray = [];
  let addedLevels = 0;
  for (let i = 1; i < 7 && addedLevels < 3; ++i) {
    if (hierarchy[`lvl${i}`]) {
      breadcrumbArray.push(hierarchy[`lvl${i}`]);
      ++addedLevels;
    }
  }
  return breadcrumbArray.join(' > ');
}
