# Extraction Strategy<!-- omit in toc -->

The plugin use [Algolia Custom Crawler](https://www.algolia.com/products/crawler/) under the hood.
Algolia is a schemaless search engine. However, to provide an effortless experience with Netlify and the Algolia Crawler, the plugin currently populates your Algolia index with a standard record schema.
You can see on this page what the Crawler extract and how you can improve the crawl by yourself.

## Table of Contents<!-- omit in toc -->

- [Schema](#schema)
  - [Default](#default-schema)
  - [Hierarchical](#hierarchical-schema)
- [JSON-LD](#json-ld)
- [Sitemaps](#sitemaps)
- [Ignoring URLs or Patterns](#ignoring-urls-or-patterns)
  - [Using Robots.txt](#using-robotstxt)
  - [Using Meta Robots](#using-meta-robots)
  - [Using Canonical](#using-canonical)
- [Executing Javascript](#executing-javascript)
- [Password protection](#password-protection)

## Schema

All root-level properties are a computation of multiple selectors, with a fallback. We might change the extraction logic to add more properties, but **we won't remove root-level properties without a proper deprecation period**.

All properties that aren't marked as optional are present in the final record. Others can be missing if the Algolia Crawler couldn't find any relevant information.

### Default schema

By default, the Netlify plugin will try to extract one record per webpage, with the following schema:

```ts
{
  /**
   * The object's unique identifier
   */
  objectID: string;

  /**
   * The URL where the Algolia Crawler found the record
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
   * - meta[name="keywords"]
   * - meta[property="article:tag"]
   */
  keywords?: string[];

  /**
   * The image of the page.
   * - meta[property="og:image"]
   */
  image?: string;

  /**
   * The authors of the page.
   * - `author` field of JSON-LD Article object: https://schema.org/Article
   * - meta[property="article:author"]
   */
  authors?: string[];

  /**
   * The publish date of the page.
   * - `datePublished` field of JSON-LD Article object: https://schema.org/Article
   * - meta[property="article:published_time"]
   */
  datePublished?: number;

  /**
   * The modified date of the page.
   * - `dateModified` field of JSON-LD Article object: https://schema.org/Article
   * - meta[property="article:modified_time"]
   */
  dateModified?: number;

  /**
   * The category of the page.
   * - meta[property="article:section"
   * - meta[property="product:category"]
   */
  category?: string;

  /**
   * The URL depth, based on the number of slashes after the domain.
   * - http://example.com/ = 1
   * - http://example.com/about = 1
   * - http://example.com/about/ = 2
   * - etc.
   */
  urlDepth?: number;

  /**
   * The content of your page.
   */
  content: string;
}
```

#### Example

For this URL: <https://www.algolia.com/products/crawler/>

```json
{
  "objectID": "https://www.algolia.com/products/crawler/#0",
  "lang": "en",
  "title": "Crawler | Web Crawler | Ecommerce Crawler",
  "url": "https://www.algolia.com/products/crawler/",
  "image": "https://res.cloudinary.com/hilnmyskv/image/upload/v1527077656/Algolia_OG_image_m3xgjb.png",
  "urlDepth": 2,
  "content": "Algolia Crawler Unleash your content Algolia Crawler is a hosted and highly customizable web crawler that makes sense of any content of a website and makes it deliverable through a seamless experience Request a demo World’s leading brands use Algolia to power their Site Search and Discovery Accelerate time to value Great Site Search experiences are based on various types of content, but this content is siloed in disparate systems managed by different teams. By automatically extracting content from your websites, Algolia Crawler removes the need for building data pipelines between each of your content repository and Algolia, and avoids complex internal project management, saving time and resources. Turn web pages into structured content Tailor the crawler to make sure it accurately interprets your content. It allows your users to search and navigate news articles, job posts, FAQ answers, financial reports or any type of content your website offers, including JavaScript, PDFs and Docs, instead of generic web pages. Extract content without editing your website Extract structured content without the need to add any metatag to your website. Algolia Crawler provides an easy to use editor for your technical team, so they can define what content to extract and how to structure it, ensuring an optimal end user experience. Enrich your content to improve the experience Algolia Crawler can enrich the extracted content with business data, including Google Analytics data, to enhance the relevance of the end user experience. From using your visitor behaviors and page performance to adjust the search rankings, to attaching categories to your content to power advanced navigation, possibilities are endless. Configure the crawler to your needs Algolia Crawler gives you the options to index the parts of your websites you need, when you need it. Schedule automatic crawls at the timing of your choice Manually trigger a crawl of part or all your websites when necessary Define what parts of your websites the crawler should or should not explore, or let it explore your websites automatically Configure the crawler to explore login protected pages when necessary Rely on a Production Ready crawler Algolia Crawler comes with a complete set of tools to make sure you always fuel your site search experience with up to date and accurate content. URL Inspector Search and inspect all the crawled URLs. For each URL, check when it was last crawled, whether the crawl was successful, and the records it generated. Monitoring Get a detailed report of the errors encountered during the last crawl. Data analysis Assess the quality of the extracted data. For each type of content, the Data Analyser compares all the extracted content to identify missing data. Path Explorer Assess which paths the Crawler explores, and for each path, how many URLs were crawled, how many records were extracted, what errors happened.“We realized that search should be a core competence of the LegalZoom enterprise, and we see Algolia as a revenue generating product.” Mrinal Murari Tools team lead & senior software engineer Read the full story Additional Resources",
  "description": "Surface the most relevant content with Algolia’s Crawler. Our custom crawler makes sense of all your content and delivers an enhanced end user experience."
}
```

#### Content splitting

For better relevance and to stay within [Algolia's records size limits](https://www.algolia.com/doc/guides/sending-and-managing-data/prepare-your-data/in-depth/index-and-records-size-and-usage-limitations/#record-size),
we will split the content of big pages into multiple records. We create all indices with the index settings `{ distinct: true, attributeForDistinct: 'url' }` to deduplicate them at search time.

### `hierarchical` schema

If your website contains a hierarchical structure (as it's often the case for documentation websites), it can be more relevant to create one Algolia record per section.
The Netlify crawler plugin supports such content extraction logic, and you can enable it by specifying the following parameter in your `.toml` configuration file:
```
template = "hierarchical"
```

With this template enabled, the plugin will create a new Algolia record for each header tag (`<h1>`, `<h2>`, ...), so the content of each page will be split into several records.
If your headers have an `id`, it will be put in the `url` to permits search results to point directly to it, as defined in the [HTML specification](https://html.spec.whatwg.org/multipage/browsing-the-web.html#scroll-to-fragid).

The schema of the records will be similar to the default schema, augmented with a few fields:
```ts
{
  ...defaultSchema,

  /**
   * The current hierarchy of the extracted record
   */
  hierarchy: { lvl0: 'H1 heading', lvl1: 'H2 heading', lvl2: 'H3 heading', ... };

  /**
   * The current hierarchy of the extracted record, in an InstantSearch compatible format.
   * https://www.algolia.com/doc/api-reference/widgets/hierarchical-menu/js/#requirements
   */
  hierarchicalCategories: { lvl0: 'H1 heading', lvl1: 'H1 heading > H2 heading', lvl3: 'H1 heading > H2 heading > H3 heading', ... };

  /**
   * Lengh of the extracted content for the current section.
   * Can be used for custom ranking, for e.g. redirect users to sections with more content first.
   */
  contentLength: number;
}
```

## JSON-LD

We support a limited set of [JSON-LD](https://json-ld.org/) attributes. We expect the JSON-LD structure to follow the <https://schema.org/> structure.
If present, the attributes found in JSON-LD will be taken in priority during the extraction.
The current list of supported attributes are:

- `Article` (<https://schema.org/Article>)
  - `author`
  - `datePublished`
  - `dateModified`

We will add more in the future, contact us if you'd like to request the addition of some specific attributes.

## Sitemaps

The plugin will automatically find sitemaps in your Robots.txt and also try multiple standard URLs that usually match sitemaps.

## Ignoring URLs or Patterns

The plugin supports multiple standard way of excluding URLs from a crawl:

- Robots.txt
- Meta robots
- Canonical

### Using Robots.txt

You can allow or disallow us to crawl certain pages using the standard Robots.txt syntax.
Learn more about the [Robots.txt](https://support.google.com/webmasters/answer/6062596?hl=en).

```txt
User-agent: Algolia Crawler
Disallow: /foo/bar
```

```txt
User-agent: Algolia Crawler
Allow: /*
```

### Using Meta Robots

You can directly exclude a page by using the robots meta tag in an HTML page.
Learn more about [robots meta tag](https://developers.google.com/search/reference/robots_meta_tag).

```html
<head>
  <meta name="robots" content="noindex" />
</head>
```

### Using Canonical

You can redirect the crawl to an other page and indirectly exclude this page from the crawl by using the canonical meta tag.
It is also useful to ignore **query params**, e.g: pagination, search term, etc...
Learn more about [canonical meta tag](https://support.google.com/webmasters/answer/139066?hl=en).

```html
<head>
  <link rel=“canonical” href=“/another-page.html” />
</head>
```

## Executing Javascript

If your website needs it, for example if you have a React application without server-side rendering,
you can enable Javascript rendering by setting the `renderJavaScript` option in your [netlify.toml](/plugin/README.md#inputs)

## Password protection

If you have configured the password protection through your Netlify site's settings (**Settings > Access Control > Visitor Access**), the Crawler will automatically use this password to crawl your website.
N.B: We will store the password encrypted.
