# Extracted Record Schema

Algolia is a schema-less search engine. However to provide a simple and easy experience with Neltify and the Crawler,
we currently populate Algolia with a standard record.

All root level properties are a computation of multiple selectors with fallback. We **reserve the possibility to change the extraction logic** or to add more properties, but **not remove top property without proper deprecation period**.
All properties marked as "not undefined" will be present in the end record, the other can be missing if did not find any relevant information.

## Schema

```ts
{
  /**
   * The Algolia unique identifier
   */
  objectID: string;

  /**
   * Where did we found this record
   */
  url: string;

  /**
   * The lang of the page.
   * - html[attr=lang]
   */
  lang?: string;

  /**
   * The title of the page.
   * - og:title
   * - head > title
   */
  title?: string;
  
  /**
   * The description of the page.
   * - meta[name=description]
   * - meta[property="og:description"]
   */
  description?: string;
  
  /**
   * The keywords of the page.
   * - meta[name="keywords"] + meta[property="article:tag"]
   */
  keywords?: string[];
  
  /**
   * The keywords of the page.
   * - meta[property="og:image"]
   */
  image?: string;
  
  /**
   * The keywords of the page.
   * - meta[property="article:author"]
   */
  author?: string;
  
  /**
   * The keywords of the page.
   * - meta[property="article:published_time"]
   */
  publishedDate?: number;
  
  /**
   * The keywords of the page.
   * - meta[property="article:modified_time"]
   */
  modifiedDate?: number;
  
  /**
   * The keywords of the page.
   * - meta[property="article:section"
   * - meta[property="product:category"]
   */
  category?: string;

  /**
   * The number of slash after the domain, in the URL.
   * - http://localhost/ = 1
   * - http://localhost/foo = 1
   * - http://localhost/foo/ = 2
   * - etc...
   */
  urlDepth?: number;

  /**
   * The content of your page.
   */
  content: string;

  /**********************************************
   * Not yet used
   */

  /**
   * The Headings hierarchy in full text.
   * Can be used to build a breadcrumb for example.
   */
  hierarchy?: string[];

  /**
   * The level based Headings hierarchy in full text.
   * Can be used to build a hierarchical menu.
   * https://www.algolia.com/doc/api-reference/widgets/hierarchical-menu/react/
   */
  hierarchyObj?: {
    lvl0?: string;
    lvl1?: string;
    lvl2?: string;
    lvl3?: string;
    lvl4?: string;
    lvl5?: string;
    lvl6?: string;
  };

  /**
   * Current heading
   */
  currentHierarchy?: string;

  /**
   * The size of the content `content` property, in bytes
   */
  contentLength?: number;

  recordUrl: string;
  position?: number;
}
```

## Example

For this url: <https://www.algolia.com/products/crawler/>

```json
{
    "objectID": "https://www.algolia.com/products/crawler/#0",
    "lang": "en",
    "title": "Crawler | Web Crawler | Ecommerce Crawler",
    "url": "https://www.algolia.com/products/crawler/",
    "image": "https://res.cloudinary.com/hilnmyskv/image/upload/v1527077656/Algolia_OG_image_m3xgjb.png",
    "urlDepth": 2,
    "content": "Algolia Crawler Unleash your content Algolia Crawler is a hosted and highly customizable web crawler that makes sense of any content of a website and makes it deliverable through a seamless experience Request a demo World’s leading brands use Algolia to power their Site Search and Discovery Accelerate time to value Great Site Search experiences are based on various types of content, but this content is siloed in disparate systems managed by different teams. By automatically extracting content from your websites, Algolia Crawler removes the need for building data pipelines between each of your content repository and Algolia, and avoids complex internal project management, saving time and resources. Turn web pages into structured content Tailor the crawler to make sure it accurately interprets your content. It allows your users to search and navigate news articles, job posts, FAQ answers, financial reports or any type of content your website offers, including JavaScript, PDFs and Docs, instead of generic web pages. Extract content without editing your website Extract structured content without the need to add any metatag to your website. Algolia Crawler provides an easy to use editor for your technical team, so they can define what content to extract and how to structure it, ensuring an optimal end user experience. Enrich your content to improve the experience Algolia Crawler can enrich the extracted content with business data, including Google Analytics data, to enhance the relevance of the end user experience. From using your visitor behaviors and page performance to adjust the search rankings, to attaching categories to your content to power advanced navigation, possibilities are endless. Configure the crawler to your needs Algolia Crawler gives you the options to index the parts of your websites you need, when you need it. Schedule automatic crawls at the timing of your choice Manually trigger a crawl of part or all your websites when necessary Define what parts of your websites the crawler should or should not explore, or let it explore your websites automatically Configure the crawler to explore login protected pages when necessary Rely on a Production Ready crawler Algolia Crawler comes with a complete set of tools to make sure you always fuel your site search experience with up to date and accurate content. URL Inspector Search and inspect all the crawled URLs. For each URL, check when it was last crawled, whether the crawl was successful, and the records it generated. Monitoring Get a detailed report of the errors encountered during the last crawl. Data analysis Assess the quality of the extracted data. For each type of content, the Data Analyser compares all the extracted content to identify missing data. Path Explorer Assess which paths the Crawler explores, and for each path, how many URLs were crawled, how many records were extracted, what errors happened.“We realized that search should be a core competence of the LegalZoom enterprise, and we see Algolia as a revenue generating product.” Mrinal Murari Tools team lead & senior software engineer Read the full story Additional Resources",
    "description": "Surface the most relevant content with Algolia’s Crawler. Our custom crawler makes sense of all your content and delivers an enhanced end user experience.",
    "position": 0,
}
```

## Record spliting

For better relevancy, record can be split in multiple records.
We create all indices with the index settings `{ distinct: true, attributeForDistinct: 'url' }` to deduplicate at search time.
