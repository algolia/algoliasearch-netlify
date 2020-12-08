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

  urlDepth?: number;
  position?: number;
};
