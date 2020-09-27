import { AutocompleteWrapper } from './AutocompleteWrapper';
import { Options } from './options';

const defaultOptions: Omit<Options, 'appId' | 'apiKey' | 'indexName'> = {
  analytics: true,
  autocomplete: {
    hitsPerPage: 5,
    inputSelector: 'input[type=search]',
  },
  color: '#3c4fe0',
  debug: false,
  poweredBy: true,
};

class AlgoliasearchNetlify {
  static instances: AlgoliasearchNetlify[];

  search: AutocompleteWrapper;

  constructor(_options: Options) {
    AlgoliasearchNetlify.instances.push(this);

    // eslint-disable-next-line no-warning-comments
    // TODO: add validation
    const options = {
      ...defaultOptions,
      ..._options,
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
