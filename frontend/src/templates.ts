import { AlgoliaRecord } from './types';

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

  item: (record: AlgoliaRecord, title: string, description: string | null) => {
    return `
        <a href="${record.url}">
          <div class="aa-ItemContent">
            <div class="aa-SourceIcon"><svg width="20" height="20" viewBox="0 0 20 20">
              <path d="M17 6v12c0 .52-.2 1-1 1H4c-.7 0-1-.33-1-1V2c0-.55.42-1 1-1h8l5 5zM14 8h-3.13c-.51 0-.87-.34-.87-.87V4" stroke="currentColor" fill="none" fill-rule="evenodd" stroke-linejoin="round"></path></svg>
            </div>
            <div>
              <div class="aa-ItemTitle">
                ${title}
              </div>
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
