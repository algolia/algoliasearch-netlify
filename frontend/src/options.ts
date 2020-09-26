export interface Options {
  // Mandatory
  appId: string;
  apiKey: string;
  indexName: string;

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
