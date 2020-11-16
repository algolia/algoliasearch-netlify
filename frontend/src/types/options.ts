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
  color?: string;
  debug?: boolean;
  silenceWarnings?: boolean;
  poweredBy?: boolean;
}
