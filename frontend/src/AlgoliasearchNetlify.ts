import { AutocompleteWrapper } from './AutocompleteWrapper';
import { Options } from './types';

const defaultOptions: Omit<
  Options,
  'appId' | 'apiKey' | 'selector' | 'siteId' | 'branch'
> = {
  analytics: true,
  hitsPerPage: 5,
  debug: false,
  poweredBy: true,
};

const mandatory: Array<keyof Options> = [
  'appId',
  'apiKey',
  'selector',
  'siteId',
  'branch',
];

const instances: AutocompleteWrapper[] = [];

function algoliasearchNetlify(_options: Options) {
  const options = {
    ...defaultOptions,
    ..._options,
  };
  for (const key of mandatory) {
    if (options[key]) continue;

    throw new Error(`Missing mandatory key: ${key}`);
  }

  const autocomplete = new AutocompleteWrapper(options);
  instances.push(autocomplete);

  // Wait for DOM initialization, then render
  const render = () => {
    autocomplete.render();
  };
  if (['complete', 'interactive'].includes(document.readyState)) {
    render();
  } else {
    document.addEventListener('DOMContentLoaded', render);
  }
}

export { algoliasearchNetlify };
