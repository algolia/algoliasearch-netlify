import type { VNode } from '@algolia/autocomplete-js';

export type AlgoliaRecord = {
  objectID: string;

  url: string;
  origin: string;
  title: string;
  content: string;

  lang?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  authors?: string[];
  datePublished?: number;
  dateModified?: number;
  category?: string;

  hierarchy?: Hierarchy;
  hierarchicalCategories?: Hierarchy;

  urlDepth?: number;
  position?: number;

  // returned by Algolia
  _highlightResult: Record<string, any>;
};

export type Hierarchy = { [lvl: string]: string };
export type HighlightedHierarchy = { [lvl: string]: Array<string | VNode> };
