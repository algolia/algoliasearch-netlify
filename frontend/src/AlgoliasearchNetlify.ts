import { AutocompleteWrapper } from './AutocompleteWrapper';
import { Options } from './options';

const defaultOptions: Omit<
  Options,
  'appId' | 'apiKey' | 'indexName' | 'siteId' | 'branch'
> = {
  analytics: true,
  autocomplete: {
    hitsPerPage: 5,
    inputSelector: 'input[type=search]',
  },
  color: '#3c4fe0',
  debug: false,
  silenceWarnings: false,
  poweredBy: true,
};

class AlgoliasearchNetlify {
  static instances: AlgoliasearchNetlify[];

  search: AutocompleteWrapper;

  constructor(_options: Options) {
    AlgoliasearchNetlify.instances.push(this);

    // Temporary
    const splitIndexName = (
      indexName: string
    ): { siteId: string; branch: string } => {
      const regexp = /^netlify_([0-9a-f-]+)_(.*)_all$/;
      const [, siteId, branch] = indexName.match(regexp)!;
      return { siteId, branch };
    };

    // eslint-disable-next-line no-warning-comments
    // TODO: add validation
    const options = {
      ...defaultOptions,
      ..._options,
      ...(_options.indexName && splitIndexName(_options.indexName)), // Temporary
      autocomplete: {
        ...defaultOptions.autocomplete,
        ..._options.autocomplete,
      },
    };

    this.search = new AutocompleteWrapper(options);

    // Wait for DOM initialization, then render
    const render = this.render.bind(this, options);
    if (['complete', 'interactive'].includes(document.readyState)) {
      render();
    } else {
      document.addEventListener('DOMContentLoaded', render);
    }
  }

  render(options: Options) {
    this.search.render(options);
  }
}

AlgoliasearchNetlify.instances = [];

export { AlgoliasearchNetlify };
