import { describe, it, expect } from 'vitest';
import { getRelatedEntries, getCompareCandidates } from '../src/lib/relatedEntries';
import type { Entry } from '../src/types';

const mockEntries: Entry[] = [
  {
    name: 'Model A',
    type: 'Model',
    task: 'NLP',
    org: 'Org A',
    year: 2024,
    size: '70B',
    summary: 'A strong NLP model',
    approved: true,
  },
  {
    name: 'Model B',
    type: 'Model',
    task: 'NLP',
    org: 'Org B',
    year: 2025,
    size: '8B',
    summary: 'Another NLP model',
    approved: true,
  },
  {
    name: 'Vision Model C',
    type: 'Model',
    task: 'Computer Vision',
    org: 'Org C',
    year: 2024,
    size: '12B',
    summary: 'A computer vision model',
    approved: true,
  },
  {
    name: 'Framework D',
    type: 'Framework',
    task: 'MLOps',
    org: 'Org D',
    year: 2024,
    size: 'N/A',
    summary: 'An agent framework',
    approved: true,
  },
];

describe('Related Entries & Compare Candidates (CMP-01, M-01)', () => {
  it('finds related entries with matching task and type', () => {
    const related = getRelatedEntries(mockEntries[0], mockEntries);
    expect(related.length).toBeGreaterThan(0);
    // Should prioritize Model B (same type and task) over Vision Model C (different task)
    expect(related[0].name).toBe('Model B');
    // Must never include the queried entry itself
    expect(related.some((e) => e.name === mockEntries[0].name)).toBe(false);
  });

  it('respects the limit argument', () => {
    const related = getRelatedEntries(mockEntries[0], mockEntries, [], 1);
    expect(related).toHaveLength(1);
  });

  it('generates compare candidates without duplicate entries', () => {
    const candidates = getCompareCandidates(mockEntries[0], mockEntries);
    const names = candidates.map((e) => e.name);
    const uniqueNames = new Set(names);
    expect(names.length).toBe(uniqueNames.size);
    expect(names).not.toContain(mockEntries[0].name);
  });
});
