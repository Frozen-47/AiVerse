import { describe, it, expect } from 'vitest';
import {
  decodeEntrySlug,
  profilePathSlug,
  profileHandleFromSlug,
  parseProfileFromPathname,
} from '../src/lib/entryUrl';

describe('Entry & Profile URL Utilities (CAT-01, N-03)', () => {
  describe('decodeEntrySlug', () => {
    it('decodes plain names correctly', () => {
      expect(decodeEntrySlug('Llama-3')).toBe('Llama-3');
      expect(decodeEntrySlug('DeepSeek-R1')).toBe('DeepSeek-R1');
    });

    it('decodes single-encoded URL slugs', () => {
      expect(decodeEntrySlug('FLUX.1%20Schnell')).toBe('FLUX.1 Schnell');
      expect(decodeEntrySlug('Qwen%202.5-Coder%20%2832B%29')).toBe('Qwen 2.5-Coder (32B)');
    });

    it('handles legacy double-encoded share links safely', () => {
      const doubleEncoded = encodeURIComponent(encodeURIComponent('Gemini 2.0 Flash'));
      expect(decodeEntrySlug(doubleEncoded)).toBe('Gemini 2.0 Flash');
    });
  });

  describe('profilePathSlug & profileHandleFromSlug', () => {
    it('normalizes username for path format', () => {
      expect(profilePathSlug('frozen')).toBe('@frozen');
      expect(profilePathSlug('@frozen')).toBe('@frozen');
    });

    it('extracts canonical lowercase handle from slug', () => {
      expect(profileHandleFromSlug('Alex')).toBe('@alex');
      expect(profileHandleFromSlug('@AlexDev')).toBe('@alexdev');
      expect(profileHandleFromSlug('@FROZEN_47')).toBe('@frozen_47');
    });
  });

  describe('parseProfileFromPathname', () => {
    it('parses valid user profile paths', () => {
      expect(parseProfileFromPathname('/user/@frozen')).toBe('@frozen');
      expect(parseProfileFromPathname('/user/builder_99')).toBe('@builder_99');
      expect(parseProfileFromPathname('/user/builder_99/')).toBe('@builder_99');
    });

    it('returns null for non-user paths', () => {
      expect(parseProfileFromPathname('/')).toBeNull();
      expect(parseProfileFromPathname('/entries')).toBeNull();
      expect(parseProfileFromPathname('/admin')).toBeNull();
      expect(parseProfileFromPathname('/features/compare')).toBeNull();
    });
  });
});
