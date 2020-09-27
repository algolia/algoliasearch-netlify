// Taken from https://github.com/timoxley/to-factory/
// License: MIT

export function toFactory(Class: any) {
  // eslint-disable-next-line algolia/func-style-toplevel
  const Factory = function (...args: any[]) {
    return new Class(...args);
  };
  // eslint-disable-next-line no-proto
  Factory.__proto__ = Class;
  Factory.prototype = Class.prototype;
  return Factory;
}
