export interface BuildParams {
  constants: {
    SITE_ID: string;
    IS_LOCAL: boolean;
  };
  inputs: {
    disabled: boolean;
    branches: string[];
    mainBranch?: string;
    pathPrefix?: string;
    customDomain?: string;
  };
  utils: {
    status: {
      show(params: { title?: string; summary: string; text?: string }): void;
    };
    build: {
      // failBuild(str: string): void; // Do not use https://github.com/algolia/algoliasearch-netlify/issues/69
      failPlugin(str: string): void;
    };
  };
}
