import { escapeRegExp } from './escapeRegExp';

export function starMatch(pattern: string, value: string): boolean {
  const regexp = pattern.split('*').map(escapeRegExp).join('.*');
  return new RegExp(`^${regexp}$`).test(value);
}
