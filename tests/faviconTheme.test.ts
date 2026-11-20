import { describe, it, expect } from 'vitest';

export function resolveFaviconPath(resolvedTheme: 'amoled' | 'light'): string {
  return resolvedTheme === 'amoled' ? '/icond.png' : '/iconl.png';
}

export function resolveMetaThemeColor(resolvedTheme: 'amoled' | 'light'): string {
  return resolvedTheme === 'amoled' ? '#000000' : '#ffffff';
}

describe('Dynamic Favicon by Theme', () => {
  it('selects dark favicon (icond.png) in dark / amoled theme', () => {
    expect(resolveFaviconPath('amoled')).toBe('/icond.png');
    expect(resolveMetaThemeColor('amoled')).toBe('#000000');
  });

  it('selects light favicon (iconl.png) in light theme', () => {
    expect(resolveFaviconPath('light')).toBe('/iconl.png');
    expect(resolveMetaThemeColor('light')).toBe('#ffffff');
  });
});
