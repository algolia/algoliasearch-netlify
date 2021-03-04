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
    colorSourceIcon?: string;
  };
  debug?: boolean;
  detached?: boolean | { mediaQuery: string };
  placeholder?: string;
  openOnFocus?: boolean;
  poweredBy?: boolean;
}
