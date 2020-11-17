export interface Options {
  // Mandatory
  appId: string;
  apiKey: string;
  selector: string;
  siteId: string;
  branch: string;

  // Optional
  analytics?: boolean;
  hitsPerPage?: number;
  theme?: {
    mark?: string;
    background?: string;
    selected?: string;
    text?: string;
  };
  debug?: boolean;
  silenceWarnings?: boolean;
  poweredBy?: boolean;
}
