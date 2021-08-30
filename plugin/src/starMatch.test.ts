import { starMatch } from './starMatch';

describe('starMatch', () => {
  it.each([
    ['foo', 'foo'],
    ['fo*', 'foo'],
    ['*oo', 'foo'],
    ['*o*', 'foo'],
    ['foo*', 'foo'],
    ['*foo', 'foo'],
    ['*foo*', 'foo'],
    ['foo*bar', 'foobar'],
    ['fo*ar', 'foobar'],
  ])('"%s" should match "%s"', (pattern: string, value: string) => {
    expect(starMatch(pattern, value)).toBe(true);
  });

  it.each([
    ['foo', 'bar'],
    ['foo', 'foa'],
    ['*foo', 'foobar'],
    ['foo*', 'barfoo'],
  ])('"%s" should not match "%s"', (pattern: string, value: string) => {
    expect(starMatch(pattern, value)).toBe(false);
  });
});
