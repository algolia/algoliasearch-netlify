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
};

export type Hierarchy = { [lvl: string]: string };
