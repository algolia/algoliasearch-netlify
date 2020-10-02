import { escapeRegExp } from './escapeRegExp';

export function starMatch(pattern: string, value: string) {
  const regexp = pattern.split('*').map(escapeRegExp).join('.*');
  return new RegExp(`^${regexp}$`).test(value);
}
