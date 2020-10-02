export interface Options {
  // Mandatory
  appId: string;
  apiKey: string;

  // Temporary
  indexName?: string;
  siteId: string;
  branch: string;

  // Optional
  analytics: boolean;
  autocomplete: {
    hitsPerPage: number;
    inputSelector: string;
  };
  color: string;
  debug: boolean;
  poweredBy: boolean;
}
